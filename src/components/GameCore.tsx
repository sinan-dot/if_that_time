/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CHAPTERS, GAME_CONSTANTS, BEAT_MS } from '../constants';
import { NodeData, GameState } from '../types';
import { HUD } from './HUD';
import { ResultScreen } from './ResultScreen';
import { StartScreen } from './StartScreen';
import { LegendScene } from './legend';

type LifeStats = {
  car: number;
  fam: number;
  hea: number;
  hap: number;
};

type TrailPoint = {
  x: number;
  y: number;
  alpha: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  life: number;
  size: number;
};

const INITIAL_STATS: LifeStats = {
  car: 50,
  fam: 50,
  hea: 50,
  hap: 50,
};

const MAX_TRAIL_POINTS = 96;
const MAX_PARTICLES = 220;
const PLAYER_HIT_RADIUS = 38;

const NODE_STYLES = {
  good: {
    halo: ['rgba(172, 245, 255, 0.26)', 'rgba(172, 245, 255, 0.1)', 'rgba(172, 245, 255, 0)'],
    fill: 'rgba(10, 22, 32, 0.58)',
    stroke: 'rgba(235, 251, 255, 0.94)',
    innerStroke: 'rgba(126, 225, 239, 0.6)',
    text: 'rgba(246, 252, 255, 0.97)',
    textStroke: 'rgba(6, 15, 23, 0.58)',
    shadow: 'rgba(123, 219, 231, 0.56)',
  },
  bad: {
    halo: ['rgba(255, 204, 235, 0.24)', 'rgba(255, 204, 235, 0.09)', 'rgba(255, 204, 235, 0)'],
    fill: 'rgba(36, 14, 29, 0.56)',
    stroke: 'rgba(255, 236, 245, 0.94)',
    innerStroke: 'rgba(236, 166, 214, 0.58)',
    text: 'rgba(255, 244, 249, 0.97)',
    textStroke: 'rgba(30, 8, 24, 0.56)',
    shadow: 'rgba(238, 173, 213, 0.5)',
  },
} as const;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function wrapNodeText(text: string) {
  const chars = Array.from(text);
  if (chars.length <= 4) return [text];

  const lineCount = chars.length > 8 ? 3 : 2;
  const lineLength = Math.ceil(chars.length / lineCount);
  const lines: string[] = [];

  for (let index = 0; index < chars.length; index += lineLength) {
    lines.push(chars.slice(index, index + lineLength).join(''));
  }

  return lines.slice(0, 3);
}

function drawTrackedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  centerY: number,
  tracking: number,
  withStroke = false,
) {
  const chars = Array.from(text);
  const widths = chars.map(char => ctx.measureText(char).width);
  const totalWidth = widths.reduce((sum, width) => sum + width, 0) + tracking * Math.max(0, chars.length - 1);
  let cursor = centerX - totalWidth / 2;

  ctx.save();
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';

  chars.forEach((char, index) => {
    if (withStroke) {
      ctx.strokeText(char, cursor, centerY);
    }
    ctx.fillText(char, cursor, centerY);
    cursor += widths[index] + tracking;
  });

  ctx.restore();
}

