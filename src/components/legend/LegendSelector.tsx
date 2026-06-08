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
  leijun: <Heart className="h-8 w-8 text-blue-400" />,
  musk: <Rocket className="h-8 w-8 text-purple-400" />,
  jobs: <Laptop className="h-8 w-8 text-green-400" />,
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
      className="fixed inset-0 z-50 overflow-y-auto bg-[#05060a] px-4 pb-6 md:flex md:items-center md:justify-center md:p-8"
      style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
    >
      {onExit && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileTap={{ scale: 0.9 }}
          onClick={onExit}
          className="absolute left-4 rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20"
          style={{ top: 'max(1rem, env(safe-area-inset-top))' }}
        >
          <Home className="h-5 w-5 text-white" />
        </motion.button>
      )}

      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="mx-auto max-w-xl space-y-6 pt-10 text-center md:space-y-8 md:pt-0"
      >
        <h2 className="bg-gradient-to-b from-white to-yellow-300 bg-clip-text font-display text-3xl font-black text-transparent md:text-4xl">
          传奇人生
        </h2>

        <p className="mx-auto max-w-[18rem] text-sm leading-6 text-white/60 md:max-w-none md:text-lg">
          选择一位伟人，体验他人生中最关键的抉择时刻
        </p>

        <div className="mx-auto grid max-w-lg grid-cols-1 gap-3 text-sm md:grid-cols-3 md:gap-4">
          {LEGENDS.map((legend, index) => (
            <motion.button
              key={legend.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelect(legend.id)}
              className={`flex flex-col items-center gap-3 rounded-2xl border p-5 transition-all ${colorMap[legend.id].bg} ${colorMap[legend.id].border} ${colorMap[legend.id].shadow}`}
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
          className="pb-[calc(0.5rem+env(safe-area-inset-bottom))] text-center text-xs text-white/40"
        >
          <Trophy className="mx-auto mb-2 h-5 w-5 text-yellow-400/50" />
          点击物品触发剧情，做出选择，改写命运
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
