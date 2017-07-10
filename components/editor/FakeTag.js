import React from 'react'
import {Button,Glyphicon} from 'react-bootstrap'

const tagTypes = {
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

    switch(type){
      case tagTypes.container:
        return this.renderContainer()
      case tagTypes.element:
      case tagTypes.list:
      case tagTypes.if:
      default:
        return this.renderElement()
    }

  }

  renderContainer(){
    const {children,tag} = this.props
    return (<div>
      <p><code>{`<${tag}>`}</code></p>
      <ul>
        {!!children && children.map((x,i)=>(<li key={i}>
          <Button><Glyphicon glyph="plus" /></Button><FakeTag {...x} />
        </li>))}
        <li><Button><Glyphicon glyph="plus" /></Button></li>
      </ul>
      <p><code>{`</${tag}>`}</code></p>
    </div>)
  }

  renderElement(){
    const {tag} = this.props
    return (<p><code>{`</${tag}>`}</code></p>)
  }

}



export default FakeTag