/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LegendItem } from '../../types/legend';
import { Lock, CheckCircle2 } from 'lucide-react';

interface LegendHotzoneProps {
  item: LegendItem;
  index: number;
  isCompleted: boolean;
  isLocked: boolean;
  onClick: () => void;
}

export const LegendHotzone: React.FC<LegendHotzoneProps> = ({
  item,
  index,
  isCompleted,
  isLocked,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isLocked ? 0.3 : 1, scale: 1 }}
      transition={{ delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      disabled={isLocked}
      className="absolute group"
      style={{
        left: `${item.hotzone.x}%`,
        top: `${item.hotzone.y}%`,
        width: `${item.hotzone.width}%`,
        height: `${item.hotzone.height}%`,
      }}
    >
      {/* 透明热区 */}
      <div
        className={`absolute inset-0 rounded-lg transition-all ${
          isLocked
            ? 'bg-gray-500/20'
            : isCompleted
              ? 'bg-transparent'
              : isHovered
                ? 'bg-blue-500/20 border-2 border-blue-400/50'
                : 'bg-transparent border-2 border-transparent hover:border-blue-400/30'
        }`}
      />

      {/* 发光效果 - 未完成时悬浮显示 */}
      {!isCompleted && !isLocked && isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 rounded-lg"
          style={{
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.5), inset 0 0 20px rgba(59, 130, 246, 0.2)',
          }}
        />
      )}

      {/* 物品名称标签 */}
      <AnimatePresence>
        {!isLocked && isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-10"
          >
            <span className="px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded-lg text-xs text-white font-bold shadow-lg">
              {item.name}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 完成标记 */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <CheckCircle2 className="w-8 h-8 text-green-400 drop-shadow-lg" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 锁定标记 */}
      <AnimatePresence>
        {isLocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <Lock className="w-6 h-6 text-gray-400" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 提示文字 */}
      {!isCompleted && !isLocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full whitespace-nowrap"
        >
          <span className="text-xs text-blue-300/70">点击探索</span>
        </motion.div>
      )}
    </motion.button>
  );
};