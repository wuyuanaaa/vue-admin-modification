const getters = {
  sidebar: state => state.app.sidebar,
  isMapOpen: state => state.app.isMapOpen,
  size: state => state.app.size,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  nav_routes: state => state.permission.navRoutes,
  side_routes: state => state.permission.sideRoutes,
  menu_routes: state => state.permission.menuRoutes,
  errorLogs: state => state.errorLog.logs,
  unloggedRole: state => state.settings.unloggedRole
}
export default getters
