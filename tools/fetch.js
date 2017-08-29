import getFetch from 'next-fetch'
const cookieFetch = getFetch()

/**
 * 加载本地资源
 * 
 * @export
 * @param {any} url 
 * @param {any} option 
 * @param {any} req 
 * @param {any} res 
 * @returns 
 */
export default function fetch(url, option, req, res) {
  return cookieFetch(apiUrls(url, req), option, req, res)
}

/**
 * 获取绑定的fetch
 * 
 * @export
 * @param {any} { req, res } 
 * @returns 
 */
export function getContextedFetch({ req, res }) {
  return ((req, res, url, option) => {
    console.log(['req:' + typeof req, 'window:' + typeof window])
    return fetch(url, option, req, res)
  }).bind(null, req, res)
}

export function apiUrls(path) {
  return `http://localhost:3004${path}`
}

export function postJSON(url, data, method = 'POST') {
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }).then(r => {
    return r.json();
  })
}