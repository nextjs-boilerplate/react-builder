import { Component } from 'react'
import { Glyphicon } from 'react-bootstrap'
import EditAttribute from './attribute'
import StyleEdit from './style'

class Normal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { onChange, tagData } = this.props
    const { attributes = {}, styles = {}, logic = '' } = tagData
    return (<div>
      <p>attributes:</p>
      <EditAttribute attributes={attributes} onChange={onChange} />
      <hr />
      <p>styles:</p>
      <StyleEdit styles={styles} onChange={onChange} />
    </div>)
  }

}

export default Normal