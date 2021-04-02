import css from './Layout4K.scss'
import { observer, inject } from 'mobx-react'

@inject('timelineStore')
@observer
class Layout4K extends React.Component {
  render () {
    return <div className={ css.Layout4K }>{ this.props.children }</div>
  }
}

export default Layout4K