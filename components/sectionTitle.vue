<template lang="html">
  <div class="section-title">
    <div class="bar"/>
    <h4 class="title title--sm" v-html="title"/>
  </div>
</template>

<script>
export default {
  props:{title:String}
}
</script>

<style lang="scss">
.section-title{
  .bar{
    height: 5px;
    background: $pink;
  }
  .title{
    margin: 3rem 0px;
  }
}
</style>
