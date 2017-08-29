
import { connect } from 'react-redux'

import Layout from '../components/Layout.js'
import FakeTagContainer from '../components/editor/FakeTagContainer'
import Property from '../components/editor/Property'
import { currentPatternPath } from '../tools/store/components'
import { getPath } from '../tools/store/json'

const Component = (props) => {
  const { pattern } = props
  if (!pattern) {
    return <div>
      <h1>must come from index edit</h1>
    </div>
  }
  return (<div>
    <h1>{JSON.stringify(pattern)}</h1>
    <div className="row">
      <div className="col-xs-8">
        <FakeTagContainer />
      </div>
      <div className="col-xs-4">
        <Property />
      </div>
    </div>
  </div>

  )
}



export default Layout(connect(state => {
  return {
    pattern: getPath(state, currentPatternPath)
  }
})(Component))