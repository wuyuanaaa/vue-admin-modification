<template>
  <div class="map-container" :class="{mapOpen: isMapOpen}">
    map1111
    <div class="a">{{ a }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      a: 1111
    }
  },
  computed: {
    ...mapState({
      isMapOpen: state => state.app.isMapOpen
    })
  }
}
</script>

<style lang="scss" scoped>
.map-container {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  height: 400px;
  background-color: #fff;
  transform: translateY(-100%);
  transition: all 0.3s;
  z-index: 1002;
  &.mapOpen {
    transform: translateY(0);
  }
  .a {
    width: 200px;
    height: 20px;
  }
}
</style>
