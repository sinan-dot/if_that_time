/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LegendChapter } from '../../types/legend';

export const jobsLegend: LegendChapter = {
  id: 'jobs',
  name: '乔布斯',
  title: '找到真正热爱的事情',
  description: '从车库到传奇，一个天才如何改变世界',
  backgroundImage: '/legends/jobs/bg.png',
  textOverlayImage: '/legends/jobs/text.png',

  items: [
    {
      id: 'jobs_item1',
      name: '老式苹果电脑',
      description: 'Apple I的原型机，木板外壳',
      hotzone: { x: 22, y: 45, width: 16, height: 20 },
      story: {
        title: '车库创业',
        narrative: '我抚摸着这台电脑粗糙的木板外壳。这是Apple I。我和沃兹在车库里做的。我们没钱买专业设备，只能用最便宜的零件。\n\n我把这台电脑拿到了家酿计算机俱乐部的聚会。那些技术宅看着这台粗糙的机器，问：这东西能干嘛？\n\n我说：它能改变世界。他们笑了。但我没笑。\n\n我知道，个人电脑时代即将来临。',
        choices: [
          {
            id: 'choice1_a',
            text: '全力说服，建立苹果公司\n"我相信这件事。我要让所有人都相信。"',
            consequence: {
              narrative: '我找到迈克·马库拉，说服他投资。我们正式创立了苹果公司。Apple II诞生了，它成了历史上最成功的个人电脑。',
              statChange: { courage: 15, persistence: 10 },
            },
          },
          {
            id: 'choice1_b',
            text: '继续观望，先小规模试卖\n"先卖几台看看反应，再决定要不要正式创业。"',
            consequence: {
              narrative: '我小心翼翼，只在俱乐部里卖了几台。市场反应不错，但我错过了最关键的时机。别人率先成立了公司，占领了市场。',
              statChange: { wisdom: 5 },
            },
          },
        ],
      },
      minigame: {
        type: 'sequence',
        title: '说服投资人',
        instruction: '按正确顺序点击说服流程',
        data: { sequence: ['展示产品', '阐述愿景', '市场分析', '达成协议'] },
      },
    },
    {
      id: 'jobs_item2',
      name: '笔记本',
      description: '一本黑色笔记本，里面画着各种产品设计草图',
      hotzone: { x: 50, y: 50, width: 14, height: 18 },
      unlockRequirement: 'jobs_item1',
      story: {
        title: '被赶出苹果',
        narrative: '我翻开这本笔记本，看着上面的草图。Macintosh、iMac、iPhone……它们都在这里。\n\n但我最在意的那一页，是我30岁时画的。那年，我被赶出了苹果。我亲手创立的公司，把我踢出去了。\n\n董事会说我不适合管理公司。他们说我是"暴君"、"疯子"。我站在办公室外，手里只有这本笔记本。\n\n我问自己：我的梦想，结束了吗？',
        choices: [
          {
            id: 'choice2_a',
            text: '创立NeXT，重新开始\n"苹果抛弃了我，但我没有抛弃自己。"',
            consequence: {
              narrative: '我创立了NeXT，继续做我想做的电脑。虽然NeXT没有大成功，但我在那里磨练了自己。多年后，苹果收购了NeXT，我回归了。',
              statChange: { courage: 15, persistence: 15 },
            },
          },
          {
            id: 'choice2_b',
            text: '暂时隐退，等待时机\n"先休息一阵，看看世界会变成什么样。"',
            consequence: {
              narrative: '我隐退了，做了几年皮克斯。虽然皮克斯成功了，但我错过了计算机行业的黄金十年。当我回归苹果时，它已经濒临破产。',
              statChange: { wisdom: 10 },
            },
          },
        ],
      },
      minigame: {
        type: 'sequence',
        title: '产品设计',
        instruction: '按正确顺序完成产品设计流程',
        data: { sequence: ['灵感构思', '草图绘制', '原型开发', '产品发布'] },
      },
    },
    {
      id: 'jobs_item3',
      name: '《禅与摩托车维修艺术》',
      description: '一本被翻阅无数的书，封面已经磨损',
      hotzone: { x: 75, y: 55, width: 12, height: 16 },
      unlockRequirement: 'jobs_item2',
      story: {
        title: '回归与重生',
        narrative: '我拿起这本书，书页已经泛黄。这是我被赶出苹果后读的书。那段时间，我每天睡不着。我问自己：我做错了什么？\n\n我读了这本书，里面有一句话：你追求的质量，就是你生命的意义。我突然明白了。\n\n我以前太执着于"完美"。我要求每一个细节都极致，这让所有人痛苦。但书中说：质量不是完美，而是适合。\n\n1997年，我回归苹果。苹果濒临破产，只剩90天现金流。',
        choices: [
          {
            id: 'choice3_a',
            text: '大刀阔斧，砍掉多余产品\n"只有专注，才能突围。"',
            consequence: {
              narrative: '我砍掉了打印机、PDA等所有不核心的业务。团队震惊，董事会质疑。但一年后，苹果转危为安。iMac问世，成为史上最畅销的电脑之一。',
              statChange: { courage: 20, wisdom: 10 },
            },
          },
          {
            id: 'choice3_b',
            text: '保持现状，稳扎稳打\n"改革太冒险了，我先看看情况。"',
            consequence: {
              narrative: '我维持现状，慢慢调整。苹果继续亏损，现金流越来越少。两年后，苹果真的破产了。',
              statChange: { persistence: 5 },
            },
          },
        ],
      },
      minigame: {
        type: 'screw',
        title: '摩托车维修',
        instruction: '点击螺丝旋转拧紧，拧紧所有螺丝完成维修',
        data: { screwCount: 4 },
      },
    },
  ],

  ending: {
    title: '找到热爱的人',
    summary: '从车库出发，被赶出公司，又回归拯救苹果。今天，苹果是全球最有价值的科技公司。',
    quotes: [
      '伟大，从来不是结果，而是一次次艰难选择。',
      '找到真正热爱的事情，你就找到了人生的方向。',
      '砍掉不重要的事情，才能做重要的事情。',
    ],
  },
};