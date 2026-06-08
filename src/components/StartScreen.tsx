/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Heart, Trophy, ArrowRight, Sparkles } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
  onLegendStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart, onLegendStart }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl space-y-8"
      >
        <h1 className="text-6xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-300 font-display">
          如果那时
        </h1>
      
        
        <div className="space-y-4 text-lg leading-relaxed text-blue-100/80">
          <p>
            人生是由无数个瞬间构成的。有些瞬间我们抓住了，有些却成了永远的遗憾。
          </p>
          <p>
            这一次，你控制的是一条正在流逝的人生轨迹。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2 text-blue-200/70 max-w-xl mx-auto">
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onStart}
            className="group relative overflow-hidden flex flex-col items-center gap-3 p-5 transition-all rounded-2xl bg-blue-500/20 shadow-[0_0_22px_rgba(59,130,246,0.22)] border border-blue-400/30 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <Heart className="relative w-7 h-7 text-blue-300" />
            <span className="relative text-lg font-black text-blue-50">平凡之路</span>
            <span className="relative text-xs leading-relaxed text-blue-100/65">体验大多数人的波折与宁静</span>
            <span className="relative mt-1 inline-flex items-center gap-1 text-xs font-bold text-blue-200">
              开始重走 <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onLegendStart}
            className="group relative overflow-hidden flex flex-col items-center gap-3 p-5 transition-all rounded-2xl bg-amber-500/18 shadow-[0_0_24px_rgba(245,158,11,0.22)] border border-amber-300/35 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-200/18 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <Trophy className="relative w-7 h-7 text-amber-300" />
            <span className="relative text-lg font-black text-amber-50">传奇人生</span>
            <span className="relative text-xs leading-relaxed text-amber-100/70">自由选择人物关卡，体验关键抉择</span>
            <span className="relative mt-1 inline-flex items-center gap-1 text-xs font-bold text-amber-200">
              选择关卡 <Sparkles className="w-3.5 h-3.5" />
            </span>
          </motion.button>
        </div>

        <p className="mt-8 text-xs opacity-40">
          建议佩戴耳机，聆听命运的回响
        </p>
      </motion.div>
    </div>
  );
};