export const GameCore: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('START');
  const [, setRepair] = useState(0);
  const [, setCombo] = useState(0);
  const [, setMiss] = useState(0);
  const [currentChapterId, setCurrentChapterId] = useState('event_001');
  const [stats, setStats] = useState<LifeStats>(INITIAL_STATS);
  const [choiceHistory, setChoiceHistory] = useState<string[]>([]);
  const [showChapterText, setShowChapterText] = useState(false);
  const [pops, setPops] = useState<{ id: number; text: string; x: number; y: number; worldY: number }[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | undefined>(undefined);
  const audioRef = useRef<HTMLAudioElement>(null);
  const chapterTextTimeoutRef = useRef<number | null>(null);

  const stateRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    angle: -Math.PI / 2,
    nodes: [] as NodeData[],
    trail: [] as TrailPoint[],
    particles: [] as Particle[],
    speed: GAME_CONSTANTS.SPEED,
    lastSpawnY: 0,
  });

  const clearChapterTextTimeout = useCallback(() => {
    if (chapterTextTimeoutRef.current !== null) {
      window.clearTimeout(chapterTextTimeoutRef.current);
      chapterTextTimeoutRef.current = null;
    }
  }, []);

  const showChapterOverlay = useCallback(() => {
    clearChapterTextTimeout();
    setShowChapterText(true);
    chapterTextTimeoutRef.current = window.setTimeout(() => {
      setShowChapterText(false);
      chapterTextTimeoutRef.current = null;
    }, GAME_CONSTANTS.CHAPTER_TEXT_MS);
  }, [clearChapterTextTimeout]);

  const playAudio = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.45;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(error => console.log('音乐播放失败:', error));
  }, []);

  const spawnNextNodes = useCallback((chapterId: string, currentY: number) => {
    const chapter = CHAPTERS.find(item => item.id === chapterId);
    if (!chapter || !containerRef.current) return;

    const baseY = currentY - GAME_CONSTANTS.NODE_SPACING;
    const width = containerRef.current.clientWidth;
    const newNodes: NodeData[] = [];

    if (chapter.isSingle) {
      newNodes.push({
        id: `good-${chapterId}-${Date.now()}`,
        type: 'good',
        text: chapter.choices.good.text,
        x: width / 2,
        y: baseY,
        hit: false,
        passed: false,
      });
    } else {
      const margin = width * 0.25;
      const isGoodLeft = Math.random() > 0.5;

      newNodes.push({
        id: `good-${chapterId}-${Date.now()}`,
        type: 'good',
        text: chapter.choices.good.text,
        x: isGoodLeft ? margin : width - margin,
        y: baseY,
        hit: false,
        passed: false,
      });

      if (chapter.choices.bad) {
        newNodes.push({
          id: `bad-${chapterId}-${Date.now()}`,
          type: 'bad',
          text: chapter.choices.bad.text,
          x: isGoodLeft ? width - margin : margin,
          y: baseY,
          hit: false,
          passed: false,
        });
      }
    }

    stateRef.current.nodes = [...stateRef.current.nodes, ...newNodes];
    stateRef.current.lastSpawnY = baseY - GAME_CONSTANTS.NODE_SPACING;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const now = performance.now();
    const { x, y, trail, particles, nodes, angle } = stateRef.current;
    const offsetY = -y + canvas.height * 0.7;

    for (let index = 0; index < 36; index += 1) {
      const twinkle = 0.25 + Math.abs(Math.sin(now * 0.00035 + index * 0.9)) * 0.45;
      const starX = Math.abs(Math.sin(index * 1234.56)) * canvas.width;
      const starY = (Math.abs(Math.cos(index * 5678.9)) * canvas.height * 10 + offsetY * 0.18) % canvas.height;
      const size = index % 7 === 0 ? 2 : 1.2;
      ctx.fillStyle = `rgba(228, 238, 255, ${0.08 + twinkle * 0.12})`;
      ctx.fillRect(starX, starY, size, size);
    }

    particles.forEach(particle => {
      const screenY = particle.y + offsetY;
      if (screenY < -100 || screenY > canvas.height + 100) return;

      ctx.save();
      ctx.globalAlpha = particle.alpha;
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(255, 211, 125, 0.42)';
      ctx.beginPath();
      ctx.arc(particle.x, screenY, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 225, 158, 0.82)';
      ctx.fill();
      ctx.restore();
    });

    if (trail.length > 1) {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let index = 1; index < trail.length; index += 1) {
        const previous = trail[index - 1];
        const current = trail[index];
        const progress = index / (trail.length - 1);
        const alpha = current.alpha * (0.05 + progress * 0.8);
        const lineWidth = 0.8 + progress * 4.8;
        const red = Math.round(120 + progress * 46);
        const green = Math.round(192 + progress * 34);
        const blue = 255;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(previous.x, previous.y + offsetY);
        ctx.lineTo(current.x, current.y + offsetY);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        if (progress > 0.55) {
          ctx.shadowBlur = 8 + progress * 10;
          ctx.shadowColor = `rgba(134, 214, 255, ${alpha})`;
        }
        ctx.stroke();
        ctx.restore();
      }
    }

    nodes.forEach(node => {
      if (node.hit) return;

      const screenY = node.y + offsetY;
      if (screenY < -160 || screenY > canvas.height + 160) return;

      const palette = NODE_STYLES[node.type];
      const halo = ctx.createRadialGradient(node.x, screenY, 6, node.x, screenY, 50);
      halo.addColorStop(0, palette.halo[0]);
      halo.addColorStop(0.62, palette.halo[1]);
      halo.addColorStop(1, palette.halo[2]);

      ctx.save();
      ctx.beginPath();
      ctx.arc(node.x, screenY, 50, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      ctx.shadowBlur = 18;
      ctx.shadowColor = palette.shadow;
      ctx.beginPath();
      ctx.arc(node.x, screenY, 34, 0, Math.PI * 2);
      ctx.fillStyle = palette.fill;
      ctx.fill();
      ctx.lineWidth = 1.7;
      ctx.strokeStyle = palette.stroke;
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(node.x, screenY, 27.5, 0, Math.PI * 2);
      ctx.lineWidth = 1;
      ctx.strokeStyle = palette.innerStroke;
      ctx.stroke();

      const lines = wrapNodeText(node.text);
      const lineHeight = 14;
      const firstLineY = screenY - ((lines.length - 1) * lineHeight) / 2;

      ctx.font = '400 11.5px system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
      ctx.fillStyle = palette.text;
      ctx.strokeStyle = palette.textStroke;
      ctx.lineWidth = 1.7;
      ctx.lineJoin = 'round';
      ctx.shadowBlur = 0;
      ctx.shadowColor = 'transparent';

      lines.forEach((line, index) => {
        const textY = firstLineY + index * lineHeight;
        drawTrackedText(ctx, line, node.x, textY, 0.55, true);
      });

      ctx.restore();
    });

    ctx.save();
    ctx.translate(x, y + offsetY);
    ctx.rotate(angle);
    ctx.globalAlpha = 0.92;
    ctx.shadowBlur = 22;
    ctx.shadowColor = 'rgba(191, 230, 255, 0.75)';

    ctx.beginPath();
    ctx.moveTo(18, 0);
    ctx.lineTo(-8, -6.5);
    ctx.lineTo(-1.5, 0);
    ctx.lineTo(-8, 6.5);
    ctx.closePath();
    ctx.fillStyle = 'rgba(242, 249, 255, 0.9)';
    ctx.strokeStyle = 'rgba(153, 222, 255, 0.95)';
    ctx.lineWidth = 1.6;
    ctx.fill();
    ctx.stroke();

    ctx.globalAlpha = 0.36;
    ctx.beginPath();
    ctx.moveTo(-6, 0);
    ctx.lineTo(-24, -4.5);
    ctx.lineTo(-18, 0);
    ctx.lineTo(-24, 4.5);
    ctx.closePath();
    ctx.fillStyle = 'rgba(127, 219, 255, 0.7)';
    ctx.fill();
    ctx.restore();
  }, []);

  const initGame = useCallback(() => {
    if (!containerRef.current) return;

    const startX = containerRef.current.clientWidth / 2;
    const startY = containerRef.current.clientHeight * 0.8;

    stateRef.current.x = startX;
    stateRef.current.targetX = startX;
    stateRef.current.y = startY;
    stateRef.current.angle = -Math.PI / 2;
    stateRef.current.trail = [];
    stateRef.current.particles = [];
    stateRef.current.speed = GAME_CONSTANTS.SPEED;
    stateRef.current.nodes = [];
    stateRef.current.lastSpawnY = startY;

    setRepair(0);
    setCombo(0);
    setMiss(0);
    setPops([]);
    setChoiceHistory([]);
    setStats(INITIAL_STATS);
    setCurrentChapterId('event_001');

    spawnNextNodes('event_001', startY);
    showChapterOverlay();
    draw();
  }, [draw, showChapterOverlay, spawnNextNodes]);

  const showPop = (text: string, x: number, worldY: number) => {
    const id = Date.now() + Math.random();
    setPops(previous => [...previous, { id, text, x, y: 0, worldY }]);
    window.setTimeout(() => {
      setPops(previous => previous.filter(pop => pop.id !== id));
    }, 800);
  };

  const update = useCallback(() => {
    if (gameState !== 'PLAYING') return;

    const { x, y, speed, targetX, nodes, trail, particles } = stateRef.current;

    const newX = x + (targetX - x) * 0.35;
    const newY = y - speed;
    const dx = newX - x;
    const dy = newY - y;
    const newAngle = Math.atan2(dy, dx);
    stateRef.current.angle = newAngle;

    trail.push({ x: newX, y: newY, alpha: 1 });
    trail.forEach(point => {
      point.alpha *= 0.972;
    });
    while (trail.length > MAX_TRAIL_POINTS) {
      trail.shift();
    }
    while (trail.length && trail[0].alpha < 0.045) {
      trail.shift();
    }

    const particleBurst = 3;
    for (let index = 0; index < particleBurst; index += 1) {
      const thrust = 0.9 + Math.random() * 1.4;
      const spawnDistance = 14 + Math.random() * 8;
      particles.push({
        x: newX - Math.cos(newAngle) * spawnDistance + (Math.random() - 0.5) * 6,
        y: newY - Math.sin(newAngle) * spawnDistance + (Math.random() - 0.5) * 6,
        vx: -Math.cos(newAngle) * thrust + (Math.random() - 0.5) * 0.7,
        vy: -Math.sin(newAngle) * thrust + (Math.random() - 0.5) * 0.7,
        alpha: 0.55 + Math.random() * 0.28,
        life: 14 + Math.random() * 10,
        size: 1.1 + Math.random() * 2.3,
      });
    }

    if (particles.length > MAX_PARTICLES) {
      particles.splice(0, particles.length - MAX_PARTICLES);
    }

    stateRef.current.particles = particles.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx *= 0.97;
      particle.vy *= 0.97;
      particle.alpha *= 0.92;
      particle.life -= 1;
      particle.size *= 0.975;
      return particle.life > 0 && particle.alpha > 0.04 && particle.size > 0.25;
    });

    let triggeredNext = false;

    nodes.forEach(node => {
      if (node.hit || node.passed) return;

      const distX = newX - node.x;
      const distY = newY - node.y;

      if (Math.sqrt(distX * distX + distY * distY) < PLAYER_HIT_RADIUS) {
        node.hit = true;
        triggeredNext = true;
        showPop('命运的抉择', node.x, node.y);

        const chapter = CHAPTERS.find(item => item.id === currentChapterId);
        if (chapter) {
          const choice = node.type === 'good' ? chapter.choices.good : chapter.choices.bad;
          setChoiceHistory(previous => [...previous, node.text]);
          if (choice?.impact) {
            setStats(previous => ({
              car: previous.car + choice.impact.car,
              fam: previous.fam + choice.impact.fam,
              hea: previous.hea + choice.impact.hea,
              hap: previous.hap + choice.impact.hap,
            }));
          }
        }
      } else if (newY < node.y - GAME_CONSTANTS.MISS_DISTANCE) {
        node.passed = true;
        if (node.type === 'good') {
          triggeredNext = true;
          showPop('随波逐流', newX, newY);
        }
      }
    });

    if (triggeredNext) {
      stateRef.current.nodes.forEach(node => {
        node.passed = true;
      });

      const currentIndex = CHAPTERS.findIndex(item => item.id === currentChapterId);
      const nextChapter = CHAPTERS[currentIndex + 1];

      if (nextChapter) {
        setCurrentChapterId(nextChapter.id);
        spawnNextNodes(nextChapter.id, newY);
        showChapterOverlay();
      } else {
        clearChapterTextTimeout();
        setShowChapterText(false);
        setGameState('ENDING');
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        return;
      }
    }

    stateRef.current.x = newX;
    stateRef.current.y = newY;

    draw();
    requestRef.current = requestAnimationFrame(update);
  }, [clearChapterTextTimeout, currentChapterId, draw, gameState, showChapterOverlay, spawnNextNodes]);

  const startRun = useCallback(() => {
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    initGame();
    setGameState('PLAYING');
    playAudio();
  }, [initGame, playAudio]);

  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !containerRef.current) return;
      canvasRef.current.width = containerRef.current.clientWidth;
      canvasRef.current.height = containerRef.current.clientHeight;
      draw();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [draw]);

  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    requestRef.current = requestAnimationFrame(update);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gameState, update]);

  useEffect(() => {
    return () => {
      clearChapterTextTimeout();
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [clearChapterTextTimeout]);

  const currentChapter = CHAPTERS.find(chapter => chapter.id === currentChapterId);

  const onStart = () => {
    startRun();
  };

  const onLegendStart = () => {
    clearChapterTextTimeout();
    setShowChapterText(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setGameState('LEGEND');
  };

  const backToStart = () => {
    clearChapterTextTimeout();
    setShowChapterText(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setGameState('START');
  };

  const handlePointer = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (gameState !== 'PLAYING' || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const pointerX = event.clientX - rect.left;
    stateRef.current.targetX = clamp(pointerX, 20, rect.width - 20);
  }, [gameState]);

  if (gameState === 'LEGEND') {
    return (
      <div className="relative h-[100dvh] w-full overflow-hidden bg-black">
        <LegendScene onRestart={backToStart} onExit={backToStart} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black">
      <div
        ref={containerRef}
        className="relative h-[100dvh] w-full touch-none select-none overflow-hidden border-gray-900 bg-[#05060f] shadow-2xl sm:h-[844px] sm:w-[390px] sm:rounded-[40px] sm:border-[8px]"
        style={{ transform: 'translateZ(0)' }}
        onPointerDown={handlePointer}
        onPointerMove={event => {
          if (event.buttons > 0 || event.pointerType === 'touch') {
            handlePointer(event);
          }
        }}
      >
        <audio ref={audioRef} src="/bgm.mp3" loop preload="auto" />

        <canvas ref={canvasRef} className="absolute inset-0 z-10" />

        <AnimatePresence>
          {currentChapter?.bgImage ? (
            <motion.img
              key={currentChapter.id}
              src={currentChapter.bgImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
            />
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {gameState === 'START' && <StartScreen onStart={onStart} onLegendStart={onLegendStart} />}
          {gameState === 'PLAYING' && (
            <>
              <HUD
                currentStep={CHAPTERS.findIndex(chapter => chapter.id === currentChapterId) + 1}
                totalSteps={CHAPTERS.length}
                age={currentChapter?.age || 'CHILDHOOD'}
              />
              {showChapterText && currentChapter && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 42 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.06, filter: 'blur(10px)' }}
                  className="pointer-events-none absolute inset-x-0 bottom-32 flex items-center justify-center px-4"
                >
                  <div className="w-full max-w-md space-y-3 rounded-[28px] border border-white/10 bg-black/15 p-6 text-center shadow-2xl backdrop-blur-3xl">
                    <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.45em] text-cyan-200/80">
                      {currentChapter.age}
                    </div>
                    <h3 className="font-display text-2xl font-semibold leading-tight text-white/95">
                      {currentChapter.title}
                    </h3>
                    <div className="mx-auto h-px w-10 rounded-full bg-gradient-to-r from-transparent via-cyan-200/80 to-transparent" />
                    <p className="text-sm font-light italic leading-relaxed text-white/70">
                      {currentChapter.description}
                    </p>
                  </div>
                </motion.div>
              )}
              <BeatVisualizer interval={BEAT_MS} />
            </>
          )}
          {gameState === 'ENDING' && (
            <ResultScreen stats={stats} choiceHistory={choiceHistory} onRestart={startRun} />
          )}
        </AnimatePresence>

        {pops.map(pop => (
          <motion.div
            key={pop.id}
            initial={{ opacity: 1, y: 0, scale: 0.5 }}
            animate={{ opacity: 0, y: -150, scale: 1.4 }}
            className="pointer-events-none absolute z-30 font-display text-2xl font-black text-blue-100 drop-shadow-[0_0_15px_rgba(191,230,255,0.65)]"
            style={{
              left: pop.x - 40,
              top: pop.worldY - stateRef.current.y + (containerRef.current?.clientHeight || window.innerHeight) * 0.7 - 40,
            }}
          >
            {pop.text}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const BeatVisualizer: React.FC<{ interval: number }> = ({ interval }) => {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPulse(true);
      window.setTimeout(() => setPulse(false), 200);
    }, interval);

    return () => window.clearInterval(timer);
  }, [interval]);

  return (
    <AnimatePresence>
      {pulse && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none absolute inset-0 z-10 border-[4px] border-white/5"
        />
      )}
    </AnimatePresence>
  );
};
