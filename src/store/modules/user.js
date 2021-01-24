import { login } from '@/apis/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    username: '',
    menus: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    }
  },

  actions: {
    // LOGIN
    Login ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          commit('SET_TOKEN', response.Content.ACCESS_TOKEN)
          setToken(response.Content.ACCESS_TOKEN)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // // 获取用户信息
    // GetInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getInfo(state.token).then(response => {
    //       commit('SET_USERNAME', response.username)
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    // LOG OUT
    LogOut ({ commit, state }) {
      commit('SET_TOKEN', '')
      removeToken()
    },

    // FRONT END LOG OUT
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
