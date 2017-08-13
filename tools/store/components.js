import { bindActionCreators } from 'redux'
import getFetch from 'next-fetch'
import { getPath, pathMerge, actionTypes } from './json'
import { postJSON } from '../fetch'

const fetch = getFetch()
const pathStoreComponent = 'api.db.component'
const apiUrl = 'http://localhost:3004/components'


// ACTIONS
export const getComponents = () => async (dispatch) => {
  const r = await fetch(apiUrl)
  const list = await r.json()
  const dic = list.reduce((rtn, next) => {
    rtn[next.id] = next
    return rtn
  }, {})

  const action = {
    type: actionTypes.SET_JSON,
    path: pathStoreComponent,
    json: {
      list,
      dic,
    },
  }
  return dispatch(action)
}

export const add = (obj, dispatch) => {
  postJSON(apiUrl, obj, fetch)
    .then(dispatch(getComponents()))
    .catch((err) => { console.log(err) })
}