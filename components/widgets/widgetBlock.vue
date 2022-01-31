<template lang="html">
  <div class="c-widget-block" :class="classes">
    <div class="c-widget-block__content">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    expand:Boolean,
    alignCenter: Boolean
  },
  computed:{
    classes(){
      return{
        'should-expand': this.expand,
        'is-center-aligned': this.alignCenter,
      }
    }
  }
}
</script>

<style lang="scss">
.c-widget-block{
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .c-widget-block__content{
    flex: 0 0 auto;
  }
  &.should-expand{
    flex: 1 1 auto;
  }
  &.is-center-aligned{
    text-align: center;
  }
}
</style>
