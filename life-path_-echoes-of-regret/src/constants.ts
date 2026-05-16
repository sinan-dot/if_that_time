/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Chapter } from "./types";

export const BPM = 105;
export const BEAT_MS = 60000 / BPM;

export const CHAPTERS: Chapter[] = [
  // --- CHILDHOOD ---
  {
    id: "childhood_start",
    title: "童年的红纸伞",
    description: "雨天里，父亲在校门口接你，你却因为和同学嬉闹跑远了。",
    age: 'CHILDHOOD',
    choices: {
      good: {
        text: "跑回红纸伞下",
        memory: "那种干燥和温暖的味道，伴随了你一整个童年。",
        nextId: "youth_study"
      },
      bad: {
        text: "在雨中继续奔跑",
        memory: "感冒发烧的夜晚，你听见父母在门外低声叹息。",
        nextId: "youth_rebel"
      }
    }
  },
  // --- YOUTH ---
  {
    id: "youth_study",
    title: "安静的图书馆",
    description: "如果你能静下心来多看两本书，人生的底色是否会更厚重？",
    age: 'YOUTH',
    choices: {
      good: {
        text: "沉浸在书海中",
        memory: "那些智慧后来成了你最坚实的盔甲。",
        nextId: "career_stable"
      },
      bad: {
        text: "看向窗外发呆",
        memory: "你记住了变幻的云，却忘记了握住翻身的机会。",
        nextId: "career_risk"
      }
    }
  },
  {
    id: "youth_rebel",
    title: "叛逆的琴弦",
    description: "想做一名摇滚乐手，却被视作某种“不务正业”的叛逆。",
    age: 'YOUTH',
    choices: {
      good: {
        text: "勇敢带走那把吉他",
        memory: "哪怕生活颠沛流离，你的血液里流淌着自由。",
        nextId: "career_risk"
      },
      bad: {
        text: "锁上琴箱回书房",
        memory: "你成了他们期待的乖孩子，却弄丢了发光的自己。",
        nextId: "career_stable"
      }
    }
  },
  // --- ADULT ---
  {
    id: "career_stable",
    title: "格子间的围城",
    description: "在一份稳定的工作中老去，还是在风浪中博一个可能？",
    age: 'ADULT',
    choices: {
      good: {
        text: "坚持热爱的副业",
        memory: "夜晚的台灯下，你重新找回了生命的意义。",
        nextId: "family_balance"
      },
      bad: {
        text: "彻底放弃幻想",
        memory: "稳定的薪水换来了日复一日的空洞。",
        nextId: "family_duty"
      }
    }
  },
  {
    id: "career_risk",
    title: "创业的寒冬",
    description: "资金链断裂的那个夜晚，你是否想过回家？",
    age: 'ADULT',
    choices: {
      good: {
        text: "卖掉最后一辆车坚持",
        memory: "黎明前的黑暗很长，但你挺到了破晓。",
        nextId: "elder_legend"
      },
      bad: {
        text: "承认失败并回归现实",
        memory: "你回归了平凡，心底却有一个永远没填上的洞。",
        nextId: "family_duty"
      }
    }
  },
  // --- ELDER ---
  {
    id: "family_balance",
    title: "迟到的勋章",
    description: "当你老了，是庆幸当年的坚持，还是遗憾错过的天伦？",
    age: 'ELDER',
    choices: {
      good: {
        text: "把故事讲给孙子听",
        memory: "你的遗憾最终化作了照亮后辈的灯火。",
      },
      bad: {
        text: "独自翻看陈旧相册",
        memory: "那些热烈的梦，在沉默中慢慢蒙尘。"
      }
    }
  },
  {
    id: "family_duty",
    title: "老屋的叮咛",
    description: "如果重新来过，你还会选择远走吗？",
    age: 'ELDER',
    choices: {
      good: {
        text: "留在家乡陪伴老友",
        memory: "落叶归根，这份踏实是你余生最大的财富。",
      },
      bad: {
        text: "依然向往远方",
        memory: "旅人终老，你始终在那条没有终点的路上。"
      }
    }
  },
  {
    id: "elder_legend",
    title: "孤独的守望者",
    description: "你赢得了世界，却发现身边早已空无一人。",
    age: 'ELDER',
    choices: {
      good: {
        text: "写下《人生无悔》",
        memory: "你成就了传奇，也将孤独酿成了美酒。",
      },
      bad: {
        text: "回首寻找那个影子",
        memory: "在巅峰之上，你最想要的却是一个简单的拥抱。"
      }
    }
  }
];

export const GAME_CONSTANTS = {
  SPEED: 3.3,
  TURN_SPEED_PERFECT: Math.PI / 2, // 90 degrees
  TURN_SPEED_GREAT: Math.PI / 3, // 60 degrees
  TURN_SPEED_OK: Math.PI / 5, // 36 degrees
  REPAIR_INC: 25,
  MISS_DEC: 10,
};
