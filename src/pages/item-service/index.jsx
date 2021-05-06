import React from 'react'
import css from './index.scss'

import Groups from '@item-ui/ui/Groups'

class index extends React.Component {
  render () {
    return <div className={ css.index }>
      <Groups />
    </div>
  }
}

export default index