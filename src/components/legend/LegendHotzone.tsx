/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LegendItem } from '../../types/legend';
import { Lock, CheckCircle2, MapPin } from 'lucide-react';

interface LegendHotzoneProps {
  item: LegendItem;
  index: number;
  isCompleted: boolean;
  isLocked: boolean;
  onClick: () => void;
  compact?: boolean;
  isFocused?: boolean;
}

export const LegendHotzone: React.FC<LegendHotzoneProps> = ({
  item,
  index,
  isCompleted,
  isLocked,
  onClick,
  compact = false,
  isFocused = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  if (compact) {
    const hotspotCenterX = item.hotzone.x + item.hotzone.width / 2;
    const hotspotCenterY = item.hotzone.y + item.hotzone.height / 2;

    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isLocked ? 0.45 : 1, scale: isFocused ? 1.05 : 1 }}
        transition={{ delay: index * 0.12 }}
        onClick={onClick}
        disabled={isLocked}
        className="absolute flex h-12 w-12 items-center justify-center"
        style={{
          left: `calc(${hotspotCenterX}% - 24px)`,
          top: `calc(${hotspotCenterY}% - 24px)`,
        }}
      >
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full border text-white shadow-lg backdrop-blur-sm transition-all ${
            isLocked
              ? 'border-white/15 bg-black/45 text-white/50'
              : isCompleted
                ? 'border-emerald-300/60 bg-emerald-500/28 text-emerald-50'
                : isFocused
                  ? 'border-cyan-200/70 bg-cyan-400/24 text-cyan-50'
                  : 'border-white/25 bg-black/38 text-white/82'
          }`}
          style={isFocused && !isLocked ? { boxShadow: '0 0 18px rgba(125, 211, 252, 0.35)' } : undefined}
        >
          {isLocked ? (
            <Lock className="h-4 w-4" />
          ) : isCompleted ? (
            <CheckCircle2 className="h-4.5 w-4.5" />
          ) : (
            <span className="text-[12px] font-black">{index + 1}</span>
          )}
        </div>
      </motion.button>
    );
  }

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
      <div
        className={`absolute inset-0 rounded-lg transition-all ${
          isLocked
            ? 'bg-gray-500/20'
            : isCompleted
              ? 'bg-transparent'
              : isHovered
                ? 'border-2 border-blue-400/50 bg-blue-500/20'
                : 'border-2 border-transparent bg-transparent hover:border-blue-400/30'
        }`}
      />

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

      <AnimatePresence>
        {!isLocked && isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-10 left-1/2 z-10 -translate-x-1/2 transform whitespace-nowrap"
          >
            <span className="rounded-lg bg-black/80 px-3 py-1.5 text-xs font-bold text-white shadow-lg backdrop-blur-sm">
              {item.name}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
          >
            <CheckCircle2 className="h-8 w-8 text-green-400 drop-shadow-lg" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
          >
            <Lock className="h-6 w-6 text-gray-400" />
          </motion.div>
        )}
      </AnimatePresence>

      {!isCompleted && !isLocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full transform whitespace-nowrap"
        >
          <span className="text-xs text-blue-300/70">点击探索</span>
        </motion.div>
      )}

      {!isCompleted && !isLocked && !isHovered && (
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-black/35 p-1.5 text-blue-100/80 backdrop-blur-sm">
          <MapPin className="h-4 w-4" />
        </div>
      )}
    </motion.button>
  );
}
