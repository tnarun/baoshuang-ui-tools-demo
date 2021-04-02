import css from './ProgressBar.scss'
import { observer } from 'mobx-react'

const ProgressBar = observer((props) => {
  let { store } = props
  let playTime = store.playTime
  let max = 10000

  let s = ~~(playTime / 1000)
  let ms = playTime % 1000

  let innerStyle = {
    width: `${ playTime / max * 100 }%`
  }

  let _events = store.events.map((x, idx) => {
    let left = `${ x.time / max * 100 }%`
    let style = { left }

    return <div key={ idx } className={ css.event } style={ style }></div>
  })


  return <div className={ css.ProgressBar }>
    <div className={ css.time }>{ `${s}″ ${ms}`}</div>
    <div className={ css.bar }>
      <div className={ css.inner } style={ innerStyle }></div>
      { _events }
    </div>
  </div>
})

export default ProgressBar