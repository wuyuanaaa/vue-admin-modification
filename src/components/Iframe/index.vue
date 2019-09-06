<template>
  <div>
    <!-- <basic-container> -->
    <iframe
      v-if="$route.query.src"
      ref="iframe"
      :src="$route.query.src"
      class="iframe"
    />
    <iframe
      v-else
      ref="iframe"
      :src="urlPath"
      class="iframe"
    />
    <!-- </basic-container> -->
  </div>
</template>

<script>
export default {
  name: 'Iframe',
  props: {
    routerPath: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      urlPath: this.getUrlPath() // iframe src 路径
    }
  },
  watch: {
    $route: function() {
      this.load()
    },
    routerPath: function() {
      // 监听routerPath变化，改变src路径
      this.urlPath = this.getUrlPath()
    }
  },
  mounted() {
    this.load()
    this.resize()
    console.log(this)
  },
  methods: {
    // 加载浏览器窗口变化自适应
    resize() {
      window.onresize = () => {
        this.iframeInit()
      }
    },
    // 加载组件
    load() {
      var flag = true // URL是否包含问号
      this.$route.meta.title = this.$route.query.name
      if (this.$route.query.src.indexOf('?') === -1) {
        flag = false
      }
      var list = []
      for (var key in this.$route.query) {
        if (key !== 'src' && key !== 'name') {
          list.push(`${key}= this.$route.query[key]`)
        }
      }
      list = list.join('&').toString()
      if (flag) {
        this.$route.query.src = `${this.$route.query.src}${
          list.length > 0 ? `&list` : ''
        }`
      } else {
        this.$route.query.src = `${this.$route.query.src}${
          list.length > 0 ? `?list` : ''
        }`
      }

      this.iframeInit()
    },
    // iframe窗口初始化
    iframeInit() {
      // 104 navBar 64 + breadcrumb 40 的高度
      const iframe = this.$refs.iframe
      const clientHeight = document.documentElement.clientHeight - 104
      iframe.style.height = `${clientHeight}px`
    },
    getUrlPath: function() {
      // 获取 iframe src 路径
      let url = window.location.href
      url = url.replace('/Iframe', '')
      return url
    }
  }
}
</script>

<style lang="scss">
.iframe {
  width: 100%;
  height: 100%;
  border: 0;
  overflow: hidden;
  box-sizing: border-box;
  vertical-align: bottom; // 清除 iframe 与父容器的高度差
}
</style>
