/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Trophy, RotateCcw, Heart, Lightbulb, Mountain, Quote } from 'lucide-react';
import { LegendChapter } from '../../types/legend';

interface LegendEndingProps {
  legend: LegendChapter;
  stats: {
    courage: number;
    wisdom: number;
    persistence: number;
  };
  onRestart: () => void;
}

export const LegendEnding: React.FC<LegendEndingProps> = ({
  legend,
  stats,
  onRestart,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/95 p-3 backdrop-blur-xl md:items-center md:p-6"
    >
      <motion.div
        initial={{ scale: 0.94, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/20 shadow-2xl"
      >
        <div className="absolute inset-0 z-0">
          <img src={legend.backgroundImage} alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 max-h-[calc(100dvh-1.5rem)] overflow-y-auto px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-6 md:px-8 md:pb-8">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="mb-6 space-y-2 text-center"
          >
            <Trophy className="mx-auto h-12 w-12 text-yellow-400" />
            <h2 className="font-display text-2xl font-black text-white">
              {legend.ending.title}
            </h2>
            <p className="text-sm text-white/70">{legend.name} 支线完成</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 text-center text-[15px] leading-7 text-white/80"
          >
            {legend.ending.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 grid grid-cols-3 gap-2.5"
          >
            <div className="flex flex-col items-center rounded-2xl bg-white/8 px-2 py-3">
              <Heart className="mb-1 h-5 w-5 text-red-400" />
              <span className="text-xs text-white/50">勇气</span>
              <span className="text-lg font-bold text-white">{stats.courage}</span>
            </div>
            <div className="flex flex-col items-center rounded-2xl bg-white/8 px-2 py-3">
              <Lightbulb className="mb-1 h-5 w-5 text-yellow-400" />
              <span className="text-xs text-white/50">智慧</span>
              <span className="text-lg font-bold text-white">{stats.wisdom}</span>
            </div>
            <div className="flex flex-col items-center rounded-2xl bg-white/8 px-2 py-3">
              <Mountain className="mb-1 h-5 w-5 text-blue-400" />
              <span className="text-xs text-white/50">坚持</span>
              <span className="text-lg font-bold text-white">{stats.persistence}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-6 space-y-3"
          >
            {legend.ending.quotes.map((quote, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-start gap-2 text-sm leading-6 text-white/72"
              >
                <Quote className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" />
                <span className="italic">{quote}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRestart}
            className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 font-bold text-blue-900 shadow-lg"
          >
            <RotateCcw className="h-5 w-5" />
            <span>返回选择</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
