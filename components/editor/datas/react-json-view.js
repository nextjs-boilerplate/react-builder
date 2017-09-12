if (typeof window != 'undefined') {
  module.exports = require('react-json-view')
} else {
  module.exports = () => (<div />)
}