/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/** 伟人章节 */
export interface LegendChapter {
  id: string;
  name: string;
  title: string;
  description: string;
  backgroundImage: string;
  textOverlayImage?: string;
  items: LegendItem[];
  ending: LegendEnding;
}

/** 可点击物品（使用热区方式） */
export interface LegendItem {
  id: string;
  name: string;
  description: string;
  /** 点击热区位置（百分比，0-100） */
  hotzone: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  story: LegendStory;
  minigame?: MiniGameConfig;
  unlockRequirement?: string;
}

/** 剧情内容 */
export interface LegendStory {
  title: string;
  narrative: string;
  choices: LegendChoice[];
}

/** 选择分支 */
export interface LegendChoice {
  id: string;
  text: string;
  consequence: LegendConsequence;
}

/** 选择后果 */
export interface LegendConsequence {
  narrative: string;
  statChange?: {
    courage?: number;
    wisdom?: number;
    persistence?: number;
  };
}

/** 小游戏配置 */
export interface MiniGameConfig {
  type: 'drag' | 'click' | 'sequence' | 'timing' | 'puzzle' | 'screw' | 'memory' | 'coin' | 'dial';
  title: string;
  instruction: string;
  duration?: number;
  data: MiniGameData;
}

/** 小游戏数据 */
export type MiniGameData = DragGameData | ClickGameData | SequenceGameData | TimingGameData | ScrewGameData | MemoryGameData | CoinGameData | DialGameData | PuzzleGameData;

export interface PuzzleGameData {
  image?: string;
}

export interface DragGameData {
  targets: Array<{
    id: string;
    name: string;
    targetPosition: { x: number; y: number };
    startPosition: { x: number; y: number };
  }>;
}

export interface ClickGameData {
  targetCount: number;
  timeLimit?: number;
}

export interface SequenceGameData {
  sequence: string[];
}

export interface TimingGameData {
  targetZones: Array<{ x: number; y: number; radius: number }>;
}

export interface ScrewGameData {
  screwCount: number;
}

export interface MemoryGameData {
  /** 4对卡片的内容（关键词） */
  pairs: string[];
}

export interface CoinGameData {
  /** 目标花色（正面或反面） */
  targetSide: 'front' | 'back';
  /** 正面图案名称 */
  frontDesign: string;
  /** 反面图案名称 */
  backDesign: string;
  /** 目标融资金额显示 */
  targetAmount?: string;
}

export interface DialGameData {
  /** 需要拨打的电话号码 */
  phoneNumber: string;
  /** 拨打成功后的提示信息 */
  successMessage?: string;
}

/** 结局配置 */
export interface LegendEnding {
  title: string;
  summary: string;
  quotes: string[];
}

/** 游戏状态 */
export interface LegendGameState {
  currentLegendId: string | null;
  completedItems: string[];
  choices: Record<string, string>;
  stats: {
    courage: number;
    wisdom: number;
    persistence: number;
  };
  phase: 'selecting' | 'exploring' | 'story' | 'choice' | 'minigame' | 'ending';
  activeItemId: string | null;
}
