/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { LegendItem } from '../../types/legend';
import { ChevronRight } from 'lucide-react';

interface LegendStoryModalProps {
  item: LegendItem;
  onNext: () => void;
}

export const LegendStoryModal: React.FC<LegendStoryModalProps> = ({
  item,
  onNext,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/90 p-3 backdrop-blur-md md:items-center md:p-4"
    >
      <motion.div
        initial={{ scale: 0.96, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 30 }}
        transition={{ type: 'spring', damping: 25 }}
        className="flex max-h-[calc(100dvh-1.5rem)] w-full max-w-md flex-col overflow-hidden rounded-[28px] border border-white/20 bg-gradient-to-b from-white/15 to-white/5 shadow-2xl md:max-h-[85dvh]"
      >
        <div className="overflow-y-auto px-5 pb-5 pt-6 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/20 px-4 py-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                {item.name}
              </span>
            </div>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-4 text-center font-display text-xl font-black text-white md:text-2xl"
          >
            {item.story.title}
          </motion.h3>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="whitespace-pre-line text-center text-[15px] leading-7 text-white/85 md:text-base"
          >
            {item.story.narrative}
          </motion.div>
        </div>

        <div className="border-t border-white/10 px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-4 md:px-6 md:pb-5">
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 font-bold text-blue-900 shadow-lg transition-colors hover:bg-blue-50"
          >
            <span>做出选择</span>
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
