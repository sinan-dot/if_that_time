/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Chapter, RouteType } from "./types";
import { ORDINARY_CHAPTERS } from "./data/ordinaryChapters";
import { LEGEND_CHAPTERS } from "./data/legendChapters";

export const GAME_CONSTANTS = {
<<<<<<< HEAD
  SPEED: 4,
=======
  SPEED: 6, // 已经为你调慢了速度，方便玩家看清文字
>>>>>>> b7172eca649c623ad8096165b327d6f59cffe4d3
  TURN_SPEED_PERFECT: Math.PI / 2,
  TURN_SPEED_GREAT: Math.PI / 3,
  TURN_SPEED_OK: Math.PI / 6,
  REPAIR_INC: 20,
  MISS_DEC: 10,
};

export const BEAT_MS = 500;

<<<<<<< HEAD
// 根据路线类型获取对应的关卡数据
export function getChaptersByRoute(route: RouteType): Chapter[] {
  return route === 'ordinary' ? ORDINARY_CHAPTERS : LEGEND_CHAPTERS;
}

// 获取路线的起始章节ID
export function getStartChapterId(route: RouteType): string {
  const chapters = getChaptersByRoute(route);
  return chapters.length > 0 ? chapters[0].id : 'childhood_start';
}

// 导出各路线关卡（供外部直接访问）
export { ORDINARY_CHAPTERS, LEGEND_CHAPTERS };

