
<template>
  <!-- eslint-disable vue/require-component-is -->
  <component v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal, objToform } from '@/utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    linkProps(url) {
      if (isExternal(url)) {
        if (this.item.meta && this.item.meta.blank) {
          return {
            is: 'a',
            href: url,
            target: '_blank',
            rel: 'noopener'
          }
        } else {
          return {
            is: 'router-link',
            to: {
              path: `/myiframe/urlPath?${objToform({
                name: this.item.meta ? this.item.meta.title : '',
                src: this.item.path
              })}`,
              query: this.item.query
            }
          }
        }
      }
      return {
        is: 'router-link',
        to: url
      }
    }
  }
}
</script>
