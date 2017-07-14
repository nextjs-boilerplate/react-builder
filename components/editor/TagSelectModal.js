import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import Select2 from 'react-select2-wrapper';

import tags from '../../static/editor/tags'

const tagKeys = Object.keys(tags)

export default (resolve, reject) => class TagSelectModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selected: null
    }
  }

  handleChangeSelect(...args){
    console.log(args)
  }

  render() {
    const { selected } = this.state

    return (<Modal onHide={reject}>
      <Modal.Header closeButton>
        <Modal.Title>Choose Tag</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Select2
          data={tagKeys}
          onChange={this.handleChangeSelect.bind(this)}
          options={
            {
              placeholder: 'search tags',
            }
          }
        />

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={reject}>Cancle</Button>
        {!!selected && <Button onClick={() => resolve(selected)}>Confirm</Button>}
      </Modal.Footer>
    </Modal>)
  }
}