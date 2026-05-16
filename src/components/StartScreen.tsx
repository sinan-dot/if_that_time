/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PlayCircle, MousePointer2, Music2, Heart, Trophy } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl space-y-8"
      >
        <h1 className="text-6xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-300 font-display">
          如果那时候
        </h1>
        
        <div className="space-y-4 text-lg leading-relaxed text-blue-100/80">
          <p>
            人生是由无数个瞬间构成的。有些瞬间我们抓住了，有些却成了永远的遗憾。
          </p>
          <p>
            这一次，你控制的是一条正在流逝的人生轨迹。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2 text-blue-200/60 max-w-sm mx-auto">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center gap-2 p-4 transition-colors rounded-2xl bg-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)] border border-blue-400/30"
          >
            <Heart className="w-6 h-6 text-blue-400" />
            <span className="font-bold text-blue-100">平凡之路</span>
            <span className="text-[10px] opacity-60">体验大多数人的波折与宁静</span>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center gap-2 p-4 transition-colors rounded-2xl bg-white/5 opacity-50 grayscale cursor-not-allowed"
          >
            <Trophy className="w-6 h-6 text-yellow-400/50" />
            <span className="font-bold">传奇人生</span>
            <span className="text-[10px] opacity-60">即将解锁：感受名人的抉择时刻</span>
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="px-12 py-5 font-black text-blue-900 transition-all bg-white rounded-full shadow-[0_20px_50px_rgba(255,255,255,0.2)] hover:bg-blue-50 text-xl"
        >
          开始重走
        </motion.button>

        <p className="mt-8 text-xs opacity-40">
          建议佩戴耳机，聆听命运的回响
        </p>
      </motion.div>
    </div>
  );
};
