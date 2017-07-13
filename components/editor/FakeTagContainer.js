import React from 'react'
import { connect } from 'react-redux'
import { tagTypes, default as FakeTag } from './FakeTag'
import { setJSON, getPath, pathMerge } from '../../tools/store/json'

const currentEditorFakeTagRootPath = 'app.global.current.editor.faketagroot'


class FakeTagContainer extends React.Component {
  constructor(props, ctx) {
    super(props, ctx)
  }

  render() {
    const { root } = this.props
    return (<FakeTag {...root} handleAddChild={this.handleAddChild.bind(this)}/>)
  }

  handleAddChild(path, index, child) {
    const { root,dispatch } = this.props
    const childrenPath = path?`${path}.children`:'children'
    console.log(['childrenPath',childrenPath])
    const children = [...getPath(root, childrenPath) || []]
    children.splice(index,0,child)
    const newRoot = pathMerge(root,childrenPath,children)
    dispatch(setJSON(newRoot,currentEditorFakeTagRootPath))
  }
}



export default connect((state) => {
  return {
    root: getPath(state, currentEditorFakeTagRootPath) || {
      type: tagTypes.container,
      tag: 'div',
      path: ''
    },
  }
})(FakeTagContainer)