import { connect } from 'react-redux'
import { Panel } from 'react-bootstrap'

import { setJSON, getPath, pathMerge } from '../../tools/store/json'
import { tagTypes, currentEditorFakeTagRootPath, currentEditorFakeTagRelativePath } from './define'
import getTagEditor from './tags'

const Property = (props) => {
  const { path, root, dispatch } = props
  const pathData = getPath(root, path) || {}
  const TagEditor = getTagEditor(pathData.tag)
  const onChange = (k, v) => {
    const newRoot = pathMerge(root, path ? `${path}.${k}` : k, v)
    return dispatch(setJSON(newRoot, currentEditorFakeTagRootPath))
  }

  return (<Panel header={`Element Path: /${path}`}>
    <TagEditor onChange={onChange} tagData={pathData} />
  </Panel>)
}

export default connect((state) => {
  return {
    root: getPath(state, currentEditorFakeTagRootPath) || {
      type: tagTypes.container,
      tag: 'div',
      path: ''
    },
    path: getPath(state, currentEditorFakeTagRelativePath) || '',
  }
})(Property)