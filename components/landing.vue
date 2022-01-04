<template lang="html">
  <section class="c-landing o-bottom">
    <fancy-image class="c-image" :image="data.primary.image.url" :scale="1.3" start="top top" :trigger="'.c-landing'" />
  </section>
</template>

<script>
export default {
  props:['data']
}
</script>

<style lang="scss">
.c-landing{
  .c-image{
    height: 600px;
  }
}
</style>
