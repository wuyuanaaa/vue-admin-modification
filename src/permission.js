import router, { resetRouter, lastRoutes } from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  const roles = store.getters.roles
  const hasRoles = roles && roles.length > 0
  const hasToken = getToken()

  const hasLoggedRoles = roles && !roles.includes(store.getters.unloggedRole) // 拥有登录后的角色

  /**
   * 此处分三种情况
   * 1、已经获取角色并且不是游客身份，不做处理（反之处理登录后角色未更新情况）
   * 2、已经获取角色并且未登录，不做处理（此时为游客身份）
   * 3、其他则 获取/更新 用户信息及角色并且重置动态路由
   */
  if (hasRoles && (hasLoggedRoles || !hasToken)) {
    next()
  } else {
    try {
      // 获取用户信息
      // 注意：角色必须是数组！例如：['admin']或['developer'，'editor']
      const { roles } = hasToken ? await store.dispatch('user/getInfo') : await store.dispatch('user/setUnloggedRoles')

      // 重新获取动态路由前重置路由
      resetRouter()
      // 根据角色获取动态路由
      const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

      // 添加动态路由
      router.addRoutes(accessRoutes)

      // 添加需放置在最后的路由
      router.addRoutes(lastRoutes)

      // hack方法确保addRoutes完整
      // 设置replace：true，因此导航不会留下历史记录
      next({ ...to, replace: true })
    } catch (error) {
      // remove token and go to login page to re-login
      await store.dispatch('user/resetToken')
      Message.error(error || 'Has Error')
      // next(`/login?redirect=${to.path}`)
      next('/')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
