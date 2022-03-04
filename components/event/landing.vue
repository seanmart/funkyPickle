<template lang="html">
  <div class="relative">

    <div :class="{'relative h-300 md:h-150':banner}">
      <div :class="{'absolute top-0 left-0 right-0 -bottom-100':banner}">
        <div class="h-full bg-cover bg-center" :style="{backgroundImage:`url(${image})`}"/>
      </div>
    </div>

    <container noTop noBottom>
      <img v-if="banner" class="rounded-lg shadow-bottom" :src="banner.url" :alt="banner.alt">
      <div class="pt-40 pb-40">
        <h1 v-html="title" class="font-header uppercase font-bold text-center leading-09 mx-auto text-40 max-w-30ch"/>
      </div>
    </container>

  </div>
</template>

<script>
export default {
  props:['data'],
  computed:{
    image(){
      return this.data.image.url || null
    },
    banner(){
      return this.data.banner_image.url ? this.data.banner_image : null
    },
    title(){
      return this.data.title || null
    }
  }
}
</script>
