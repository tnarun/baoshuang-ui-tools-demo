import css from './PlayBtn.scss'
import { observer } from 'mobx-react'

const PlayBtn = observer((props) => {
  let { store } = props

  if (store.playing) {
    return <div className={ css.PlayBtn }>
      <button disabled onClick={ evt => store.play() }>播放</button>
    </div>
  }

  if (store.playend) {
    return <div className={ css.PlayBtn }>
      <button onClick={ evt => store.reset() }>重置</button>
    </div>
  }

  return <div className={ css.PlayBtn }>
    <button onClick={ evt => store.play() }>播放</button>
  </div>
})

export default PlayBtn