/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Rocket, Laptop, Heart, Home } from 'lucide-react';
import { LEGENDS } from '../../data/legends';

interface LegendSelectorProps {
  onSelect: (legendId: string) => void;
  onExit?: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  leijun: <Heart className="w-8 h-8 text-blue-400" />,
  musk: <Rocket className="w-8 h-8 text-purple-400" />,
  jobs: <Laptop className="w-8 h-8 text-green-400" />,
};

const colorMap: Record<string, { bg: string; border: string; shadow: string }> = {
  leijun: { bg: 'bg-blue-500/20', border: 'border-blue-400/30', shadow: 'shadow-[0_0_15px_rgba(59,130,246,0.2)]' },
  musk: { bg: 'bg-purple-500/20', border: 'border-purple-400/30', shadow: 'shadow-[0_0_15px_rgba(168,85,247,0.2)]' },
  jobs: { bg: 'bg-green-500/20', border: 'border-green-400/30', shadow: 'shadow-[0_0_15px_rgba(34,197,94,0.2)]' },
};

export const LegendSelector: React.FC<LegendSelectorProps> = ({ onSelect, onExit }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-8 bg-[#05060a]"
    >
      {/* 退出按钮 */}
      {onExit && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onExit}
          className="absolute top-4 left-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        >
          <Home className="w-5 h-5 text-white" />
        </motion.button>
      )}

      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="max-w-xl space-y-8 text-center"
      >
        <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-yellow-300 font-display">
          传奇人生
        </h2>

        <p className="text-lg text-white/60">
          选择一位伟人，体验他人生中最关键的抉择时刻
        </p>

        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3 max-w-lg mx-auto">
          {LEGENDS.map((legend, index) => (
            <motion.button
              key={legend.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(legend.id)}
              className={`flex flex-col items-center gap-3 p-5 rounded-2xl transition-all ${colorMap[legend.id].bg} ${colorMap[legend.id].border} ${colorMap[legend.id].shadow} border cursor-pointer`}
            >
              {iconMap[legend.id]}
              <span className="font-bold text-white">{legend.name}</span>
              <span className="text-xs text-white/50">{legend.title}</span>
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-white/40"
        >
          <Trophy className="w-5 h-5 mx-auto mb-2 text-yellow-400/50" />
          点击物品触发剧情，做出选择，改写命运
        </motion.div>
      </motion.div>
    </motion.div>
  );
};