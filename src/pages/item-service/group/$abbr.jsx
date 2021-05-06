import React from 'react'
import css from './$abbr.scss'

import GroupItems from '@item-ui/ui/GroupItems'

export default class extends React.Component {
  render () {
    return <div className={ css.index }>
      <GroupItems { ... this.props } />
    </div>
  }
}