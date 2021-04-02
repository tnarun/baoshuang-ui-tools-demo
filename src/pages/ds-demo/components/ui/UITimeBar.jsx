import React from 'react'
import css from './UITimeBar.scss'
import { observer, inject } from 'mobx-react'
import moment from 'moment'

class UITimeBarStore {
  constructor (timelineStore) {
    this.timelineStore = timelineStore
  }

  get marks () {
    return this.timelineStore.data.TIME_BAR_MARKS
  }
}

@inject('timelineStore')
@observer
class UITimeBar extends React.Component {
  constructor (props) {
    super(props)
    this.uiStore = new UITimeBarStore(props.timelineStore)
  }

  render () {
    let timelineStore = this.props.timelineStore
    let innerStyle = {
      width: `${timelineStore.progressPercent}%`
    }

    let _marks = this.uiStore.marks.map((mark, idx) => {
      return <Mark key={ idx } mark={ mark } />
    })

    return <div className={ css.UITimeBar }>
      <div className={ css.inner } style={ innerStyle }></div>
      { _marks }
    </div>
  }
}

@inject('timelineStore')
@observer
class Mark extends React.Component {
  render () {
    let { mark, timelineStore } = this.props
    let time = moment.duration('PT' + mark.time).asSeconds() * 1000
    let leftPercent = time / timelineStore.totalDuration * 100

    let style = {
      left: `${leftPercent}%`,
      borderColor: mark.color
    }

    return <div className={ css.Mark } style={ style }></div>
  }
}

export default UITimeBar