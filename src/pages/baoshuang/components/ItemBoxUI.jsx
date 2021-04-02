import React from 'react'
import css from './ItemBoxUI.scss'

import { observable } from 'mobx'
import { observer } from 'mobx-react'

import { playEvents } from './play'
import TWEEN from '@tweenjs/tween.js'
import Control from './Control'

class BoxStore {
  @observable 金币 = 0
  @observable 银币 = 0
  @observable 铜币 = 0

  @observable playing = false
  @observable playTime = 0
  @observable playend = false

  constructor () {
    this.events = EVENTS
  }

  reset () {
    this.金币 = 0
    this.银币 = 0
    this.铜币 = 0

    this.playend = false
  }

  add ({ type, amount }) {
    let fromValue = this[type] + 0
    let toValue = fromValue + amount
    let data = { value: fromValue }

    let tween = new TWEEN.Tween(data)
      .to({ value: toValue }, 400)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        this[type] = data.value
      })
      .start()
  }

  play () {
    playEvents(this, this.events, (event) => {
      let { type, amount } = event.data
      this.add({ type, amount })
    })
  }
}

@observer
class HPUI extends React.Component {
  constructor (props) {
    super(props)
    this.boxStore = new BoxStore()
  }

  render () {
    return <div className={ css.HPUI }>
      <div className={ css.ui }>
        <ItemBox boxStore={ this.boxStore } />
      </div>
      <Control store={ this.boxStore } />
    </div>
  }
}

const ItemBox = observer((props) => {
  let { boxStore } = props

  return <div className={ css.ItemBox }>
    <div className={ css.gc }>
      <span className={ css.c }></span>
      <div className={ css.i }>
        <span className={ css.t }>金币</span>
        <span className={ css.n }>{ ~~ boxStore.金币 }</span>
      </div>
    </div>
    <div className={ css.sc }>
      <span className={ css.c }></span>
      <div className={ css.i }>
        <span className={ css.t }>银币</span>
        <span className={ css.n }>{ ~~ boxStore.银币 }</span>
      </div>
    </div>
    <div className={ css.cc }>
      <span className={ css.c }></span>
      <div className={ css.i }>
        <span className={ css.t }>铜币</span>
        <span className={ css.n }>{ ~~ boxStore.铜币 }</span>
      </div>
    </div>
  </div>
})

const PlayBtn = (props) => {
  let { boxStore } = props

  return <div className={ css.PlayBtn }>
    <button onClick={ evt => boxStore.play(EVENTS) }>播放</button>
  </div>
}

export default HPUI


const EVENTS = [
  { time: 1000, data: { type: '金币', amount: 50 } },
  { time: 2000, data: { type: '银币', amount: 123 } },
  { time: 3000, data: { type: '铜币', amount: 207 } },
  { time: 4000, data: { type: '银币', amount: 38 } },
  { time: 5000, data: { type: '金币', amount: 41 } },
  { time: 8500, data: { type: '金币', amount: 114 } },
]