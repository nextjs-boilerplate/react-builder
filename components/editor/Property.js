import { connect } from 'react-redux'
import { Panel } from 'react-bootstrap'

import { setJSON, getPath, pathMerge } from '../../tools/store/json'
import { tagTypes, currentEditorFakeTagRootPath, currentEditorFakeTagRelativePath } from './define'

const Property = (props) => {
  const { path, root } = props
  const pathData = getPath(root,path)

  return (<Panel header={`Element Path: /${path}`}>
    {JSON.stringify(pathData)}
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