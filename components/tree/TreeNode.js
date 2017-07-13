import React from 'react'
import getChildren from './children'

class TreeNode extends React.Component {

  render() {
    const { data = {}, path, onUpdateData, Template, } = this.props
    const children = getChildren({
      TreeNode,
      data,
      onUpdateData,
      Template,
      path,
    })
    return (<Template
      data={data}
      updateData={this.updateData.bind(this)}
      children={children}
    />)
  }

  updateData(node) {
    const { path, onUpdateData } = this.props
    onUpdateData(path, node)
  }
}



export default TreeNode