import { connect } from 'react-redux'
import { Panel } from 'react-bootstrap'

import { setJSON, getPath, pathMerge } from '../../tools/store/json'
import {tagTypes} from './FakeTag'

const currentEditorFakeTagRootPath = 'app.global.current.editor.faketagroot'

const Property = (props) => {
  const { path, root } = props

  return (<Panel header={path}>{JSON.stringify(root)}</Panel>)
}

export default connect((state) => {
  return {
    root: getPath(state, currentEditorFakeTagRootPath) || {
      type: tagTypes.container,
      tag: 'div',
      path: ''
    },
  }
})(Property)