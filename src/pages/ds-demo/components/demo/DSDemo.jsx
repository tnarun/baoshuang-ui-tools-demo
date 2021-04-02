import css from './DSDemo.scss'
import UITimeBar from '../ui/UITimeBar'

// import personStatusImg from '../../../../assets/ds-demo/人物状态-458-311.png'
import personStatusImg from '../../../../assets/ds-demo/人物状态-empty.png'
// import equipmentsImg from '../../../../assets/ds-demo/装备栏-460-773.png'
import equipmentsImg from '../../../../assets/ds-demo/装备栏-empty.png'
import progressIndexImg from '../../../../assets/ds-demo/进度索引-462-564.png'
// import topStatusImg from '../../../../assets/ds-demo/顶部状态栏-3352-137.png'
import topStatusImg from '../../../../assets/ds-demo/顶部状态栏-empty.png'

class DSDemo extends React.Component {
  render () {
    return <div className={ css.DSDemo }>
      <div className={ css.topStatus }>
        <img src={ topStatusImg } />
      </div>

      <div className={ css.progressIndex }>
        <img src={ progressIndexImg } />
      </div>

      <div className={ css.personStatus }>
        <img src={ personStatusImg } />
      </div>

      <div className={ css.equipments }>
        <img src={ equipmentsImg } />
      </div>

      <div className={ css.timebar }>
        <label>视频时间线</label>
        <UITimeBar />
      </div>
    </div>
  }
}

export default DSDemo