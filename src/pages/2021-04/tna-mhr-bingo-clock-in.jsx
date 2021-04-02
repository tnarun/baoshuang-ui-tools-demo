import React from 'react'
import css from './tna-mhr-bingo-clock-in.scss'

// import { observable } from 'mobx'
// import { observer, inject } from 'mobx-react'
// import { Provider } from 'mobx-react'

const Index = (props) => <div className={ css.Index }>
  <div className={ css.Box }>
    <Bingo />
    <Right />
    <Bottom />
    <Corner />
  </div>
</div>

const Bingo = (props) => <div className={ css.Bingo }>
  <div className={ css.grid }>目标一</div>
  <div className={ css.grid }>目标二</div>
  <div className={ css.grid }>目标三</div>
  <div className={ css.grid }>目标四</div>
  <div className={ css.grid }>目标五</div>
  <div className={ css.grid }>目标六</div>
  <div className={ css.grid }>目标七</div>
  <div className={ css.grid }>目标八</div>
  <div className={ css.grid }>目标九</div>
</div>

const Right = (props) => <div className={ css.Right }>
  <div><Arrow /> 积分一</div>
  <div><Arrow /> 积分二</div>
  <div><Arrow /> 积分三</div>
</div>

const Bottom = (props) => <div className={ css.Bottom }>
  <div><Arrow /> 积分四</div>
  <div><Arrow /> 积分五</div>
  <div><Arrow /> 积分六</div>
</div>

const Corner = (props) => <div className={ css.Corner }>
  <div><Arrow /> 积分七</div>
</div>

const Arrow = (props) => <div className={ css.Arrow }></div>

export default Index