
import { Component } from 'react'
import { Button } from 'react-bootstrap'
import JsonEditor from './react-json-view'

class DataEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { datas = { default: {} } } = this.props
    const { key = 'default' } = this.state
    const data = datas[key] || {}

    return (<div>
      <div>
        {Object.keys(datas).map((k) => {
          return (<Button key={k} bsStyle={k === key ? 'primary' : 'normal'} >{k}</Button>)
        })}
        <Button bsStyle="normal">+</Button>
      </div>
      <hr />
      <div>
        <JsonEditor src={data} onAdd={console.log} onEdit={console.log} onDelete={console.log}  />
      </div>
    </div>)
  }
}

export default DataEdit