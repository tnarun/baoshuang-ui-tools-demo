import React from 'react'
import css from './UITopStatus.scss'

import { observer, inject } from 'mobx-react'

@inject('timelineStore')
@observer
class UITopStatus extends React.Component {
  render () {
    let timelineStore = this.props.timelineStore
    let { 
      当前关卡, 当前世界倾向, 当前人物倾向, 虚幻眼瞳石, 收集目标, 未使用魂量 
    } = timelineStore.data.TOP_STATUS.init

    return <div className={ css.UITopStatus }>
      <label>{ 当前关卡 }</label>
      <label>{ 当前世界倾向 }</label>
      <label>{ 当前人物倾向 }</label>
      <label>× { 虚幻眼瞳石 }</label>
      <label>{  }</label>
      <label>{ 未使用魂量 }</label>
    </div>
  }
}

export default UITopStatus