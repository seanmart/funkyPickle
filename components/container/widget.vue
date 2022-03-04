<template lang="html">
  <div class="widget icon-widget shadow-bottom rounded-md overflow-hidden" :class="classes">
      <slot/>
  </div>
</template>

<script>
export default {
  props:{
    full: Boolean,
    row: Boolean,
    lime: Boolean,
    pink: Boolean,
    black: Boolean
  },
  computed:{
    classes(){
      return{
        'bg-white': !this.lime && !this.black && !this.pink,
        'bg-lime': this.lime,
        'bg-pink text-white fill-white': this.pink,
        'bg-black text-white fill-white': this.black,
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
