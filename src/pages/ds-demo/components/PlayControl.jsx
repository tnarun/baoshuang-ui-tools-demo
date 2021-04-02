import React from 'react'
import css from './PlayControl.scss'
import { observer, inject } from 'mobx-react'

import Button from '@web-components/form/Button'
import { PLAY_STATES } from './store/TimelineStore'

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
          <Button onClick={ evt => timelineStore.play() }>播放</Button>
      }
      { timelineStore.playState === PLAY_STATES.PLAYING && 
          <Button onClick={ evt => timelineStore.pause() }>暂停</Button>
      }
      { timelineStore.playState === PLAY_STATES.PAUSE && 
          <Button onClick={ evt => timelineStore.resume() }>继续</Button>
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
      { timelineStore.currentTime } / { timelineStore.totalDuration }
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
      <div className={ css.outer }>
        <div className={ css.inner } style={ innerStyle }></div>
      </div>
    </div>
  }
}

export default PlayControl