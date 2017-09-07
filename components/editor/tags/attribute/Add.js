import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import Select2 from 'react-select'
import Head from 'next/head'

import PromiseModal from '../../../modal/PromiseModal'
import attrlist from '../../../../static/editor/attrs'

const attrKeys = Object.keys(attrlist)

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
      headerContent: (<Modal.Title>Choose Attribute</Modal.Title>),
      bodyContent: (<div>
        <Head>
          <link href="https://cdn.bootcss.com/react-select/1.0.0-rc.5/react-select.min.css" rel="stylesheet" />
        </Head>
        <label>Choose Attribute:</label>
        <Select2
          options={attrKeys.map(k => {
            return {
              label: `${k} - ${attrlist[k].desc}`,
              value: k,
            }
          })}
          value={selectedAttr}
          onChange={(tag) => {
            if (tag) {
              this.setState({
                selectedAttr: tag.value
              })
              return
            }
            this.setState({
              selectedAttr: undefined
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
          <span id="helpBlock" className="help-block">{`do not use html encoded content, use data like \`\${data}\``}</span>
        </div>
      </div>),
      footerContent: (<div>
        {(!!selectedAttr && !!value) && (<Button bsStyle="primary" onClick={() => resolve({
          [selectedAttr]: value,
        })}>Add attribute</Button>)}
        <Button onClick={reject}>Cancle</Button>
      </div>),
    }
  }
}