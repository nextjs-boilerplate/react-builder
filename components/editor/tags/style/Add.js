import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import Select2 from 'react-select'
import Head from 'next/head'
import camelCase from 'camel-case'

import PromiseModal from '../../../modal/PromiseModal'
import attrlist from '../../../../static/editor/css'
import getInput from './typedinputs'

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
    const InputComponent = getInput(selectedAttr)
    return {
      headerContent: (<Modal.Title>Choose CSS Property</Modal.Title>),
      bodyContent: (<div>
        <Head>
          <link href="https://cdn.bootcss.com/react-select/1.0.0-rc.5/react-select.min.css" rel="stylesheet" />
        </Head>
        <label>Choose CSS Property:</label>
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
        {!!selectedAttr && (<div>
          <hr />
          <InputComponent
            onChange={(value) => {
              this.setState({
                value,
              })
            }}
            value={value || ''}
            cssProperty={attrlist[selectedAttr]}
          />
        </div>)}
      </div>),
      footerContent: (<div>
        {(!!selectedAttr && !!value) && (<Button bsStyle="primary" onClick={() => resolve({
          [camelCase(selectedAttr)]: value,
        })}>Add style</Button>)}
        <Button onClick={reject}>Cancle</Button>
      </div>),
    }
  }
}