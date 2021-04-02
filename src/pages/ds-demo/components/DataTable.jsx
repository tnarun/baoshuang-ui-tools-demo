import React from 'react'
import css from './DataTable.scss'
import { observer, inject } from 'mobx-react'

class DataTable extends React.Component {
  render () {
    return <div className={ css.DataTable }>
      <TimeBarMarks />
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

export default DataTable