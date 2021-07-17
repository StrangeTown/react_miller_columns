import React from 'react'
import { systemTypes } from '../../data'
import get from 'lodash.get'

class Row extends React.Component {
  render() {
    const { item, onFoldChange } = this.props
    const label = get(item, 'label', '')
    const type = get(item, 'type', '')
    const unfolded = get(item, 'unfolded', false)

    return (
      <div className="row" key={label}>
        <div className="label">{label}</div>
        {type === systemTypes.dir && (
          <div
            className="fold_btn"
            onClick={() => {
              onFoldChange(!unfolded)
            }}
          >
            {unfolded ? <div>-</div> : <div>+</div>}
          </div>
        )}
      </div>
    )
  }
}

export default Row
