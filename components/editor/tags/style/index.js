import { Component } from 'react'
import { Glyphicon } from 'react-bootstrap'

import AddStyleModal from './Add'

class StyleEdit extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { styles, onChange } = this.props
    return (<div>
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

export default StyleEdit