import { connect } from 'react-redux'
import Select2 from 'react-select'

import { patternsPath } from '../../tools/store/components'
import { getPath } from '../../tools/store/json'

const getOptions = (patterns) => {
  if (!patterns) return []
  const sets = Object.keys(patterns).map((k) => {
    return patterns[k].map((x) => {
      const label = `${k}s.${x.name}`
      return {
        label,
        value: {
          component: x,
          tag: label,
          type: 'component',
        }
      }
    })
  })

  return sets.reduce((rtn, next) => rtn.concat(next), [])
}

const Select = ({ onChange, patterns }) => {

  return (<Select2
    options={getOptions(patterns)}
    onChange={onChange} />)
}


export default connect((state) => {
  return {
    patterns: getPath(state, patternsPath),
  }
})(Select)