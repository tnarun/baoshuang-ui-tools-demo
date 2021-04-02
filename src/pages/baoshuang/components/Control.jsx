import css from './Control.scss'
import PlayBtn from './PlayBtn'
import ProgressBar from './ProgressBar'

const Control = (props) => <div className={ css.Control }>
  <PlayBtn store={ props.store } />
  <ProgressBar store={ props.store } />
</div>

export default Control