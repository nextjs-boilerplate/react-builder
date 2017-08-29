
import React from 'react'
import { connect } from 'react-redux'
import { Panel, OverlayTrigger, Tooltip, SplitButton, MenuItem, Button, FormGroup, InputGroup, FormControl } from 'react-bootstrap'
import { getPath, fetchJSON } from '../../tools/store/json'
import { patternsPath, add, del } from '../../tools/store/components'

import { patternGroups } from '../../static/pages/index'

class GroupPatterns extends React.Component {

  constructor() {
    super();
    this.state = {
      createComponentName: '',
    };
  }

  componentWillMount() {
    this.fetchPatterns(this.props)
  }

  fetchPatterns({ dispatch }) {
    if (!dispatch) dispatch = props.dispatch
    patternGroups.forEach(({ key }) => {
      dispatch(fetchJSON(`/${key}s`, `${patternsPath}.${key}`))
    })
  }

  handleCreateComponentChange(e) {
    const createComponentName = e.target.value
    this.setState({
      createComponentName,
    })
  }

  render() {
    const { group, groupPatterns, dispatch } = this.props
    const { createComponentName } = this.state
    const handleCreateComponentChange = this.handleCreateComponentChange.bind(this)

    let createComponentError = false
    if (!/^[A-Z][\d\w]+$/.test(createComponentName)) {
      createComponentError = `Name must match /^[A-Z][\d\w]+$/`
    }

    groupPatterns && groupPatterns[group.key] && (() => {
      if (groupPatterns[group.key].filter(({ name }) => name === createComponentName).length) {
        createComponentError = `Name already exists`
      }
    })


    return (<Panel header={`Your ${group.title}:`}>
      {!!groupPatterns && !!groupPatterns[group.key] && groupPatterns[group.key].map((pattern) => {
        const tooltip = (
          <Tooltip id="tooltip">{pattern.description || pattern.name}</Tooltip>
        );
        return <div key={pattern.name} style={{
          paddingRight: 10,
          marginBottom: 10,
          display: 'inline-block',
        }}>
          <OverlayTrigger placement="top" overlay={tooltip}>
            <SplitButton bsStyle="info" title={pattern.name} id={`group-patterns-${pattern.name}`}>
              <MenuItem eventKey="edit">Edit</MenuItem>
              <MenuItem eventKey="copy">Copy</MenuItem>
              <MenuItem
                eventKey="delete"
                onClick={() => { del(group.key, pattern.id, dispatch) }}
              >Delete</MenuItem>
            </SplitButton>
          </OverlayTrigger>
        </div>
      })}
      {!groupPatterns && <p>You don't have any {group.title} yet.</p>}
      <hr />
      <FormGroup className={createComponentError ? 'has-error' : ''} >
        <InputGroup>
          <FormControl type="text"
            value={createComponentName}
            onChange={handleCreateComponentChange}
          />
          <InputGroup.Button>
            <Button
              onClick={createComponentError ? () => alert('fix error first') : () => add(group.key, {
                name: createComponentName,
              }, dispatch)}
            >Create new {group.title}</Button>
          </InputGroup.Button>
        </InputGroup>
        {createComponentError && <span className="help-block">{createComponentError}</span>}
      </FormGroup>
    </Panel>)
  }
}

export default connect(state => {
  return {
    groupPatterns: getPath(state, patternsPath),
  }
})(GroupPatterns)