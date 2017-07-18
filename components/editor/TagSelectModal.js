import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import PromiseModal from '../modal/PromiseModal'
import tags from '../../static/editor/tags'

const tagKeys = Object.keys(tags)

export default class TagSelectModal extends PromiseModal {

  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      selected: 'text'
    }
  }

  handleChangeSelect(e) {
    this.setState({
      selected: e.target.value,
    })
  }

  getConfig() {
    const handleChangeSelect = this.handleChangeSelect.bind(this)
    const { selected } = this.state
    const reject = this.getReject()
    const resolve = this.getResolve()

    return {
      headerContent: (<Modal.Title>Choose Tag</Modal.Title>),
      bodyContent: (<select value={selected} onChange={handleChangeSelect}>
        {tagKeys.map((tag) => {
          return (<option key={tag} value={tag}>{`<${tag}>`}</option>)
        })}
      </select>),
      footerContent: (<div>
        <Button onClick={reject}>Cancle</Button>
        {!!selected && <Button onClick={() => resolve({
          ...tags[selected],
          tag: selected,
        })}>Confirm</Button>}
      </div>),
    }
  }
}