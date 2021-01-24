import codeDiff from './diff'

/* istanbul ignore next */
codeDiff.install = function (Vue) {
  Vue.component(codeDiff.name, codeDiff)
}

export default codeDiff
