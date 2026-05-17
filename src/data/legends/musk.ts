/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LegendChapter } from '../../types/legend';

export const muskLegend: LegendChapter = {
  id: 'musk',
  name: '马斯克',
  title: '用全部人生下注未来',
  description: '从PayPal到SpaceX，一个疯子如何改变航天史',
  backgroundImage: '/legends/musk/bg.png',
  textOverlayImage: '/legends/musk/text.png',

  items: [
    {
      id: 'musk_item1',
      name: '火箭模型',
      description: 'Falcon 1的缩小版，表面有烧焦痕迹',
      hotzone: { x: 25, y: 40, width: 18, height: 22 },
      story: {
        title: '三次失败',
        narrative: '我拿起这个火箭模型，看着上面的烧焦痕迹。这是Falcon 1。\n\n我投入了全部积蓄，三次发射，三次爆炸。第一次，发射后33秒，引擎故障。第二次，分离机构失灵。第三次，最接近成功的时候，燃料晃动，火箭还是炸了。\n\n媒体嘲笑我："马斯克，你该醒醒了，火箭不是你能玩的。"\n\n我剩下了最后一笔钱，刚好够再做一次发射。如果这次再失败，我就彻底破产了。',
        choices: [
          {
            id: 'choice1_a',
            text: '最后一搏，赌上全部\n"如果输了，我就一无所有。但如果赢了，我就能改变航天史。"',
            consequence: {
              narrative: '我签下了最后一次发射的文件。2008年9月28日，Falcon 1终于成功进入轨道。那一刻，我哭了。',
              statChange: { courage: 20, persistence: 10 },
            },
          },
          {
            id: 'choice1_b',
            text: '承认失败，及时止损\n"我已经尽力了。继续下去只会让情况更糟。"',
            consequence: {
              narrative: '我放弃了，把公司卖给了别人。几年后，新闻说SpaceX成功发射了火箭，股价翻了十倍。',
              statChange: { wisdom: 5 },
            },
          },
        ],
      },
      minigame: {
        type: 'puzzle',
        title: '发射倒计时',
        instruction: '点击两块拼图交换位置，还原1-9顺序即可发射',
        data: {},
      },
    },
    {
      id: 'musk_item2',
      name: '笔记本电脑',
      description: '屏幕上显示着特斯拉的财务报表',
      hotzone: { x: 48, y: 50, width: 16, height: 20 },
      unlockRequirement: 'musk_item1',
      story: {
        title: '双重危机',
        narrative: '我打开这台笔记本，看着上面的财务报表。数字是红色的。\n\n特斯拉账上只剩几百万美元，供应商催款，员工离职。2008年，金融危机爆发。没人愿意投资一家电动车公司。\n\n我刚刚把PayPal卖掉的钱投进了SpaceX，现在又要救特斯拉。\n\n朋友问我：马斯克，你为什么不放弃一个？\n我说：我不能。',
        choices: [
          {
            id: 'choice2_a',
            text: '同时拯救两家公司\n"我不能放弃任何一个梦想。"',
            consequence: {
              narrative: '我把自己最后的钱全部投进去，借钱、卖资产、找朋友支持。2008年圣诞节前夕，特斯拉拿到了最后一笔救命资金。SpaceX也拿到了NASA的合同。',
              statChange: { courage: 15, persistence: 15 },
            },
          },
          {
            id: 'choice2_b',
            text: '放弃特斯拉，专注SpaceX\n"专注才能成功。我不能两个都输。"',
            consequence: {
              narrative: '我关闭了特斯拉，把资源集中到SpaceX。SpaceX成功了，但电动车革命推迟了十年。',
              statChange: { wisdom: 10 },
            },
          },
        ],
      },
      minigame: {
        type: 'click',
        title: '融资生死线',
        instruction: '点击按钮完成投资人谈判',
        data: { targetCount: 8 },
      },
    },
    {
      id: 'musk_item3',
      name: '最后通牒文件',
      description: 'NASA的合同，上面写着"最后一次机会"',
      hotzone: { x: 72, y: 55, width: 14, height: 18 },
      unlockRequirement: 'musk_item2',
      story: {
        title: '质量保卫',
        narrative: '我看着这份文件，手指有些颤抖。这是NASA给SpaceX的合同。\n\n上面写着：如果Falcon 9两次发射失败，合同自动终止。这意味着，我只有两次机会。\n\n我叫来团队，说：这次发射，不允许任何失误。我们检查了每一个螺丝，测试了每一个系统。\n\n发射前一晚，我睡不着。我站在发射场外，看着星空。我问自己：如果明天失败，我还有勇气站起来吗？',
        choices: [
          {
            id: 'choice3_a',
            text: '亲自监督每一个细节\n"我不能信任任何人。我要自己确认一切。"',
            consequence: {
              narrative: '我亲自检查每一个环节，每天只睡4小时。团队压力很大，有人抱怨我太苛刻。但2010年6月4日，Falcon 9首次发射成功。',
              statChange: { persistence: 20 },
            },
          },
          {
            id: 'choice3_b',
            text: '信任团队，给他们空间\n"过度干预会让他们窒息。信任是最好的管理。"',
            consequence: {
              narrative: '我放手让团队去做，但出了一个小失误。发射延期，错过了最佳窗口期。虽然最终还是成功了，但我们付出了更多代价。',
              statChange: { wisdom: 15 },
            },
          },
        ],
      },
      minigame: {
        type: 'sequence',
        title: '发射检查',
        instruction: '按正确顺序完成火箭发射检查流程',
        data: { sequence: ['燃料检查', '引擎测试', '系统确认', '发射指令'] },
      },
    },
  ],

  ending: {
    title: '改写航天史的人',
    summary: '从破产边缘站起来，拯救了SpaceX和特斯拉。今天，SpaceX是人类最成功的私人航天公司。',
    quotes: [
      '用全部人生下注未来的人，才有资格改写历史。',
      '失败是常态，成功是偶然。但只要你还在，就还有机会。',
      '当你愿意用一切去赌，世界才会给你让路。',
    ],
  },
};