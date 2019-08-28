<template>
  <div class="navbar">
    <div class="serviceMap-bar" :is-active="isMapOpen" @click="toggleMap">服务目录</div>

    <div class="logo-container">
      <logo />
    </div>

    <div class="right-menu">
      <nav-menu class="navMenu-container" />

      <div class="userInfo-container" @click="handleUserInfoClick">
        <img :src="avatar" class="user-avatar">
        <span class="user-nickname">
          {{ name }}
        </span>
      </div>

      <div v-if="token" class="logout-container" @click="logout">
        <svg-icon class="logout-icon" icon-class="logout" />
        <span>退出</span>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from '@/components/Logo'
import NavMenu from './NavMenu'

export default {
  components: {
    Logo,
    NavMenu
  },
  computed: {
    ...mapGetters([
      'isMapOpen',
      'token',
      'avatar',
      'name',
      'device'
    ])
  },
  methods: {
    toggleMap() {
      this.$store.dispatch('app/toggleMap')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
    },
    handleUserInfoClick() {
      if (this.token) {
        // 前往用户信息页面
        this.$message({
          message: '前往用户信息页面'
        })
      } else {
        // 前往登录页面
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  min-width: 1400px;
  height: 64px;
  overflow: hidden;
  position: relative;
  font-size: 14px;
  background: #00216d;
  border-bottom: 4px solid #FEA407;

  .serviceMap-bar {
    float: left;
    padding: 0 20px;
    line-height: 60px;
    font-weight: bold;
    color: #fff;
    background: #5193EF;
    cursor: pointer;
  }

  .logo-container {
    float: left;
    line-height: 60px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 60px;

    &:focus {
      outline: none;
    }

    .navMenu-container {
      float: left;
      margin-right: 10px;
    }

    .right-menu-nav {
      display: inline-block;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .userInfo-container {
      float: left;
      margin-right: 20px;
      cursor: pointer;
      .user-avatar {
        margin-right: 10px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        vertical-align: middle;
      }
      .user-nickname {
        color: #999;
      }
    }

    .logout-container {
      margin-right: 20px;
      float: left;
      color: #999;
      cursor: pointer;
      .logout-icon {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
    }

  }
}
</style>
