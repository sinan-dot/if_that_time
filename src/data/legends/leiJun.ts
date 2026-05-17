/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LegendChapter } from '../../types/legend';

export const leiJunLegend: LegendChapter = {
  id: 'leijun',
  name: '雷军',
  title: '从金山到小米的传奇之路',
  description: '一个程序员如何成为中国互联网的标志性人物',
  backgroundImage: '/legends/leijun/bg.png',
  textOverlayImage: '/legends/leijun/text.png',

  items: [
    {
      id: 'leijun_item1',
      name: '金山纪念牌',
      description: '刻着"十年耕耘"的铜牌',
      hotzone: { x: 20, y: 50, width: 15, height: 20 },
      story: {
        title: '艰难的选择',
        narrative: '我拿起这块纪念牌，手指摩挲着上面刻着的名字。\n\n十年了。我在金山待了整整十年。从程序员做到CEO，我把这家公司从濒临死亡救活了。\n\n所有人都说，雷军是个奇迹。但每天深夜，当我独自坐在办公室，我问自己一个问题：\n\n这就是我的一生了吗？',
        choices: [
          {
            id: 'choice1_a',
            text: '离开金山，寻找新的可能性\n"安稳是最大的陷阱。我要跳出去。"',
            consequence: {
              narrative: '我放下了纪念牌，关上办公室的门。明天，我会递交辞职信。窗外，夜色正深。但我知道，黎明会来。',
              statChange: { courage: 10 },
            },
          },
          {
            id: 'choice1_b',
            text: '继续留在金山，守护这份成果\n"我已经付出了十年，不能让它毁于一旦。"',
            consequence: {
              narrative: '我把纪念牌放回原位。也许我该知足了。也许这就是我的终点。可深夜醒来时，我还会问自己——如果那天我走了，会发生什么？',
              statChange: { wisdom: 5 },
            },
          },
        ],
      },
      minigame: {
        type: 'memory',
        title: '记忆翻牌',
        instruction: '翻开卡片，找到相同的故事关键词配对',
        data: { pairs: ['金山十年', '风口抉择', '小米诞生', '口碑极致'] },
      },
    },
    {
      id: 'leijun_item2',
      name: '手机原型机',
      description: '屏幕亮着，显示着"MIUI"的logo',
      hotzone: { x: 45, y: 35, width: 18, height: 25 },
      unlockRequirement: 'leijun_item1',
      story: {
        title: '风口抉择',
        narrative: '我拿起这台原型机，屏幕的光照亮了我的脸。\n\n离开金山后，我休息了三年。那三年，我每天都在思考一个问题：下一个风口，在哪里？\n\n我看了1000多个项目，见了无数创业者。最后，我发现了一个规律：所有伟大的公司，都诞生于一个时代的拐点。\n\n我决定，我要做手机。所有人说我疯了。',
        choices: [
          {
            id: 'choice2_a',
            text: '全力投入，做一款极致的手机\n"把所有资源压上去，不留退路。"',
            consequence: {
              narrative: '我把所有积蓄砸进去了。找了最强的团队，用最好的供应商，做了最极致的产品。2011年，小米1发布。定价1999元。一个月，卖了30万台。我们活下来了。',
              statChange: { courage: 15, persistence: 5 },
            },
          },
          {
            id: 'choice2_b',
            text: '小步试错，先做个小产品验证\n"先测试市场反应，再决定投入多少。"',
            consequence: {
              narrative: '我小心翼翼，先做了一个小范围的测试。市场反馈不错，但我错过了最关键的窗口期。当我终于决定全力投入时，别人已经占领了市场。',
              statChange: { wisdom: 10 },
            },
          },
        ],
      },
      minigame: {
        type: 'dial',
        title: '手机拨号',
        instruction: '在手机上拨打正确号码联系合作伙伴',
        data: { phoneNumber: '13800138000', successMessage: '联系成功，获得投资意向' },
      },
    },
    {
      id: 'leijun_item3',
      name: '《小米方法》',
      description: '一本被翻阅无数次的书，页边满是笔记',
      hotzone: { x: 70, y: 55, width: 12, height: 18 },
      unlockRequirement: 'leijun_item2',
      story: {
        title: '口碑极致',
        narrative: '我翻开这本书，每一页都记录着这些年的教训。\n\n小米成功了。但很少有人知道，我们在背后经历了什么。供应链断裂，资金链断裂，全网嘲讽，同行诋毁，投资人质疑。\n\n每一次，我都问自己：还要坚持吗？\n\n这本书里，写的是我的答案：口碑极致化、效率极致化、参与感。',
        choices: [
          {
            id: 'choice3_a',
            text: '坚守初心，继续用口碑征服市场\n"让产品说话，让用户传播。"',
            consequence: {
              narrative: '我们坚持做好产品，做好服务。三年后，小米成为中国第一。五年后，小米进入全球前三。',
              statChange: { persistence: 15, wisdom: 5 },
            },
          },
          {
            id: 'choice3_b',
            text: '改变策略，用营销手段快速扩张\n"口碑太慢了，我要更快。"',
            consequence: {
              narrative: '我们砸钱营销，销量暴涨。但用户开始抱怨，口碑下滑。对手抄袭我们的模式，用更好的产品反超了我们。',
              statChange: { courage: 5 },
            },
          },
        ],
      },
    },
  ],

  ending: {
    title: '站在风口上',
    summary: '从金山离开，创立小米，用口碑征服市场。今天，小米是全球前三的手机品牌。',
    quotes: [
      '风口来的时候，敢不敢跳下去，决定了你是谁。',
      '站在风口上，猪都能飞起来。但飞之前，你得先站在风口上。',
      '专注、极致、口碑、快。',
    ],
  },
};