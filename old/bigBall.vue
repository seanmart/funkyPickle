<template lang="html">
  <div class="relative big-ball w-full z-back">
    <div class="relative">
      <div class="absolute top-space left-0 right-0 overflow-hidden text-right">
        <div class="inline-block big-ball__ball mr-auto w-4/5 md:w-2/3">
          <icon ball class="w-full fill-lime" ref="ball" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: { type: Object, default: null },
  },
  mounted() {
    this.$nextTick(this.init);
  },
  destroyed() {
    this.anim && this.anim.kill();
  },
  methods: {
    init() {
      this.anim = gsap.to(this.$refs.ball.$el, 1, {
        rotation: 90,
        ease: "none",
        scrollTrigger: {
          trigger: this.$refs.ball.$el,
          start: "top bottom",
          scrub: true,
        },
      });
    },
  },
};
</script>

<style lang="css">
.big-ball__ball {
  transform: translateX(55%);
}

</style>
