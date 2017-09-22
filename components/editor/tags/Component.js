import { Component } from 'react'
import { Glyphicon } from 'react-bootstrap'
import AttributeEdit from './attribute/Component'
import AddStyleModal from './style/Add'

class C extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { onChange, tagData } = this.props
    const { attributes = {}, styles = {} } = tagData
    return (<div>
      <div className="form-group">
        <label>Component: </label>
        <p>{`${tagData.component.type}s/${tagData.component.name}`}</p>
      </div>
      <hr />
      <p>props：</p>
      <AttributeEdit attributes={attributes} onChange={onChange} />
    </div>)
  }

}

export default C