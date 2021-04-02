// title: 数据驱动 UI DEMO

import React from 'react'
import css from './data-ui.scss'

// import { observable } from 'mobx'
// import { observer, inject } from 'mobx-react'
// import { Provider } from 'mobx-react'

import HPUI from './components/HPUI'
import ConditionUI from './components/ConditionUI'
import ItemBoxUI from './components/ItemBoxUI'
import TWEEN from '@tweenjs/tween.js'

const initTween = () => {
  let animate = (time) => {
    window.requestAnimationFrame(animate)
    TWEEN.update(time)
  }
  window.requestAnimationFrame(animate)
}

export default class Demo extends React.Component {
  constructor (props) {
    super(props)
    this.store = null
    initTween()
  }

  render () {
    return <div className={ css.Demo }>
      <div>
        <Title />

        <DemoBox name='生命值变化展示'>
          <HPUI />
        </DemoBox>

        <DemoBox name='待办事项完成展示'>
          <ConditionUI />
        </DemoBox>
        
        <DemoBox name='资源收集展示'>
          <ItemBoxUI />
        </DemoBox>
      </div>
    </div>
  }
}

const Title = (props) => <div className={ css.DemoBox }>
  数据变化驱动 UI 概念说明小 DEMO
</div>

const DemoBox = (props) => <div className={ css.DemoBox }>
  <div>{ props.name }</div>
  <div>{ props.children }</div>
</div>