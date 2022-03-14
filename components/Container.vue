<template lang="html">
  <component :is="noSection ? 'div' : 'section'" class="section-container" :class="classes">
    <slot/>
  </component>
</template>

<script>
export default {
  props:{
    outerTop: Boolean,
    outerBottom: Boolean,
    doubleTop: Boolean,
    doubleBottom: Boolean,
    noTop: Boolean,
    noBottom: Boolean,
    noLeft: Boolean,
    noRight: Boolean,
    first: Boolean,
    last: Boolean,
    noSection: Boolean
  },
  computed:{
    classes(){
      return{
        'gutter-left': !this.noLeft,
        'gutter-right': !this.noRight,
        'pt-space': !this.noTop && !this.doubleTop,
        'pb-space': !this.noBottom && !this.doubleBottom,
        'pt-space-2x': this.doubleTop,
        'pb-space-2x': this.doubleBottom,
        'mt-space': this.outerTop && !this.first,
        'mb-space': this.outerBottom && !this.last
      }
    }
  }
}
</script>

<style lang="css">
.page-content .section-container.pt-space:first-child{
  padding-top: theme('spacing.space-2x');
}
.page-content .section-container.mt-space:first-child{
  margin-top:0px;
}
.page-content .section-container.pb-space:last-child{
  padding-bottom: theme('spacing.space-2x');
}
.page-content .section-container.mb-space:last-child{
  margin-bottom: 0px;
}

@media screen and (max-width: theme('screens.md')){
  main > .section-container:first-child{
    padding-top: calc(theme('spacing.nav-top') + theme('spacing.space'))
  }
}
</style>
