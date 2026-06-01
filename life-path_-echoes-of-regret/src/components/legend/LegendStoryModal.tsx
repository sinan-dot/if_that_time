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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ type: 'spring', damping: 25 }}
        className="w-full max-w-md p-6 rounded-3xl bg-gradient-to-b from-white/15 to-white/5 border border-white/20 shadow-2xl"
      >
        {/* 物品标识 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30">
            <span className="text-xs uppercase tracking-widest text-blue-400 font-bold">
              {item.name}
            </span>
          </div>
        </motion.div>

        {/* 剧情标题 */}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xl font-black text-white font-display text-center mb-4"
        >
          {item.story.title}
        </motion.h3>

        {/* 剧情叙述 - 第一人称沉浸式 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white/85 text-center leading-relaxed mb-6 whitespace-pre-line font-light"
        >
          {item.story.narrative}
        </motion.div>

        {/* 继续按钮 */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="w-full py-4 flex items-center justify-center gap-2 font-bold text-blue-900 bg-white rounded-2xl shadow-lg hover:bg-blue-50 transition-colors"
        >
          <span>做出选择</span>
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};