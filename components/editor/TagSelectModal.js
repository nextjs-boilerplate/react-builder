import React from 'react'
import { Modal, Button } from 'react-bootstrap'

import tags from '../../static/editor/tags'

const tagKeys = Object.keys(tags)

export default class TagSelectModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selected: 'text'
    }
  }

  handleChangeSelect(e) {
    this.setState({
      selected: e.target.value,
    })
  }

  render() {
    const { selected } = this.state
    const { resolve, reject } = this.props

    return (<Modal onHide={reject} show={true}>
      <Modal.Header closeButton>
        <Modal.Title>Choose Tag</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <select value={selected} onChange={this.handleChangeSelect.bind(this)}>
          {tagKeys.map((tag) => {
            return (<option key={tag} value={tag}>{`<${tag}>`}</option>)
          })}
        </select>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={reject}>Cancle</Button>
        {!!selected && <Button onClick={() => resolve({
          tag: selected,
          type: tags[selected].type
          })}>Confirm</Button>}
      </Modal.Footer>
    </Modal>)
  }
}