/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Chapter } from "../types";

// 【平凡之路】主线关卡 - 独立文件，与支线完全隔离
export const ORDINARY_CHAPTERS: Chapter[] = [
  // ================= 【阶段一：童年】 =================
  {
    id: 'childhood_start',
    title: '童年时光',
    description: '"我开始明白，人生的路，要靠自己一步一步走。"\n放学后，我更愿意...',
    age: 'CHILDHOOD',
    bgImage: '/picture/2.1小学教室.png',
    choices: {
      good: {
        text: '回家认真写作业',
        memory: '"别人都在玩的时候，我知道，努力可能是我唯一的机会。"',
        nextId: 'youth_study'
      },
      bad: {
        text: '和朋友出去玩',
        memory: '"成绩也许重要，但青春好像更值得珍惜。"',
        nextId: 'youth_play'
      }
    }
  },

  // ================= 【阶段二：青春】 =================
  {
    id: 'youth_study',
    title: '青春的十字路口',
    description: '"第一次，我认真思考未来。想成为什么样的人？"\n高考临近，我决定...',
    age: 'YOUTH',
    bgImage: '/picture/3.1操场夕阳教学楼.png',
    choices: {
      good: {
        text: '全力冲刺重点大学',
        memory: '无数个熬夜苦读的夜晚，换来了一纸名校录取通知书。',
        nextId: 'adult_degree'
      },
      bad: {
        text: '选择普通大学稳步前进',
        memory: '没有极度的内卷，获得了相对平和的校园时光。',
        nextId: 'adult_normal'
      }
    }
  },
  {
    id: 'youth_play',
    title: '青春的躁动',
    description: '"第一次，我认真思考未来。想成为什么样的人？"\n看着同龄人埋头苦读，我决定...',
    age: 'YOUTH',
    bgImage: '/picture/3.2操场夕阳教学楼.png',
    choices: {
      good: {
        text: '提前进入社会打拼',
        memory: '提早步入社会，感受到了人情冷暖与赚钱的不易。',
        nextId: 'adult_work'
      },
      bad: {
        text: '和朋友尝试小成本创业',
        memory: '拿着微薄的本金，开启了充满未知与风险的创业路。',
        nextId: 'adult_biz'
      }
    }
  },

  // ================= 【阶段三：成年】 =================
  {
    id: 'adult_degree',
    title: '学业路线：职场起步',
    description: '"长大以后才发现，最难的不是选择，而是承担结果。"\n名校毕业后...',
    age: 'ADULT',
    bgImage: '/picture/4.1.1重点大学.png',
    choices: {
      good: {
        text: '进入大厂，追求高薪',
        memory: '深夜的办公室和加班灯光，成为了生活的常态。',
        nextId: 'elder_rich'
      },
      bad: {
        text: '考研深造，追求学术',
        memory: '选择了学术的孤寂，在实验室里度过无数日夜。',
        nextId: 'elder_academic'
      }
    }
  },
  {
    id: 'adult_normal',
    title: '平凡路线：步入社会',
    description: '没有名校光环，面临着第一份工作的抉择。我更看重...',
    age: 'ADULT',
    bgImage: '/picture/3.5创业.png',
    choices: {
      good: {
        text: '追求稳定，考公考编',
        memory: '选择了朝九晚五的规律生活，平淡却安心。',
        nextId: 'elder_stable'
      },
      bad: {
        text: '追求自由，做自由职业',
        memory: '在咖啡馆办公，虽然未来不确定，但内心丰盈。',
        nextId: 'elder_free'
      }
    }
  },
  {
    id: 'adult_work',
    title: '冒险路线：社会大学',
    description: '过早离开校园，你在外地打拼，经历了漫长的低谷...',
    age: 'ADULT',
    bgImage: '/picture/3.4提前工作.png',
    choices: {
      good: {
        text: '咬牙坚持，绝不认输',
        memory: '挺过了最难熬的日子，遇到贵人，迎来了人生反转。',
        nextId: 'elder_adventure'
      },
      bad: {
        text: '妥协退让，回老家发展',
        memory: '放下了在外漂泊的执念，选择了陪伴与家庭的温暖。',
        nextId: 'elder_family'
      }
    }
  },
  {
    id: 'adult_biz',
    title: '创业路线：创业维艰',
    description: '第一次创业失败，面临巨额负债的低谷，我选择...',
    age: 'ADULT',
    bgImage: '/picture/3.3创业失败.png',
    choices: {
      good: {
        text: '顶着负债再次尝试',
        memory: '在绝望中寻找生机，最终抓住了风口，成功逆袭。',
        nextId: 'elder_boss'
      },
      bad: {
        text: '找份普通工作还债',
        memory: '认清了现实，学会了向生活低头，踏实过好每一天。',
        nextId: 'elder_family'
      }
    }
  },

  // ================= 【阶段四：老年/结局】 =================
  {
    id: 'elder_rich',
    title: '结局：高收入人生',
    description: '岁月如梭。回首这一生，你通过不懈的努力，获得了世俗意义上的巨大成功。',
    age: 'ELDER',
    bgImage: '/picture/4.2.2成功逆袭.png',
    choices: {
      good: { text: '回望财富与地位', memory: '账户里的数字，是你一生奋斗的最佳证明。' },
      bad: { text: '回望错过的风景', memory: '得到了全世界，却也失去了很多纯粹的快乐。' }
    }
  },
  {
    id: 'elder_academic',
    title: '结局：学者人生',
    description: '岁月如梭。你一生致力于探索真理，精神世界无比富足。',
    age: 'ELDER',
    bgImage: '/picture/4.2.2成功逆袭.png',
    choices: {
      good: { text: '回望学术成就', memory: '你的名字，留在了这片领域的历史中。' },
      bad: { text: '回望纯粹的内心', memory: '一辈子只做了一件事，且做到了极致。' }
    }
  },
  {
    id: 'elder_stable',
    title: '结局：稳定人生',
    description: '岁月如梭。没有大起大落，你拥有了一个安稳、平静且幸福的普通人的一生。',
    age: 'ELDER',
    bgImage: '/picture/4.2.2成功逆袭.png',
    choices: {
      good: { text: '回望平淡岁月', memory: '平安健康，本身就是一种巨大的成功。' },
      bad: { text: '回望安稳幸福', memory: '陪伴家人吃好每一顿饭，是最大的确幸。' }
    }
  },
  {
    id: 'elder_free',
    title: '结局：自由人生',
    description: '岁月如梭。你没有被世俗定义，始终跟随着自己的内心，体验了多彩的世界。',
    age: 'ELDER',
    bgImage: '/picture/4.2.2成功逆袭.png',
    choices: {
      good: { text: '回望沿途风景', memory: '世界是一本书，而你读完了很多精彩的章节。' },
      bad: { text: '回望自由灵魂', memory: '没有遗憾，因为每一天都是为自己而活。' }
    }
  },
  {
    id: 'elder_adventure',
    title: '结局：逆袭人生',
    description: '岁月如梭。从低谷到山巅，你的人生充满戏剧性，见证了无数奇迹。',
    age: 'ELDER',
    bgImage: '/picture/4.2.2成功逆袭.png',
    choices: {
      good: { text: '回望低谷挣扎', memory: '那些杀不死你的，最终让你变得更强大。' },
      bad: { text: '回望顶峰风光', memory: '你吃过的苦，最终都变成了光。' }
    }
  },
  {
    id: 'elder_family',
    title: '结局：顾家人生',
    description: '岁月如梭。虽然未能大富大贵，但身边始终有爱人的陪伴和家人的笑脸。',
    age: 'ELDER',
    bgImage: '/picture/4.2.2成功逆袭.png',
    choices: {
      good: { text: '回望家庭温馨', memory: '为家人遮风挡雨，是你这辈子最大的骄傲。' },
      bad: { text: '回望平凡感动', memory: '爱与被爱，构成了你生命中最暖的底色。' }
    }
  },
  {
    id: 'elder_boss',
    title: '结局：企业家人生',
    description: '岁月如梭。经历了无数次绝望与重生，你终于建立了自己的商业帝国。',
    age: 'ELDER',
    bgImage: '/picture/4.2.2成功逆袭.png',
    choices: {
      good: { text: '回望创业艰辛', memory: '几度浮沉，你最终证明了自己的商业眼光。' },
      bad: { text: '回望商业帝国', memory: '你改变了自己的人生，也改变了许多人的生活。' }
    }
  }
];