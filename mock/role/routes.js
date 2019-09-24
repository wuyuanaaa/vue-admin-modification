// Just a mock data

export const asyncRoutes = [
  {
    path: 'https://www.baidu.com?nav=功能大全',
    component: 'Layout',
    name: '功能大全',
    type: 'nav',
    meta: {
      title: '功能大全',
      affix: true,
      roles: ['editor', 'visitor']
    }
  },
  {
    path: 'https://www.baidu.com?nav=对接平台',
    component: 'Layout',
    name: '对接平台',
    type: 'nav',
    meta: {
      title: '对接平台',
      affix: true,
      roles: ['editor', 'visitor']
    }
  },
  {
    path: 'https://www.baidu.com?nav=服务管理',
    component: 'Layout',
    name: '服务管理',
    type: 'nav',
    meta: {
      title: '服务管理',
      affix: true,
      roles: ['editor', 'visitor']
    }
  },
  {
    path: 'https://www.baidu.com?nav=用户管理',
    component: 'Layout',
    name: '用户管理',
    type: 'nav',
    meta: {
      title: '用户管理',
      affix: true,
      roles: ['editor', 'visitor']
    }
  },
  {
    path: 'https://www.baidu.com?nav=组织管理',
    component: 'Layout',
    name: '组织管理',
    type: 'nav',
    meta: {
      title: '组织管理',
      affix: true,
      roles: ['editor', 'visitor']
    }
  },
  {
    path: 'https://www.baidu.com?nav=公告管理',
    component: 'Layout',
    name: '公告管理',
    type: 'nav',
    meta: {
      title: '公告管理',
      affix: true,
      roles: ['editor', 'visitor']
    }
  },
  {
    path: 'https://www.baidu.com?nav=功能项管理',
    component: 'Layout',
    name: '功能项管理',
    type: 'nav',
    meta: {
      title: '功能项管理',
      affix: true,
      roles: ['editor', 'visitor']
    }
  },
  {
    path: 'https://www.baidu.com?nav=订单',
    component: 'Layout',
    name: '订单',
    type: 'nav',
    meta: {
      title: '订单',
      affix: true,
      roles: ['editor', 'visitor']
    }
  },
  {
    path: 'https://www.baidu.com?nav=公告',
    component: 'Layout',
    name: '公告',
    type: 'nav',
    meta: {
      title: '公告',
      affix: true,
      roles: ['editor', 'visitor']
    }
  },
  {
    path: 'https://www.baidu.com?a=1',
    component: 'Layout',
    name: 'admin',
    type: 'side',
    // hidden: true,
    meta: {
      title: 'admin',
      icon: 'documentation',
      affix: true,
      roles: ['admin'],
      blank: true
    }
  },
  {
    path: 'https://www.baidu.com?a=2',
    component: 'Layout',
    name: 'editor',
    type: 'side',
    // hidden: true,
    meta: {
      title: 'editor',
      icon: 'documentation',
      affix: true,
      roles: ['editor']
    }
  },
  {
    path: 'https://www.baidu.com?a=3',
    component: 'Layout',
    name: 'visitor',
    type: 'side',
    // hidden: true,
    meta: {
      title: 'visitor',
      icon: 'documentation',
      affix: true,
      roles: ['visitor']
    }
  },
  {
    path: 'https://www.baidu.com',
    component: 'Layout',
    name: 'BaiduIframe',
    type: 'side',
    // hidden: true,
    meta: {
      title: 'BaiduIframe',
      icon: 'documentation',
      affix: true,
      roles: ['editor', 'visitor']
    }
  },
  {
    path: '/permission',
    component: 'Layout',
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
        component: 'views/permission/page',
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: 'views/permission/directive',
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: 'views/permission/role',
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
    component: 'Layout',
    type: 'side',
    children: [
      {
        path: 'index',
        component: 'views/icons/index',
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/nested',
    component: 'Layout',
    redirect: '/nested/menu1/menu1-1',
    type: 'side',
    name: 'Nested',
    meta: {
      title: 'Nested Routes',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: 'views/nested/menu1/index', // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu 1' },
        redirect: '/nested/menu1/menu1-1',
        children: [
          {
            path: 'menu1-1',
            component: 'views/nested/menu1/menu1-1/index',
            name: 'Menu1-1',
            meta: { title: 'Menu 1-1' }
          },
          {
            path: 'menu1-2',
            component: 'views/nested/menu1/menu1-2/index',
            name: 'Menu1-2',
            redirect: '/nested/menu1/menu1-2/menu1-2-1',
            meta: { title: 'Menu 1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: 'views/nested/menu1/menu1-2/menu1-2-1/index',
                name: 'Menu1-2-1',
                meta: { title: 'Menu 1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: 'views/nested/menu1/menu1-2/menu1-2-2/index',
                name: 'Menu1-2-2',
                meta: { title: 'Menu 1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: 'views/nested/menu1/menu1-3/index',
            name: 'Menu1-3',
            meta: { title: 'Menu 1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'Menu2',
        component: 'views/nested/menu2/index',
        meta: { title: 'Menu 2' }
      }
    ]
  }
]
