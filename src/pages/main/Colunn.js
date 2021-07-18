import React from 'react'
import Row from './Row'

class Column extends React.Component {
  render() {
    const {
      tree,
      onRowFoldChange,
      onRowCheckingStatusChange,
      onLoadMoreClick,
    } = this.props
    const loadedRows = tree.filter((item) => item.loaded)
    const hasUnloadedRows = tree.some((item) => !item.loaded)

    return (
      <div className="column">
        {loadedRows.map((item, rowIdx) => {
          return (
            <Row
              key={rowIdx}
              item={item}
              onFoldChange={(foldState) => {
                onRowFoldChange(rowIdx, foldState)
              }}
              onCheckingStatusChange={(action) => {
                onRowCheckingStatusChange(rowIdx, action)
              }}
            />
          )
        })}
        {hasUnloadedRows && (
          <div className="load_more">
            <div
              className="more_btn"
              onClick={() => {
                onLoadMoreClick()
              }}
            >
              Load More
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Column
