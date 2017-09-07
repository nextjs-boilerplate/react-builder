import { Component } from 'react'
import { Glyphicon } from 'react-bootstrap'
import AddAttributeModal from './attribute/Add'
import AddStyleModal from './style/Add'

class Normal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { onChange, tagData } = this.props
    const { attributes = {}, styles = {} } = tagData
    return (<div>
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
      <hr />
      <p>styles：</p>
      <table className="table">
        <tbody>
          {
            Object.keys(styles).map((k) => {
              const handleChange = (e) => {
                onChange(`styles.${k}`, e.target.value)
              }
              const deleteAttr = () => {
                delete styles[k]
                onChange(`styles`, styles)
              }
              return (<tr key={k}>
                <td style={{ textAlign: 'right' }}>{k}:</td>
                <td>
                  <input value={styles[k]} onChange={handleChange} />
                </td>
                <td><a onClick={deleteAttr}><Glyphicon glyph="trash" /></a></td>
              </tr>)
            })
          }
        </tbody>
      </table>
      <a onClick={() => this.addStyle.show().then((obj) => {
        onChange('styles', {
          ...styles,
          ...obj,
        })
      }).catch(() => { })}><Glyphicon glyph="plus" /></a>
      <AddStyleModal ref={(addStyle) => this.addStyle = addStyle} />

    </div>)
  }

}

export default Normal