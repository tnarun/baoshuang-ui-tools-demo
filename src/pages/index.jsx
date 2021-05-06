import React from 'react'
import css from './index.scss'

export default class index extends React.Component {
  render () {
    return <div className={ css.index }>
      <a href='/baoshuang/data-ui' target='_blank' 
        rel='noopener noreferrer'>数据驱动 UI 概念说明小 DEMO</a><br/>
      <a href='/2021-04/tna-mhr-bingo-clock-in' target='_blank' 
        rel='noopener noreferrer'>TNA 怪猎 BINGO 打卡原型</a><br/>
      <a href='/ds-demo'>数据呈现 UI 组织示例</a><br/>
      <a href='/item-service'>道具资源管理</a><br/>
    </div>
  }
}