import React from 'react'
import { Glyphicon } from 'react-bootstrap'

import TagSelectModal from './TagSelectModal'
import PromiseModal from '../modal/PromiseModal'

export const tagTypes = {
  container: 'container',
  element: 'element',
  list: 'list',
  if: 'if',
}

class FakeTag extends React.Component {

  constructor(props, ctx) {
    super(props, ctx)
    this.state = {
      showAddTagModal: false,
    }
  }

  render() {
    const { data } = this.props

    switch (data.type) {
      case tagTypes.container:
        return this.renderContainer()
      case tagTypes.element:
      case tagTypes.list:
      case tagTypes.if:
      default:
        return this.renderElement()
    }
  }

  renderContainer() {
    const { children, data = {} } = this.props
    const { tag } = data
    const { showAddTagModal } = this.state
    const { resolve, reject } = this
    return (<div>
      <p><code>{`<${tag}>`}</code></p>
      <ul>
        <li><a onClick={() => this.handleAddChild(0)}><Glyphicon glyph="plus" /></a></li>
        {!!children && children.map((x, i) => (<li key={i}>
          {x}
          <a onClick={() => this.handleAddChild(i + 1)}><Glyphicon glyph="plus" /></a>
        </li>))}
      </ul>
      <p><code>{`</${tag}>`}</code></p>
      <PromiseModal ref="promiseModal"/>
    </div>)
  }

  renderElement() {
    const { data } = this.props
    return (<p><code>{`</${data.tag}>`}</code></p>)
  }

  handleAddChild(index) {
    const {promiseModal} = this.refs
    promiseModal.show()
    .then((result)=>{
      console.log({result})
    })
    .catch((err)=>{
      console.log({err})
    })
    /*
    const { updateData, data, } = this.props
    const { children = [] } = data

    this.addTagModalPromise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
      this.setState({
        showAddTagModal: true,
      })
    }).then((obj) => {
      children.splice(index, 0, obj)
      updateData({
        ...data,
        children,
      })
      this.setState({
        showAddTagModal: false,
      })
    }).catch(() => {
      this.setState({
        showAddTagModal: false,
      })
    })
    */
  }
}

export default FakeTag