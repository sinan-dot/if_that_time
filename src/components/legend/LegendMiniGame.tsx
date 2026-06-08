/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MiniGameConfig } from '../../types/legend';
import { CheckCircle2, RefreshCw, Sparkles } from 'lucide-react';

interface LegendMiniGameProps {
  config: MiniGameConfig;
  onComplete: (success: boolean) => void;
  onSkip?: () => void;
}

export const LegendMiniGame: React.FC<LegendMiniGameProps> = ({
  config,
  onComplete,
  onSkip,
}) => {
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'success'>('ready');

  const startGame = () => {
    setGameState('playing');
  };

  const handleSuccess = () => {
    setGameState('success');
    setTimeout(() => onComplete(true), 1500);
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    } else {
      onComplete(true);
    }
  };

  // Claymorphism colors - pastel palette
  const clayColors = {
    peach: '#FDBCB4',
    blue: '#ADD8E6',
    mint: '#98FF98',
    lilac: '#E6E6FA',
    coral: '#FF7F7F',
    sunshine: '#FFE4B5',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto p-3 md:items-center md:p-4"
      style={{
        background: 'linear-gradient(135deg, #FFF5E6 0%, #E6F3FF 50%, #F5FFE6 100%)',
      }}
    >
      {/* Decorative floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-10 left-10 w-16 h-16 rounded-full"
          style={{ background: clayColors.peach, opacity: 0.6 }}
        />
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-20 right-20 w-12 h-12 rounded-full"
          style={{ background: clayColors.mint, opacity: 0.6 }}
        />
        <motion.div
          animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-20 h-20 rounded-full"
          style={{ background: clayColors.lilac, opacity: 0.5 }}
        />
      </div>

      <motion.div
        initial={{ scale: 0.8, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', bounce: 0.4 }}
        className="relative w-full max-w-md max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-[28px] p-4 md:max-h-[88dvh] md:p-8"
        style={{
          background: 'linear-gradient(145deg, #FFFFFF 0%, #FFF5F5 100%)',
          border: '4px solid rgba(255, 182, 193, 0.8)',
          boxShadow: `
            inset -4px -4px 12px rgba(255, 200, 200, 0.4),
            inset 4px 4px 12px rgba(255, 255, 255, 0.8),
            8px 8px 24px rgba(200, 150, 150, 0.3),
            -4px -4px 16px rgba(255, 255, 255, 0.5)
          `,
        }}
      >
        {/* 小游戏标题 */}
        <div className="mb-5 text-center md:mb-6">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl"
            style={{
              background: clayColors.mint,
              border: '3px solid rgba(150, 255, 150, 0.6)',
              boxShadow: 'inset -2px -2px 6px rgba(100, 200, 100, 0.3), 4px 4px 12px rgba(150, 255, 150, 0.3)',
            }}
          >
            <Sparkles className="w-4 h-4 text-green-700" />
            <span className="text-sm uppercase tracking-widest font-bold text-green-800">
              小游戏挑战
            </span>
          </motion.div>
          <h3
            className="text-2xl font-black mt-4"
            style={{ color: '#5D4E6D' }}
          >
            {config.title}
          </h3>
          <p
            className="text-base mt-2 font-medium"
            style={{ color: '#8B7D9B' }}
          >
            {config.instruction}
          </p>
        </div>

        {/* 游戏区域 */}
        <AnimatePresence mode="wait">
          {gameState === 'ready' && (
            <motion.div
              key="ready"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8 space-y-5"
            >
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={startGame}
                className="px-10 py-5 font-bold text-white rounded-2xl min-h-[56px]"
                style={{
                  background: `linear-gradient(145deg, ${clayColors.coral}, #FF6B6B)`,
                  border: '4px solid rgba(255, 150, 150, 0.6)',
                  boxShadow: `
                    inset -3px -3px 8px rgba(200, 100, 100, 0.3),
                    inset 3px 3px 8px rgba(255, 150, 150, 0.5),
                    6px 6px 16px rgba(200, 100, 100, 0.4)
                  `,
                  fontSize: '18px',
                }}
              >
                开始挑战
              </motion.button>

              {onSkip && (
                <button
                  onClick={handleSkip}
                  className="text-sm font-medium py-2 min-h-[44px]"
                  style={{ color: '#9B8DAB' }}
                >
                  跳过小游戏
                </button>
              )}
            </motion.div>
          )}

          {gameState === 'playing' && (
            config.type === 'puzzle' ? (
              <PuzzleGame onComplete={handleSuccess} colors={clayColors} />
            ) : config.type === 'screw' ? (
              <ScrewGame onComplete={handleSuccess} screwCount={(config.data as any)?.screwCount || 4} colors={clayColors} />
            ) : config.type === 'sequence' ? (
              <SequenceGame onComplete={handleSuccess} sequence={(config.data as any)?.sequence || []} colors={clayColors} />
            ) : config.type === 'memory' ? (
              <MemoryGame onComplete={handleSuccess} pairs={(config.data as any)?.pairs || []} colors={clayColors} />
            ) : config.type === 'coin' ? (
              <CoinGame
                onComplete={handleSuccess}
                targetSide={(config.data as any)?.targetSide || 'front'}
                frontDesign={(config.data as any)?.frontDesign || '火箭'}
                backDesign={(config.data as any)?.backDesign || '星标'}
                targetAmount={(config.data as any)?.targetAmount || '融资成功'}
                colors={clayColors}
              />
            ) : config.type === 'dial' ? (
              <DialGame
                onComplete={handleSuccess}
                phoneNumber={(config.data as any)?.phoneNumber || '10086'}
                successMessage={(config.data as any)?.successMessage || '拨号成功'}
                colors={clayColors}
              />
            ) : (
              <ClickGame onComplete={handleSuccess} targetCount={(config.data as any)?.targetCount || 5} colors={clayColors} />
            )
          )}

          {gameState === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="text-center py-10"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6 }}
              >
                <CheckCircle2
                  className="w-20 h-20 mx-auto mb-5"
                  style={{ color: clayColors.mint }}
                />
              </motion.div>
              <h4
                className="text-2xl font-black"
                style={{ color: '#5D8A66' }}
              >
                挑战成功!
              </h4>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-2 font-medium"
                style={{ color: '#7DAA8B' }}
              >
                太棒了！继续探索吧
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

