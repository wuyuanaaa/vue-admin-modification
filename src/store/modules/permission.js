import { constantRoutes, lazyLoading } from '@/router'
import { getRoutes } from '@/api/role'
import Layout from '@/layout'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 路由分类
 * @param {string} type 路由类型 'nav'/'side'/'menu' 详见 router/index.js
 * @returns {function}
 */
function filterRoutesType(type) {
  return (route) => route.type === type
}

/**
 * 将路由数据转换成 vue-router 路由
 * @param {array} routesData 路由数据
 * @returns {array}
 */
function formatRoutes(routesData = []) {
  return routesData.map((item) => {
    if (item.component === 'Layout') {
      item.component = Layout
    } else if (item.component) {
      item.component = lazyLoading(item.component)
    }
    if (item.children && item.children.length > 0) {
      item.children = formatRoutes(item.children)
    }
    return item
  })
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  asyncRoutes: {
    hasDone: false,
    list: []
  },
  routes: [],
  addRoutes: [],
  navRoutes: [],
  sideRoutes: [],
  menuRoutes: []
}

const mutations = {
  SET_ASYNCROUTES: (state, list) => {
    state.asyncRoutes.hasDone = true
    state.asyncRoutes.list = list
  },
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_NAV_ROUTES: (state) => {
    state.navRoutes = state.routes.filter(filterRoutesType('nav'))
  },
  SET_SIDE_ROUTES: (state) => {
    state.sideRoutes = state.routes.filter(filterRoutesType('side'))
  },
  SET_MENU_ROUTES: (state) => {
    state.menuRoutes = state.routes.filter(filterRoutesType('menu'))
  }
}

const actions = {
  generateRoutes({ commit, state }, roles) {
    return new Promise(async resolve => {
      let accessedRoutes
      let asyncRoutes = []

      if (state.asyncRoutes.hasDone) {
        asyncRoutes = state.asyncRoutes.list
      } else {
        const res = await getRoutes()
        asyncRoutes = formatRoutes(res.data)
        commit('SET_ASYNCROUTES', asyncRoutes)
      }

      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      commit('SET_NAV_ROUTES')
      commit('SET_SIDE_ROUTES')
      commit('SET_MENU_ROUTES')

      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
