import { AxiosRequestConfig } from '../types'
import { isPlainObject, deepMerge } from '../helpers/util'

const starts = Object.create(null)

function defaultStart(target: any, source: any) {
  return typeof source !== 'undefined' ? source : target
}

function fromSourceStrat(target: any, source: any): any {
  if (typeof source !== 'undefined') {
    return source
  }
}

function deepMergestrat(target: any, source: any): any {
  if (isPlainObject(source)) {
    return deepMerge(target, source)
  } else if (typeof source !== 'undefined') {
    return source
  } else if (isPlainObject(target)) {
    return deepMerge(target)
  } else if (typeof target !== 'undefined') {
    return target
  }
}

const stratKeyDeepMerge: Array<string> = ['headers', 'auth']
const startKeysFromSource: Array<string> = ['url', 'params', 'data']
startKeysFromSource.forEach(key => {
  starts[key] = fromSourceStrat
})
stratKeyDeepMerge.forEach(key => {
  starts[key] = deepMergestrat
})
export default function mergeConfig(
  defaults: AxiosRequestConfig,
  config?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config) {
    config = {}
  }
  const _config = Object.create(null)
  for (let key in config) {
    mergeField(key)
  }
  for (let key in defaults) {
    if (!config[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strat = starts[key] || defaultStart
    _config[key] = strat(defaults[key], config![key])
  }

  return _config
}
