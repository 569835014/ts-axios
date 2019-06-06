import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import XHR from './XHR'
import { buildURL, combineURL, isAbsoluteURL } from '../helpers/url'
import { flattenHeaders, processHeaders } from '../helpers/headers'
import transform from './transform'
function axios(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return XHR(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

export function transformURL(config: AxiosRequestConfig): string {
  let { url, params, paramsSerializer, baseURL } = config
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url)
  }
  return buildURL(url!, params, paramsSerializer)
}

function transformResponseData(res: AxiosResponse) {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}
function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
export default axios
