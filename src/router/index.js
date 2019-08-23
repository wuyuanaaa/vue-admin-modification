import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
// import AvueRouter from './avue-router'

/* Router Modules */
import nestedRouter from './modules/nested'

/**
 * 注意:  仅在路由的 children.length >= 1 才会显示子路由
 * 详细见: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                  如果设置为true，则项目不会显示在导航中（默认为false）
 * alwaysShow: true              如果设置为true，将始终显示在根菜单
 *                               如果没有设置alwaysShow，当item有多个子路径时,
 *                               它将成为嵌套模式，不会显示根菜单
 * redirect: noRedirect          如果设置noRedirect将不会在面包屑中重定向
 * type: 'nav'/'side'/'menu'     设置路由出现的地方（nav: 顶部导航 / side: 左侧导航 / menu: 服务目录）(仅在一级路由配置，必须)
 * name:'router-name'            该名称由<keep-alive>使用（必须设置!!!）
 * meta : {
    roles: ['admin','editor']    控制页面角色（可以设置多个角色）
    title: 'title'               显示在侧边栏和面包屑中的标题（建议必填）
    icon: 'svg-name'             侧边栏中显示的图标
    noCache: true                如果设置为true，页面不会被缓存（默认为false）
    affix: true                  如果设置为true，则标记将粘贴在tags-view中
    breadcrumb: false            如果设置为false，则该项目将隐藏在面包屑中(默认为 true)
    activeMenu: '/example/list'  '/example/list'如果设置路径，侧边栏将突出显示您设置的路径
    blank: false                 如果设置为true，则会在新页面打开链接
  }
 */

/**
 * 固定路由
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/myiframe',
    component: Layout,
    redirect: '/myiframe',
    children: [{
      path: ':routerPath',
      name: 'Iframe',
      component: () => import('@/components/Iframe/index'),
      props: true
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    type: 'nav',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    // path: '/documentation',
    path: 'https://www.yuanaaa.top',
    component: Layout,
    name: 'yuanaaa',
    type: 'side',
    // hidden: true,
    meta: { title: 'yuanaaa', icon: 'documentation', affix: true, blank: true }
  },
  {
    // path: '/documentation',
    path: 'https://www.baidu.com',
    component: Layout,
    name: 'BaiduIframe',
    type: 'nav',
    // hidden: true,
    meta: { title: 'BaiduIframe', icon: 'documentation', affix: true }
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    type: 'side',
    name: 'Permission',
    meta: {
      title: '用户管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    type: 'side',
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  nestedRouter,

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    type: 'side',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    type: 'side',
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'Error Log', icon: 'bug' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
