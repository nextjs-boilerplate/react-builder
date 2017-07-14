import React from 'react'
import { connect } from 'react-redux'
import TreeRenderer from 'react-tree-renderer'

import { tagTypes, default as FakeTag } from './FakeTag'
import { setJSON, getPath, pathMerge } from '../../tools/store/json'

const currentEditorFakeTagRootPath = 'app.global.current.editor.faketagroot'


class FakeTagContainer extends React.Component {
  constructor(props, ctx) {
    super(props, ctx)
  }

  render() {
    const { root } = this.props
    const onUpdateData = this.onUpdateData.bind(this)

    return (<TreeRenderer Template={FakeTag} data={root} onUpdateData={onUpdateData}/>)
  }

  onUpdateData(root) {    
    const { dispatch } = this.props
    dispatch(setJSON(root,currentEditorFakeTagRootPath))
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