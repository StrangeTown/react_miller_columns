import './index.css'
import React from 'react'
import { fakeData, systemTypes } from '../../data/index'
import Column from './Colunn'

const getTree = (data) => {
  const tree = data.map((item) => {
    if (item.type === systemTypes.dir) {
      return {
        ...item,
        unfolded: false,
        children: getTree(item.children),
      }
    }
    return { ...item }
  })
  return tree
}

class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      tree: [],
    }
  }
  componentDidMount() {
    this.setState({ tree: getTree(fakeData) })
  }
  updateFoldState = ({
    tree,
    currentColIdx,
    targetColIdx,
    rowIdx,
    foldState,
  }) => {
    if (currentColIdx === targetColIdx) {
      tree[rowIdx].unfolded = foldState
    } else {
      const unfoldeditem = tree.find((item) => {
        return item.type === systemTypes.dir && item.unfolded === true
      })
      if (unfoldeditem) {
        this.updateFoldState({
          tree: unfoldeditem.children,
          currentColIdx: currentColIdx + 1,
          targetColIdx,
          rowIdx,
          foldState,
        })
      }
    }
  }
  handleFoldChange = (colIdx, rowIdx, foldState) => {
    this.updateFoldState({
      tree: this.state.tree,
      currentColIdx: 0,
      targetColIdx: colIdx,
      rowIdx,
      foldState,
    })
    this.setState({ tree: this.state.tree })
  }
  getColumns(tree, columns = [], colIdx = 0) {
    columns.push(
      <Column
        tree={tree}
        key={colIdx}
        onRowFoldChange={(rowIdx, foldState) => {
          this.handleFoldChange(colIdx, rowIdx, foldState)
        }}
      />
    )
    const unfoldedItem = tree.find((item) => {
      return item.type === systemTypes.dir && item.unfolded === true
    })
    if (unfoldedItem) {
      return this.getColumns(unfoldedItem.children, columns, colIdx + 1)
    } else {
      return columns
    }
  }
  render() {
    const columns = this.getColumns(this.state.tree)
    return <div className="columns">{columns}</div>
  }
}

export default Main
