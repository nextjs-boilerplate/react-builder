import { merge } from 'lodash'

const getAttributeString = (dom) => {
  var str = ''

  if (dom.attributes && Object.keys(dom.attributes).length) {
    str += Object.keys(dom.attributes).map((k) => `${k}="${dom.attributes[k]}"`).join(' ')
  }

  if (dom.styles && Object.keys(dom.styles).length) {
    str += ` style={${JSON.stringify(dom.styles)}}`
  }

  return str
}

const getDomHtml = (dom) => {
  const { tag, text, type, component = {} } = dom

  if (tag === 'text') {
    return `{\`${text || ''}\`}`
  }

  if (type === 'component') {
    const { type = '', name = '' } = component
    const tagRename = `${type.toUpperCase()}_${name}`
    return [`<${tagRename} />`, {
      [type]: {
        [name]: tagRename
      }
    }]
  }

  const attrs = getAttributeString(dom)

  if (!dom.children || !dom.children.length) {
    return `<${tag} ${attrs} />`
  }

  const { content, rely } = dom.children.map((x) => {
    const rtn = getDomHtml(x)
    if (!Array.isArray(rtn)) {
      return [rtn, {}]
    }
    return rtn
  }).reduce((obj, [jsx, relys]) => {
    obj.content += ` ${jsx}`
    obj.rely = merge(obj.rely, relys)
    return obj
  }, { content: '', rely: {} })

  return [`<${tag} ${attrs}>${content}</${tag}>`, rely]
}

export default (pattern) => {
  const { dom } = pattern
  const rtn = getDomHtml(dom)
  if (Array.isArray(rtn)) {
    const [jsx, rely = {}] = rtn
    const relyStr = Object.keys(rely).map((set) => {
      return Object.keys(rely[set]).map((name) => {
        return `import {default as ${rely[set][name]}} from '../${set}s/${name}'`
      }).join("\n\r")
    }).join("\n\r")

    return `${relyStr} 
export default (props)=>(${jsx})`

  } else {
    return `export default (props)=>(${rtn})`
  }
}