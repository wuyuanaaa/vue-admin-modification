<template>
  <div :class="classObj" class="app-wrapper">
    <div :class="{'fixed-header':fixedHeader}">
      <navbar />
      <tags-view v-if="needTagsView" />
    </div>

    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <sidebar v-if="sidebar.opened" class="sidebar-container" />
      <!-- 主体部分 -->
      <div class="content-container">
        <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
        <app-main />
      </div>

    </div>
    <service-map />
  </div>
</template>

<script>
import {
  AppMain,
  Navbar,
  Sidebar,
  TagsView,
  ServiceMap
} from './components'
import Breadcrumb from '@/components/Breadcrumb'
// import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Sidebar,
    TagsView,
    ServiceMap,
    Breadcrumb
  },
  // mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      isMapOpen: state => state.app.isMapOpen,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader,
      side_routes: state => state.permission.sideRoutes
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  mounted() {
    this.side_routes.length && this.$store.dispatch('app/openSideBar', { withoutAnimation: false })
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  /* width: calc(100% - #{$sideBarWidth}); */
  width: 100%;
  transition: width 0.28s;
  z-index: 1003;
}

/* .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  } */

.mobile .fixed-header {
  width: 100%;
}

</style>
