import React from 'react'
import css from './index.scss'

// import { observable } from 'mobx'
// import { observer, inject } from 'mobx-react'
import { Provider } from 'mobx-react'

import Layout4K from './components/Layout4K'
import TimelineStore from './components/store/TimelineStore'
import PlayControl from './components/PlayControl'
import DSDemo from './components/demo/DSDemo'
import DataTable from './components/DataTable'

export default class index extends React.Component {
  constructor (props) {
    super(props)
    this.timelineStore = new TimelineStore({ 
      totalDuration: 11 * 60 * 1000 + 44 * 1000
    }) // 11 min 44s
  }

  render () {
    return <Provider timelineStore={ this.timelineStore }>
      <div className={ css.index }>
        <RenderArea />
        <EventsArea />
        <ControlArea />
      </div>
    </Provider>
  }
}

const RenderArea = (props) => <div className={ css.RenderArea }>
  <Layout4K>
    <DSDemo />
  </Layout4K>
</div>

const EventsArea = (props) => <div className={ css.EventsArea }>
  <DataTable />
</div>

const ControlArea = (props) => <div className={ css.ControlArea }>
  <PlayControl />
</div>