import './index.css'
import React from 'react'
import { fakeData, systemTypes } from '../../data/index'
import Column from './Colunn'
import { checkAction, checkingStatus } from '../../constant'

const getTree = (data) => {
  const tree = data.map((item) => {
    if (item.type === systemTypes.dir) {
      return {
        ...item,
        checkingStatus: checkingStatus.notChecked,
        unfolded: false,
        children: getTree(item.children),
      }
    }
    return { ...item, checkingStatus: checkingStatus.notChecked }
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
  updateAllChildrenStatus = (tree, status) => {
    tree.forEach((item) => {
      if (item.type === systemTypes.file) {
        item.checkingStatus = status
      } else if (item.type === systemTypes.dir) {
        this.updateAllChildrenStatus(item.children, status)
      }
    })
  }
  updateCheckingStatus = ({
    tree,
    currentColIdx,
    targetColIdx,
    rowIdx,
    action,
  }) => {
    if (currentColIdx === targetColIdx) {
      const row = tree[rowIdx]
      const rowType = row.type
      const targetStatus =
        action === checkAction.check
          ? checkingStatus.checked
          : checkingStatus.notChecked
      if (rowType === systemTypes.file) {
        row.checkingStatus = targetStatus
      } else if (rowType === systemTypes.dir) {
        this.updateAllChildrenStatus(row.children, targetStatus)
      }
    } else {
      const unfoldeditem = tree.find((item) => {
        return item.type === systemTypes.dir && item.unfolded === true
      })
      if (unfoldeditem) {
        this.updateCheckingStatus({
          tree: unfoldeditem.children,
          currentColIdx: currentColIdx + 1,
          targetColIdx,
          rowIdx,
          action,
        })
      }
    }
  }
  updateDirCheckingStatus = (tree) => {
    tree.forEach((item) => {
      if (item.type === systemTypes.dir) {
        const dirStatus = this.updateDirCheckingStatus(item.children)
        item.checkingStatus = dirStatus
      }
    })
    const allChecked = tree.every(
      (item) => item.checkingStatus === checkingStatus.checked
    )
    const someChecked = tree.some((item) =>
      [checkingStatus.checked, checkingStatus.intermediate].includes(
        item.checkingStatus
      )
    )
    if (allChecked) {
      return checkingStatus.checked
    } else if (someChecked) {
      return checkingStatus.intermediate
    } else {
      return checkingStatus.notChecked
    }
  }
  handleCheckingStatusChange = (colIdx, rowIdx, action) => {
    console.log(
      '🚀 ~ file: index.js ~ line 127 ~ Main ~ colIdx, rowIdx, action',
      colIdx,
      rowIdx,
      action
    )
    this.updateCheckingStatus({
      tree: this.state.tree,
      currentColIdx: 0,
      targetColIdx: colIdx,
      rowIdx,
      action,
    })
    this.updateDirCheckingStatus(this.state.tree)
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
        onRowCheckingStatusChange={(rowIdx, action) => {
          this.handleCheckingStatusChange(colIdx, rowIdx, action)
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
