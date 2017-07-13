import React from 'react'

import TreeContainer from './TreeContainer'
import DefaultTemplate from './DefaultTemplate'



export default class TestTree extends React.Component {

  constructor(props, ctx) {
    super(props, ctx)
    this.state = {
      root: {
        title: 'root',
        children: [
          {
            title: 'test1',
          }
        ]
      }
    }
  }

  onUpdateData(root) {
    this.setState(
      { root, }
    )
  }

  render() {
    const onUpdateData = this.onUpdateData.bind(this)
    const { root = {} } = this.state

    return (<TreeContainer Template={DefaultTemplate} data={root} onUpdateData={onUpdateData} />)

  }
}