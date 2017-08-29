
import { connect } from 'react-redux'

import Layout from '../components/Layout.js'

import PatternList from '../components/templates/PatternList'
import PatternEdit from '../components/templates/PatternEdit'
import { currentPatternPath } from '../tools/store/components'
import { getPath } from '../tools/store/json'

const Index = (props) => {
  const { pattern } = props
  if (pattern) {
    return (<PatternEdit />)
  }
  return (<PatternList />)
}

export default Layout(connect(state => {
  return {
    pattern: getPath(state, currentPatternPath)
  }
})(Index))