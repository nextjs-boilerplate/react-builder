import Text from './Text'
import Normal from './Normal'
import Component from './Component'

const mapTag = {
  text: Text,
}

const mapType = {
  component: Component,
}

export default (tag, type) => {

  if (tag && mapTag[tag]) {
    return mapTag[tag]
  }
  if (type && mapType[type]) {
    return mapType[type]
  }
  return Normal
}