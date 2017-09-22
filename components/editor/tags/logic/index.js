import { Component } from 'react'
import { Glyphicon, Button, Tooltip, OverlayTrigger } from 'react-bootstrap'

const examples = [
  {
    type: 'if',
    code: '!!props.show&&<%= element %>',
  }, {
    type: 'loop',
    code: 'prpos.list.map((x,i)=><li key={i}><%= element %></li>)',
  }, {
    type: 'custom',
    code: '(()=>prpos.list.filter((x)=>x.show&&!x.ignore).map(x=><li key={x.id}><%= element %></li>))()',
  },
]

class LogicEdit extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { logic = '', onChange } = this.props
    return (<div className="form-group">
      <textarea
        className="form-control"
        rows="3"
        onChange={(e) => onChange('logic', e.target.value)}
        value={logic}
      />
      <span id="helpBlock" className="help-block">
        examples: {examples.map((x, i) => <OverlayTrigger
          key={i}
          placement="top"
          overlay={(<Tooltip placement="top" className="in" id="tooltip-top">{x.code}</Tooltip>)}>
          <Button
            onClick={() => onChange('logic', x.code)}
          >{x.type}</Button>
        </OverlayTrigger>)}
      </span>
    </div>)
  }
}

export default LogicEdit