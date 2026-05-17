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
  const totalScore = stats.courage + stats.wisdom + stats.persistence;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-black/95 backdrop-blur-xl"
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-md space-y-6"
      >
        {/* 背景图 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={legend.backgroundImage}
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* 内容 */}
        <div className="relative z-10 p-8 rounded-3xl bg-gradient-to-b from-white/10 to-white/5 border border-white/20">
          {/* 结局标题 */}
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-center space-y-2 mb-6"
          >
            <Trophy className="w-12 h-12 text-yellow-400 mx-auto" />
            <h2 className="text-2xl font-black text-white font-display">
              {legend.ending.title}
            </h2>
            <p className="text-sm text-white/70">{legend.name} 支线完成</p>
          </motion.div>

          {/* 结局总结 */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-center leading-relaxed mb-6"
          >
            {legend.ending.summary}
          </motion.p>

          {/* 属性统计 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-3 mb-6"
          >
            <div className="flex flex-col items-center p-3 rounded-xl bg-white/5">
              <Heart className="w-5 h-5 text-red-400 mb-1" />
              <span className="text-xs text-white/50">勇气</span>
              <span className="text-lg font-bold text-white">{stats.courage}</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-xl bg-white/5">
              <Lightbulb className="w-5 h-5 text-yellow-400 mb-1" />
              <span className="text-xs text-white/50">智慧</span>
              <span className="text-lg font-bold text-white">{stats.wisdom}</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-xl bg-white/5">
              <Mountain className="w-5 h-5 text-blue-400 mb-1" />
              <span className="text-xs text-white/50">坚持</span>
              <span className="text-lg font-bold text-white">{stats.persistence}</span>
            </div>
          </motion.div>

          {/* 人生启示 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-2 mb-6"
          >
            {legend.ending.quotes.map((quote, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-start gap-2 text-sm text-white/70"
              >
                <Quote className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="italic">{quote}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* 重新开始按钮 */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRestart}
            className="w-full py-4 flex items-center justify-center gap-2 font-bold text-blue-900 bg-white rounded-2xl shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            <span>返回选择</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};