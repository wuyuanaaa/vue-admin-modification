<template>
  <div class="logo">
    <router-link to="/">
      <span class="logo-content">LOGO</span>
    </router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.logo {
  display: table-cell;
  vertical-align: center;
  .logo-content {
    margin: 0 30px;
    font-size: 22px;
    color: #fff;
    font-weight: bold;
  }
}
</style>
