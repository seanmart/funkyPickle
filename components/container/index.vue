<template lang="html">
  <div class="container relative z-10" :class="classes">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    noY:Boolean,
    noX:Boolean,
    noTop:Boolean,
    noBottom:Boolean,
    noLeft: Boolean,
    noRight:Boolean,
    inner:Boolean,
    innerTop:Boolean,
    innerBottom:Boolean,
    first:Boolean,
    last:Boolean
  },
  computed: {
    classes() {
      return {
        "is-first":this.first,
        "is-last":this.last,
        "pt-space": !this.noY && !this.noTop && !this.innerTop && !this.inner,
        "pb-space": !this.noY && !this.noBottom && !this.innerBottom && !this.inner,
        "gutter-left": !this.noX && !this.noLeft,
        "gutter-right": !this.noX && !this.noRight,
        "pt-space-2x": this.innerTop || this.inner,
        "pb-space-2x": this.innerBottom || this.inner,
        "mt-space": !this.noTop && !this.noY && (this.innerTop || this.inner),
        "mb-space": !this.noBottom && !this.noY && (this.innerBottom || this.inner)
      };
    },
  },
};
</script>

<style lang="css">
  .container.is-first{
    padding-top: theme('spacing.nav-top');
  }
  .container.is-first.pt-space{
    padding-top: theme('spacing.space-2x');
  }
  .container.is-last.pb-space{
    padding-bottom: theme('spacing.space-2x');
  }
  .container.is-last.mb-space{
    margin-bottom: 0px;
  }
  .container.is-first.mt-space{
    margin-top: 0px;
  }

  @media screen and (max-width:theme('screens.md')){
    .container.is-first{
      padding-top: theme('spacing.nav-top');
    }
    .container.is-first.pt-space{
      padding-top: calc(theme('spacing.space-2x') + theme('spacing.nav-top'));
    }
  }
</style>
