
import { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

import FakeTagContainer from '../editor/FakeTagContainer'
import { currentEditorFakeTagRootPath, currentEditorFakeTagRelativePath } from '../editor/define'
import Property from '../editor/Property'
import { currentPatternPath, update } from '../../tools/store/components'
import { getPath, setJSON } from '../../tools/store/json'
import Preview from '../organisms/Preview'

class Edit extends Component {
  constructor(props) {
    super(props)
    const { pattern } = props
    this.state = {
      dom: pattern.dom
    }
  }
  render() {
    const { pattern, dispatch } = this.props
    const { dom } = this.state
    return (<div>
      <h1>
        {pattern.name}
        <span className="pull-right">
          <Button bsStyle="primary"
            onClick={this.savePattern.bind(this)}
          >Save</Button>
          &nbsp;&nbsp;
        <Button
            onClick={() => {
              dispatch(setJSON(undefined, currentPatternPath))
              dispatch(setJSON(undefined, currentEditorFakeTagRootPath))
              dispatch(setJSON(undefined, currentEditorFakeTagRelativePath))
            }}
          >Back</Button>
        </span>
      </h1>
      <hr />
      <div className="row">
        <div className="col-xs-8">
          <FakeTagContainer initDom={dom} />
        </div>
        <div className="col-xs-4">
          <Property />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-xs-8">
          <Preview pattern={pattern} />
        </div>
        <div className="col-xs-4">

        </div>
      </div>
    </div>)
  }

  savePattern() {
    const { pattern, editDom, dispatch } = this.props
    const newPattern = {
      ...pattern,
      dom: editDom,
    }
    update(pattern.type, newPattern, dispatch)
      .then(() => {
        return dispatch(setJSON(newPattern, currentPatternPath))
      })
      .then(() => {
        $.get('http://localhost:3005/exit')
        alert('save success, preview refreshing please wait.')
      })
      .catch((err) => {
        alert('save failed, detailed in console')
        console.log(err)
      })
  }
}

export default connect(state => {
  return {
    pattern: getPath(state, currentPatternPath),
    editDom: getPath(state, currentEditorFakeTagRootPath),
  }
})(Edit)