import { Component } from 'react'
import { Glyphicon } from 'react-bootstrap'

import AddAttributeModal from './ComponentAdd'

class AttributeEdit extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { attributes, onChange } = this.props
    return (<div>
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

export default AttributeEdit