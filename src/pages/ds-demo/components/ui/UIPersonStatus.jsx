import React from 'react'
import css from './UIPersonStatus.scss'
import { observer, inject } from 'mobx-react'

@inject('timelineStore')
@observer
class UIPersonStatus extends React.Component {
  render () {
    let timelineStore = this.props.timelineStore
    let { 
      灵魂等级, 体力, 敏捷, 智力, 魔力, 耐力, 信仰, 力量, 运气 
    } = timelineStore.data.PERSON_STATUS.init

    return <div className={ css.UIPersonStatus }>
      <label>{ 灵魂等级 }</label>
      <label>{ 体力 }</label>
      <label>{ 敏捷 }</label>
      <label>{ 智力 }</label>
      <label>{ 魔力 }</label>
      <label>{ 耐力 }</label>
      <label>{ 信仰 }</label>
      <label>{ 力量 }</label>
      <label>{ 运气 }</label>
    </div>
  }
}

export default UIPersonStatus