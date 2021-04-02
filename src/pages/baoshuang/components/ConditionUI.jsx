import React from 'react'
import css from './ConditionUI.scss'
import classNames from 'classnames/bind'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import { playEvents } from './play'
import Control from './Control'

class CheckStore {
  @observable list = []

  @observable playing = false
  @observable playTime = 0
  @observable playend = false

  constructor (list) {
    this._list = list
    this.list = this._list.map(x => x)

    this.events = EVENTS
  }

  reset () {
    this.list = this._list.map(x => x)

    this.playend = false
  }

  check ({ id }) {
    this.list.filter(x => x.id === id)[0].checked = true
  }

  play () {
    playEvents(this, this.events, (event) => {
      this.check({ id: event.data })
    })
  }
}

const LIST = [
  { id: 1, text: '待办事项一' },
  { id: 2, text: '待办事项二' },
  { id: 3, text: '待办事项三' },
  { id: 4, text: '待办事项四' },
  { id: 5, text: '待办事项五' },
  { id: 6, text: '待办事项六' },
  { id: 7, text: '待办事项七' },
  { id: 8, text: '待办事项八' },
]

@observer
class HPUI extends React.Component {
  constructor (props) {
    super(props)
    this.checkStore = new CheckStore(LIST)
  }

  render () {
    return <div className={ css.HPUI }>
      <div className={ css.ui }>
        <CheckList checkStore={ this.checkStore } />
      </div>
      <Control store={ this.checkStore } />
    </div>
  }
}

const CheckList = observer((props) => {
  let { checkStore } = props

  let _list = checkStore.list.map((x, idx) => {
    let klass = classNames.bind(css)({
      item: true,
      checked: x.checked
    })

    return <div key={ idx } className={ klass }>
      <span>{ x.text }</span>
      { 
        x.checked && <span className={ css.ok }>OK</span>
      }
    </div>
  })

  return <div className={ css.CheckList }>
    { _list }
  </div>
})

export default HPUI


const EVENTS = [
  { time: 1000, data: 1 },
  { time: 2000, data: 5 },
  { time: 3000, data: 3 },
  { time: 4000, data: 6 },
  { time: 5000, data: 7 },
]