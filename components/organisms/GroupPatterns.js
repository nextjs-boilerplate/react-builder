
import React from 'react'
import { connect } from 'react-redux'
import { Panel, OverlayTrigger, Tooltip, SplitButton, MenuItem, Button, FormGroup, InputGroup, FormControl } from 'react-bootstrap'
import { getPath, fetchJSON } from '../../tools/store/json'

import data from '../../static/organisms/group-patterns'

const groupPatternMapPath = 'app.global.map.groupPattern'

const fetchPatterns = ({ dispatch, group, groupPatterns }) => {
  if (!group) return
  if (!groupPatterns || !groupPatterns[group.key]) {
    dispatch(fetchJSON(`/static/organisms/group-patterns-${group.key}.json`, `${groupPatternMapPath}.${group.key}`))
  }
}

class GroupPatterns extends React.Component {

  constructor() {
    super();
    this.state = {
      createComponentName: '',
      createComponentError: false,
    };
  }

  componentWillMount() {
    fetchPatterns(this.props)
  }

  componentWillReceiveProps(nextProps) {
    fetchPatterns(nextProps)
  }

  handleCreateComponentChange(e){
    const createComponentName = e.target.value
    const { group, groupPatterns } = this.props
    
    this.setState({ createComponentName }) 
  }

  render() {
    const { group, groupPatterns } = this.props
    const { createComponentName, createComponentError } = this.state

    return (<Panel header={`Your ${group.title}:`}>
      {!!groupPatterns && !!groupPatterns[group.key] && groupPatterns[group.key].map((pattern) => {
        const tooltip = (
          <Tooltip id="tooltip">{pattern.description || pattern.title}</Tooltip>
        );
        return <div key={pattern.title} style={{ paddingRight: 10, display: 'inline-block' }}>
          <OverlayTrigger placement="top" overlay={tooltip}>
            <SplitButton bsStyle="info" title={pattern.title} id={`group-patterns-${pattern.title}`}>
              <MenuItem eventKey="edit">Edit</MenuItem>
              <MenuItem eventKey="copy">Copy</MenuItem>
              <MenuItem eventKey="delete">Delete</MenuItem>
            </SplitButton>
          </OverlayTrigger>
        </div>
      })}
      {!groupPatterns && <p>You don't have any {group.title} yet.</p>}
      <hr />
      <FormGroup className={createComponentError ? 'has-error' : ''} >
        <InputGroup>
          <FormControl type="text" value={createComponentName} onChange={(e) => { }} />
          <InputGroup.Button>
            <Button>Create new {group.title}</Button>
          </InputGroup.Button>
        </InputGroup>
        {createComponentError && <span class="help-block">{createComponentError}</span>}
      </FormGroup>
    </Panel>)
  }
}

export default connect(state => {
  return {
    groupPatterns: getPath(state, groupPatternMapPath),
  }
})(GroupPatterns)