const getFetch = require('next-fetch')

const fetch = getFetch()
const base = `http://localhost:3006/builder/file`

const write = (path, data) => {
  return fetch(`${base}/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Origin': '*',
    },
    body: JSON.stringify({
      data,
    }),
  }).then((r) => {
    return r.json()
  })
}

const getAttributeString = (dom) => {
  var str = ''

  if (dom.attrs && Object.keys(dom.attrs).length) {
    str += Object.keys(dom.attrs).map((k) => `${k}="${dom.attrs[k]}"`).join(' ')
  }

  if (dom.style && Object.keys(dom.style).length) {
    str += ` style={${JSON.stringify(dom.style)}}`
  }

  return str
}

const getDomHtml = (dom) => {
  const { tag, text } = dom

  if (tag === 'text') {
    return `{\`${text || ''}\`}`
  }

  const attrs = getAttributeString(dom)

  if (!dom.children || !dom.children.length) {
    return `<${tag} ${attrs} />`
  }

  const content = dom.children.map((x) => getDomHtml(x)).join(' ')

  return `<${tag} ${attrs}>${content}</${tag}>`
}

const writeComponent = (pattern) => {
  const { type, dom, name } = pattern
  const filePath = `components/${type}s/${name}.js`
  const jsx = getDomHtml(dom)
  return write(filePath, `export default ()=>(${jsx})`).then(() => {
    const filePath = `pages/_builder/${type}s/${name.toLowerCase()}.js`
    return write(filePath, `import ${name} from '../../../components/${type}s/${name}'    
    export default ${name}`)
  })
}

module.exports = writeComponent