import React from 'react'
import { Glyphicon, Modal } from 'react-bootstrap'

import TagSelectModal from './TagSelectModal'
import tags from '../../static/editor/tags'
import { tagTypes, treeEvents } from './define'

const tagKeys = Object.keys(tags)

class FakeTag extends React.Component {
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

    return (<div>
      <p><code onClick={this.handleSelectNode.bind(this)}>{`<${tag}>`}</code></p>
      <ul style={{ paddingLeft: 15, listStyle: 'none' }}>
        <li><a onClick={() => this.handleAddChild(0)}><Glyphicon glyph="plus" /></a></li>
        {!!children && children.map((x, i) => (<li key={i}>
          {x}
          <a onClick={() => this.handleAddChild(i + 1)}><Glyphicon glyph="plus" /></a>
        </li>))}
      </ul>
      <p><code>{`</${tag}>`}</code></p>
      <TagSelectModal ref="promiseModal" />
    </div>)
  }

  renderElement() {
    const { data } = this.props
    return (<p><code onClick={this.handleSelectNode.bind(this)}>{`<${data.tag} />`}</code></p>)
  }


  handleAddChild(index) {
    const { data = {}, updateData } = this.props
    const { children = [] } = data
    const { promiseModal } = this.refs

    promiseModal.show()
      .then((obj) => {
        children.splice(index, 0, obj)
        updateData({
          ...data,
          children,
        })
      })
      .catch((err) => {
        console.log({ err })
      })
  }

  handleSelectNode() {
    const { treeEvent } = this.props
    treeEvent(treeEvents.selectNode)
  }
}

export default FakeTag