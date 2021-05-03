import React from 'react'
import css from './PlayControl.scss'
import { observer, inject } from 'mobx-react'

import Button from '@web-components/form/Button'
import { PLAY_STATES } from './store/TimelineStore'
import Icon from '../components/ui/Icon'

@inject('timelineStore')
@observer
class PlayControl extends React.Component {
  render () {
    return <div className={ css.PlayControl }>
      <Buttons />
      <Info />
    </div>
  }
}

@inject('timelineStore')
@observer
class Buttons extends React.Component {
  render () {
    let { timelineStore } = this.props

    return <div className={ css.Buttons }>
      { timelineStore.playState === PLAY_STATES.IDLE && 
          <Button onClick={ evt => timelineStore.play() } className={ css.btn }>
            <Icon name='play' />
          </Button>
      }
      { timelineStore.playState === PLAY_STATES.PLAYING && 
          <Button onClick={ evt => timelineStore.pause() } className={ css.btn }>
            <Icon name='pause' />
          </Button>
      }
      { timelineStore.playState === PLAY_STATES.PAUSE && 
          <Button onClick={ evt => timelineStore.resume() } className={ css.btn }>
            <Icon name='play' />
          </Button>
      }
    </div>
  }
}

const Info = (props) => <div className={ css.Info }>
  <Axis />
  <Bar />
  <Marks />
</div>

@inject('timelineStore')
@observer
class Axis extends React.Component {
  render () {
    let { timelineStore } = this.props

    return <div className={ css.Axis }>
      <span className={ css.l }>当前时间：</span>
      <span className={ css.t }>{ timelineStore.currentTimeStr }</span>

      <span className={ css.l }>总时间：</span>
      <span className={ css.t }>{ timelineStore.totalDurationStr }</span>
    </div>
  }
}

const Marks = (props) => <div className={ css.Marks }>
  { props.children }
</div>

@inject('timelineStore')
@observer
class Bar extends React.Component {
  render () {
    let { timelineStore } = this.props

    let innerStyle = {
      width: `${timelineStore.progressPercent}%`
    }

    return <div className={ css.Bar }>
      <div className={ css.outer } 
        ref={ el => this.$bar = el }
        onClick={ evt => this.clickBar(evt) }>
        <div className={ css.inner } style={ innerStyle }></div>
      </div>
    </div>
  }

  clickBar (evt) {
    let mouseX = evt.clientX
    let clientRect = this.$bar.getBoundingClientRect()
    let barLeft = clientRect.left
    let barWidth = clientRect.width
    // console.log({ mouseX, barLeft, barWidth })

    let { timelineStore } = this.props
    timelineStore.changePositionByMouse({ mouseX, barLeft, barWidth })
  }
}

export default PlayControl