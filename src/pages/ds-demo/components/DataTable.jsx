import React from 'react'
import css from './DataTable.scss'
import { observer, inject } from 'mobx-react'

class DataTable extends React.Component {
  render () {
    return <div className={ css.DataTable }>
      <TimeBarMarks />
      <PersonCurrentStatus />
    </div>
  }
}

@inject('timelineStore')
@observer
class TimeBarMarks extends React.Component {
  render () {
    let { timelineStore } = this.props
    let _marks = timelineStore.data.TIME_BAR_MARKS.map((mark, idx) => {
      return <div className={ css.item } key={ idx }>
        <span>{ mark.time }</span>
        <span>
          <span className={ css.colorBlock } style={ { backgroundColor: mark.color } }></span>
          <span>{ mark.color }</span>
        </span>
      </div>
    })

    return <div className={ css.TimeBarMarks }>
      <label className={ css.dataSetTitle }>时间轴标记</label>
      <div className={ css.itemsHeader }>
        <span>时间</span>
        <span>颜色</span>
      </div>
      <div className={ css.items }>
        { _marks }
      </div>
    </div>
  }
}

@inject('timelineStore')
@observer
class PersonCurrentStatus extends React.Component {
  render () {
    let { timelineStore } = this.props

    let _items = [ '灵魂等级', 
      '体力', '敏捷', 
      '智力', '魔力', 
      '耐力', '信仰',
      '力量', '运气'
    ].map(x => {
      let value = timelineStore.data.PERSON_STATUS.init[x]

      return <div className={ css.item } key={ x }>
        <span>{ x }</span>
        <span>{ value }</span>
      </div>
    })

    return <div className={ css.PersonCurrentStatus }>
      <label className={ css.dataSetTitle }>当前人物状态</label>
      <div className={ css.itemsHeader }>
        <span>属性</span>
        <span>取值</span>
      </div>
      <div className={ css.items }>
        { _items }
      </div>
    </div>
  }
}

export default DataTable