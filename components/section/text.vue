<template lang="html">
  <container>
    <section-title v-if="data.primary.title" :value="data.primary.title"/>
    <div class="rounded-lg shadow-bottom" :class="`bg-${data.primary.background}`">
      <img v-if="data.primary.image.url" class="rounded-lg shadow-bottom w-full" :src="data.primary.image.url"/>
      <app-text class="p-30 sm:p-50" :knockout="knockout" :data="data.primary.text"/>
    </div>
  </container>
</template>

<script>
export default {
  props:['data'],
  computed:{
    knockout(){
      return this.data.primary.background == 'black' || this.data.primary.background == 'pink'
    }
  }
}
</script>
