import {AxiosRequestConfig} from './types'
import XHR from './XHR'

function axios(config: AxiosRequestConfig) {
  XHR(config)
}
