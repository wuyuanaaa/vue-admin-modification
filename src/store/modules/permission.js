import { constantRoutes, lastRoutes } from '@/router'
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
 */
function filterRoutesType(type) {
  return (route) => route.type === type
}

/**
 * 将路由数据转换成 vue-router 路由
 */
function addDynamicMenuRoutes(menuList = [], routes = []) {
  menuList.forEach(function(item, index) {
    if (item.component === 'Layout') {
      item.component = Layout
    } else {
      item.component = () => import(item.component)
    }
    if (item.children && item.children.length > 0) {
      let mchildren = []
      mchildren = childrenPro(item.children, mchildren)
      item.children = mchildren
    }
    routes[index] = item
  })
  return routes
}
function childrenPro(childrenList = [], mychildren = []) {
  childrenList.forEach(function(item, index) {
    if (item.component) {
      item.component = () => import(item.component)
    }
    if (item.children && item.children.length > 0) {
      const mychildrenRoute = []
      item.children = childrenPro(item.children, mychildrenRoute)
    }
    mychildren[index] = item
  })
  return mychildren
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
    state.routes = constantRoutes.concat([...routes, ...lastRoutes])
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
        asyncRoutes = addDynamicMenuRoutes(res.data, asyncRoutes)
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
