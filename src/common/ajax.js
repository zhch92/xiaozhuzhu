import Vue from 'vue'
import axios from 'axios'
import { getCookie } from '../common/cookie'
import { TOKEN, PRODUCTCODE } from '../common/index'
/* 总线成 */
export const eventHub = new Vue();
/* ajax请求 */
export const ajax = (method, url, params, headersParams={}) => {
  let token = getCookie(TOKEN) || ''
  // const token =storageManager.getStorage(config.session.loginKey, false) == null? "": storageManager.getStorage(config.session.loginKey, false);
  return axios({
    url: url,
    method: method, // default
    // baseURL: 'https://some-domain.com/api/',
    data: method == 'post' ? params : '',
    params: method == 'get' ? params : '',
    timeout: 120000,
    responseType: 'json',
    headers: Object.assign({ token: token }, headersParams)
  })
}
