import { AxiosRequestConfig } from './types'
import { processHeaders } from './helpers/headers'
import { transformRequest, transformResponse } from './helpers/data'

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json,text/plain,*/*'
    }
  },
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  transformRequest: [
    function(data: any, headers: any) {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function(data: any): any {
      return transformResponse(data)
    }
  ],
  validateStatus(status: number): boolean {
    return status >= 200 || status < 300
  }
}
const methodsNoData: Array<string> = ['delete', 'get', 'head', 'options']
const methodsWithData: Array<string> = ['post', 'put', 'patch']
methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})
methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
export default defaults
