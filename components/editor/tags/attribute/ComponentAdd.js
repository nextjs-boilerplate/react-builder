import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import Head from 'next/head'

import PromiseModal from '../../../modal/PromiseModal'

export default class AttrSelectModal extends PromiseModal {

  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      selectedAttr: undefined,
      value: '',
    }
  }

  onShow({ tag = '', attrs = [] }) {
    this.setState({
      tag,
      attrs,
      selectedAttr: undefined,
      value: '',
    })
  }

  getConfig() {
    const { selectedAttr, value } = this.state
    const reject = this.getReject()
    const resolve = this.getResolve()

    return {
      headerContent: (<Modal.Title>Add Component Props</Modal.Title>),
      bodyContent: (<div>
        <Head>
          <link href="https://cdn.bootcss.com/react-select/1.0.0-rc.5/react-select.min.css" rel="stylesheet" />
        </Head>
        <label>Add Component Props:</label>
        <input
          value={selectedAttr}
          onChange={(e) => {
            this.setState({
              selectedAttr: e.target.value,
            })
          }} />
        <hr />
        <div className="form-group">
          <label>fill value:</label>
          <textarea
            className="form-control"
            rows="3"
            onChange={(e) => {
              this.setState({
                value: e.target.value,
              })
            }}
            value={value || ''}
          />
          <span id="helpBlock" className="help-block">{`use data from props like props.key or just value like 'str' or expression like props.key || 'str'`}</span>
        </div>
      </div>),
      footerContent: (<div>
        {(!!selectedAttr && !!value) && (<Button bsStyle="primary" onClick={() => resolve({
          [selectedAttr]: value,
        })}>Add Prop</Button>)}
        <Button onClick={reject}>Cancle</Button>
      </div>),
    }
  }
}