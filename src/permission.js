import router, { resetRouter } from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  const roles = store.getters.roles
  const unloggedRole = store.getters.unloggedRole
  const hasRoles = roles && roles.length > 0
  const hasToken = getToken()

  const hasLoggedRoles = roles && !roles.includes(unloggedRole) // 拥有登录后的角色

  if (hasRoles && (hasLoggedRoles || !hasToken)) {
    next()
  } else {
    try {
      // get user info
      // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
      const { roles } = hasToken ? await store.dispatch('user/getInfo') : await store.dispatch('user/setUnloggedRoles')

      // 重新获取动态路由前重置路由
      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // hack method to ensure that addRoutes is complete
      // set the replace: true, so the navigation will not leave a history record
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