// 九块拼图游戏组件 - Claymorphism风格
const PuzzleGame: React.FC<{ onComplete: () => void; colors: any }> = ({ onComplete, colors }) => {
  const correctOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const getShuffledOrder = () => {
    const shuffled = [...correctOrder];
    for (let i = 0; i < 50; i++) {
      const a = Math.floor(Math.random() * 9);
      const b = Math.floor(Math.random() * 9);
      [shuffled[a], shuffled[b]] = [shuffled[b], shuffled[a]];
    }
    return shuffled;
  };

  const [pieces, setPieces] = useState<number[]>(getShuffledOrder());
  const [selected, setSelected] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (pieces.every((p, i) => p === correctOrder[i])) {
      setIsComplete(true);
      setTimeout(() => onComplete(), 500);
    }
  }, [pieces, onComplete]);

  const handleClick = (index: number) => {
    if (isComplete) return;

    if (selected === null) {
      setSelected(index);
    } else if (selected === index) {
      setSelected(null);
    } else {
      const newPieces = [...pieces];
      [newPieces[selected], newPieces[index]] = [newPieces[index], newPieces[selected]];
      setPieces(newPieces);
      setSelected(null);
    }
  };

  const handleReset = () => {
    setPieces(getShuffledOrder());
    setSelected(null);
    setIsComplete(false);
  };

  const getTileColor = (num: number) => {
    const colorMap: Record<number, string> = {
      1: colors.peach,
      2: colors.blue,
      3: colors.mint,
      4: colors.lilac,
      5: colors.coral,
      6: colors.sunshine,
      7: '#FFD4E5',
      8: '#C4E4FF',
      9: '#D4FFD4',
    };
    return colorMap[num] || colors.peach;
  };

  return (
    <div className="space-y-5">
      <div
        className="grid grid-cols-3 gap-2 p-4 rounded-2xl md:gap-3 md:p-5"
        style={{
          background: 'rgba(255, 255, 255, 0.7)',
          border: '3px solid rgba(200, 180, 180, 0.3)',
          boxShadow: 'inset -2px -2px 8px rgba(200, 180, 180, 0.2)',
        }}
      >
        {pieces.map((piece, index) => (
          <motion.button
            key={index}
            whileTap={{ scale: 0.92 }}
            onClick={() => handleClick(index)}
            className="aspect-square rounded-2xl flex items-center justify-center text-xl font-black transition-all min-h-[60px]"
            style={{
              background: selected === index
                ? `linear-gradient(145deg, ${getTileColor(piece)}, ${getTileColor(piece)}DD)`
                : isComplete
                  ? `linear-gradient(145deg, ${colors.mint}, ${colors.mint}CC)`
                  : getTileColor(piece),
              border: selected === index
                ? '4px solid rgba(100, 100, 200, 0.8)'
                : '3px solid rgba(255, 255, 255, 0.8)',
              boxShadow: selected === index
                ? `inset -3px -3px 8px rgba(100, 50, 100, 0.3), 6px 6px 12px rgba(100, 100, 200, 0.4)`
                : `inset -2px -2px 6px rgba(200, 150, 150, 0.2), 4px 4px 10px rgba(200, 150, 150, 0.3)`,
              color: '#4D4D5D',
            }}
          >
            {piece}
          </motion.button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium" style={{ color: '#8B7D9B' }}>
          {selected !== null ? '再点击一块进行交换' : '点击选择拼图块'}
        </p>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-3 text-sm font-bold rounded-xl min-h-[44px]"
          style={{
            background: colors.sunshine,
            border: '3px solid rgba(255, 200, 100, 0.5)',
            boxShadow: 'inset -2px -2px 6px rgba(200, 150, 100, 0.2), 4px 4px 10px rgba(255, 200, 100, 0.3)',
            color: '#8B6B4B',
          }}
        >
          <RefreshCw className="w-4 h-4" />
          重置
        </motion.button>
      </div>
    </div>
  );
};

// 点击小游戏组件 - Claymorphism风格
const ClickGame: React.FC<{ onComplete: () => void; targetCount: number; colors: any }> = ({ onComplete, targetCount, colors }) => {
  const [clicked, setClicked] = useState(0);

  const handleClick = () => {
    const newClicked = clicked + 1;
    setClicked(newClicked);
    if (newClicked >= targetCount) {
      setTimeout(() => onComplete(), 300);
    }
  };

  const progress = Math.min(100, (clicked / targetCount) * 100);

  return (
    <div className="space-y-5">
      {/* 进度条 */}
      <div
        className="w-full h-4 rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.6)',
          border: '3px solid rgba(200, 180, 180, 0.3)',
          boxShadow: 'inset -2px -2px 6px rgba(200, 180, 180, 0.2)',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring' }}
          className="h-full rounded-xl"
          style={{
            background: `linear-gradient(145deg, ${colors.mint}, ${colors.blue})`,
            boxShadow: 'inset -2px -2px 4px rgba(100, 150, 200, 0.3)',
          }}
        />
      </div>

      {/* 点击按钮 */}
      <div className="flex flex-col items-center justify-center py-6">
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={handleClick}
          animate={{ scale: clicked % 2 === 0 ? 1 : 1.05 }}
          className="w-28 h-28 rounded-full flex items-center justify-center font-black shadow-lg"
          style={{
            background: `linear-gradient(145deg, ${colors.lilac}, ${colors.blue})`,
            border: '4px solid rgba(200, 200, 255, 0.7)',
            boxShadow: `
              inset -4px -4px 12px rgba(150, 150, 200, 0.3),
              inset 4px 4px 12px rgba(255, 255, 255, 0.5),
              8px 8px 20px rgba(150, 150, 200, 0.4)
            `,
            color: '#4D4D6D',
            fontSize: '24px',
          }}
        >
          <span>{clicked}/{targetCount}</span>
        </motion.button>
        <p className="text-sm font-medium mt-4" style={{ color: '#8B7D9B' }}>
          点击按钮完成目标
        </p>
      </div>
    </div>
  );
};

// 拧螺丝小游戏组件 - Claymorphism风格
const ScrewGame: React.FC<{ onComplete: () => void; screwCount: number; colors: any }> = ({ onComplete, screwCount, colors }) => {
  const clicksPerScrew = 3;
  const [screws, setScrews] = useState<number[]>(Array(screwCount).fill(0));

  const handleScrewClick = (index: number) => {
    const newScrews = [...screws];
    if (newScrews[index] < clicksPerScrew) {
      newScrews[index] += 1;
      setScrews(newScrews);
    }

    if (newScrews.every(s => s >= clicksPerScrew)) {
      setTimeout(() => onComplete(), 500);
    }
  };

  const handleReset = () => {
    setScrews(Array(screwCount).fill(0));
  };

  const totalProgress = screws.reduce((sum, s) => sum + s, 0);
  const maxProgress = screwCount * clicksPerScrew;
  const progressPercent = (totalProgress / maxProgress) * 100;

  return (
    <div className="space-y-5">
      {/* 进度条 */}
      <div
        className="w-full h-4 rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.6)',
          border: '3px solid rgba(200, 180, 180, 0.3)',
          boxShadow: 'inset -2px -2px 6px rgba(200, 180, 180, 0.2)',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ type: 'spring' }}
          className="h-full rounded-xl"
          style={{
            background: `linear-gradient(145deg, ${colors.sunshine}, ${colors.coral})`,
            boxShadow: 'inset -2px -2px 4px rgba(200, 150, 150, 0.3)',
          }}
        />
      </div>

      {/* 螺丝网格 */}
      <div
        className="grid grid-cols-2 gap-3 p-4 rounded-2xl md:gap-4 md:p-5"
        style={{
          background: 'rgba(255, 255, 255, 0.7)',
          border: '3px solid rgba(200, 180, 180, 0.3)',
          boxShadow: 'inset -2px -2px 8px rgba(200, 180, 180, 0.2)',
        }}
      >
        {screws.map((clicks, index) => (
          <motion.button
            key={index}
            whileTap={{ scale: clicks >= clicksPerScrew ? 1 : 0.92 }}
            onClick={() => handleScrewClick(index)}
            disabled={clicks >= clicksPerScrew}
            animate={{ rotate: clicks * 120 }}
            className="aspect-square rounded-2xl flex flex-col items-center justify-center transition-all min-h-[80px]"
            style={{
              background: clicks >= clicksPerScrew
                ? `linear-gradient(145deg, ${colors.mint}, ${colors.mint}CC)`
                : colors.blue,
              border: clicks >= clicksPerScrew
                ? '3px solid rgba(100, 200, 100, 0.6)'
                : '3px solid rgba(200, 200, 255, 0.6)',
              boxShadow: clicks >= clicksPerScrew
                ? `inset -2px -2px 6px rgba(100, 150, 100, 0.3), 4px 4px 10px rgba(100, 200, 100, 0.4)`
                : `inset -2px -2px 6px rgba(150, 150, 200, 0.2), 4px 4px 10px rgba(200, 200, 255, 0.3)`,
            }}
          >
            {/* 螺丝图标 */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center relative"
              style={{
                border: clicks >= clicksPerScrew
                  ? '4px solid rgba(100, 200, 100, 0.8)'
                  : '4px solid rgba(150, 150, 200, 0.8)',
                background: clicks >= clicksPerScrew
                  ? colors.mint
                  : 'rgba(255, 255, 255, 0.8)',
                boxShadow: 'inset -1px -1px 4px rgba(150, 150, 150, 0.2)',
              }}
            >
              {/* 螺丝十字槽 */}
              <div
                className="w-5 h-1 absolute"
                style={{ background: clicks >= clicksPerScrew ? '#5D8A66' : '#7D7D8D' }}
              />
              <div
                className="w-1 h-5 absolute"
                style={{ background: clicks >= clicksPerScrew ? '#5D8A66' : '#7D7D8D' }}
              />
            </div>

            {/* 进度指示 */}
            <span
              className="text-xs mt-2 font-bold"
              style={{
                color: clicks >= clicksPerScrew ? '#5D8A66' : '#5D5D7D'
              }}
            >
              {clicks >= clicksPerScrew ? '拧紧' : `${clicks}/${clicksPerScrew}`}
            </span>
          </motion.button>
        ))}
      </div>

      {/* 提示和重置 */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium" style={{ color: '#8B7D9B' }}>
          点击螺丝旋转拧紧
        </p>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-3 text-sm font-bold rounded-xl min-h-[44px]"
          style={{
            background: colors.sunshine,
            border: '3px solid rgba(255, 200, 100, 0.5)',
            boxShadow: 'inset -2px -2px 6px rgba(200, 150, 100, 0.2), 4px 4px 10px rgba(255, 200, 100, 0.3)',
            color: '#8B6B4B',
          }}
        >
          <RefreshCw className="w-4 h-4" />
          重置
        </motion.button>
      </div>
    </div>
  );
};

// 顺序点击小游戏组件 - Claymorphism风格
const SequenceGame: React.FC<{ onComplete: () => void; sequence: string[]; colors: any }> = ({ onComplete, sequence, colors }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [shuffledItems, setShuffledItems] = useState<string[]>([]);
  const [wrongClick, setWrongClick] = useState<string | null>(null);

  useEffect(() => {
    setShuffledItems([...sequence].sort(() => Math.random() - 0.5));
  }, [sequence]);

  const handleSelect = (item: string) => {
    if (item === sequence[currentStep]) {
      setCurrentStep(prev => prev + 1);
      if (currentStep + 1 >= sequence.length) {
        setTimeout(() => onComplete(), 500);
      }
    } else {
      setWrongClick(item);
      setTimeout(() => setWrongClick(null), 500);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setShuffledItems([...sequence].sort(() => Math.random() - 0.5));
    setWrongClick(null);
  };

  const progress = (currentStep / sequence.length) * 100;

  const getItemColor = (index: number) => {
    const colorList = [colors.peach, colors.blue, colors.mint, colors.lilac];
    return colorList[index % colorList.length];
  };

  return (
    <div className="space-y-5">
      {/* 进度条 */}
      <div
        className="w-full h-4 rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.6)',
          border: '3px solid rgba(200, 180, 180, 0.3)',
          boxShadow: 'inset -2px -2px 6px rgba(200, 180, 180, 0.2)',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring' }}
          className="h-full rounded-xl"
          style={{
            background: `linear-gradient(145deg, ${colors.blue}, ${colors.mint})`,
            boxShadow: 'inset -2px -2px 4px rgba(100, 150, 200, 0.3)',
          }}
        />
      </div>

      {/* 当前步骤提示 */}
      <div className="text-center">
        <p className="text-sm font-medium" style={{ color: '#8B7D9B' }}>
          当前步骤：
        </p>
        <motion.p
          animate={{ scale: currentStep > 0 ? [1, 1.1, 1] : 1 }}
          className="text-lg font-black mt-1"
          style={{ color: '#5D7D8B' }}
        >
          {currentStep < sequence.length ? sequence[currentStep] : '完成!'}
        </motion.p>
      </div>

      {/* 选项按钮 */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {shuffledItems.map((item, index) => {
          const isCompleted = sequence.slice(0, currentStep).includes(item);
          const isWrong = wrongClick === item;

          return (
            <motion.button
              key={`${item}-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: isCompleted ? 1 : 0.92 }}
              onClick={() => !isCompleted && handleSelect(item)}
              disabled={isCompleted}
              className="py-4 px-5 rounded-2xl text-sm font-bold transition-all min-h-[56px]"
              style={{
                background: isCompleted
                  ? `linear-gradient(145deg, ${colors.mint}, ${colors.mint}CC)`
                  : isWrong
                    ? colors.coral
                    : getItemColor(index),
                border: isCompleted
                  ? '3px solid rgba(100, 200, 100, 0.6)'
                  : isWrong
                    ? '3px solid rgba(255, 100, 100, 0.6)'
                    : '3px solid rgba(255, 255, 255, 0.8)',
                boxShadow: isCompleted
                  ? `inset -2px -2px 6px rgba(100, 150, 100, 0.3), 4px 4px 10px rgba(100, 200, 100, 0.4)`
                  : isWrong
                    ? `inset -2px -2px 6px rgba(200, 100, 100, 0.3), 4px 4px 10px rgba(255, 100, 100, 0.4)`
                    : `inset -2px -2px 6px rgba(200, 150, 150, 0.2), 4px 4px 10px rgba(200, 150, 150, 0.3)`,
                color: isCompleted ? '#5D8A66' : isWrong ? '#8D5D5D' : '#4D4D5D',
              }}
            >
              {item}
              {isCompleted && (
                <CheckCircle2 className="w-4 h-4 ml-2 inline" style={{ color: '#5D8A66' }} />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* 提示和重置 */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium" style={{ color: '#8B7D9B' }}>
          {currentStep}/{sequence.length} 步骤完成
        </p>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-3 text-sm font-bold rounded-xl min-h-[44px]"
          style={{
            background: colors.sunshine,
            border: '3px solid rgba(255, 200, 100, 0.5)',
            boxShadow: 'inset -2px -2px 6px rgba(200, 150, 100, 0.2), 4px 4px 10px rgba(255, 200, 100, 0.3)',
            color: '#8B6B4B',
          }}
        >
          <RefreshCw className="w-4 h-4" />
          重置
        </motion.button>
      </div>
    </div>
  );
};

// 翻牌对对碰小游戏组件 - Claymorphism风格
const MemoryGame: React.FC<{ onComplete: () => void; pairs: string[]; colors: any }> = ({ onComplete, pairs, colors }) => {
  // 创建卡片数组：每个配对项出现两次
  const createCards = () => {
    const cards = pairs.flatMap((pair, index) => [
      { id: `${pair}-1`, content: pair, pairId: pair },
      { id: `${pair}-2`, content: pair, pairId: pair },
    ]);
    // 随机打乱
    return cards.sort(() => Math.random() - 0.5);
  };

  const [cards, setCards] = useState(createCards);
  const [flippedCards, setFlippedCards] = useState<string[]>([]); // 翻开的卡片ID
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]); // 已匹配的配对ID
  const [isLocked, setIsLocked] = useState(false); // 锁定状态（等待翻回）

  useEffect(() => {
    // 当所有配对都匹配完成时
    if (matchedPairs.length === pairs.length && pairs.length > 0) {
      setTimeout(() => onComplete(), 500);
    }
  }, [matchedPairs, pairs, onComplete]);

  const handleCardClick = (cardId: string, pairId: string) => {
    if (isLocked) return; // 锁定时不响应点击
    if (matchedPairs.includes(pairId)) return; // 已匹配的不响应
    if (flippedCards.includes(cardId)) return; // 已翻开的不响应

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    // 如果翻开了两张卡片
    if (newFlipped.length === 2) {
      const firstCard = cards.find(c => c.id === newFlipped[0]);
      const secondCard = cards.find(c => c.id === cardId);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        // 匹配成功！
        setMatchedPairs([...matchedPairs, firstCard.pairId]);
        setFlippedCards([]);
      } else {
        // 匹配失败，延迟翻回
        setIsLocked(true);
        setTimeout(() => {
          setFlippedCards([]);
          setIsLocked(false);
        }, 800);
      }
    }
  };

  const handleReset = () => {
    setCards(createCards());
    setFlippedCards([]);
    setMatchedPairs([]);
    setIsLocked(false);
  };

  const progress = (matchedPairs.length / pairs.length) * 100;

  const getCardColor = (index: number) => {
    const colorList = [colors.peach, colors.blue, colors.mint, colors.lilac, colors.coral, colors.sunshine];
    return colorList[index % colorList.length];
  };

  return (
    <div className="space-y-5">
      {/* 进度条 */}
      <div
        className="w-full h-4 rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.6)',
          border: '3px solid rgba(200, 180, 180, 0.3)',
          boxShadow: 'inset -2px -2px 6px rgba(200, 180, 180, 0.2)',
        }}
      >
        <motion.div
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring' }}
          className="h-full rounded-xl"
          style={{
            background: `linear-gradient(145deg, ${colors.lilac}, ${colors.mint})`,
            boxShadow: 'inset -2px -2px 4px rgba(100, 150, 200, 0.3)',
          }}
        />
      </div>

      {/* 匹配进度 */}
      <div className="text-center">
        <p className="text-sm font-medium" style={{ color: '#8B7D9B' }}>
          已匹配：
        </p>
        <motion.p
          animate={{ scale: matchedPairs.length > 0 ? [1, 1.1, 1] : 1 }}
          className="text-lg font-black mt-1"
          style={{ color: '#5D7D8B' }}
        >
          {matchedPairs.length}/{pairs.length} 对
        </motion.p>
      </div>

      {/* 卡片网格 */}
      <div
        className="grid grid-cols-4 gap-1.5 p-2.5 rounded-2xl md:gap-2 md:p-3"
        style={{
          background: 'rgba(255, 255, 255, 0.7)',
          border: '3px solid rgba(200, 180, 180, 0.3)',
          boxShadow: 'inset -2px -2px 8px rgba(200, 180, 180, 0.2)',
        }}
      >
        {cards.map((card, index) => {
          const isFlipped = flippedCards.includes(card.id);
          const isMatched = matchedPairs.includes(card.pairId);

          return (
            <motion.button
              key={card.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: isMatched ? 1 : 0.92 }}
              onClick={() => handleCardClick(card.id, card.pairId)}
              disabled={isMatched}
              className="aspect-square min-h-[54px] overflow-hidden rounded-xl flex items-center justify-center text-[11px] font-bold transition-all md:min-h-[60px] md:text-xs"
            >
              <motion.div
                animate={{ rotateY: isFlipped || isMatched ? 0 : 180 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex items-center justify-center rounded-2xl"
                style={{
                  background: isMatched
                    ? colors.mint
                    : isFlipped
                      ? getCardColor(index)
                      : 'linear-gradient(145deg, #E6E6FA, #D4D4E6)',
                  border: isMatched
                    ? '3px solid rgba(100, 200, 100, 0.6)'
                    : isFlipped
                      ? '3px solid rgba(255, 255, 255, 0.8)'
                      : '3px solid rgba(200, 200, 220, 0.6)',
                  boxShadow: isMatched
                    ? `inset -2px -2px 6px rgba(100, 150, 100, 0.3), 4px 4px 10px rgba(100, 200, 100, 0.4)`
                    : isFlipped
                      ? `inset -2px -2px 6px rgba(200, 150, 150, 0.2), 4px 4px 10px rgba(200, 150, 150, 0.3)`
                      : `inset 2px 2px 6px rgba(200, 200, 220, 0.3), 4px 4px 10px rgba(200, 200, 220, 0.3)`,
                  color: isMatched ? '#5D8A66' : isFlipped ? '#4D4D5D' : '#8B8B9B',
                }}
              >
                {isFlipped || isMatched ? (
                  <span className="text-xs leading-tight text-center px-1">{card.content}</span>
                ) : (
                  <span className="text-2xl">?</span>
                )}
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      {/* 提示和重置 */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium" style={{ color: '#8B7D9B' }}>
          点击翻开卡片，找到相同的配对
        </p>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-3 text-sm font-bold rounded-xl min-h-[44px]"
          style={{
            background: colors.sunshine,
            border: '3px solid rgba(255, 200, 100, 0.5)',
            boxShadow: 'inset -2px -2px 6px rgba(200, 150, 100, 0.2), 4px 4px 10px rgba(255, 200, 100, 0.3)',
            color: '#8B6B4B',
          }}
        >
          <RefreshCw className="w-4 h-4" />
          重置
        </motion.button>
      </div>
    </div>
  );
};

// 抛硬币小游戏组件 - Claymorphism风格
interface CoinGameProps {
  onComplete: () => void;
  targetSide: 'front' | 'back';
  frontDesign: string;
  backDesign: string;
  targetAmount?: string;
  colors: any;
}

const CoinGame: React.FC<CoinGameProps> = ({
  onComplete,
  targetSide,
  frontDesign,
  backDesign,
  targetAmount,
  colors,
}) => {
  const [flipCount, setFlipCount] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [currentSide, setCurrentSide] = useState<'front' | 'back' | null>(null);
  const [hasWon, setHasWon] = useState(false);
  const [resultHistory, setResultHistory] = useState<'front' | 'back'[]>([]);

  // 抛硬币音效
  const coinFlipAudioRef = React.useRef<HTMLAudioElement | null>(null);

  const playCoinFlipSound = () => {
    if (coinFlipAudioRef.current) {
      coinFlipAudioRef.current.currentTime = 0;
      coinFlipAudioRef.current.play();
    }
  };

  // 保底机制：确保4次内必定成功
  // 第1次：30%，第2次：50%，第3次：70%，第4次：100%
  const getWinProbability = (attempt: number): number => {
    const probabilities = [0.3, 0.5, 0.7, 1.0];
    return probabilities[Math.min(attempt - 1, 3)];
  };

  const handleFlip = () => {
    if (isFlipping || hasWon) return;

    // 播放抛硬币音效
    playCoinFlipSound();

    setIsFlipping(true);
    const newFlipCount = flipCount + 1;
    setFlipCount(newFlipCount);

    const winProbability = getWinProbability(newFlipCount);
    const isTargetHit = Math.random() < winProbability;

    let result: 'front' | 'back';
    if (isTargetHit) {
      result = targetSide;
    } else {
      result = targetSide === 'front' ? 'back' : 'front';
    }

    setTimeout(() => {
      setCurrentSide(result);
      setResultHistory([...resultHistory, result]);
      setIsFlipping(false);

      if (result === targetSide) {
        setHasWon(true);
        setTimeout(() => onComplete(), 1000);
      }
    }, 600);
  };

  const handleReset = () => {
    setFlipCount(0);
    setIsFlipping(false);
    setCurrentSide(null);
    setHasWon(false);
    setResultHistory([]);
  };

  return (
    <div className="space-y-5">
      {/* 抛硬币音效 */}
      <audio ref={coinFlipAudioRef} src="/sounds/coin-flip.mp3" preload="auto" />

      {/* 目标提示 */}
      <div
        className="text-center p-3 rounded-2xl"
        style={{
          background: colors.lilac,
          border: '3px solid rgba(200, 200, 255, 0.5)',
          boxShadow: 'inset -2px -2px 6px rgba(150, 150, 200, 0.2), 4px 4px 10px rgba(200, 200, 255, 0.3)',
        }}
      >
        <p className="text-sm font-medium" style={{ color: '#6D6D8D' }}>
          目标花色：
        </p>
        <p className="text-xl font-black mt-1" style={{ color: '#4D4D6D' }}>
          {targetSide === 'front' ? frontDesign : backDesign}
        </p>
        {targetAmount && (
          <p className="text-sm font-medium mt-2" style={{ color: '#7D7D9D' }}>
            获得融资：{targetAmount}
          </p>
        )}
      </div>

      {/* 翻转次数和结果历史 */}
      <div className="text-center">
        <p className="text-sm font-medium" style={{ color: '#8B7D9B' }}>
          已抛掷：{flipCount} 次
        </p>
        <div className="flex justify-center gap-2 mt-2">
          {resultHistory.map((result, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                background: result === targetSide ? colors.mint : colors.coral,
                border: '2px solid rgba(255, 255, 255, 0.5)',
                color: '#4D4D5D',
              }}
            >
              {result === 'front' ? frontDesign.charAt(0) : backDesign.charAt(0)}
            </motion.div>
          ))}
        </div>
      </div>

      {/* 硬币 */}
      <div className="flex flex-col items-center justify-center py-6">
        <motion.div
          animate={{
            rotateY: isFlipping ? [0, 180, 360, 540, 720] : 0,
            scale: isFlipping ? [1, 1.2, 1] : 1,
          }}
          transition={{
            duration: isFlipping ? 0.6 : 0,
            ease: 'easeInOut',
          }}
          className="relative"
          style={{ perspective: '1000px' }}
        >
          <motion.div
            className="w-20 h-20 rounded-full flex items-center justify-center font-black shadow-lg"
            style={{
              background: currentSide === null
                ? 'linear-gradient(145deg, #E6E6FA, #D4D4E6)'
                : currentSide === 'front'
                  ? 'linear-gradient(145deg, #FFD700, #FFAA00)'
                  : 'linear-gradient(145deg, #87CEEB, #ADD8E6)',
              border: '4px solid rgba(255, 255, 255, 0.8)',
              boxShadow: `
                inset -3px -3px 10px rgba(200, 200, 200, 0.3),
                inset 3px 3px 10px rgba(255, 255, 255, 0.5),
                6px 6px 20px rgba(150, 150, 150, 0.4)
              `,
              color: '#4D4D6D',
            }}
          >
            {currentSide === null ? (
              <span className="text-2xl">?</span>
            ) : (
              <span className="text-sm font-bold">
                {currentSide === 'front' ? frontDesign : backDesign}
              </span>
            )}
          </motion.div>
        </motion.div>

        {/* 抛硬币按钮 */}
        <motion.button
          whileTap={{ scale: hasWon ? 1 : 0.92 }}
          onClick={handleFlip}
          disabled={isFlipping || hasWon}
          animate={{ scale: hasWon ? [1, 1.1, 1] : 1 }}
          className="mt-6 px-8 py-4 font-bold rounded-2xl min-h-[52px]"
          style={{
            background: hasWon
              ? colors.mint
              : colors.coral,
            border: hasWon
              ? '3px solid rgba(100, 200, 100, 0.6)'
              : '3px solid rgba(255, 150, 150, 0.6)',
            boxShadow: hasWon
              ? 'inset -2px -2px 6px rgba(100, 150, 100, 0.3), 4px 4px 10px rgba(100, 200, 100, 0.4)'
              : 'inset -2px -2px 6px rgba(200, 100, 100, 0.3), 4px 4px 10px rgba(255, 150, 150, 0.4)',
            color: hasWon ? '#5D8A66' : '#FFFFFF',
            fontSize: '16px',
          }}
        >
          {hasWon ? '融资成功!' : '抛硬币'}
        </motion.button>

        {!hasWon && flipCount > 0 && flipCount < 4 && (
          <p className="text-sm font-medium mt-3" style={{ color: '#8B7D9B' }}>
            继续尝试，第 {flipCount + 1} 次成功率更高！
          </p>
        )}
      </div>

      {/* 提示和重置 */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium" style={{ color: '#8B7D9B' }}>
          抛到目标花色获得融资
        </p>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-3 text-sm font-bold rounded-xl min-h-[44px]"
          style={{
            background: colors.sunshine,
            border: '3px solid rgba(255, 200, 100, 0.5)',
            boxShadow: 'inset -2px -2px 6px rgba(200, 150, 100, 0.2), 4px 4px 10px rgba(255, 200, 100, 0.3)',
            color: '#8B6B4B',
          }}
        >
          <RefreshCw className="w-4 h-4" />
          重置
        </motion.button>
      </div>
    </div>
  );
};

// 拨号小游戏组件 - Claymorphism风格
interface DialGameProps {
  onComplete: () => void;
  phoneNumber: string;
  successMessage?: string;
  colors: any;
}

const DialGame: React.FC<DialGameProps> = ({
  onComplete,
  phoneNumber,
  successMessage,
  colors,
}) => {
  const [dialedNumber, setDialedNumber] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [callSuccess, setCallSuccess] = useState(false);
  const vibrateAudioRef = React.useRef<HTMLAudioElement | null>(null);
  const keyPressAudioRef = React.useRef<HTMLAudioElement | null>(null);

  // 数字键盘布局
  const dialKeys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '#'],
  ];

  // 播放按键音效（只播放0.1秒）
  const playKeyPressSound = () => {
    if (keyPressAudioRef.current) {
      keyPressAudioRef.current.currentTime = 0;
      keyPressAudioRef.current.play();
      // 0.1秒后停止
      setTimeout(() => {
        if (keyPressAudioRef.current) {
          keyPressAudioRef.current.pause();
          keyPressAudioRef.current.currentTime = 0;
        }
      }, 100);
    }
  };

  const handleKeyPress = (key: string) => {
    if (isCalling || callSuccess) return;
    if (dialedNumber.length >= 11) return; // 限制最大长度

    // 播放按键音效
    playKeyPressSound();

    setDialedNumber(dialedNumber + key);
  };

  const handleDelete = () => {
    if (isCalling || callSuccess) return;
    // 播放按键音效
    playKeyPressSound();
    setDialedNumber(dialedNumber.slice(0, -1));
  };

  const handleCall = () => {
    if (isCalling || callSuccess) return;
    if (dialedNumber !== phoneNumber) return;

    setIsCalling(true);
    // 模拟拨号动画
    setTimeout(() => {
      setIsCalling(false);
      setCallSuccess(true);

      // 播放震动音效
      if (vibrateAudioRef.current) {
        vibrateAudioRef.current.currentTime = 0;
        vibrateAudioRef.current.play();
      }

      // 6秒后停止音效并继续
      setTimeout(() => {
        if (vibrateAudioRef.current) {
          vibrateAudioRef.current.pause();
          vibrateAudioRef.current.currentTime = 0;
        }
        onComplete();
      }, 6000);
    }, 1500);
  };

  const handleReset = () => {
    setDialedNumber('');
    setIsCalling(false);
    setCallSuccess(false);
    // 停止所有音效
    if (vibrateAudioRef.current) {
      vibrateAudioRef.current.pause();
      vibrateAudioRef.current.currentTime = 0;
    }
    if (keyPressAudioRef.current) {
      keyPressAudioRef.current.pause();
      keyPressAudioRef.current.currentTime = 0;
    }
  };

  const progress = (dialedNumber.length / phoneNumber.length) * 100;
  const isCorrectSoFar = phoneNumber.startsWith(dialedNumber);

  return (
    <div className="space-y-4">
      {/* 音效元素 */}
      <audio
        ref={vibrateAudioRef}
        src="/sounds/vibrate.mp3"
        preload="auto"
      />
      <audio
        ref={keyPressAudioRef}
        src="/sounds/dial-key.mp3"
        preload="auto"
      />

      {/* 目标号码提示 */}
      <div
        className="text-center p-2 rounded-xl"
        style={{
          background: colors.lilac,
          border: '2px solid rgba(200, 200, 255, 0.5)',
        }}
      >
        <p className="text-xs font-medium" style={{ color: '#6D6D8D' }}>
          请拨打：{phoneNumber}
        </p>
      </div>

      {/* 进度条 */}
      <div
        className="w-full h-3 rounded-xl overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.6)',
          border: '2px solid rgba(200, 180, 180, 0.3)',
        }}
      >
        <motion.div
          animate={{ width: `${progress}%` }}
          className="h-full rounded-lg"
          style={{
            background: isCorrectSoFar && dialedNumber.length > 0
              ? colors.mint
              : colors.blue,
          }}
        />
      </div>

      {/* 已拨号码显示 */}
      <div
        className="text-center py-3 rounded-xl"
        style={{
          background: 'linear-gradient(145deg, #FFFFFF, #F5F5FA)',
          border: '2px solid rgba(200, 200, 220, 0.4)',
          boxShadow: 'inset -1px -1px 4px rgba(200, 200, 200, 0.2)',
        }}
      >
        <motion.p
          animate={{
            scale: isCalling ? [1, 1.02, 1] : 1,
            opacity: callSuccess ? 0.7 : 1
          }}
          className="text-xl font-black tracking-widest"
          style={{
            color: callSuccess
              ? '#5D8A66'
              : isCorrectSoFar && dialedNumber.length > 0
                ? '#4D4D5D'
                : dialedNumber.length > 0 && !isCorrectSoFar
                  ? colors.coral
                  : '#8B8B9B',
          }}
        >
          {callSuccess
            ? successMessage || '拨号成功'
            : isCalling
              ? '正在拨号...'
              : dialedNumber || '请输入号码'}
        </motion.p>
        {dialedNumber.length > 0 && !callSuccess && !isCalling && (
          <p className="text-xs mt-1" style={{ color: '#8B7D9B' }}>
            {dialedNumber.length}/{phoneNumber.length} 位
          </p>
        )}
      </div>

      {/* 数字键盘 */}
      <div
        className="grid gap-2 p-3 rounded-xl"
        style={{
          background: 'rgba(255, 255, 255, 0.7)',
          border: '2px solid rgba(200, 180, 180, 0.3)',
        }}
      >
        {dialKeys.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-3 gap-2">
            {row.map((key) => (
              <motion.button
                key={key}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleKeyPress(key)}
                disabled={isCalling || callSuccess}
                className="py-4 rounded-xl text-lg font-black transition-all min-h-[52px]"
                style={{
                  background: colors.blue,
                  border: '2px solid rgba(255, 255, 255, 0.6)',
                  boxShadow: 'inset -1px -1px 4px rgba(150, 150, 200, 0.2), 2px 2px 6px rgba(150, 150, 200, 0.2)',
                  color: '#4D4D5D',
                }}
              >
                {key}
              </motion.button>
            ))}
          </div>
        ))}

        {/* 删除和拨打按钮 */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleDelete}
            disabled={isCalling || callSuccess || dialedNumber.length === 0}
            className="py-3 rounded-xl text-sm font-bold min-h-[44px]"
            style={{
              background: colors.coral,
              border: '2px solid rgba(255, 150, 150, 0.4)',
              color: '#FFFFFF',
              opacity: dialedNumber.length === 0 ? 0.5 : 1,
            }}
          >
            删除
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleCall}
            disabled={isCalling || callSuccess || dialedNumber !== phoneNumber}
            animate={{
              scale: callSuccess ? [1, 1.1, 1] : 1,
              opacity: dialedNumber === phoneNumber ? 1 : 0.5
            }}
            className="py-3 rounded-xl text-sm font-bold min-h-[44px]"
            style={{
              background: callSuccess ? colors.mint : colors.mint,
              border: callSuccess ? '2px solid rgba(100, 200, 100, 0.5)' : '2px solid rgba(100, 200, 100, 0.4)',
              color: '#5D8A66',
            }}
          >
            {callSuccess ? '成功' : '拨打'}
          </motion.button>
        </div>
      </div>

      {/* 提示和重置 */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium" style={{ color: '#8B7D9B' }}>
          输入正确号码后拨打
        </p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          className="flex items-center gap-1 px-4 py-3 text-xs font-bold rounded-lg min-h-[44px]"
          style={{
            background: colors.sunshine,
            border: '2px solid rgba(255, 200, 100, 0.4)',
            color: '#8B6B4B',
          }}
        >
          <RefreshCw className="w-4 h-4" />
          重置
        </motion.button>
      </div>
    </div>
  );
};