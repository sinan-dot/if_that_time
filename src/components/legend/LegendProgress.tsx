/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Heart, Lightbulb, Mountain } from 'lucide-react';

interface LegendProgressProps {
  total: number;
  completed: number;
  stats: {
    courage: number;
    wisdom: number;
    persistence: number;
  };
  compact?: boolean;
}

export const LegendProgress: React.FC<LegendProgressProps> = ({
  total,
  completed,
  stats,
  compact = false,
}) => {
  if (compact) {
    return (
      <motion.div
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="rounded-2xl border border-white/10 bg-black/35 px-3 py-3 shadow-xl backdrop-blur-md"
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {Array.from({ length: total }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.06 }}
                  className={`h-2.5 w-2.5 rounded-full ${
                    index < completed ? 'bg-emerald-400' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-medium text-white/60">
              {completed}/{total}
            </span>
          </div>
          <span className="text-[11px] uppercase tracking-[0.28em] text-white/35">
            传奇进度
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="flex items-center justify-center gap-1.5 rounded-xl bg-white/6 px-2 py-2">
            <Heart className="h-3.5 w-3.5 text-red-400" />
            <span className="text-[11px] font-bold text-white/85">{stats.courage}</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 rounded-xl bg-white/6 px-2 py-2">
            <Lightbulb className="h-3.5 w-3.5 text-yellow-400" />
            <span className="text-[11px] font-bold text-white/85">{stats.wisdom}</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 rounded-xl bg-white/6 px-2 py-2">
            <Mountain className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-[11px] font-bold text-white/85">{stats.persistence}</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="absolute left-4 right-4 top-16 z-20 flex items-center justify-between"
    >
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {Array.from({ length: total }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`h-3 w-3 rounded-full ${
                index < completed ? 'bg-green-400' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-white/60">
          {completed}/{total}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Heart className="h-4 w-4 text-red-400" />
          <span className="text-xs font-bold text-white/80">{stats.courage}</span>
        </div>
        <div className="flex items-center gap-1">
          <Lightbulb className="h-4 w-4 text-yellow-400" />
          <span className="text-xs font-bold text-white/80">{stats.wisdom}</span>
        </div>
        <div className="flex items-center gap-1">
          <Mountain className="h-4 w-4 text-blue-400" />
          <span className="text-xs font-bold text-white/80">{stats.persistence}</span>
        </div>
      </div>
    </motion.div>
  );
};
