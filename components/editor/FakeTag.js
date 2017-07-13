import React from 'react'
import { Button, Glyphicon } from 'react-bootstrap'

export const tagTypes = {
  container: 'container',
  element: 'element',
  list: 'list',
  if: 'if',
}

class FakeTag extends React.Component {
  constructor(props, ctx) {
    super(props, ctx)
  }

  render() {
    const { type } = this.props

    switch (type) {
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
    const { children, tag, path, handleAddChild } = this.props
    const pathPrifix = path?`${path}.`:''
    return (<div>
      <p><code>{`<${tag}>`}</code></p>
      <ul>
        {!!children && children.map((x, i) => (<li key={i}>
          <Button onClick={()=>this.handleAddChild(i)}><Glyphicon glyph="plus" /></Button>
          <FakeTag {...x} path={`${pathPrifix}children.${i}`} handleAddChild={handleAddChild} />
        </li>))}
        <li><Button onClick={()=>this.handleAddChild(children?children.length:0)}><Glyphicon glyph="plus" /></Button></li>
      </ul>
      <p><code>{`</${tag}>`}</code></p>
    </div>)
  }

  renderElement() {
    const { tag } = this.props
    return (<p><code>{`</${tag}>`}</code></p>)
  }

  handleAddChild(index) {
    const { path, handleAddChild } = this.props
    handleAddChild(path,index,{
      tag:'div',
      type: tagTypes.container
    })
  }
}



export default FakeTag