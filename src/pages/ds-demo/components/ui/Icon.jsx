import React from 'react'
import css from './Icon.scss'
import { observer, inject } from 'mobx-react'
import classNames from 'classnames/bind'

class Icon extends React.Component {
  render () {
    let { name } = this.props
    let klass = classNames(css.iconfont, css[`icon-${name}`])
    return <i className={ klass }></i>
  }
}

export default Icon