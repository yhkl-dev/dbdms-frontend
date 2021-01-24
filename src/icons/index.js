import Vue from 'vue'

import SvgIcon from '@/components/SvgIcon'

Vue.component('svg-icon', SvgIcon)

// 此处递归获取.svg文件
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
