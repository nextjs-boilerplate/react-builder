import getFetch from 'next-fetch'
import pattern2file from './pattern2file'
import pattern2previewfile from './pattern2file/preview'
import config from '../config'

const fetch = getFetch()
const base = `http://${config.host}:3010/builder/file`

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


const writeComponent = (pattern) => {
  const { type, dom, name } = pattern
  const filePath = `components/${type}s/${name}.js`
  return write(filePath, pattern2file(pattern)).then(() => {
    const filePath = (type === 'page') ? `pages/${name.toLowerCase()}.js` : `pages/_builder/${type}s/${name.toLowerCase()}.js`
    return write(filePath, pattern2previewfile(pattern))
  })
}

export default writeComponent