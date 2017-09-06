import getFetch from 'next-fetch'
import pattern2file from './pattern2file'

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


const writeComponent = (pattern) => {
  const { type, dom, name } = pattern
  const filePath = `components/${type}s/${name}.js`
  return write(filePath, pattern2file(pattern)).then(() => {
    const filePath = `pages/_builder/${type}s/${name.toLowerCase()}.js`
    return write(filePath, `import ${name} from '../../../components/${type}s/${name}'    
    export default ${name}`)
  })
}

export default writeComponent