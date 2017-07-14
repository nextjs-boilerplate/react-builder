import React from 'react'
import { Glyphicon } from 'react-bootstrap'

export const tagTypes = {
  container: 'container',
  element: 'element',
  list: 'list',
  if: 'if',
}

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
    const { tag, } = data

    return (<div>
      <p><code>{`<${tag}>`}</code></p>
      <ul>
        <li><a onClick={() => this.handleAddChild(0)}><Glyphicon glyph="plus" /></a></li>
        {!!children && children.map((x, i) => (<li key={i}>
          {x}
          <a onClick={() => this.handleAddChild(i+1)}><Glyphicon glyph="plus" /></a>
        </li>))}
      </ul>
      <p><code>{`</${tag}>`}</code></p>
    </div>)
  }

  renderElement() {
    const { data } = this.props
    return (<p><code>{`</${data.tag}>`}</code></p>)
  }

  handleAddChild(index) {
    const { updateData, data, } = this.props
    const { children = [] } = data

    children.splice(index, 0, {
      tag: 'div',
      type: tagTypes.container
    })

    updateData({
      ...data,
      children,
    })
  }
}

export default FakeTag