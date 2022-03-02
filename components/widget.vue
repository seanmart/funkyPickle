<template lang="html">
  <div class="widget icon-widget bg-white shadow-bottom rounded-lg overflow-hidden" :class="classes">
      <slot/>
  </div>
</template>

<script>
export default {
  props:{
    full: Boolean,
    row: Boolean
  },
  computed:{
    classes(){
      return{
        'flex flex-row justify-center items-center': this.row,
        'p-20px':!this.full
      }
    }
  }

}
</script>

<style lang="css">
  .widget{
    border: 1px solid rgba(theme('colors.bluergb'),.1);
  }
</style>
