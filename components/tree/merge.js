/**
 * 按路径合入数据 
 * 
 * @param {any} obj 
 * @param {any} pathStr 
 * @param {any} toMerge 
 * @returns 
 */
export default function pathMerge(obj, pathStr, toMerge) {
  if(!pathStr) return toMerge
  
  const pathArr = pathStr.split('.')
  const lastPath = pathArr.pop()
  const tobj = {...obj}
  const lastBranch = pathArr.reduce((o, p) => {
    !o[p] && (o[p] = {})
    if(Array.isArray(o[p])){      
      o[p] = [...o[p]]
      return o[p]
    }
    o[p] = {...o[p]}
    return o[p]
  }, tobj)
  lastBranch[lastPath] = toMerge
  return tobj
}