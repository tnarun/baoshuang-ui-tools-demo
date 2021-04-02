import React from 'react'
import css from './HPUI.scss'
import classNames from 'classnames/bind'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import Color from 'color'

import { playEvents } from './play'
import TWEEN from '@tweenjs/tween.js'
import Control from './Control'

class HPStore {
  @observable maxHp = 100
  @observable minHp = 0
  @observable currentHP = 100
  @observable showHP = 100

  @observable currentChange = null

  @observable playing = false
  @observable playTime = 0
  @observable playend = false

  constructor () {
    this.events = EVENTS
  }

  reset () {
    this.currentHP = 100
    this.showHP = 100
    
    this.playend = false
  }

  changeHP ({ value }) {
    this.currentHP += value

    this.currentChange = value
    setTimeout(() => {
      this.currentChange = null
    }, 500)

    let fromValue = this.showHP + 0
    let toValue = fromValue + value
    let data = { value: fromValue }
    let tween = new TWEEN.Tween(data)
      .to({ value: toValue }, 400)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        this.showHP = ~~ data.value
      })
      .start()
  }

  get percentage () {
    return this.currentHP / this.maxHp * 100
  }

  get color () {
    let p = this.currentHP / this.maxHp
    let c1 = Color('coral')
    let c2 = Color('greenyellow')
    return c1.mix(c2, p)
  }

  play () {
    playEvents(this, this.events, (event) => {
      this.changeHP({ value: event.data })
    })
  }
}

@observer
class HPUI extends React.Component {
  constructor (props) {
    super(props)
    this.hpStore = new HPStore()
  }

  render () {
    return <div className={ css.HPUI }>
      <div className={ css.ui }>
        <Bar hpStore={ this.hpStore } />
        { 
          this.hpStore.currentChange && <Change hpStore={ this.hpStore } />
        }
      </div>

      <Control store={ this.hpStore } />
    </div>
  }
}

const Bar = observer((props) => {
  let { hpStore } = props
  let color =  hpStore.color

  let innerStyle = { 
    width: `${hpStore.percentage}%`, 
    backgroundColor: color.hex() 
  }

  let textStyle = {
    color: color.hex() 
  }

  return <div className={ css.Bar }>
    <div className={ css.outer }>
      <div className={ css.inner } style={ innerStyle }></div>
    </div>
    <div className={ css.n } style={ textStyle }>{ hpStore.showHP }</div>
  </div>
})

const Change = (props) => {
  let { hpStore } = props

  let value = hpStore.currentChange
  let str = value > 0 ? `+${value}` : `${value}`
  let klass = classNames.bind(css)({
    Change: true,
    z: value > 0,
    f: value < 0
  })

  return <div className={ klass }>
    { str }
  </div>
}


export default HPUI


const EVENTS = [
  { time: 1000, data: -20 },
  // { time: 1500, data: -20 },
  { time: 2000, data: -30 },
  // { time: 3000, data: -40 },
  { time: 4000, data: +60 },
  // { time: 5000, data: -10 },
  { time: 6000, data: -15 },
  // { time: 9000, data: -35 },
]