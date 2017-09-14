
import { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import JsonEditor from './react-json-view'

import { currentEditorFakeTagRootPath } from '../define'
import { getPath, setJSON } from '../../../tools/store/json'

const datasPath = `${currentEditorFakeTagRootPath}.datas`

class DataEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  updateSrc({ updated_src }) {
    const { key = 'default' } = this.state
    const { datas, dispatch } = this.props
    const newValue = {
      ...datas,
      [key]: updated_src,
    }
    dispatch(setJSON(newValue, datasPath))
  }

  render() {
    const { datas = { default: {} } } = this.props
    const { key = 'default' } = this.state
    const data = datas[key] || {}
    const onUpdate = (obj) => {
      this.updateSrc(obj)
    }
    return (<div>
      <div>
        {Object.keys(datas).map((k) => {
          return (<Button key={k} bsStyle={k === key ? 'primary' : 'default'} >{k}</Button>)
        })}
        <Button bsStyle="default">+</Button>
      </div>
      <hr />
      <div>
        <JsonEditor src={data} onAdd={onUpdate} onEdit={onUpdate} onDelete={onUpdate} />
      </div>
    </div>)
  }
}

export default connect((state) => {
  return {
    datas: getPath(state, datasPath)
  }
})(DataEdit)