import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import defaultAvatar from '@/assets/imgs/defaultAvatar_white.png'

const state = {
  token: getToken(),
  isLogin: false,
  name: '未登录',
  avatar: defaultAvatar,
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_LOGOUT: (state) => {
    state.avatar = defaultAvatar
    state.name = '未登录'
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar, introduction } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, dispatch, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(async() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_LOGOUT', [])
        removeToken()
        resetRouter()

        // generate accessible routes map based on roles
        const accessRoutes = await dispatch('permission/generateRoutes', ['visitor'], { root: true })

        // dynamically add accessible routes
        router.addRoutes(accessRoutes)

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      commit('SET_LOGIN')
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  },

  // 设置未登录用户角色
  setUnloggedRoles({ commit, rootGetters }) {
    return new Promise(resolve => {
      const unloggedRole = rootGetters.unloggedRole

      commit('SET_ROLES', [unloggedRole])
      resolve({
        roles: [unloggedRole]
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
