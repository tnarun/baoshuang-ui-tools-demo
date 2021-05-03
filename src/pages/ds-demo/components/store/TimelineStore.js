import { observable } from 'mobx'
import TWEEN from '@tweenjs/tween.js'

// 根据毫秒数计算显示的时间值
const formatTime = (time) => {
  let h = ~~ (time / 60 / 60 / 1000)
  let m = ~~ (time / 60 / 1000) - h * 60
  let s = ~~ (time / 1000) - h * 60 * 60 - m * 60
  let ms = time % 1000

  let _h = h > 9 ? h : `0${h}`
  let _m = m > 9 ? m : `0${m}`
  let _s = s > 9 ? s : `0${s}`
  let _ms = `000${ms}`.slice(-4)

  return `${_h}:${_m}:${_s}.${_ms}`
} 

const initTween = ({ update }) => {
  let animate = (globalTime) => {
    window.requestAnimationFrame(animate)
    TWEEN.update(globalTime)
    update(globalTime)
  }

  animate()
}

const PLAY_STATES = {
  IDLE: 'IDLE',
  PLAYING: 'PLAYING',
  PAUSE: 'PAUSE'
}

class TimelineStore {
  @observable totalDuration = 0 // 总时长，单位毫秒
  @observable currentTime = 0 // 当前播放时间，单位毫秒

  @observable playState = PLAY_STATES.IDLE

  constructor ({ totalDuration }) {
    this.totalDuration = totalDuration
    this.reset()

    this.update = () => {}

    initTween({ update: (globalTime) => {
      this.globalTime = globalTime
      this.update(globalTime)
    }})

    this.data = DATA
  }

  reset () {
    this.currentTime = 0
    this.playState = PLAY_STATES.IDLE
  }

  play () {
    let _startCurrentTime = this.currentTime
    let _startGlobalTime = this.globalTime
    this.playState = PLAY_STATES.PLAYING
    
    this.update = (globalTime) => {
      let now = globalTime
      let passedTime = ~~ (now - _startGlobalTime)
      this.currentTime = _startCurrentTime + passedTime
    }
  }

  pause () {
    this.playState = PLAY_STATES.PAUSE
    this.update = () => {}
  }

  resume () {
    this.play()
  }

  get progressPercent () {
    return this.currentTime / this.totalDuration * 100
  }

  get currentTimeStr () {
    return formatTime(this.currentTime)
  }

  get totalDurationStr () {
    return formatTime(this.totalDuration)
  }

  // 根据鼠标点击改变进度条位置
  changePositionByMouse ({ mouseX, barLeft, barWidth }) {
    let w0 = mouseX - barLeft
    let w1 = barWidth

    // 要改变到的位置，单位毫秒
    let changeTo = this.totalDuration * w0 / w1
    changeTo = Math.round(changeTo)

    this.changeTimeTo({ changeTo })
  }

  changeTimeTo ({ changeTo }) {
    // console.log(`改变播放位置到 ${changeTo} ms`)
    this.currentTime = changeTo
    this.pause()
  }
}

let DATA = {
  TIME_BAR_MARKS: [
    { time: '1M40S', color: '#71e904', text: '' },
    { time: '6M49S', color: '#c1005f', text: '' },
    { time: '9M16S', color: '#d6df7c', text: '' },
    { time: '9M30S', color: '#75c83e', text: '' },
    { time: '10M5S', color: '#2778a7', text: '' },
  ],

  PERSON_STATUS: {
    init: {
      灵魂等级: 6,
      体力: 9, 敏捷: 11,
      智力: 15, 魔力: 15,
      耐力: 10, 信仰: 6,
      力量: 9, 运气: 11,
    },
    changes: []
  },

  TOP_STATUS: {
    init: {
      当前关卡: '0-1',
      当前世界倾向: '+- 0%',
      当前人物倾向: '+- 0%',
      虚幻眼瞳石: 0,
      收集目标: [
        { name: '硬石碎片', current: 0, total: 3 }
      ],
      未使用魂量: 0
    }
  },

  PROGRESS_ITEMS: {
    init: {
      idx: 0, items: []
    },
    changes: [
      { time: '15S', 
        items: [
          "选择“新游戏”",
          "选择“离线模式”",
          "选择“体形A”(女号)",
          "输入“玩家名称”",
          "选择职业“魔法师”",
          "初始奖励 幸运戒指",
          "前往“楔之神殿”",
          "进入0-1“前哨通道”",
          "拾取 弦月草×1",
          "拾取 弦月草×3",
          "拾取 弦月草×2",
          "传送至0-2“荒凉前哨”",
          "拾取 半月草×1",
          "拾取 弦月草×3",
          "拾取 200魂×1",
          "拾取 弦月草×3",
          "拾取 半月草×2",
          "击杀 恶魔先锋×1",
          "取得 灰色恶魔之魂",
          "传送至“未知出路”",
          "拾取 铁质头盔",
          "装备 铁质头盔",
          "拾取 满月草×1",
          "拾取 满月草×1",
          "拾取 满月草×2",
          "拾取 硬石碎片×3",
          "拾取 锐石碎片×3",
          "拾取 800魂×3",
          "剧情强制死亡",
          "来到“楔之神殿”"
        ], 
        idx: 0 
      },
      { time: '22S', idx: 1 },
      { time: '30S', idx: 2 },
      { time: '40S', idx: 3 },
    ]
  }
}

export default TimelineStore
export { PLAY_STATES }