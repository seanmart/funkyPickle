<template>
  <nuxt-link class="nav-link" v-if="uid" :to="`/${uid}`" :class="classes">
    <span v-html="label"/>
  </nuxt-link>
  <a v-else class="nav-link" :href="url" target="_blank" :class="classes">
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

<style lang="css">
  .nav-link:hover,
  .nuxt-link-active{
    color: theme('colors.pink')
  }
</style>
