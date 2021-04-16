import { observable } from 'mobx'
import TWEEN from '@tweenjs/tween.js'

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
  }
}

export default TimelineStore
export { PLAY_STATES }