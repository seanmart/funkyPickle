<template>
  <nuxt-link v-if="uid" :to="`/${uid}`" :class="classes">
    <span v-html="label"/>
  </nuxt-link>
  <a v-else :href="url" target="_blank" :class="classes">
    <span v-html="label"/>
  </a>
</template>

<script>
export default {
  name: "LinkSlice",
  props: ["slice"],
  computed:{
    classes(){
      return 'block px-5px py-10px'
    },
    label(){
      return this.slice.primary.label
    },
    uid(){
      return this.slice.primary.link.uid
    },
    url(){
      return this.slice.primary.link.url
    }
  }
}
</script>
