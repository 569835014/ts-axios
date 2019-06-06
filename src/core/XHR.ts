import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/url'
import cookie from '../helpers/cookie'
import { isFormData } from '../helpers/util'

export default function XHR(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      xsrfCookieName,
      xsrfHeaderName,
      withCredentials,
      onDowdLoadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config
    const request = new XMLHttpRequest()

    if (isFormData(data)) {
      delete headers['Content-type']
    }
    if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
      const xsrfValue = cookie.read(xsrfCookieName)
      if (xsrfValue && xsrfHeaderName) {
        headers[xsrfHeaderName] = xsrfValue
      }
    }

    request.open(method.toUpperCase(), url!, true)
    configureRequest()
    addEvents()
    processHeaders()
    if (auth) {
      headers['Authorization'] = 'Basice ' + btoa(auth.username + ':' + auth.password)
    }
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    processCancel()

    request.send(data)

    function configureRequest() {
      if (responseType) {
        request.responseType = responseType
      }
      if (withCredentials) {
        request.withCredentials = withCredentials
      }
      request.timeout = timeout ? timeout : 0
    }

    function addEvents(): void {
      if (onDowdLoadProgress) {
        request.onprogress = onDowdLoadProgress
      }
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
      request.onerror = function handleError() {
        reject(createError('Network Error', config, null, request))
      }
      request.ontimeout = function handleError() {
        reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
      }
      request.onreadystatechange = function handleLoad() {
        if (request.readyState !== 4) {
          return
        }
        if (request.status === 0) {
          return
        }
        const responseHeaders = parseHeaders(request.getAllResponseHeaders())
        const responseData = responseType !== 'text' ? request.response : request.responseText
        const response: AxiosResponse = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config: config,
          request
        }
        handleResponse(response)
      }
    }

    function processCancel() {
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }

    function processHeaders() {
      if (isFormData(data)) {
        delete headers['Content-type']
      }
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue
        }
      }
    }

    function handleResponse(response: AxiosResponse): void {
      if (!validateStatus || validateStatus(response.status)) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            response.status + '',
            request,
            response
          )
        )
      }
    }
  })
}
