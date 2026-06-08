// 定义每个选项带来的四维数值变动
export interface Impact {
  car: number; // 事业/学业 (Career)
  fam: number; // 家庭羁绊 (Family)
  hea: number; // 健康值 (Health)
  hap: number; // 幸福/心理 (Happiness)
}

export interface Choice {
  text: string;
  memory: string;
  impact: Impact; // 挂载数值变动
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  age: string;
  bgImage?: string;
  isSingle?: boolean; // 【核心标记】：如果是单线催泪点，设为 true
  choices: {
    good: Choice;
    bad?: Choice; // 单线时可以不写 bad
  };
}

export interface NodeData {
  id: string;
  type: 'good' | 'bad';
  text: string;
  x: number;
  y: number;
  hit: boolean;
  passed?: boolean; // 【核心防卡死标记】：记录这个球有没有被玩家“错过”
}

export type GameState = 'START' | 'PLAYING' | 'LEGEND' | 'ENDING';