// 向后兼容：CHAPTERS 指向平凡之路
export const CHAPTERS = ORDINARY_CHAPTERS;
=======
// 完美还原《模拟人生》文档的网状多结局大纲
export const CHAPTERS: Chapter[] = [
  // ================= 【阶段一：童年】 =================
  {
    id: 'event_001',
    title: '雷雨夜的被窝',
    description: '窗外雷声大作，你害怕地睡不着。',
    age: 'CHILDHOOD',
    bgImage: '/picture/1.1婴儿房.png', // 你可以根据你的素材库替换图片路径
    choices: {
      good: {
        text: '钻进父母房间',
        memory: '他们把你夹在中间，那是世界上最安全的堡垒。',
        impact: { car: 0, fam: 2, hea: 0, hap: 1 } 
      },
      bad: {
        text: '蒙住头强忍',
        memory: '你学会了在黑暗中自己消化恐惧。',
        impact: { car: 2, fam: -1, hea: 0, hap: 0 } // 独立算作事业/性格的隐性加分
      }
    }
  },

  {
    id: 'event_002',
    title: '死去的金鱼',
    description: '养了半个月的小金鱼翻了白肚皮。',
    age: 'CHILDHOOD',
    bgImage: '/picture/2.1小学教室.png',
    choices: {
      good: {
        text: '找个花盆埋了',
        memory: '你第一次笨拙地面对死亡，并学会了告别。',
        impact: { car: 0, fam: 0, hea: 1, hap: 1 }
      },
      bad: {
        text: '哭着要买新的',
        memory: '悲伤很快被新事物替代，但好像缺了点什么。',
        impact: { car: 0, fam: -1, hea: 0, hap: -1 }
      }
    }
  },

  // ================= 【童年期（3-12岁）：微小瞬间补充】 =================
  {
    id: 'event_003',
    title: '夏天舔冰淇淋',
    description: '炎热的下午，小卖部买的冰淇淋融化得很快。',
    age: 'CHILDHOOD',
    isSingle: true,
    bgImage: '/picture/2.3出去玩.png',
    choices: {
      good: {
        text: '看着融化的糖水流到手上',
        memory: '黏糊糊的，但那时候的快乐就是这么简单。',
        impact: { car: 0, fam: 1, hea: 0, hap: 2 }
      }
    }
  },
  {
    id: 'event_004',
    title: '雨天的水坑',
    description: '放学路上突然下起了大雨，路面坑坑洼洼。',
    age: 'CHILDHOOD',
    isSingle: true,
    bgImage: '/picture/2.3出去玩.png',
    choices: {
      good: {
        text: '故意一脚踩进最大的水坑',
        memory: '泥水溅湿了裤腿，换来了一场感冒和毫无顾忌的大笑。',
        impact: { car: 0, fam: 0, hea: -1, hap: 3 }
      }
    }
  },
  {
    id: 'event_005',
    title: '贴满贴纸的文具盒',
    description: '攒了好久的零花钱，买了一大板动画片贴纸。',
    age: 'CHILDHOOD',
    isSingle: true,
    bgImage: '/picture/2.1小学教室.png',
    choices: {
      good: {
        text: '把最喜欢的贴在正中间',
        memory: '那个花花绿绿的铁盒子，装满了你最初的审美和骄傲。',
        impact: { car: 0, fam: 0, hea: 0, hap: 2 }
      }
    }
  },
  {
    id: 'event_006',
    title: '老师的小红花',
    description: '今天上课回答问题特别大声，老师走到你桌前。',
    age: 'CHILDHOOD',
    isSingle: true,
    bgImage: '/picture/2.1小学教室.png',
    choices: {
      good: {
        text: '额头上被贴了一朵小红花',
        memory: '你挺起胸膛走回家，那是你人生中第一次体会到荣誉感。',
        impact: { car: 1, fam: 1, hea: 0, hap: 2 }
      }
    }
  },
  {
    id: 'event_007',
    title: '交换零食',
    description: '坐在大院的台阶上，旁边是邻居家的孩子。',
    age: 'CHILDHOOD',
    isSingle: true,
    bgImage: '/picture/2.3出去玩.png',
    choices: {
      good: {
        text: '用一包辣条换了一把彩虹糖',
        memory: '这是你人生中最基础的社交，也是最纯粹的友谊。',
        impact: { car: 0, fam: 1, hea: 0, hap: 2 }
      }
    }
  },
  {
    id: 'event_008',
    title: '第一次自己系鞋带',
    description: '蹲在门口，手里捏着两根长长的鞋带，满头大汗。',
    age: 'CHILDHOOD',
    isSingle: true,
    bgImage: '/picture/1.3普通家庭.png',
    choices: {
      good: {
        text: '打出一个歪歪扭扭的蝴蝶结',
        memory: '父母在一旁笑着摸了摸你的头，你觉得自己长大了。',
        impact: { car: 0, fam: 1, hea: 0, hap: 2 }
      }
    }
  },
  {
    id: 'event_009',
    title: '沙坑里的宝藏',
    description: '公园的沙坑里，你悄悄埋下了一颗漂亮的玻璃弹珠。',
    age: 'CHILDHOOD',
    isSingle: true,
    bgImage: '/picture/2.3出去玩.png',
    choices: {
      good: {
        text: '做好记号假装这是宝藏',
        memory: '后来你再也没找到它，但那个下午的冒险梦一直都在。',
        impact: { car: 0, fam: 0, hea: 0, hap: 2 }
      }
    }
  },
  {
    id: 'event_010',
    title: '动画片与作业',
    description: '电视里正在播最喜欢的动画片大结局，而书包还没拉开。',
    age: 'CHILDHOOD',
    isSingle: true,
    bgImage: '/picture/1.3普通家庭.png',
    choices: {
      good: {
        text: '看完这集再写吧',
        memory: '换来的是晚上的手忙脚乱和一顿责骂，但当时真的很快乐。',
        impact: { car: -1, fam: -1, hea: 0, hap: 2 }
      }
    }
  },
  {
    id: 'event_011',
    title: '草莓味退烧药',
    description: '额头发烫，浑身没力气地躺在被窝里。',
    age: 'CHILDHOOD',
    isSingle: true,
    bgImage: '/picture/1.1婴儿房.png',
    choices: {
      good: {
        text: '喝下妈妈端来的粉色药水',
        memory: '甜甜的草莓味，生病好像成了童年里理所当然享受优待的借口。',
        impact: { car: 0, fam: 1, hea: 1, hap: 1 }
      }
    }
  },
  {
    id: 'event_012',
    title: '睡前故事',
    description: '夜深了，你躺在小床上翻来覆去睡不着。',
    age: 'CHILDHOOD',
    isSingle: true,
    bgImage: '/picture/1.1婴儿房.png',
    choices: {
      good: {
        text: '听妈妈在床边讲故事',
        memory: '伴随着温柔的声音，你坠入了一个没有任何烦恼的甜梦。',
        impact: { car: 0, fam: 3, hea: 1, hap: 2 }
      }
    }
  },

  {
    id: 'event_013',
    title: '电视机的余温',
    description: '听到楼道里父母下班的脚步声。',
    age: 'CHILDHOOD',
    isSingle: true, // 【核心机制】：单线催泪点，屏幕正中间只刷出一个球
    bgImage: '/picture/1.2富裕家庭.png',
    choices: {
      good: {
        text: '用湿毛巾给电视机降温',
        memory: '那种混合着心虚和机智的心跳声，是童年独有的交响乐。',
        impact: { car: 1, fam: 0, hea: 0, hap: 1 }
      }
    }
  },

  {
    id: 'event_014',
    title: '偷穿大人的鞋',
    description: '穿上爸爸那双大皮鞋在客厅吧嗒吧嗒走。',
    age: 'CHILDHOOD',
    bgImage: '/picture/1.3普通家庭.png',
    choices: {
      good: {
        text: '盼望长大',
        memory: '你以为长大了，就能踩碎所有的烦恼。',
        impact: { car: 1, fam: 0, hea: 0, hap: 0 }
      },
      bad: {
        text: '觉得沉重',
        memory: '其实那双鞋很重，大人的世界也是。',
        impact: { car: 0, fam: 0, hea: 0, hap: 1 }
      }
    }
  },

  {
    id: 'event_015',
    title: '童年时光',
    description: '“我开始明白，人生的路，要靠自己一步一步走。”\n放学后，我更愿意...',
    age: 'CHILDHOOD',
    bgImage: '/picture/2.1小学教室.png', // 【新增】：填入对应的图片路径
    choices: {
      good: { // 左边赛道
        text: '回家认真写作业',
        memory: '“别人都在玩的时候，我知道，努力可能是我唯一的机会。”',
        impact: { car: 3, fam: 0, hea: -1, hap: -3 } // 导向学业路线
      },

      bad: {  // 右边赛道
        text: '和朋友出去玩',
        memory: '“成绩也许重要，但青春好像更值得珍惜。”',
        impact: { car: 1, fam: 0, hea: +3, hap: +3 } // 导向自由/社会路线
      }
    }
  },
  
  {
    id: 'event_016',
    title: '玻璃上的雨滴',
    description: '坐在大巴车靠窗的位置。',
    age: 'CHILDHOOD',
    isSingle: true, // 单线选项
    bgImage: '/picture/2.3出去玩.png',
    choices: {
      good: {
        text: '看两滴雨水赛跑',
        memory: '你曾以为自己能掌控万物，哪怕只是车窗上的两滴水。',
        impact: { car: 0, fam: 0, hea: 0, hap: 1 }
      }
    }
  },

  // ================= 【阶段二：青春】 =================
 // ================= 【青春期（12-18岁）：尴尬又闪光的瞬间】 =================
 {
  id: 'event_017',
  title: '被截获的纸条',
  description: '数学课上，你小心翼翼地把折好的纸条扔给后座。',
  age: 'YOUTH',
  isSingle: true,
  bgImage: '/picture/2.1小学教室.png', // 暂用教室背景
  choices: {
    good: {
      text: '被老师转身抓个正着',
      memory: '全班哄堂大笑中，你红着脸站了一整节课，那张纸条的内容成了永远的秘密。',
      impact: { car: -1, fam: 0, hea: 0, hap: -1 } // 事业-1，幸福-1 
    }
  }
},
{
  id: 'event_018',
  title: '省下的早饭钱',
  description: '路过校门口的书报亭，最新一期的漫画已经上架了。',
  age: 'YOUTH',
  isSingle: true,
  bgImage: '/picture/2.3出去玩.png',
  choices: {
    good: {
      text: '饿着肚子买下那本漫画',
      memory: '早读课上肚子咕咕叫，但摸着抽屉里崭新的书页，内心却无比满足。',
      impact: { car: -1, fam: -1, hea: -1, hap: 2 } // 事业-1，家庭-1，健康-1，幸福+2 
    }
  }
},
{
  id: 'event_019',
  title: '课本边缘的动画',
  description: '历史课实在太无聊了，你的笔尖不自觉地滑到了书页角落。',
  age: 'YOUTH',
  isSingle: true,
  bgImage: '/picture/2.1小学教室.png',
  choices: {
    good: {
      text: '画满了一整套火柴人连环画',
      memory: '快速翻动书页时，火柴人动了起来，那是你枯燥学业里最隐秘的杰作。',
      impact: { car: 0, fam: 0, hea: 0, hap: 2 } // 幸福+2 
    }
  }
},
{
  id: 'event_020',
  title: '操场上的星空',
  description: '晚自习前，你和最好的朋友偷偷溜到了操场草坪上。',
  age: 'YOUTH',
  isSingle: true,
  bgImage: '/picture/3.1操场夕阳教学楼.png',
  choices: {
    good: {
      text: '并排躺下看着头顶的夜空',
      memory: '你们聊着各自荒诞的梦想，以为这片星空和身边的朋友会永远陪伴自己。',
      impact: { car: 0, fam: 1, hea: 0, hap: 3 } // 家庭(羁绊)+1，幸福+3 
    }
  }
},
{
  id: 'event_021',
  title: '考前突击的夜晚',
  description: '明天就是期末考试了，看着还有大半本没背的政治书。',
  age: 'YOUTH',
  isSingle: true,
  bgImage: '/picture/2.2回家写作业.png',
  choices: {
    good: {
      text: '泡杯浓茶熬夜死记硬背',
      memory: '第二天顶着黑眼圈走进考场，那股临阵磨枪的冲劲，成了青春里特有的鸡血。',
      impact: { car: 2, fam: 0, hea: -1, hap: -1 } // 事业+2，健康-1，幸福-1 
    }
  }
},
{
  id: 'event_022',
  title: '没送出的信',
  description: '在本子上写下那个名字，又划掉，反反复复。',
  age: 'YOUTH',
  isSingle: true,
  bgImage: '/picture/2.1小学教室.png',
  choices: {
    good: {
      text: '偷偷写了一张充满暗示的纸条',
      memory: '哪怕最终没有勇气递出去，那份酸涩又甜蜜的悸动，依然填满了整个夏天。',
      impact: { car: 0, fam: 0, hea: 0, hap: 3 } // 幸福+3 
    }
  }
},
{
  id: 'event_023',
  title: '被撬开的日记本',
  description: '放学回家，发现抽屉里的带锁日记本有被强行翻动过的痕迹。',
  age: 'YOUTH',
  isSingle: true,
  bgImage: '/picture/1.3普通家庭.png',
  choices: {
    good: {
      text: '和父母爆发了激烈的争吵',
      memory: '你感觉自己最后的领地被侵犯了，那是青春期最强烈的阵痛和隔阂。',
      impact: { car: 0, fam: -3, hea: 0, hap: -2 } // 家庭-3，幸福-2 
    }
  }
},
{
  id: 'event_024',
  title: '逃避八百米',
  description: '体育老师吹响了哨子，今天又要测八百米长跑。',
  age: 'YOUTH',
  isSingle: true,
  bgImage: '/picture/3.1操场夕阳教学楼.png',
  choices: {
    good: {
      text: '捂着肚子去树荫下休息',
      memory: '看着同学们在烈日下奔跑，你喝着冰水，享受着这片刻来之不易的“特权”。',
      impact: { car: 0, fam: 0, hea: 0, hap: 1 } // 幸福+1 
    }
  }
},
{
  id: 'event_025',
  title: '写满名字的校服',
  description: '毕业典礼结束后，大家拿着马克笔互相在校服上签字。',
  age: 'YOUTH',
  isSingle: true,
  bgImage: '/picture/3.1操场夕阳教学楼.png',
  choices: {
    good: {
      text: '找那个特别的人签在心口处',
      memory: '那件五颜六色的校服后来被压在了箱底，但那天的蝉鸣和眼泪，你记了很久很久。',
      impact: { car: 0, fam: 2, hea: 0, hap: 3 } // 家庭(羁绊)+2，幸福+3 
    }
  }
},
  {
    id: 'event_026',
    title: '800米测试的终点',
    description: '肺里像吞了刀片，终点就在眼前。',
    age: 'YOUTH',
    bgImage: '/picture/3.1操场夕阳教学楼.png',
    choices: {
      good: {
        text: '死命冲刺',
        memory: '你第一次尝到拼尽全力后喉咙里的血腥味。',
        impact: { car: 3, fam: 0, hea: -2, hap: 0 }
      },
      bad: {
        text: '慢跑过线',
        memory: '尽力就好，你接过同学递来的冰镇汽水，也很快乐。',
        impact: { car: -1, fam: 0, hea: 2, hap: 1 } // 补充了一点幸福感
      }
    }
  },
 
  {
    id: 'event_027',
    title: '晚自习后的晚霞',
    description: '做完一套理综卷子，抬头看向窗外，天边是被夕阳烧透的火烧云，美得惊心动魄。',
    age: 'YOUTH',
    bgImage: '/picture/3.1操场夕阳教学楼.png',
    choices: {
      good: {
        text: '驻足安静观看',
        memory: '那天的风很柔和，你发觉世界上除了成绩，还有很多值得浪费时间的美好。',
        impact: { car: -1, fam: 0, hea: 1, hap: 4 }
      },
      bad: {
        text: '继续背下一页',
        memory: '错过了晚霞，但你坚信自己正在奔向更耀眼的未来。',
        impact: { car: 3, fam: 0, hea: -1, hap: -2 }
      }
    }
  },

  {
    id: 'event_028',
    title: '晚自习的停电',
    description: '教室突然陷入黑暗，全班爆发出欢呼。',
    age: 'YOUTH',
    bgImage: '/picture/2.1小学教室.png',
    choices: {
      good: {
        text: '趁黑聊天',
        memory: '那是你们在沉重的升学压力下，最自由的十分钟。',
        impact: { car: -1, fam: 0, hea: 0, hap: 3 }
      },
      bad: {
        text: '点起蜡烛做题',
        memory: '微弱的光照亮了函数题，也照亮了你孤注一掷的野心。',
        impact: { car: 2, fam: 0, hea: 0, hap: -1 }
      }
    }
  },

  {
    id: 'event_029',
    title: '饭桌上的争吵',
    description: '父母因为一点琐事在饭桌上突然拔高了音量，气氛降到了冰点，只剩电视机里微弱的广告声。',
    age: 'CHILDHOOD',
    bgImage: '/picture/1.3普通家庭.png', 
    choices: {
      good: {
        text: '试图转移话题',
        memory: '你过早地学会了察言观色，成为了维系这个家温度的隐形纽带。',
        impact: { car: 0, fam: 3, hea: 0, hap: 1 } 
      },
      bad: {
        text: '默默躲回房间',
        memory: '隔绝了门外的声音，你学会了在自己的小世界里寻找安全感。',
        impact: { car: 1, fam: -2, hea: 0, hap: -2 } 
      }
    }
  },
 
  {
    id: 'event_030',
    title: '校服上的洗衣液',
    description: '走廊里，那个你暗恋的人擦肩而过。',
    age: 'YOUTH',
    isSingle: true, // 单线催泪点
    bgImage: '/picture/3.1操场夕阳教学楼.png',
    choices: {
      good: {
        text: '闻到奥妙洗衣液味',
        memory: '后来的很多年，你闻到这个味道，都会想起那个夏天的风。',
        impact: { car: 0, fam: 0, hea: 0, hap: 2 }
      }
    }
  },

  {
    id: 'event_031',
    title: '抽屉里的那封信',
    description: '一封折叠成心形的信静静躺在你的抽屉里，落款是你一直偷偷关注的那个名字。',
    age: 'YOUTH',
    bgImage: '/picture/2.1小学教室.png', // 暂用教室背景
    choices: {
      good: {
        text: '回一封信赴约',
        memory: '那是一段青涩得能掐出水的时间，连空气里都是夏天橘子味的味道。',
        impact: { car: -2, fam: -1, hea: 0, hap: 5 }
      },
      bad: {
        text: '夹进日记本深处',
        memory: '理智战胜了悸动，那个名字成了你整个青春里不敢翻阅的秘密。',
        impact: { car: 2, fam: 1, hea: 0, hap: -3 }
      }
    }
  },
  
  {
    id: 'event_032',
    title: '撕裂的成绩单',
    description: '模考失利，分数低得刺眼。',
    age: 'YOUTH',
    bgImage: '/picture/3.2全力冲刺.png',
    choices: {
      good: {
        text: '边哭边分析错题',
        memory: '眼泪掉在卷子上晕开了墨水，你把委屈咽了下去。',
        impact: { car: 3, fam: 0, hea: -1, hap: 0 }
      },
      bad: {
        text: '藏起来不敢给父母',
        memory: '逃避可耻，但那时你真的觉得天塌了。',
        impact: { car: -1, fam: -2, hea: 0, hap: -1 }
      }
    }
  },

  {
    id: 'event_033',
    title: '毕业晚会的晚霞',
    description: '操场上放着《北京东路的日子》。',
    age: 'YOUTH',
    isSingle: true, // 单线催泪点
    bgImage: '/picture/3.1操场夕阳教学楼.png',
    choices: {
      good: {
        text: '看一眼空荡荡的教室',
        memory: '你突然意识到，有些人，这辈子真的是最后一次见到了。',
        impact: { car: 0, fam: 0, hea: 0, hap: 1 }
      }
    }
  },

  {
    id: 'event_034',
    title: '青春的十字路口',
    description: '“第一次，我认真思考未来。想成为什么样的人？”\n高考临近，我决定...',
    age: 'YOUTH',
    bgImage: '/picture/3.1操场夕阳教学楼.png', // 【新增】：进入这条线后，背景自动切换
    choices: {
      good: {
        text: '全力冲刺重点大学',
        memory: '无数个熬夜苦读的夜晚，换来了一纸名校录取通知书。',
        impact: { car: 3, fam: -1, hea: -2, hap: 0 }
      },
      bad: {
        text: '选择普通大学稳步前进',
        memory: '没有极度的内卷，获得了相对平和的校园时光。',
        impact: { car: 1, fam: 0, hea: +2, hap: +2 }
      }
    }
  },
  {
    id: 'event_035',
    title: '青春的躁动',
    description: '“第一次，我认真思考未来。想成为什么样的人？”\n看着同龄人埋头苦读，我决定...',
    age: 'YOUTH',
    bgImage: '/picture/3.2操场夕阳教学楼.png', // 【新增】：进入这条线后，背景自动切换
    choices: {
      good: {
        text: '提前进入社会打拼',
        memory: '提早步入社会，感受到了人情冷暖与赚钱的不易。',
        impact: { car: 2, fam: -2, hea: -2, hap: -3 }
      },
      bad: {
        text: '和朋友尝试小成本创业',
        memory: '拿着微薄的本金，开启了充满未知与风险的创业路。',
        impact: { car: 2, fam: -2, hea: -2, hap: -2 }
      }
    }
  },

  // ================= 【阶段三：成年】 =================

  // ================= 【青年期（18-25岁）：大学与初入社会的碎片】 =================
  {
    id: 'event_036',
    title: '违规电器的代价',
    description: '瞒着宿管阿姨，整个宿舍围在偷偷买的小电锅旁等水烧开。',
    age: 'YOUTH',
    isSingle: true,
    bgImage: '/picture/2.1小学教室.png', // 暂时代替宿舍背景
    choices: {
      good: {
        text: '刚下入肥牛卷，突然整层楼断电',
        memory: '在一片漆黑中，大家默契地爆发出大笑。那是穷开心最极致的模样。',
        impact: { car: 0, fam: 2, hea: 0, hap: 3 }
      }
    }
  },
  {
    id: 'event_037',
    title: '图书馆的晨光',
    description: '期末周/考研前，早上六点半就在寒风中排队。',
    age: 'YOUTH',
    isSingle: true,
    bgImage: '/picture/3.2全力冲刺.png',
    choices: {
      good: {
        text: '冲刺到三楼抢到了靠窗的座位',
        memory: '看着阳光洒在摊开的书本上，你觉得未来充满了清晰的希望。',
        impact: { car: 1, fam: 0, hea: 0, hap: 2 }
      }
    }
  },
  {
    id: 'event_038',
    title: '廉价的通宵KTV',
    description: '舍友失恋，大家在包厢里鬼哭狼嚎到天亮。',
    age: 'YOUTH',
    isSingle: true,
    bgImage: '/picture/2.3出去玩.png',
    choices: {
      good: {
        text: '第二天顶着鸡窝头去上早八',
        memory: '教授在讲台上催眠，你的灵魂却还在昨夜的《死了都要爱》里飘荡。',
        impact: { car: -1, fam: 1, hea: -2, hap: 2 }
      }
    }
  },
  {
    id: 'event_039',
    title: '第一笔沉甸甸的入账',
    description: '手机震动，短信提示银行卡收入了一笔微薄但真实的实习工资。',
    age: 'ADULT',
    isSingle: true,
    bgImage: '/picture/3.4提前工作.png',
    choices: {
      good: {
        text: '立刻截图发到了家族群里',
        memory: '看着父母发来的满屏大拇指表情包，你第一次感受到了独立的重量。',
        impact: { car: 1, fam: 1, hea: 0, hap: 3 }
      }
    }
  },
  {
    id: 'event_040',
    title: '别扭的冷战',
    description: '因为值日扫地的小事，和最好的室友冷战了三天。',
    age: 'YOUTH',
    isSingle: true,
    bgImage: '/picture/1.3普通家庭.png',
    choices: {
      good: {
        text: '收到他顺手帮忙打的一份午饭',
        memory: '你们谁也没道歉，但两块钱的酱香饼就让一切烟消云散了。',
        impact: { car: 0, fam: 2, hea: 0, hap: 2 }
      }
    }
  },
  {
    id: 'event_041',
    title: '押一付三的重量',
    description: '跟着中介爬了七楼，看着有些破旧的墙皮。',
    age: 'ADULT',
    isSingle: true,
    bgImage: '/picture/3.4提前工作.png',
    choices: {
      good: {
        text: '咬牙在租房合同上签下名字',
        memory: '走出小区大门，你正式成为了这座城市里的一只候鸟。',
        impact: { car: 1, fam: 0, hea: 0, hap: 2 }
      }
    }
  },
  {
    id: 'event_042',
    title: '食堂的隐藏偏爱',
    description: '饿着肚子冲到二食堂，指着快见底的红烧肉。',
    age: 'YOUTH',
    isSingle: true,
    bgImage: '/picture/2.3出去玩.png',
    choices: {
      good: {
        text: '阿姨手一抖，多给了一大勺肉',
        memory: '在这个充满焦虑的学期末，这一勺碳水和脂肪是最好的心理按摩。',
        impact: { car: 0, fam: 1, hea: 0, hap: 2 }
      }
    }
  },
  {
    id: 'event_043',
    title: '文档的最后一段',
    description: '凌晨两点，终于敲完了毕业论文正文，光标停在“致谢”页面。',
    age: 'YOUTH',
    isSingle: true,
    bgImage: '/picture/2.2回家写作业.png',
    choices: {
      good: {
        text: '写下“感谢这四年的自己”时红了眼眶',
        memory: '几万字的学术垃圾里，只有最后这几百字，字字句句都是滚烫的青春。',
        impact: { car: 0, fam: 1, hea: 0, hap: 2 }
      }
    }
  },
  {
    id: 'event_044',
    title: '辗转反侧的夜',
    description: '明天是心仪大厂的终面，你躺在床上脑子里不断预演自我介绍。',
    age: 'ADULT',
    isSingle: true,
    bgImage: '/picture/1.1婴儿房.png', // 暂代卧室黑夜背景
    choices: {
      good: {
        text: '看着窗外天色一点点变亮',
        memory: '那种对未知的极度渴望与恐惧交织的感觉，在未来的日子里还会重演无数次。',
        impact: { car: -1, fam: 0, hea: -1, hap: -2 }
      }
    }
  },
  {
    id: 'event_045',
    title: '关上的那扇门',
    description: '舍友们都走光了，曾经拥挤吵闹的房间变得空空荡荡。',
    age: 'YOUTH',
    isSingle: true,
    bgImage: '/picture/3.1操场夕阳教学楼.png',
    choices: {
      good: {
        text: '交还钥匙，最后听一次落锁的声音',
        memory: '你关上的不仅是一扇门，更是人生中最无忧无虑的四年。',
        impact: { car: 0, fam: 1, hea: 0, hap: 1 }
      }
    }
  },
  {
    id: 'event_46',
    title: '学业路线：职场起步',
    description: '“长大以后才发现，最难的不是选择，而是承担结果。”\n名校毕业后...',
    age: 'ADULT',
    bgImage: '/picture/4.1.1重点大学.png', // 【新增】：进入这条线后，背景自动切换
    choices: {
      good: {
        text: '进入大厂，追求高薪',
        memory: '深夜的办公室和加班灯光，成为了生活的常态。',
        impact: { car: 3, fam: -3, hea: -3, hap: -2 } // 结局：高收入人生
      },
      bad: {
        text: '考研深造，追求学术',
        memory: '选择了学术的孤寂，在实验室里度过无数日夜。',
        impact: { car: 3, fam: -1, hea: -1, hap: +2 } // 结局：学者人生
      }
    }
  },
  
  {
    id: 'event_047',
    title: '平凡路线：步入社会',
    description: '没有名校光环，面临着第一份工作的抉择。我更看重...',
    age: 'ADULT',
    bgImage: '/picture/3.5创业.png', // 【新增】：进入这条线后，背景自动切换
    choices: {
      good: {
        text: '追求稳定，考公考编',
        memory: '选择了朝九晚五的规律生活，平淡却安心。',
        impact: { car: 1, fam: +2, hea: +2, hap: +2 } // 结局：稳定人生
      },
      bad: {
        text: '追求自由，做自由职业',
        memory: '在咖啡馆办公，虽然未来不确定，但内心丰盈。',
        impact: { car: 1, fam: +1, hea: +2, hap: +3 }// 结局：自由人生
      }
    }
  },

  {
    id: 'event_048',
    title: '第一次自己签合同',
    description: '看着长长的租房条款。',
    age: 'ADULT',
    isSingle: true, // 单线催泪点
    bgImage: '/picture/3.4提前工作.png',
    choices: {
      good: {
        text: '郑重按下手印',
        memory: '没有人教你大人该怎么做，你只能假装自己已经是个大人了。',
        impact: { car: 1, fam: 0, hea: 0, hap: 0 }
      }
    }
  },

  {
    id: 'event_049',
    title: '修改了18次的PPT',
    description: '客户在群里发了一句“还是用第一版吧”。',
    age: 'ADULT',
    bgImage: '/picture/3.4提前工作.png',
    choices: {
      good: {
        text: '默默回复“收到”',
        memory: '职场的第一课：情绪是最没用的东西。',
        impact: { car: 2, fam: 0, hea: 0, hap: -2 } 
      },
      bad: {
        text: '去楼梯间抽根烟/哭一场',
        memory: '短暂的崩溃后，还要回去补个妆继续敲键盘。',
        impact: { car: 0, fam: 0, hea: -2, hap: 1 } 
      }
    }
  },

  {
    id: 'event_050',
    title: '凌晨三点的高架桥',
    description: '连续加班一周后，你坐在回家的出租车上，看着车窗外空荡荡的高架桥和路灯。老板刚好发来一个紧急的新任务。',
    age: 'ADULT',
    bgImage: '/picture/3.4提前工作.png', // 采用工作相关的背景
    choices: {
      good: {
        text: '揉眼打开电脑回复',
        memory: '城市的霓虹灯没有一盏为你而亮，但你银行卡里的数字让你感到一种冰冷的安全感。',
        impact: { car: 6, fam: -2, hea: -4, hap: 0 } // 极致的拿命换钱
      },
      bad: {
        text: '锁屏闭上眼睛睡觉',
        memory: '地球离了谁都会转，但你现在只想好好爱自己。',
        impact: { car: -4, fam: 0, hea: 3, hap: 2 } 
      }
    }
  },

  {
    id: 'event_051',
    title: '老家的一通电话',
    description: '电话那头，母亲的声音有些疲惫，说父亲生了小病住院了，让你别担心，好好工作。',
    age: 'ADULT',
    bgImage: '/picture/1.3普通家庭.png', // 切回家乡背景
    choices: {
      good: {
        text: '买最近的高铁回家',
        memory: '坐在病床前削苹果的那一刻你才发现，父母真的老了，老得像两片秋天的叶子。',
        impact: { car: -3, fam: 6, hea: 0, hap: 1 } 
      },
      bad: {
        text: '转钱托亲戚照顾',
        memory: '你用努力赚来的钱解决了问题，但挂掉电话后，心里却空了一大块。',
        impact: { car: 2, fam: -4, hea: 0, hap: -2 } 
      }
    }
  },

  {
    id: 'event_052',
    title: '合租房的隔音',
    description: '凌晨一点，隔壁情侣又在吵架。',
    age: 'ADULT',
    bgImage: '/picture/3.4提前工作.png',
    choices: {
      good: {
        text: '带上降噪耳机',
        memory: '在这座拥挤的城市里，花钱买安静是你最后的体面。',
        impact: { car: 0, fam: 0, hea: 1, hap: -1 } 
      },
      bad: {
        text: '敲墙警告',
        memory: '你还没完全褪去学生时代的棱角。',
        impact: { car: 0, fam: 0, hea: -1, hap: 1 } 
      }
    }
  },

  {
    id: 'event_053',
    title: '便利店的关东煮',
    description: '连续加班到深夜，冷风刺骨。',
    age: 'ADULT',
    isSingle: true, // 单线催泪点
    bgImage: '/picture/3.4提前工作.png',
    choices: {
      good: {
        text: '捧着热乎乎的纸杯',
        memory: '氤氲的热气模糊了眼镜，你突然很想吃妈妈包的饺子。',
        impact: { car: 0, fam: 1, hea: 1, hap: -1 }
      }
    }
  },

  {
    id: 'event_054',
    title: '同学聚会的敬酒',
    description: '看着当年睡上铺的兄弟如今大腹便便。',
    age: 'ADULT',
    bgImage: '/picture/2.3出去玩.png',
    choices: {
      good: {
        text: '端起酒杯迎合',
        memory: '大家都戴上了面具，熟练地谈论着学区房和股票。',
        impact: { car: 2, fam: 0, hea: -2, hap: 0 } 
      },
      bad: {
        text: '借口开车喝茶',
        memory: '你不再强求圈子，觉得三两知己足以慰风尘。',
        impact: { car: -1, fam: 0, hea: 2, hap: 1 } 
      }
    }
  },

  {
    id: 'event_055',
    title: '前任的朋友圈',
    description: '那个熟悉的头像发了婚纱照。',
    age: 'ADULT',
    bgImage: '/picture/2.3出去玩.png',
    choices: {
      good: {
        text: '点个赞然后屏蔽',
        memory: '体面的告别，是放过他，也放过自己。',
        impact: { car: 0, fam: -2, hea: 0, hap: 2 } 
      },
      bad: {
        text: '深夜点开看很久',
        memory: '其实你怀念的不是那个人，而是当初奋不顾身的自己。',
        impact: { car: 0, fam: -1, hea: 0, hap: -3 } 
      }
    }
  },

  {
    id: 'event_056',
    title: '车库里的十分钟',
    description: '停好车，熄火，但不想马上上楼。',
    age: 'ADULT',
    isSingle: true, // 单线催泪点
    bgImage: '/picture/3.4提前工作.png',
    choices: {
      good: {
        text: '在黑暗中独自坐一会儿',
        memory: '推开车门你就是父母/员工，只有在这狭小的车厢里，你才是你自己。',
        impact: { car: 0, fam: 0, hea: 0, hap: 1 }
      }
    }
  },

  {
    id: 'event_057',
    title: '冒险路线：社会大学',
    description: '过早离开校园，你在外地打拼，经历了漫长的低谷...',
    age: 'ADULT',
    bgImage: '/picture/3.4提前工作.png', // 【新增】：进入这条线后，背景自动切换
    choices: {
      good: {
        text: '咬牙坚持，绝不认输',
        memory: '挺过了最难熬的日子，遇到贵人，迎来了人生反转。',
        impact: { car: 3, fam: +2, hea: +1, hap: +2 } // 结局：逆袭人生
      },
      bad: {
        text: '妥协退让，回老家发展',
        memory: '放下了在外漂泊的执念，选择了陪伴与家庭的温暖。',
        impact: { car: 1, fam: +2, hea: +2, hap: +1 } // 结局：顾家人生
      }
    }
  },
  {
    id: 'event_058',
    title: '创业路线：创业维艰',
    description: '第一次创业失败，面临巨额负债的低谷，我选择...',
    age: 'ADULT',
    bgImage: '/picture/3.3创业失败.png', // 【新增】：进入这条线后，背景自动切换
    choices: {
      good: {
        text: '顶着负债再次尝试',
        memory: '在绝望中寻找生机，最终抓住了风口，成功逆袭。',
        impact: { car: 3, fam: -2, hea: -3, hap: +2 }// 结局：企业家人生
      },
      bad: {
        text: '找份普通工作还债',
        memory: '认清了现实，学会了向生活低头，踏实过好每一天。',
        impact: { car: +1, fam: -2, hea: -3, hap: -1 } // 结局：顾家人生
      }
    }
  },

  // ================= 【阶段四：老年/结局 (没有 nextId 触发结算)】 =================
  {
    id: 'event_059',
    title: '落灰的吉他/画笔',
    description: '大扫除时，从床底拖出了大学时攒钱买的吉他/画卷。',
    age: 'ADULT',
    bgImage: '/picture/1.3普通家庭.png',
    choices: {
      good: {
        text: '挂到闲鱼二手卖掉',
        memory: '你用青春的遗物，换了半罐奶粉钱。',
        impact: { car: 1, fam: 1, hea: 0, hap: -2 } 
      },
      bad: {
        text: '擦去灰尘塞回柜子',
        memory: '你没时间弹了，但留着它，就好像那个意气风发的自己还没死。',
        impact: { car: -1, fam: 0, hea: 0, hap: 1 } 
      }
    }
  },
  {
    id: 'event_060',
    title: '二手房的钥匙',
    description: '掏空了双方父母的积蓄，加上三十年的贷款，你拿到了这把沉甸甸的钥匙。',
    age: 'ADULT',
    isSingle: true,
    bgImage: '/picture/3.4提前工作.png',
    choices: {
      good: {
        text: '在毛坯房里席地而坐',
        memory: '你终于在这座钢铁丛林里有了属于自己的避难所，代价是戴上了三十年的枷锁。',
        impact: { car: 1, fam: 1, hea: 0, hap: -1 }
      }
    }
  },
  {
    id: 'event_061',
    title: '微信里的借钱消息',
    description: '曾经睡在上铺的兄弟发来长语音，支支吾吾地想借三万块钱。',
    age: 'ADULT',
    bgImage: '/picture/3.4提前工作.png',
    choices: {
      good: {
        text: '瞒着家里转了一半',
        memory: '这笔钱也许回不来了，但你当花钱买回了当年的青春。',
        impact: { car: -2, fam: 2, hea: 0, hap: -1 } 
      },
      bad: {
        text: '找个理由委婉拒绝',
        memory: '成年人的体面往往从拒绝朋友开始。那之后，你们再也没有联系过。',
        impact: { car: 1, fam: -3, hea: 0, hap: -1 } 
      }
    }
  },
  {
    id: 'event_062',
    title: '深夜的末班地铁',
    description: '整个车厢空空荡荡，对面的玻璃倒映出你疲惫的脸。',
    age: 'ADULT',
    isSingle: true,
    bgImage: '/picture/3.4提前工作.png',
    choices: {
      good: {
        text: '看着玻璃里的自己发呆',
        memory: '你突然记不起，十八岁那年站在操场上，想成为的到底是个什么样的人了。',
        impact: { car: 0, fam: 0, hea: -1, hap: -1 }
      }
    }
  },
  {
    id: 'event_063',
    title: '双十一的购物车',
    description: '结账前，你看了一眼长长的列表。',
    age: 'ADULT',
    bgImage: '/picture/1.3普通家庭.png',
    choices: {
      good: {
        text: '清空家人，删掉自己',
        memory: '你变成了最称职的家长，却唯独忘记了讨好自己。',
        impact: { car: -1, fam: 3, hea: 0, hap: -2 } 
      },
      bad: {
        text: '咬牙买下昂贵的外套',
        memory: '穿上它的那一刻你很高兴，但随之而来的是隐隐的负罪感。',
        impact: { car: -2, fam: -1, hea: 0, hap: 3 } 
      }
    }
  },
  {
    id: 'event_064',
    title: '熟悉的香水味',
    description: '在拥挤的街头，突然闻到了当年初恋最爱用的那款香水。',
    age: 'ADULT',
    isSingle: true,
    bgImage: '/picture/2.3出去玩.png',
    choices: {
      good: {
        text: '猛地回头看茫茫人海',
        memory: '其实你早就忘了那张脸，你只是怀念那个连风都温柔的年纪。',
        impact: { car: 0, fam: 0, hea: 0, hap: -1 }
      }
    }
  },
  {
    id: 'event_065',
    title: '被退回的方案',
    description: '熬夜三个通宵的方案，被领导轻飘飘地扔回桌上：“重做”。',
    age: 'ADULT',
    bgImage: '/picture/3.4提前工作.png',
    choices: {
      good: {
        text: '忍着胃痛笑着说好',
        memory: '银行卡的余额，治好了你所有的脾气。',
        impact: { car: 3, fam: 0, hea: -3, hap: -2 } 
      },
      bad: {
        text: '工牌拍在桌上裸辞',
        memory: '推开公司大门的那一刻阳光刺眼，你迎来了短暂的、奢侈的自由。',
        impact: { car: -4, fam: 0, hea: 2, hap: 4 } 
      }
    }
  },

  {
    id: 'event_066',
    title: '父母的旧房子',
    description: '处理后事时，你在抽屉最深处找到了一个铁盒，里面全是你从小到大的奖状和旧车票。',
    age: 'ADULT', // 统一使用 ADULT 阶段
    isSingle: true,
    bgImage: '/picture/1.3普通家庭.png',
    choices: {
      good: {
        text: '在旧沙发上放声大哭',
        memory: '这个世界上，最后那个无论你贫穷富有都无条件爱你的人，不在了。',
        impact: { car: 0, fam: -3, hea: 0, hap: -3 }
      }
    }
  },
  {
    id: 'event_067',
    title: '保温杯里的枸杞',
    description: '降温了，你破天荒地主动穿上了秋裤。',
    age: 'ADULT',
    bgImage: '/picture/3.4提前工作.png',
    choices: {
      good: {
        text: '承认老了，开始养生',
        memory: '你学会了向岁月低头，毕竟健康的活着比什么都重要。',
        impact: { car: -1, fam: 0, hea: 3, hap: 0 } 
      },
      bad: {
        text: '拒绝服老，熬夜拼酒',
        memory: '你维持着年轻的假象，直到下一次体检报告给了你一记重锤。',
        impact: { car: 2, fam: 0, hea: -4, hap: 0 } 
      }
    }
  },
  {
    id: 'event_068',
    title: '孩子的高考志愿',
    description: '孩子指着一个冷门且离家很远的专业，眼神倔强。',
    age: 'ADULT',
    bgImage: '/picture/1.3普通家庭.png',
    choices: {
      good: {
        text: '强行改成离家近的热门',
        memory: '你以“过来人”的名义赢了这场争吵，却在孩子眼里看到了你当年最讨厌的大人的影子。',
        impact: { car: 2, fam: -3, hea: 0, hap: 0 } 
      },
      bad: {
        text: '叹气说“你自己决定吧”',
        memory: '你明白，每个人的人生必须要自己去撞一次南墙。',
        impact: { car: 0, fam: 2, hea: 0, hap: 1 } 
      }
    }
  },
  {
    id: 'event_069',
    title: '空巢的第一个周末',
    description: '孩子去外地上大学了，原本喧闹的家里突然静得可怕。',
    age: 'ADULT',
    isSingle: true,
    bgImage: '/picture/1.3普通家庭.png',
    choices: {
      good: {
        text: '做了一桌菜，两副碗筷',
        memory: '你用了十八年教他如何飞翔，如今他终于飞走，你却不知道这漫长的余生该怎么熬。',
        impact: { car: 0, fam: -1, hea: 0, hap: -2 }
      }
    }
  },
  {
    id: 'event_070',
    title: '镜子里的白发',
    description: '早上洗漱时，你拨开头发，看到了藏在里面的一大簇白发。',
    age: 'ADULT',
    bgImage: '/picture/1.3普通家庭.png',
    choices: {
      good: {
        text: '买染发剂小心翼翼染黑',
        memory: '你还在努力维持着职场上不衰的斗志。',
        impact: { car: 1, fam: 0, hea: 0, hap: -1 } 
      },
      bad: {
        text: '对着镜子笑了笑随它去',
        memory: '你终于放下了对外貌的焦虑，学会了接纳不完美的自己。',
        impact: { car: 0, fam: 0, hea: 1, hap: 2 } 
      }
    }
  },
  {
    id: 'event_071',
    title: '新来的零零后实习生',
    description: '他用最新的AI工具，半小时做完了你熬夜一晚上的表格。',
    age: 'ADULT',
    isSingle: true,
    bgImage: '/picture/3.4提前工作.png',
    choices: {
      good: {
        text: '看着他年轻朝气的脸庞',
        memory: '你没有嫉妒，只是突然想起，二十年前你也是这样冲进这家公司的。',
        impact: { car: -1, fam: 0, hea: 0, hap: 1 }
      }
    }
  },
  {
    id: 'event_072',
    title: '久违的二人世界',
    description: '结婚纪念日，没有孩子的打扰，你们坐在高档餐厅里。',
    age: 'ADULT',
    bgImage: '/picture/2.3出去玩.png',
    choices: {
      good: {
        text: '相顾无言聊孩子',
        memory: '你们早就变成了最熟悉的室友，爱情早已在柴米油盐中风干。',
        impact: { car: 0, fam: -1, hea: 0, hap: -1 } 
      },
      bad: {
        text: '举起酒杯轻轻碰一下',
        memory: '走过半生风雨，你发现身边这个人，依然是你最坚实的底气。',
        impact: { car: 0, fam: 3, hea: 0, hap: 2 } 
      }
    }
  },
  {
    id: 'event_073',
    title: '旧手机里的语音',
    description: '翻出一支充不上电的旧手机，里面有一条五年前某人发来的未读语音。',
    age: 'ADULT',
    bgImage: '/picture/1.3普通家庭.png',
    choices: {
      good: {
        text: '找线充上电按下播放',
        memory: '那句没有听到的对不起，迟到了整整五年，早已物是人非。',
        impact: { car: 0, fam: 2, hea: 0, hap: -3 } 
      },
      bad: {
        text: '随手丢进抽屉深处',
        memory: '有些故事，没有结局就是最好的结局。',
        impact: { car: 0, fam: 0, hea: 0, hap: 1 } 
      }
    }
  },
  {
    id: 'event_074',
    title: '退休的第一天',
    description: '闹钟没有响，你六点就醒了，看着天花板不知道今天该干嘛。',
    age: 'ELDER',
    isSingle: true,
    bgImage: '/picture/1.3普通家庭.png',
    choices: {
      good: {
        text: '交出工牌的那一刻',
        memory: '你这辈子最大的标签被撕掉了，你不再是谁的总监，你只是一个普通的老人。',
        impact: { car: -5, fam: 0, hea: 0, hap: -1 }
      }
    }
  },
  {
    id: 'event_075',
    title: '逐渐模糊的视力',
    description: '看报纸时，你不得不把手伸得很远，最终还是拿起了老花镜。',
    age: 'ELDER',
    bgImage: '/picture/1.3普通家庭.png',
    choices: {
      good: {
        text: '戴上眼镜看阳光洒在阳台',
        memory: '世界虽然模糊了，但心里的风景却越来越清晰。',
        impact: { car: 0, fam: 0, hea: -1, hap: 2 } 
      },
      bad: {
        text: '烦躁地把报纸扔在一边',
        memory: '面对身体零件的逐渐老化，你感到深深的无力。',
        impact: { car: 0, fam: 0, hea: -2, hap: -2 } 
      }
    }
  },
  {
    id: 'event_076',
    title: '公园的相亲角',
    description: '你背着手逛公园，看着树上挂满了年轻人的简历。',
    age: 'ELDER',
    isSingle: true,
    bgImage: '/picture/2.3出去玩.png',
    choices: {
      good: {
        text: '驻足看了一会儿',
        memory: '你突然觉得好笑，人这一生所有的爱恨情仇，最后居然被浓缩成了一张写着户口和年薪的A4纸。',
        impact: { car: 0, fam: 0, hea: 0, hap: 1 }
      }
    }
  },
  {
    id: 'event_077',
    title: '忘记的名字',
    description: '在街上遇到一个非常眼熟的老友，话到嘴边，你却怎么也叫不出他的名字。',
    age: 'ELDER',
    bgImage: '/picture/2.3出去玩.png',
    choices: {
      good: {
        text: '尴尬地笑着掩饰',
        memory: '你害怕承认，时间的橡皮擦已经开始在你的脑海里工作了。',
        impact: { car: 0, fam: 0, hea: 0, hap: -1 } 
      },
      bad: {
        text: '坦诚地说年纪大了',
        memory: '坦然面对衰老，也是一种豁达。',
        impact: { car: 0, fam: 0, hea: -1, hap: 2 } 
      }
    }
  },
  {
    id: 'event_078',
    title: '病床前的签字',
    description: '这次换成了你躺在床上，看着孩子拿着笔在手术同意书上签字。',
    age: 'ELDER',
    isSingle: true,
    bgImage: '/picture/1.3普通家庭.png',
    choices: {
      good: {
        text: '看着他发抖的手',
        memory: '生命的轮回在此刻闭环，那个曾经躲在你身后的孩子，如今成了替你挡住死神的人。',
        impact: { car: 0, fam: 3, hea: -3, hap: 0 }
      }
    }
  },
  {
    id: 'event_079',
    title: '最后的断舍离',
    description: '你开始整理家里的旧物，准备扔掉一些带不走的东西。',
    age: 'ELDER',
    bgImage: '/picture/1.3普通家庭.png',
    choices: {
      good: {
        text: '把奖杯证书全扔了',
        memory: '什么功名利禄，到头来不过是一堆废铜烂铁。',
        impact: { car: -5, fam: 0, hea: 0, hap: 3 } 
      },
      bad: {
        text: '独留年轻时爱人的照片',
        memory: '如果这趟列车一定要到站，你只想记住最美好的风景。',
        impact: { car: 0, fam: 3, hea: 0, hap: 2 } 
      }
    }
  },
  {
    id: 'event_080',
    title: '梦里的老家',
    description: '午睡时，你梦见回到了小时候那个漏雨的老屋。',
    age: 'ELDER',
    isSingle: true,
    bgImage: '/picture/1.5农村家庭.png',
    choices: {
      good: {
        text: '梦里妈妈喊你吃饭',
        memory: '你惊醒过来，眼角挂着泪，原来人老了，真的会越活越像个孩子。',
        impact: { car: 0, fam: 2, hea: 0, hap: -2 }
      }
    }
  },
  {
    id: 'event_081',
    title: '阳光下的摇椅',
    description: '你坐在阳台的摇椅上，身上盖着毯子，昏昏欲睡。',
    age: 'ELDER',
    bgImage: '/picture/1.3普通家庭.png',
    choices: {
      good: {
        text: '回想这一生，无愧于心',
        memory: '没有成为拯救世界的大英雄，但你成功守护了一个小家。',
        impact: { car: 0, fam: 1, hea: 0, hap: 1 } 
      },
      bad: {
        text: '回想这一生，如果那时…',
        memory: '遗憾是人生的常态，只可惜，这台机器再也没有“重新开始”的按钮了。',
        impact: { car: 0, fam: 0, hea: 0, hap: -2 } 
      }
    }
  }
];
>>>>>>> b7172eca649c623ad8096165b327d6f59cffe4d3
