/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CHAPTERS, GAME_CONSTANTS, BEAT_MS } from '../constants';
import { NodeData, GameState } from '../types';
import { HUD } from './HUD';
import { ResultScreen } from './ResultScreen';
import { StartScreen } from './StartScreen';

export const GameCore: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('START');
  const [repair, setRepair] = useState(0);
  const [combo, setCombo] = useState(0);
  const [miss, setMiss] = useState(0);
  const [currentChapterId, setCurrentChapterId] = useState("childhood_start");
  const [showChapterText, setShowChapterText] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(undefined);
  const lastBeatRef = useRef<number>(0);
  const stateRef = useRef({
    x: 0,
    y: 0,
    angle: -Math.PI / 2,
    turnDir: 1,
    nodes: [] as NodeData[],
    trail: [] as { x: number; y: number; opacity: number }[],
    speed: GAME_CONSTANTS.SPEED,
    lastSpawnY: 0,
  });

  const [pops, setPops] = useState<{ id: number; text: string; x: number; y: number; worldY: number }[]>([]);

  const spawnNextNodes = useCallback((chapterId: string, currentY: number) => {
    const chapter = CHAPTERS.find(c => c.id === chapterId);
    if (!chapter) return;

    const baseY = currentY - 800;
    const currentX = stateRef.current.x;
    
    // Momentum logic: new nodes are biased towards current direction 
    const margin = 150;
    const width = window.innerWidth;
    
    // Good node (typically one side)
    const goodX = Math.max(margin, Math.min(width - margin, currentX - 300 + Math.random() * 200));
    // Bad node (typically other side)
    const badX = Math.max(margin, Math.min(width - margin, currentX + 100 + Math.random() * 200));

    const newNodes: NodeData[] = [
      {
        id: `good-${chapterId}-${Date.now()}`,
        type: 'good',
        text: chapter.choices.good.text,
        x: goodX,
        y: baseY,
        hit: false
      },
      {
        id: `bad-${chapterId}-${Date.now()}`,
        type: 'bad',
        text: chapter.choices.bad.text,
        x: badX,
        y: baseY - 400,
        hit: false
      }
    ];

    stateRef.current.nodes = [...stateRef.current.nodes, ...newNodes];
    stateRef.current.lastSpawnY = baseY - 400;
  }, []);

  const initGame = useCallback(() => {
    stateRef.current.x = window.innerWidth / 2;
    stateRef.current.y = window.innerHeight * 0.8;
    stateRef.current.angle = -Math.PI / 2;
    stateRef.current.turnDir = 1;
    stateRef.current.trail = [];
    stateRef.current.speed = GAME_CONSTANTS.SPEED;
    stateRef.current.nodes = [];
    stateRef.current.lastSpawnY = 0;

    setCurrentChapterId("childhood_start");
    spawnNextNodes("childhood_start", stateRef.current.y);

    setRepair(0);
    setCombo(0);
    setMiss(0);
    setShowChapterText(true);
    setTimeout(() => setShowChapterText(false), 3000);
    lastBeatRef.current = performance.now();
  }, [spawnNextNodes]);

  const showPop = (text: string, x: number, worldY: number) => {
    const id = Date.now() + Math.random();
    setPops(prev => [...prev, { id, text, x, y: 0, worldY }]);
    setTimeout(() => {
      setPops(prev => prev.filter(p => p.id !== id));
    }, 800);
  };

  const handleTurn = useCallback(() => {
    if (gameState !== 'PLAYING') return;

    const now = performance.now();
    const diff = Math.abs(now - lastBeatRef.current);
    const timing = Math.min(diff, BEAT_MS - diff);

    let angleChange = 0;
    if (timing < 100) {
      angleChange = stateRef.current.turnDir * GAME_CONSTANTS.TURN_SPEED_PERFECT;
      setCombo(c => c + 1);
      showPop("契合命运", stateRef.current.x, stateRef.current.y);
    } else if (timing < 200) {
      angleChange = stateRef.current.turnDir * GAME_CONSTANTS.TURN_SPEED_GREAT;
      setCombo(c => c + 1);
      showPop("虽有波折", stateRef.current.x, stateRef.current.y);
    } else {
      angleChange = stateRef.current.turnDir * GAME_CONSTANTS.TURN_SPEED_OK;
      setCombo(0);
      setMiss(m => m + 1);
      showPop("节拍错位", stateRef.current.x, stateRef.current.y);
      document.body.classList.add("flash-bad");
      setTimeout(() => document.body.classList.remove("flash-bad"), 200);
    }

    stateRef.current.angle += angleChange;
    stateRef.current.turnDir *= -1;
  }, [gameState]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const { x, y, trail, nodes, angle } = stateRef.current;
    const offsetY = -y + canvas.height * 0.7;

    // Background stars
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for(let i=0; i<30; i++) {
       const sx = (Math.abs(Math.sin(i * 1234.56)) * canvas.width);
       const sy = ((Math.abs(Math.cos(i * 5678.90)) * canvas.height * 10 + offsetY) % canvas.height);
       ctx.fillRect(sx, sy, 2, 2);
    }

    // Draw nodes
    nodes.forEach(node => {
      if (node.hit) return;
      const ny = node.y + offsetY;
      if (ny < -200 || ny > canvas.height + 200) return;

      const grad = ctx.createRadialGradient(node.x, ny, 5, node.x, ny, 70);
      if (node.type === 'good') {
        grad.addColorStop(0, 'rgba(147, 197, 253, 0.9)');
        grad.addColorStop(0.3, 'rgba(147, 197, 253, 0.4)');
        grad.addColorStop(1, 'rgba(147, 197, 253, 0)');
      } else {
        grad.addColorStop(0, 'rgba(244, 114, 182, 0.7)');
        grad.addColorStop(0.3, 'rgba(244, 114, 182, 0.3)');
        grad.addColorStop(1, 'rgba(244, 114, 182, 0)');
      }
      
      ctx.beginPath();
      ctx.arc(node.x, ny, 70, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.fillStyle = 'white';
      ctx.font = '900 13px Inter';
      ctx.textAlign = 'center';
      ctx.shadowBlur = 4;
      ctx.shadowColor = 'black';
      ctx.fillText(node.text.toUpperCase(), node.x, ny + 5);
      ctx.shadowBlur = 0;
    });

    // Draw trail
    if (trail.length > 2) {
      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y + offsetY);
      for (let i = 1; i < trail.length; i++) {
        const p = trail[i];
        ctx.lineTo(p.x, p.y + offsetY);
      }
      const trailGrad = ctx.createLinearGradient(0, trail[0].y + offsetY, 0, trail[trail.length-1].y + offsetY);
      trailGrad.addColorStop(0, 'rgba(96, 165, 250, 0)');
      trailGrad.addColorStop(1, 'rgba(96, 165, 250, 0.8)');
      
      ctx.strokeStyle = trailGrad;
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#3b82f6';
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Draw Arrow Head
    ctx.save();
    ctx.translate(x, y + offsetY);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(15, 0);
    ctx.lineTo(-8, -6);
    ctx.lineTo(-8, 6);
    ctx.closePath();
    ctx.fillStyle = 'white';
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'white';
    ctx.fill();
    ctx.restore();
    ctx.shadowBlur = 0;
  }, []);

  const update = useCallback(() => {
    if (gameState !== 'PLAYING') return;

    const { x, y, angle, speed, nodes, trail } = stateRef.current;
    
    const newX = x + Math.cos(angle) * speed;
    const newY = y + Math.sin(angle) * speed;

    trail.push({ x: newX, y: newY, opacity: 1 });
    if (trail.length > 200) trail.shift();
    trail.forEach(t => t.opacity *= 0.99);

    if (newX < 50 || newX > window.innerWidth - 50) {
      stateRef.current.angle = Math.PI - angle;
      setMiss(m => m + 1);
      setCombo(0);
    }

    nodes.forEach(node => {
      if (node.hit) return;
      const dx = newX - node.x;
      const dy = newY - node.y;
      if (Math.sqrt(dx*dx + dy*dy) < 65) {
        node.hit = true;
        const chapter = CHAPTERS.find(c => c.id === currentChapterId);
        
        if (node.type === 'good') {
          setRepair(r => Math.min(100, r + GAME_CONSTANTS.REPAIR_INC));
          setCombo(c => c + 2);
          showPop("弥补遗憾", node.x, node.y);
          if (chapter?.choices.good.nextId) {
            setCurrentChapterId(chapter.choices.good.nextId);
            spawnNextNodes(chapter.choices.good.nextId, newY);
            setShowChapterText(true);
            setTimeout(() => setShowChapterText(false), 3000);
          } else {
            setGameState('ENDING');
          }
        } else {
          setRepair(r => Math.max(0, r - GAME_CONSTANTS.MISS_DEC));
          setMiss(m => m + 1);
          setCombo(0);
          showPop("深陷过往", node.x, node.y);
          if (chapter?.choices.bad.nextId) {
            setCurrentChapterId(chapter.choices.bad.nextId);
            spawnNextNodes(chapter.choices.bad.nextId, newY);
            setShowChapterText(true);
            setTimeout(() => setShowChapterText(false), 3000);
          } else {
             setGameState('ENDING');
          }
        }
      }
    });

    stateRef.current.x = newX;
    stateRef.current.y = newY;

    draw();
    requestRef.current = requestAnimationFrame(update);
  }, [gameState, currentChapterId, spawnNextNodes, draw]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (gameState === 'PLAYING') {
      const beatInterval = setInterval(() => {
        lastBeatRef.current = performance.now();
      }, BEAT_MS);
      requestRef.current = requestAnimationFrame(update);
      return () => {
        clearInterval(beatInterval);
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
      };
    }
  }, [gameState, update]);

  const currentChapter = CHAPTERS.find(c => c.id === currentChapterId);

  const onStart = () => {
    initGame();
    setGameState('PLAYING');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden cursor-pointer bg-[#05060f]" onClick={handleTurn}>
      <canvas ref={canvasRef} className="absolute inset-0" />

      <AnimatePresence>
        {gameState === 'START' && <StartScreen onStart={onStart} />}
        {gameState === 'PLAYING' && (
          <>
            <HUD repair={repair} combo={combo} miss={miss} currentChapterTitle={currentChapter?.title || "末章"} />
            {showChapterText && currentChapter && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                className="absolute inset-x-0 bottom-32 flex items-center justify-center pointer-events-none"
              >
                <div className="text-center space-y-4 max-w-lg p-10 bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-2xl">
                   <div className="text-[10px] uppercase tracking-[0.4em] text-blue-400 font-bold mb-2">{currentChapter.age}</div>
                   <h3 className="text-4xl font-black text-white font-display leading-tight">{currentChapter.title}</h3>
                   <div className="w-12 h-1 bg-blue-500 mx-auto rounded-full my-4" />
                   <p className="text-white/80 italic text-xl leading-relaxed font-light">{currentChapter.description}</p>
                </div>
              </motion.div>
            )}
            <BeatVisualizer interval={BEAT_MS} />
          </>
        )}
        {gameState === 'ENDING' && <ResultScreen repair={repair} miss={miss} onRestart={() => setGameState('START')} />}
      </AnimatePresence>

      {pops.map(pop => (
        <motion.div
          key={pop.id}
          initial={{ opacity: 1, y: 0, scale: 0.5 }}
          animate={{ opacity: 0, y: -150, scale: 1.4 }}
          className="absolute font-black text-3xl text-blue-200 pointer-events-none drop-shadow-[0_0_15px_rgba(147,197,253,0.8)] z-30 font-display"
          style={{ 
            left: pop.x - 60, 
            top: pop.worldY - stateRef.current.y + window.innerHeight * 0.7 - 40
          }}
        >
          {pop.text}
        </motion.div>
      ))}
    </div>
  );
};

const BeatVisualizer: React.FC<{ interval: number }> = ({ interval }) => {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const i = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 200);
    }, interval);
    return () => clearInterval(i);
  }, [interval]);

  return (
    <AnimatePresence>
      {pulse && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 border-[10px] border-white/5 pointer-events-none z-10"
        />
      )}
    </AnimatePresence>
  );
};
