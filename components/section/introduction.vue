<template lang="html">
  <container>
    <section-title v-if="data.primary.title" :value="data.primary.title"/>
    <img v-if="data.primary.image.url" class="rounded-lg shadow-bottom w-full mb-40" :src="data.primary.image.url"/>
    <prismic-rich-text :field="data.primary.text" class="text-20 font-semibold" />
  </container>
</template>

<script>
export default {
  props:['data']
}
</script>
