import React from 'react'
import Row from './Row'

class Column extends React.Component {
  render() {
    const { tree, onRowFoldChange } = this.props

    return (
      <div className="column">
        {tree.map((item, rowIdx) => {
          return (
            <Row
              key={rowIdx}
              item={item}
              onFoldChange={(foldState) => {
                onRowFoldChange(rowIdx, foldState)
              }}
            />
          )
        })}
      </div>
    )
  }
}

export default Column