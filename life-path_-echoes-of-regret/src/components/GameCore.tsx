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
  
  // 新增：用于获取手机屏幕外壳的尺寸
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(undefined);
  const lastBeatRef = useRef<number>(0);

  // 物理引擎状态
  const stateRef = useRef({
    x: 0,
    y: 0,
    targetX: 0, // 追踪手指/鼠标的 X 坐标
    angle: -Math.PI / 2,
    nodes: [] as NodeData[],
    trail: [] as { x: number; y: number; opacity: number }[],
    speed: GAME_CONSTANTS.SPEED,
    lastSpawnY: 0,
  });

  const [pops, setPops] = useState<{ id: number; text: string; x: number; y: number; worldY: number }[]>([]);

  const spawnNextNodes = useCallback((chapterId: string, currentY: number) => {
    const chapter = CHAPTERS.find(c => c.id === chapterId);
    if (!chapter || !containerRef.current) return;

    const baseY = currentY - 800;
    const width = containerRef.current.clientWidth;
    const margin = width * 0.2; // 选项距离屏幕边缘的距离
    
    // 随机左右生成，避免玩家一直待在一边
    const isGoodLeft = Math.random() > 0.5;
    const goodX = isGoodLeft ? margin : width - margin;
    const badX = isGoodLeft ? width - margin : margin;

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
        y: baseY - 400, // 错开出现
        hit: false
      }
    ];

    stateRef.current.nodes = [...stateRef.current.nodes, ...newNodes];
    stateRef.current.lastSpawnY = baseY - 400;
  }, []);

  const initGame = useCallback(() => {
    if (!containerRef.current) return;
    const startX = containerRef.current.clientWidth / 2;
    
    stateRef.current.x = startX;
    stateRef.current.targetX = startX; 
    stateRef.current.y = containerRef.current.clientHeight * 0.8;
    stateRef.current.angle = -Math.PI / 2;
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

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const { x, y, trail, nodes, angle } = stateRef.current;
    const offsetY = -y + canvas.height * 0.7;

    // 星空背景
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for(let i=0; i<30; i++) {
       const sx = (Math.abs(Math.sin(i * 1234.56)) * canvas.width);
       const sy = ((Math.abs(Math.cos(i * 5678.90)) * canvas.height * 10 + offsetY) % canvas.height);
       ctx.fillRect(sx, sy, 2, 2);
    }

    // 绘制光球节点
    nodes.forEach(node => {
      if (node.hit) return;
      const ny = node.y + offsetY;
      if (ny < -200 || ny > canvas.height + 200) return;

      const grad = ctx.createRadialGradient(node.x, ny, 5, node.x, ny, 40);
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

    // 绘制发光尾迹
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

    // 绘制箭头
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

    const { x, y, speed, targetX, nodes, trail } = stateRef.current;
    
    // 【物理追踪核心】：X轴丝滑追随手指，Y轴匀速向前
    const newX = x + (targetX - x) * 0.35; 
    const newY = y - speed;

    // 动态计算车头偏转角度（Math.atan2 根据X和Y的变化量自动计算出夹角）
    const dx = newX - x;
    const dy = newY - y;
    stateRef.current.angle = Math.atan2(dy, dx);

    trail.push({ x: newX, y: newY, opacity: 1 });
    if (trail.length > 150) trail.shift();
    trail.forEach(t => t.opacity *= 0.98);

    // 碰撞检测逻辑保持不变
    nodes.forEach(node => {
      if (node.hit) return;
      const distX = newX - node.x;
      const distY = newY - node.y;
      if (Math.sqrt(distX*distX + distY*distY) < 40) {
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

  // 监听画布尺寸变化，根据手机外壳尺寸动态调整
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = containerRef.current.clientHeight;
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

  // 【手机端滑动操控核心】：支持鼠标拖拽和手指滑动
  const handlePointer = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (gameState !== 'PLAYING') return;
    if (!containerRef.current) return;
    
    // 计算点击位置相对于容器左边缘的距离
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    
    // 防止滑出界外
    const clampedX = Math.max(20, Math.min(rect.width - 20, clickX));
    stateRef.current.targetX = clampedX;
  }, [gameState]);

  return (
    // 外层黑色大背景
    <div className="flex items-center justify-center min-h-screen bg-black w-full">
      
      {/* 【手机屏幕模拟器】：限制宽度、圆角、触摸防刷新 */}
      <div 
        ref={containerRef}
        className="relative w-full sm:w-[390px] h-[100dvh] sm:h-[844px] overflow-hidden bg-[#05060f] sm:rounded-[40px] sm:border-[8px] border-gray-900 shadow-2xl select-none touch-none cursor-crosshair"
        style={{ transform: 'translateZ(0)' }} // 关键CSS：锁死内部 fixed 组件不会溢出手机屏幕
        onPointerDown={handlePointer}
        onPointerMove={(e) => { 
          // 当手指滑动，或者鼠标按住拖动时，持续追踪
          if (e.buttons > 0 || e.pointerType === 'touch') {
            handlePointer(e);
          }
        }}
      >
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
                  className="absolute inset-x-0 bottom-32 flex items-center justify-center pointer-events-none px-4"
                >
                  <div className="text-center space-y-3 w-full p-6 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl">
                     <div className="text-[10px] uppercase tracking-[0.4em] text-blue-400 font-bold mb-1">{currentChapter.age}</div>
                     <h3 className="text-2xl font-black text-white font-display leading-tight">{currentChapter.title}</h3>
                     <div className="w-8 h-1 bg-blue-500 mx-auto rounded-full my-2" />
                     <p className="text-white/80 italic text-sm leading-relaxed font-light">{currentChapter.description}</p>
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
            className="absolute font-black text-2xl text-blue-200 pointer-events-none drop-shadow-[0_0_15px_rgba(147,197,253,0.8)] z-30 font-display"
            style={{ 
              left: pop.x - 40, 
              top: pop.worldY - stateRef.current.y + (containerRef.current?.clientHeight || window.innerHeight) * 0.7 - 40
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
          className="absolute inset-0 border-[4px] border-white/5 pointer-events-none z-10"
        />
      )}
    </AnimatePresence>
  );
};