import React from 'react'
import { connect } from 'react-redux'
import TreeRenderer from 'react-tree-renderer'

import { tagTypes, currentEditorFakeTagRootPath, currentEditorFakeTagRelativePath, treeEvents } from './define'
import FakeTag from './FakeTag'
import { setJSON, getPath, pathMerge } from '../../tools/store/json'

class FakeTagContainer extends React.Component {
  constructor(props, ctx) {
    super(props, ctx)
  }

  componentDidMount() {
    const { initDom, dispatch } = this.props
    if (initDom) {
      dispatch(setJSON(initDom, currentEditorFakeTagRootPath))
    }
  }

  render() {
    const { root } = this.props
    const onUpdateData = this.onUpdateData.bind(this)
    const onTreeEvent = this.onTreeEvent.bind(this)

    return (<TreeRenderer
      Template={FakeTag}
      data={root}
      onUpdateData={onUpdateData}
      onTreeEvent={onTreeEvent} />)
  }

  onUpdateData(root) {
    const { dispatch } = this.props
    dispatch(setJSON(root, currentEditorFakeTagRootPath))
  }

  onTreeEvent(eventStr, eventData, path) {
    const { dispatch } = this.props
    switch (eventStr) {
      case treeEvents.selectNode:
        dispatch(setJSON(path, currentEditorFakeTagRelativePath))
        break;

      default:
        break;
    }
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