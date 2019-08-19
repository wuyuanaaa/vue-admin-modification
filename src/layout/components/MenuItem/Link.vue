
<template>
  <!-- eslint-disable vue/require-component-is -->
  <component v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

function objToform(obj) {
  const result = []
  Object.keys(obj).forEach(ele => {
    result.push(`${ele}=${obj[ele]}`)
  })
  return result.join('&')
}

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    linkProps(url) {
      if (isExternal(url)) {
        return {
          is: 'router-link',
          to: `/myiframe/urlPath?${objToform(url)}`
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
