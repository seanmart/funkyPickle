<template lang="html">
  <section class="relative z-10" :class="classes">
    <slot />
  </section>
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
    noFirst: Boolean,
    noLast:Boolean
  },
  computed: {
    classes() {
      return {
        "pt-space": !this.noY && !this.noTop && !this.innerTop && !this.inner,
        "pb-space": !this.noY && !this.noBottom && !this.innerBottom && !this.inner,
        "gutter-left": !this.noX && !this.noLeft,
        "gutter-right": !this.noX && !this.noRight,
        "pt-space-2x": this.innerTop || this.inner,
        "pb-space-2x": this.innerBottom || this.inner,
        "has-outer-top mt-space": !this.noTop && !this.noY && (this.innerTop || this.inner),
        "has-outer-bottom mb-space": !this.noBottom && !this.noY && (this.innerBottom || this.inner)
      };
    },
  },
};
</script>

<style lang="css">
  section.is-first.pt-space{
    padding-top: theme('spacing.space-2x');
  }
  section.is-last.pb-space{
    padding-bottom: theme('spacing.space-2x');
  }
  .has-outer-bottom:last-child{
    margin-bottom: 0px;
  }
  .has-outer-top:first-child{
    margin-top: 0px;
  }
</style>
