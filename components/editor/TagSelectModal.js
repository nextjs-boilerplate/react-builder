import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import Select2 from 'react-select'
import Head from 'next/head'

import PromiseModal from '../modal/PromiseModal'
import tags from '../../static/editor/tags'
import ComponentSelect from './ComponentSelect'

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
      bodyContent: (<div>
        <Head>
          <link href="https://cdn.bootcss.com/react-select/1.0.0-rc.5/react-select.min.css" rel="stylesheet" />
        </Head>
        <label>基础标签：</label>
        <Select2
          options={tagKeys.map(k => {
            return {
              label: k,
              value: {
                ...tags[k],
                tag: k,
              }
            }
          })}
          onChange={(tag) => {
            if (tag) {
              resolve(tag.value)
            }
          }} />
        <hr />
        <label>其他组件：</label>
        <ComponentSelect onChange={(tag) => {
          if (tag) {
            resolve(tag.value)
          }
        }} />
      </div>),
      footerContent: (<div>
        <Button onClick={reject}>Cancle</Button>
      </div>),
    }
  }
}