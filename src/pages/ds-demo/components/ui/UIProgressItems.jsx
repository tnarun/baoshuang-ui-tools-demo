import React from 'react'
import css from './UIProgressItems.scss'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'
import moment from 'moment'

class ProgressItemsStore {
  constructor ({ timelineStore }) {
    this.inputData = timelineStore.data.PROGRESS_ITEMS
    
    this.initData = this.inputData.init
    console.log(this.initData)
  }

  getDataAt (currentTime) {
    let _changes = this.inputData.changes.filter(x => {
      let { time, idx, items } = x
      let timeMs = moment.duration(`PT${time}`).asMilliseconds()
      // return parseInt(timeMs) <= parseInt(currentTime)
      return timeMs <= currentTime
    })
    
    let data = Object.assign({}, this.initData)
    _changes.forEach(x => {
      data.idx = x.idx
      if (x.items) {
        data.items = x.items
      }
    })

    return data
  }
}

@inject('timelineStore')
@observer
class UIProgressItems extends React.Component {
  constructor (props) {
    super(props)
    let { timelineStore } = props
    this.piStore = new ProgressItemsStore({ timelineStore })
  }

  render () {
    let { timelineStore } = this.props
    let currentTime = timelineStore.currentTime
    let currentData = this.piStore.getDataAt(currentTime)
    
    let _items = currentData.items.map((item, idx) => {
      return <div key={ idx }>{ item }</div>
    })

    let style = { 
      opacity: _items.length ? 1 : 0,
      transform: `translateY(-${50 * currentData.idx}px)` 
    }
    
    return <div className={ css.UIProgressItems }>
      <div className={ css.items } style={ style }>{ _items }</div>
    </div>
  }
}

export default UIProgressItems