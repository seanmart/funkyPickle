<template lang="html">
  <div id="c-columns">
    <div class="c-columns-loading--wrapper">
      <div class="c-columns-loading">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="c-columns--wrapper">
      <div v-for="i in 4" :key="i" class="c-column--wrapper">
        <div :class="`c-column c-column-${i}`" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    this.$bus.$on('SHOW_COLUMNS',this.showColumns)
    this.$bus.$on('HIDE_COLUMNS',this.hideColumns)
  },
  methods: {
    showColumns(cb) {
      gsap.timeline({ onComplete:cb})
          .set("#c-columns", { display:'block' })
          .to("#c-columns .c-column", 0.5, { x: 0, ease: "power2.out", stagger: 0.08 },'>')
          .to('#c-columns .c-columns-loading--wrapper',.5,{opacity:1},'<+.35')
    },
    hideColumns(cb) {
      gsap.timeline()
          .to('#c-columns .c-columns-loading--wrapper',.5,{opacity:0})
          .to("#c-columns .c-column", 0.5, { x: "101%", ease: "power2.out", stagger: 0.08 }, '<+.35')
          .add(cb,'<+.25')
          .set("#c-columns", { clearProps: "all" })
          .set("#c-columns .c-column", { clearProps: "all" });
    },
  },
};
</script>

<style lang="scss">
#c-columns {
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: $navigation-width;
  z-index: 99;
  display: none;

  .c-columns--wrapper{
    height:100%;
    width:100%;
    display: flex;
    flex-direction: row;
  }

  .c-column--wrapper {
    flex: 1 1 auto;
    overflow: hidden;
  }

  .c-column {
    background: white;
    height: 100%;
    width: 100%;
    transform: translateX(-101%);
    overflow: hidden;
    position: relative;
    &::after{
      content:'';
      position: absolute;
      top: 0px;
      bottom: 0px;
      width: 100vw;
      @include rainbow-gradient;
    }
    &.c-column-1::after{
      left: 0px;
    }
    &.c-column-2::after{
      left: -100%;
    }
    &.c-column-3::after{
      left: -200%;
    }
    &.c-column-4::after{
      left: -300%;
    }
  }

  .c-columns-loading--wrapper{
    @include cover;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    opacity: 0;
  }

  .c-columns-loading {
    flex: 0 0 auto;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .c-columns-loading div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .c-columns-loading div:nth-child(1) {
    left: 8px;
    animation: c-columns-loading 0.6s infinite;
  }
  .c-columns-loading div:nth-child(2) {
    left: 8px;
    animation: c-columns-loading2 0.6s infinite;
  }
  .c-columns-loading div:nth-child(3) {
    left: 32px;
    animation: c-columns-loading2 0.6s infinite;
  }
  .c-columns-loading div:nth-child(4) {
    left: 56px;
    animation: c-columns-loading3 0.6s infinite;
  }

  @keyframes c-columns-loading {
    0% {transform: scale(0)}
    100% {transform: scale(1)}
  }
  @keyframes c-columns-loading2 {
    0% {transform: translate(0, 0)}
    100% {transform: translate(24px, 0)}
  }
  @keyframes c-columns-loading3 {
    0% {transform: scale(1)}
    100% {transform: scale(0)}
  }

  @media screen and (max-width: $tablet) {
    left: 0px;
    top: $navigation-height;
  }
}
</style>
