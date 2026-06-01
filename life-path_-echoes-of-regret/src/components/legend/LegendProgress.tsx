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
  onBack?: () => void;
}

export const LegendProgress: React.FC<LegendProgressProps> = ({
  total,
  completed,
  stats,
  onBack,
}) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="absolute top-16 left-4 right-4 flex items-center justify-between z-20"
    >
      {/* 左侧：进度 */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {Array.from({ length: total }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`w-3 h-3 rounded-full ${
                i < completed ? 'bg-green-400' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-white/60">
          {completed}/{total}
        </span>
      </div>

      {/* 右侧：属性统计 */}
      <div className="flex items-center gap-3">
        {/* 勇气 */}
        <div className="flex items-center gap-1">
          <Heart className="w-4 h-4 text-red-400" />
          <span className="text-xs text-white/80 font-bold">{stats.courage}</span>
        </div>

        {/* 智慧 */}
        <div className="flex items-center gap-1">
          <Lightbulb className="w-4 h-4 text-yellow-400" />
          <span className="text-xs text-white/80 font-bold">{stats.wisdom}</span>
        </div>

        {/* 坚持 */}
        <div className="flex items-center gap-1">
          <Mountain className="w-4 h-4 text-blue-400" />
          <span className="text-xs text-white/80 font-bold">{stats.persistence}</span>
        </div>
      </div>
    </motion.div>
  );
};