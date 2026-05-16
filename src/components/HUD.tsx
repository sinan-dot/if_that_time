/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface HUDProps {
  repair: number;
  combo: number;
  miss: number;
  currentChapterTitle: string;
}

export const HUD: React.FC<HUDProps> = ({ repair, combo, miss, currentChapterTitle }) => {
  return (
    <div className="fixed inset-x-0 top-0 z-40 p-6 flex justify-between items-start pointer-events-none">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              className="h-full bg-blue-400 shadow-[0_0_8px_#60a5fa]"
              initial={{ width: 0 }}
              animate={{ width: `${repair}%` }}
              transition={{ type: 'spring', damping: 20 }}
            />
          </div>
          <span className="text-xs font-black text-blue-300 uppercase tracking-tighter">
            修复率 {repair}%
          </span>
        </div>
        <div className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Soul Repair Integrity</div>
      </div>

      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center space-y-1">
        <h2 className="text-2xl font-black tracking-[0.3em] text-white font-display uppercase">
          {currentChapterTitle}
        </h2>
        <div className="w-12 h-[1px] bg-white/20 mx-auto" />
      </div>

      <div className="flex gap-8 text-right">
        <div className="space-y-0">
          <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest leading-none">Combo</div>
          <motion.div 
            key={combo}
            initial={{ scale: 1.5, color: '#fff' }}
            animate={{ scale: 1, color: '#93c5fd' }}
            className="text-3xl font-black italic leading-none"
          >
            {combo}
          </motion.div>
        </div>
        <div className="space-y-0">
          <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest leading-none">Misses</div>
          <div className="text-3xl font-black text-pink-500/80 leading-none">
            {miss}
          </div>
        </div>
      </div>
    </div>
  );
};
