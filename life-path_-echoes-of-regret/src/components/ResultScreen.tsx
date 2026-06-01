<<<<<<< HEAD
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, RotateCcw, Heart, Share2, Unlock } from 'lucide-react';
import { RouteType } from '../types';
import { markOrdinaryCompleted, isLegendUnlocked } from '../utils/storage';

interface ResultScreenProps {
  repair: number;
  miss: number;
  route: RouteType;
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ repair, miss, route, onRestart }) => {
  const isGoodEnd = repair >= 75;
  const isNormalEnd = repair >= 40 && repair < 75;
=======
import React, { useEffect, useState } from 'react';

interface ResultScreenProps {
  stats: { car: number; fam: number; hea: number; hap: number };
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ stats, onRestart }) => {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // 安全计算总分
  const total = (stats?.car || 0) + (stats?.fam || 0) + (stats?.hea || 0) + (stats?.hap || 0);

  let summaryTitle = "";
  let summaryText = "";
  let glowColor = "";

  // 去掉了字中间的空格，防止被挤换行
  if (total >= 210) {
    summaryTitle = "璀璨人生"; 
    summaryText = "你走过了一段极尽绚烂的旅程。有些遗憾，但更多的是无悔。你的名字，成为了别人仰望的星空。";
    glowColor = "shadow-[0_0_40px_rgba(59,130,246,0.25)] border-blue-500/20"; 
  } else if (total >= 180) {
    summaryTitle = "平凡可贵";
    summaryText = "没有惊天动地，但也避开了大风大浪。你守护住了属于自己的小确幸，这已经是最大的成功。";
    glowColor = "shadow-[0_0_40px_rgba(16,185,129,0.2)] border-emerald-500/20"; 
  } else if (total >= 160) {
    summaryTitle = "跌宕起伏";
    summaryText = "命运对你并不温柔，你吃过苦，流过泪。但那些杀不死你的，最终让你拥有了最厚重的灵魂。";
    glowColor = "shadow-[0_0_40px_rgba(245,158,11,0.2)] border-amber-500/20"; 
  } else {
    summaryTitle = "意难平";
    summaryText = "如果能重来一次，一定要对自己好一点。这辈子太辛苦了，下辈子，记得多看看沿途的风景。";
    glowColor = "shadow-[0_0_40px_rgba(156,163,175,0.2)] border-gray-500/20"; 
  }

  const StatRow = ({ label, value, color }: { label: string, value: number, color: string }) => (
    <div className="mb-5 relative z-10">
      <div className="flex justify-between text-sm mb-2 px-1 tracking-widest">
        <span className="text-white/80 font-light">{label}</span>
        <span className={`font-bold ${color} drop-shadow-md`}>{value}</span>
      </div>
      <div className="h-2 w-full bg-black/60 rounded-full overflow-hidden border border-white/5 shadow-inner">
        <div 
          className={`h-full ${color.replace('text-', 'bg-')} transition-all duration-[2000ms] cubic-bezier(0.4, 0, 0.2, 1)`}
          style={{ 
            width: show ? `${Math.min(100, value)}%` : '0%',
            boxShadow: show ? '0 0 10px currentColor' : 'none'
          }}
        />
      </div>
    </div>
  );
>>>>>>> b7172eca649c623ad8096165b327d6f59cffe4d3

  // 主线通关时标记通关状态
  React.useEffect(() => {
    if (route === 'ordinary' && isGoodEnd) {
      markOrdinaryCompleted();
    }
  }, [route, isGoodEnd]);

  const legendUnlocked = isLegendUnlocked();
  const showUnlockMessage = route === 'ordinary' && isGoodEnd && !legendUnlocked;

  return (
<<<<<<< HEAD
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-8 text-center bg-black/80 backdrop-blur-xl">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md w-full p-8 rounded-3xl bg-white/5 border border-white/10 space-y-8"
      >
        <div className="space-y-2">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-5xl font-black font-display text-blue-300"
          >
            {isGoodEnd ? "那条路，亮了 🌤️" : isNormalEnd ? "未完的诗 📄" : "遗憾依旧 🌧️"}
          </motion.div>
          <p className="text-blue-200/60">
            {isGoodEnd
              ? "你没有抹掉过去，只是终于替当时的自己，走出了另一种可能。"
              : isNormalEnd
                ? "生活中总有妥协，虽然不完美，但你已经尽力去修补了。"
                : "有些路不是一次就能走通。再来一次，也许你会在转折点抓住它。"}
=======
    <div className={`absolute inset-0 z-[100] flex items-center justify-center bg-[#05060f] transition-opacity duration-1000 ${show ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* 极简深邃的星空渐变背景 & 呼吸光晕 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/40 via-[#05060f] to-[#05060f]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: '5s' }} />

      <div className="w-full max-w-[340px] px-6 text-center relative z-10 flex flex-col items-center">
        
        {/* 顶部标题区：改为现代无衬线字体，单行强制显示 */}
        <div className="mb-8 flex flex-col items-center w-full">
          <span className="text-white/40 text-[10px] tracking-[0.8em] uppercase mb-4 pl-2">最终结局</span>
          <h2 className="text-4xl md:text-5xl font-sans font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/40 tracking-[0.25em] pl-3 whitespace-nowrap drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
            {summaryTitle}
          </h2>
          {/* 添加一根极简的点缀横线提升设计感 */}
          <div className="w-10 h-[2px] bg-white/20 rounded-full mt-6" />
        </div>

        {/* 核心面板：更大的圆角，更通透的毛玻璃 */}
        <div className={`w-full bg-white/[0.02] backdrop-blur-3xl border rounded-[2rem] p-8 mb-10 relative ${glowColor}`}>
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-[2rem] pointer-events-none" />
          <StatRow label="事业与财富" value={stats.car} color="text-blue-400" />
          <StatRow label="家庭与羁绊" value={stats.fam} color="text-pink-400" />
          <StatRow label="健康与体魄" value={stats.hea} color="text-emerald-400" />
          <StatRow label="内心幸福感" value={stats.hap} color="text-amber-400" />
        </div>

        {/* 底部文案区：增加留白 */}
        <div className="mb-10 px-4 relative w-full">
          <p className="text-white/60 text-sm leading-loose tracking-widest font-light">
            {summaryText}
>>>>>>> b7172eca649c623ad8096165b327d6f59cffe4d3
          </p>

          {showUnlockMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 text-yellow-400 text-sm bg-yellow-500/10 px-4 py-2 rounded-full"
            >
              <Unlock className="w-4 h-4" />
              <span className="font-bold">恭喜解锁「传奇人生」支线！</span>
            </motion.div>
          )}
        </div>

        {/* 交互按钮：去掉死白底色，改为半透明磨砂质感悬浮框 */}
        <button
          onClick={onRestart}
          className="group relative w-full py-4 rounded-full overflow-hidden border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.05)] bg-white/5 backdrop-blur-md"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative z-10 text-white font-bold tracking-[0.3em] text-sm pl-1 drop-shadow-md">
            重溯时光
          </span>
        </button>

      </div>
    </div>
  );
};