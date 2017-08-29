
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

import FakeTagContainer from '../editor/FakeTagContainer'
import Property from '../editor/Property'
import { currentPatternPath } from '../../tools/store/components'
import { getPath, setJSON } from '../../tools/store/json'

const Component = (props) => {
  const { pattern, dispatch } = props

  return (<div>
    <h1>
      {pattern.name}
      <Button className="pull-right"
        onClick={() => dispatch(setJSON(undefined, currentPatternPath))}
      >Back</Button>
    </h1>
    <div className="clearfix">
    </div>
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



export default connect(state => {
  return {
    pattern: getPath(state, currentPatternPath)
  }
})(Component)