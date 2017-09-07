import { bindActionCreators } from 'redux'

import fetch from '../fetch'


export const actionTypes = {
  SET_JSON: 'SET_JSON',
}


// REDUCERS
export const reducer = {
  [actionTypes.SET_JSON]: (state = {}, action) => {
    if (!action.path) return action.json

    return pathMerge(Object.assign({}, state), action.path, action.json)
  },
}

// ACTIONS
export const fetchJSON = (url, path, fetchMethod = fetch, store = false, forceLoad = false) => async (dispatch) => {
  if (forceLoad || checkNeedLoad(store, path)) {
    var r = await fetchMethod(url)
    var json = await r.json()
    var action = {
      type: actionTypes.SET_JSON,
      path,
      json,
    }
    return dispatch(action)
  }
  return false
}

// ACTIONS
export const setJSON = (json, path) => {
  return {
    type: actionTypes.SET_JSON,
    path,
    json,
  }
}

// helpers
export function getPath(obj, pathStr) {
  if (!pathStr) return obj

  const pathArr = pathStr.split('.')
  var tmp = obj
  return pathArr.reduce((tmp, p) => {
    if (tmp === null) return null
    if (typeof tmp[p] === 'undefined') return null
    return tmp[p]
  }, obj)
}


/**
 * 按路径合入数据 
 * 
 * @param {any} obj 
 * @param {any} pathStr 
 * @param {any} toMerge 
 * @returns 
 */
export function pathMerge(obj, pathStr, toMerge) {
  if (!pathStr) {
    return toMerge
  }
  const pathArr = pathStr.split('.')
  const lastPath = pathArr.pop()
  const tobj = { ...obj }
  const lastBranch = pathArr.reduce((o, p) => {
    !o[p] && (o[p] = {})
    if (Array.isArray(o[p])) {
      o[p] = [...o[p]]
      return o[p]
    }
    o[p] = { ...o[p] }
    return o[p]
  }, tobj)
  lastBranch[lastPath] = toMerge
  return tobj
}

/**
 * 检查对象路径是否存在
 *  
 * @param {any} obj 
 * @param {any} pathStr 
 * @returns 
 */
function pathExists(obj, pathStr) {
  const pathArr = pathStr.split('.')
  var tmp = obj
  return pathArr.every((p) => {
    if (typeof tmp[p] === 'undefined') return false
    tmp = tmp[p]
    return true
  })
}

/**
 * 检查是否需要重新加载
 * 
 * @param {any} store 
 * @param {any} path 
 * @returns 
 */
function checkNeedLoad(store, path) {
  if (!store) return true
  const state = store.getState()
  return !pathExists(state, path)

}