<template>
  <div class="map-container" :class="{mapOpen: isMapOpen}">
    <div class="container-top">
      top
    </div>

    <div class="container-center">
      center
    </div>

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

  .container-top {
    height: 80px;
    background: rgb(221, 75, 75);
  }

  .container-center {
    background-color: rgb(47, 209, 174);
  }
}
</style>
