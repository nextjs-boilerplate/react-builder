import React from 'react'
import TreeNode from './TreeNode'
import pathMerge from './merge'

class TreeContainer extends React.Component {
  constructor(props, ctx) {
    super(props, ctx)
  }

  render() {
    const { data, Template } = this.props
    return (<TreeNode
      data={data}
      onUpdateData={this.onUpdateData.bind(this)}
      Template={Template}
    />)
  }

  onUpdateData(path, node) {
    const { data, onUpdateData } = this.props
    const result = pathMerge(data, path, node)
    onUpdateData(result)
  }
}



export default TreeContainer