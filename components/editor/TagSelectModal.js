import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import Select2 from 'react-select'
import Head from 'next/head'

import PromiseModal from '../modal/PromiseModal'
import tags from '../../static/editor/tags'
import ComponentSelect from './ComponentSelect'

export default class TagSelectModal extends PromiseModal {

  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      selected: 'text',
      filterType: undefined,
    }
  }

  handleChangeSelect(e) {
    this.setState({
      selected: e.target.value,
    })
  }

  onShow(obj = {}) {
    const { filterType } = obj
    if (filterType) {
      this.setState({ filterType })
    }
  }

  getConfig() {
    const handleChangeSelect = this.handleChangeSelect.bind(this)
    const { selected, filterType } = this.state
    const reject = this.getReject()
    const resolve = this.getResolve()

    const tagKeys = filterType ? Object.keys(tags).filter((x) => tags[x].type == filterType) : Object.keys(tags)
    return {
      headerContent: (<Modal.Title>Choose Tag</Modal.Title>),
      bodyContent: (<div>
        <Head>
          <link href="https://cdn.bootcss.com/react-select/1.0.0-rc.5/react-select.min.css" rel="stylesheet" />
        </Head>
        <label>basic tags:</label>
        <Select2
          options={tagKeys.map(k => {
            return {
              label: `${k} - ${tags[k].desc}`,
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
        {!filterType && (<div>
          <hr />
          <label>components:</label>
          <ComponentSelect onChange={(tag) => {
            if (tag) {
              resolve(tag.value)
            }
          }} />
        </div>)}
      </div>),
      footerContent: (<div>
        <Button onClick={reject}>Cancle</Button>
      </div>),
    }
  }
}