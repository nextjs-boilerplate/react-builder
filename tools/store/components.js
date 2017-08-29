import { bindActionCreators } from 'redux'
import getFetch from 'next-fetch'
import { getPath, pathMerge, actionTypes, fetchJSON } from './json'
import { postJSON } from '../fetch'

import { patternGroups } from '../../static/pages/index'


export const patternsPath = 'app.global.map.patterns'

export const getComponents = (dispatch) => {
  return Promise.all(patternGroups.map(({ key }) => {
    return dispatch(fetchJSON(`/${key}s`, `${patternsPath}.${key}`))
  }))
}

export const add = (type, obj, dispatch) => {
  postJSON(`/${type}s`, obj)
    .then(() => getComponents(dispatch))
    .catch((err) => { console.log(err) })
}


export const del = (type, id, dispatch) => {
  postJSON(`/${type}s/${id}`, {}, 'DELETE')
    .then(() => getComponents(dispatch))
    .catch((err) => { console.log(err) })
}