

import { connect } from 'react-redux'
import { Grid, Row, Col, Panel, ListGroup, ListGroupItem } from 'react-bootstrap'

import Layout from '../components/Layout.js'
import GroupPatterns from '../components/organisms/GroupPatterns'

import { Link } from '../tools/routes'
import data from '../static/pages/index'
import { setJSON, getPath } from '../tools/store/json'

const currentPatternGroupPath = 'app.global.current.patternGroup'

const Index = (props) => {
  const { dispatch, currentPatternGroup } = props
  const setCurrentPatternGroup = (g) => {
    if (currentPatternGroup && currentPatternGroup.key === g.key) {
      dispatch(setJSON(null, currentPatternGroupPath))
      return
    }
    dispatch(setJSON(g, currentPatternGroupPath))
  }
  return (<div className="row">
    <Grid>
      <Row>
        <Col xs={4} md={4}>
          <ListGroup>
            {data.patternGroups.map((patternGroup) => {
              return (currentPatternGroup && currentPatternGroup.key === patternGroup.key) ?
                <ListGroupItem key={patternGroup.key} header={patternGroup.title} onClick={
                  () => setCurrentPatternGroup(patternGroup)
                }>{patternGroup.description}</ListGroupItem> :
                <ListGroupItem key={patternGroup.key} onClick={
                  () => setCurrentPatternGroup(patternGroup)
                }>{patternGroup.title}</ListGroupItem>
            })}
          </ListGroup>
        </Col>
        <Col xs={8} md={8}>
          {!!currentPatternGroup && <GroupPatterns group={currentPatternGroup} />}
        </Col>
      </Row>
    </Grid>
  </div>
  )
}

export default Layout(connect(state => {
  return {
    currentPatternGroup: getPath(state, currentPatternGroupPath),
  }
})(Index))