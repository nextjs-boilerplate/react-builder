import { bindActionCreators } from 'redux'
import { getPath, pathMerge, actionTypes, fetchJSON } from './json'
import { postJSON } from '../fetch'
import { patternGroups } from '../../static/pages/index'
import writeComponent from '../fs-api-client'


export const patternsPath = 'app.global.map.patterns'
export const currentPatternPath = 'app.global.current.pattern'

export const getComponents = (dispatch) => {
  return Promise.all(patternGroups.map(({ key }) => {
    return dispatch(fetchJSON(`/${key}s`, `${patternsPath}.${key}`))
  }))
}

export const add = (type, obj, dispatch) => {
  return postJSON(`/${type}s`, obj)
    .then(() => getComponents(dispatch))
    .catch((err) => { console.log(err) })
}

export const update = (type, obj, dispatch) => {
  return postJSON(`/${type}s/${obj.id}`, obj, 'PUT')
    .then(() => getComponents(dispatch))
    .then(() => writeComponent(obj))
}

export const del = (type, id, dispatch) => {
  return postJSON(`/${type}s/${id}`, {}, 'DELETE')
    .then(() => getComponents(dispatch))
    .catch((err) => { console.log(err) })
}