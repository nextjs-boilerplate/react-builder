import { Component } from 'react'
import { Glyphicon } from 'react-bootstrap'
import AddAttributeModal from './attribute/ComponentAdd'
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
      <p>attributes：</p>
      <table className="table">
        <tbody>
          {
            Object.keys(attributes).map((k) => {
              const handleChange = (e) => {
                onChange(`attributes.${k}`, e.target.value)
              }
              const deleteAttr = () => {
                delete attributes[k]
                onChange(`attributes`, attributes)
              }
              return (<tr key={k}>
                <td style={{ textAlign: 'right' }}>{k}:</td>
                <td>
                  <input value={attributes[k]} onChange={handleChange} />
                </td>
                <td><a onClick={deleteAttr}><Glyphicon glyph="trash" /></a></td>
              </tr>)
            })
          }
        </tbody>
      </table>
      <a onClick={() => this.addAttr.show().then((obj) => {
        onChange('attributes', {
          ...attributes,
          ...obj,
        })
      }).catch(() => { })}><Glyphicon glyph="plus" /></a>
      <AddAttributeModal ref={(addAttr) => this.addAttr = addAttr} />
    </div>)
  }

}

export default C