import React from 'react'
import { systemTypes } from '../../data'
import get from 'lodash.get'
import { checkAction, checkingStatus } from '../../constant'

const RowCheckBox = ({ status, onStatusChange, type }) => {
  const map = {
    [checkingStatus.checked]: <div className="status">✅</div>,
    [checkingStatus.notChecked]: <div className="status not_checked"></div>,
    [checkingStatus.intermediate]: <div className="status intermediate"></div>,
  }
  const getAction = () => {
    const fileChecked =
      type === systemTypes.file && status === checkingStatus.checked
    const dirChecked =
      type === systemTypes.dir &&
      [checkingStatus.checked, checkingStatus.intermediate].includes(status)
    if (fileChecked || dirChecked) {
      return checkAction.uncheck
    }
    return checkAction.check
  }

  return (
    <div
      className="checking_status"
      onClick={() => {
        const action = getAction()
        console.log(action)
        onStatusChange(action)
      }}
    >
      {map[status]}
    </div>
  )
}

const TypeIcon = ({type}) => {
  const typeMapIcon = {
    [systemTypes.dir]: (<div className='type_icon'>🗂️</div>),
    [systemTypes.file]: (<div className='type_icon'>📄</div>)
  }
  return typeMapIcon[type]
}

class Row extends React.Component {
  render() {
    const { item, onFoldChange, onCheckingStatusChange } = this.props
    const label = get(item, 'label', '')
    const type = get(item, 'type', '')
    const unfolded = get(item, 'unfolded', false)
    const itemCheckingStatus = get(
      item,
      'checkingStatus',
      checkingStatus.notChecked
    )

    return (
      <div className="row" key={label}>
        <div className="row_info">
          <RowCheckBox
            type={type}
            status={itemCheckingStatus}
            onStatusChange={(action) => {
              onCheckingStatusChange(action)
            }}
          />
          <div className="label">
            <div className='type_wrap'>
              <TypeIcon type={type}/>
            </div>
            <div className='label_val' title={label}>{label}</div>
          </div>
        </div>
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
