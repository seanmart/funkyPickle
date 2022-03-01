<template lang="html">
  <div class="widget icon-widget bg-white shadow-bottom rounded-lg overflow-hidden" :class="{'p-20px':!full}">
      <slot/>
  </div>
</template>

<script>
export default {
  props:{
    full: {type: Boolean, default: null},
  }

}
</script>

<style lang="css">
  .widget{
    border: 1px solid rgba(theme('colors.bluergb'),.1);
  }
</style>
