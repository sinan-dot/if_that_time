/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { LegendItem } from '../../types/legend';

interface LegendChoiceModalProps {
  item: LegendItem;
  onChoose: (choiceId: string) => void;
}

export const LegendChoiceModal: React.FC<LegendChoiceModalProps> = ({
  item,
  onChoose,
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
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-500/20 px-4 py-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-yellow-400">
                关键抉择
              </span>
            </div>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-6 text-center font-display text-xl font-black text-white md:text-2xl"
          >
            {item.name}
          </motion.h3>

          <div className="space-y-3">
            {item.story.choices.map((choice, index) => (
              <motion.button
                key={choice.id}
                initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onChoose(choice.id)}
                className={`w-full rounded-2xl border-2 px-4 py-4 text-left transition-all ${
                  index === 0
                    ? 'border-blue-400/40 bg-blue-500/25 text-blue-100 hover:bg-blue-500/35'
                    : 'border-pink-400/40 bg-pink-500/25 text-pink-100 hover:bg-pink-500/35'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-sm font-black ${
                      index === 0 ? 'bg-blue-500 text-white' : 'bg-pink-500 text-white'
                    }`}
                  >
                    {index === 0 ? 'A' : 'B'}
                  </span>
                  <div className="flex-1 whitespace-pre-line text-sm leading-6 md:text-[15px]">
                    {choice.text}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center text-xs text-white/40"
          >
            你的选择将影响命运的走向
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};
