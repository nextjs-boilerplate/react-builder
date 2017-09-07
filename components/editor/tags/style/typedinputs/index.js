import Any from './Any'
import Select from './Select'
import attrlist from '../../../../../static/editor/css'

export default (key) => {
  const property = attrlist[key] || {}
  switch (property.type) {
    case 'enum':
      return Select

    default:
      return Any
  }
}