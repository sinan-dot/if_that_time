/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLegendGame } from '../../hooks/useLegendGame';
import { LegendSelector } from './LegendSelector';
import { LegendBackground } from './LegendBackground';
import { LegendStoryModal } from './LegendStoryModal';
import { LegendChoiceModal } from './LegendChoiceModal';
import { LegendMiniGame } from './LegendMiniGame';
import { LegendEnding } from './LegendEnding';
import { LegendProgress } from './LegendProgress';
import { ArrowLeft, Home } from 'lucide-react';

interface LegendSceneProps {
  onRestart: () => void;
  onExit?: () => void;
}

export const LegendScene: React.FC<LegendSceneProps> = ({ onRestart, onExit }) => {
  const {
    state,
    selectLegend,
    activateItem,
    showChoices,
    makeChoice,
    completeMinigame,
    skipMinigame,
    resetGame,
    getCurrentLegend,
    getCurrentItem,
    getCurrentMinigame,
  } = useLegendGame();

  const legend = getCurrentLegend();
  const item = getCurrentItem();
  const minigame = getCurrentMinigame();

  // 检测是否是拨号小游戏（需要竖屏）
  const isDialGame = state.phase === 'minigame' && minigame?.type === 'dial';

  const handleBackToSelect = () => {
    resetGame();
  };

  const handleFinalRestart = () => {
    resetGame();
    onRestart();
  };

  const handleExit = () => {
    resetGame();
    if (onExit) {
      onExit();
    } else {
      onRestart();
    }
  };

  return (
    // 横屏容器：拨号游戏除外
    <div
      className="fixed overflow-hidden bg-[#05060a]"
      style={{
        // 非拨号游戏时强制横屏显示
        transform: isDialGame ? 'none' : 'rotate(90deg)',
        transformOrigin: 'center center',
        // 旋转后的尺寸：宽度=视口高度，高度=视口宽度
        width: isDialGame ? '100vw' : '100vh',
        height: isDialGame ? '100vh' : '100vw',
        // 居中定位
        top: isDialGame ? '0' : 'calc(50vh - 50vw)',
        left: isDialGame ? '0' : 'calc(50vw - 50vh)',
      }}
    >
      {/* 背景层 - 探索和剧情阶段显示 */}
      <AnimatePresence mode="wait">
        {state.phase !== 'selecting' && legend && (
          <LegendBackground
            key={legend.id}
            legend={legend}
            completedItems={state.completedItems}
            onItemClick={activateItem}
          />
        )}
      </AnimatePresence>

      {/* 左上角按钮组 */}
      {(state.phase === 'exploring' || state.phase === 'selecting') && (
        <div className="absolute top-4 left-4 z-30 flex gap-2">
          {state.phase === 'exploring' && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleBackToSelect}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </motion.button>
          )}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleExit}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Home className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      )}

      {/* 进度指示器 */}
      {state.phase !== 'selecting' && state.phase !== 'ending' && legend && (
        <LegendProgress
          total={legend.items.length}
          completed={state.completedItems.length}
          stats={state.stats}
        />
      )}

      {/* 伟人选择器 */}
      <AnimatePresence>
        {state.phase === 'selecting' && (
          <LegendSelector onSelect={selectLegend} onExit={handleExit} />
        )}
      </AnimatePresence>

      {/* 剧情弹窗 */}
      <AnimatePresence>
        {state.phase === 'story' && item && (
          <LegendStoryModal
            item={item}
            onNext={showChoices}
          />
        )}
      </AnimatePresence>

      {/* 选择弹窗 */}
      <AnimatePresence>
        {state.phase === 'choice' && item && (
          <LegendChoiceModal
            item={item}
            onChoose={(choiceId) => makeChoice(item.id, choiceId)}
          />
        )}
      </AnimatePresence>

      {/* 小游戏 */}
      <AnimatePresence>
        {state.phase === 'minigame' && minigame && (
          <LegendMiniGame
            config={minigame}
            onComplete={completeMinigame}
            onSkip={skipMinigame}
          />
        )}
      </AnimatePresence>

      {/* 结局 */}
      <AnimatePresence>
        {state.phase === 'ending' && legend && (
          <LegendEnding
            legend={legend}
            stats={state.stats}
            onRestart={handleFinalRestart}
          />
        )}
      </AnimatePresence>
    </div>
  );
};