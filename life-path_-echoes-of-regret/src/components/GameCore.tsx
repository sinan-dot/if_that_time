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
  const [currentChapterId, setCurrentChapterId] = useState("event_001");

  // 核心！初始化四大属性，基础分为 50
  const [stats, setStats] = useState({ car: 50, fam: 50, hea: 50, hap: 50 });

  const [showChapterText, setShowChapterText] = useState(false);
  
  // 新增：用于获取手机屏幕外壳的尺寸
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(undefined);
  const lastBeatRef = useRef<number>(0);
  // 【新增这一行】：创建一个音频播放器的引用
  const audioRef = useRef<HTMLAudioElement>(null);

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
    const newNodes: NodeData[] = [];

    if (chapter.isSingle) {
      // 单线催泪点：只在屏幕正中间生成一个球
      newNodes.push({
        id: `good-${chapterId}-${Date.now()}`,
        type: 'good',
        text: chapter.choices.good.text,
        x: width / 2, 
        y: baseY,
        hit: false,
        passed: false 
      });
    } else {
      // 正常的二选一：分别放在左右两边
      const margin = width * 0.25;
      const isGoodLeft = Math.random() > 0.5;
      
      newNodes.push({
        id: `good-${chapterId}-${Date.now()}`,
        type: 'good',
        text: chapter.choices.good.text,
        x: isGoodLeft ? margin : width - margin,
        y: baseY,
        hit: false,
        passed: false
      });
      
      // 【重点防报错】：这里必须加 if 判断！如果有 bad 选项才生成第二个球！
      if (chapter.choices.bad) {
        newNodes.push({
          id: `bad-${chapterId}-${Date.now()}`,
          type: 'bad',
          text: chapter.choices.bad.text,
          x: isGoodLeft ? width - margin : margin,
          y: baseY,
          hit: false,
          passed: false
        });
      }
    }

    stateRef.current.nodes = [...stateRef.current.nodes, ...newNodes];
    stateRef.current.lastSpawnY = baseY - 800;
  }, []);

  // const initGame = useCallback(() => {
  //   if (!containerRef.current) return;
  //   const startX = containerRef.current.clientWidth / 2;
    
  //   stateRef.current.x = startX;
  //   stateRef.current.targetX = startX; 
  //   stateRef.current.y = containerRef.current.clientHeight * 0.8;
  //   stateRef.current.angle = -Math.PI / 2;
  //   stateRef.current.trail = [];
  //   stateRef.current.speed = GAME_CONSTANTS.SPEED;
  //   stateRef.current.nodes = [];
  //   stateRef.current.lastSpawnY = 0;

  //   setCurrentChapterId("event_001");
  //   spawnNextNodes("childhood_start", stateRef.current.y);

  //   setRepair(0);
  //   setCombo(0);
  //   setMiss(0);
  //   setShowChapterText(true);
  //   setTimeout(() => setShowChapterText(false), 3000);
  //   lastBeatRef.current = performance.now();
  // }, [spawnNextNodes]);

  const initGame = useCallback(() => {
    if (!containerRef.current) return;
    const startX = containerRef.current.clientWidth / 2;
    const startY = containerRef.current.clientHeight * 0.8;

    // 1. 重置所有的物理引擎状态
    stateRef.current.x = startX;
    stateRef.current.targetX = startX;
    stateRef.current.y = startY;
    stateRef.current.angle = -Math.PI / 2;
    stateRef.current.trail = [];
    stateRef.current.speed = GAME_CONSTANTS.SPEED;
    stateRef.current.nodes = []; // 清空上一局残留的光球
    stateRef.current.lastSpawnY = startY;

    // 2. 重置所有的UI分数和状态
    setRepair(0);
    setCombo(0);
    setMiss(0);
    setPops([]);
    setCurrentChapterId("event_001"); // 切回第一关
    setShowChapterText(true);

    setStats({ car: 50, fam: 50, hea: 50, hap: 50 }); // 【新增这一行】

    // 【最关键的一步】：强制呼叫刷球函数，把第一关的选项刷出来！
    spawnNextNodes("event_001", startY);

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
    
    // 物理追踪
    const newX = x + (targetX - x) * 0.35; 
    const newY = y - speed;

    const dx = newX - x;
    const dy = newY - y;
    stateRef.current.angle = Math.atan2(dy, dx);

    trail.push({ x: newX, y: newY, opacity: 1 });
    if (trail.length > 150) trail.shift();
    trail.forEach(t => t.opacity *= 0.98);

    // ================= 核心碰撞与线性推进逻辑 =================
    // ====== 把原本 update 里面的 nodes.forEach 替换成下面这套 ====== 
    let triggeredNext = false; // 新增一个裁判：这一帧是否触发了下一关？

    nodes.forEach(node => {
      if (node.hit || node.passed) return;

      const distX = newX - node.x;
      const distY = newY - node.y;

      // 【情况1：碰撞】
      if (Math.sqrt(distX*distX + distY*distY) < 35) {
        node.hit = true;
        triggeredNext = true; // 裁判吹哨：需要进入下一关！
        showPop("命运的抉择", node.x, node.y);
        
        // 【新增算分逻辑】：根据撞击的选项，实时加减四大属性！
        const chapter = CHAPTERS.find(c => c.id === currentChapterId);
        if (chapter) {
          const choice = node.type === 'good' ? chapter.choices.good : chapter.choices.bad;
          if (choice?.impact) {
            setStats(prev => ({
              car: prev.car + choice.impact.car,
              fam: prev.fam + choice.impact.fam,
              hea: prev.hea + choice.impact.hea,
              hap: prev.hap + choice.impact.hap,
            }));
          }
        }
      }
      
      // 【情况2：错过防卡死】
      else if (newY < node.y - 100) {
        node.passed = true;
        // 只有 good 节点负责触发错过逻辑，防止同一排的 bad 也触发
        if (node.type === 'good') {
          triggeredNext = true; // 裁判吹哨：错过了，也要强推下一关！
          showPop("随波逐流", newX, newY);
        }
      }
    });

    // 【核心修复】：如果裁判吹哨了，统一在这里处理推关逻辑
    if (triggeredNext) {
      // 重点：立刻把屏幕上所有还没撞到的老球，统统标记为“已废弃(passed)”！
      // 这样它们滑出屏幕时，就不会再引发连环触发了！
      stateRef.current.nodes.forEach(n => n.passed = true);

      const currentIndex = CHAPTERS.findIndex(c => c.id === currentChapterId);
      const nextChapter = CHAPTERS[currentIndex + 1];
      
      if (nextChapter) {
        setCurrentChapterId(nextChapter.id);
        spawnNextNodes(nextChapter.id, newY);
        setShowChapterText(true);
        setTimeout(() => setShowChapterText(false), 3000);
      } else {
        setGameState('ENDING');
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        return;
      }
    }
    // =========================================================

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

  // 【新增这几行】：当玩家点击开始按钮时，播放音乐
  if (audioRef.current) {
    audioRef.current.volume = 0.5; // 设置音量为 50%，防止音乐太大盖过后面的音效或显得刺耳
    audioRef.current.play().catch(e => console.log("音乐播放失败:", e));
  }
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

        {/* 【新增这一行】：隐形的音频播放器，指向 public 里的 bgm.mp3，loop 表示无限循环 */}
        <audio ref={audioRef} src="/bgm.mp3" loop preload="auto" />

        <canvas ref={canvasRef} className="absolute inset-0  z-10" />


    {/* ============ 新增的背景图代码开始 ============ */}
    <AnimatePresence>
          {currentChapter && currentChapter.bgImage ? (
            <motion.img
              key={currentChapter.id}
              src={currentChapter.bgImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }} 
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }} 
              className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
            />
          ) : null}
        </AnimatePresence>
        {/* ============ 新增的背景图代码结束 ============ */}


        <AnimatePresence>
          {gameState === 'START' && <StartScreen onStart={onStart} />}
          {gameState === 'PLAYING' && (
            <>
        <HUD 
  currentStep={CHAPTERS.findIndex(c => c.id === currentChapterId) + 1} 
  totalSteps={CHAPTERS.length} 
  age={currentChapter?.age || 'CHILDHOOD'} 
/>      <HUD repair={repair} combo={combo} miss={miss} currentChapterTitle={currentChapter?.title || "末章"} />
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
        {gameState === 'ENDING' && (
  <ResultScreen 
    stats={stats} 
    onRestart={() => {
      initGame();
      setGameState('START');
      window.location.reload(); // 强制刷新，最干净利落的重开方式
    }} 
  />
)}
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