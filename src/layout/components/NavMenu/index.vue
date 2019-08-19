<template>
  <div>
    <el-menu
      :default-active="activeMenu"
      class="right-menu-nav"
      mode="horizontal"
      background-color="#00216D"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <menu-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MenuItem from '../MenuItem'

export default {
  components: { MenuItem },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'permission_routes'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  }
}
</script>

