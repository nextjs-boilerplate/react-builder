import { connect } from 'react-redux'
import { Panel, Button } from 'react-bootstrap'

import { setJSON, getPath, pathMerge } from '../../tools/store/json'
import { tagTypes, currentEditorFakeTagRootPath, currentEditorFakeTagRelativePath } from './define'
import getTagEditor from './tags'

const Property = (props) => {
  const { path, root, dispatch } = props
  const pathData = getPath(root, path) || {}
  const TagEditor = getTagEditor(pathData.tag, pathData.type)
  const onChange = (k, v) => {
    const newRoot = pathMerge(root, path ? `${path}.${k}` : k, v)
    return dispatch(setJSON(newRoot, currentEditorFakeTagRootPath))
  }
  const onDelete = () => {
    dispatch(setJSON(undefined, currentEditorFakeTagRelativePath))
    const parentPathArr = path.split('.')
    const index = parseInt(parentPathArr.pop())
    const parentPath = parentPathArr.join('.')
    const parentObj = getPath(root, parentPath)
    parentObj.splice(index, 1)
    const newParentObj = [...parentObj]
    const newRoot = pathMerge(root, parentPath, newParentObj)
    dispatch(setJSON(newRoot, currentEditorFakeTagRootPath))
  }

  return (<Panel header={`Element Path: /${path}`}>
    <TagEditor onChange={onChange} tagData={pathData} />
    {!!path && (<div>
      <hr />
      <Button onClick={onDelete}>delete</Button>
    </div>)}
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