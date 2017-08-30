import Text from './Text'
import Normal from './Normal'

const map = {
  text: Text,
}

export default (type) => {
  if (map[type]) {
    return map[type]
  }
  return Normal
}