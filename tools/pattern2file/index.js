import { getDomHtml } from './dom2html'

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