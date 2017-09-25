import { merge, template } from 'lodash'

export function getAttributeString(dom) {
  var str = ''

  if (dom.attributes && Object.keys(dom.attributes).length) {
    const { type = '' } = dom
    if (type === 'component') {
      str += Object.keys(dom.attributes).map((k) => `${k}={${dom.attributes[k]}}`).join(' ')
    } else {
      str += Object.keys(dom.attributes).map((k) => `${k}="${dom.attributes[k]}"`).join(' ')
    }
  }

  if (dom.styles && Object.keys(dom.styles).length) {
    str += ` style={${JSON.stringify(dom.styles)}}`
  }

  return str
}


export function getLogicHtml(logic, html) {
  if (!logic) {
    return html
  }
  const compiled = template(logic)
  return `{${compiled({ element: html })}}`
}


export function getDomHtml(dom) {
  const { tag, text, type, component = {}, logic } = dom

  if (tag === 'text') {
    return `{\`${text || ''}\`}`
  }

  if (type === 'component') {
    const { type = '', name = '' } = component
    const tagRename = `${type.toUpperCase()}_${name}`
    const attributes = getAttributeString(dom)

    return [getLogicHtml(logic, `<${tagRename} ${attributes}/>`), {
      [type]: {
        [name]: tagRename
      }
    }]
  }

  const attrs = getAttributeString(dom)

  if (!dom.children || !dom.children.length) {
    return getLogicHtml(logic,`<${tag} ${attrs} />`)
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

  return [getLogicHtml(logic, `<${tag} ${attrs}>${content}</${tag}>`), rely]
}
