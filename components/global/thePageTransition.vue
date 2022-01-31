<template lang="html">
  <figure id="c-page-transition" ref="el">
    <div class="c-page-transition__loading--wrapper u-center-row" ref="loading">
      <div class="c-page-transition__loading">
        <div v-for="i in 4" />
      </div>
    </div>
  </figure>
</template>

<script>

export default {
  mounted(){
    this.$bus.$on('LEAVE',this.handleLeave)
    this.$bus.$once('LOADED',this.handleFirstLoad)
  },
  methods:{
    handleLeave(cb){
      gsap.timeline()
          .set(this.$refs.el,{display: 'block'},0)
          .fromTo(this.$refs.el,1,{y:'100%'},{y:0,ease:'expo.out',onComplete:cb},'>')
          .to(this.$refs.loading,.5,{opacity:1},'<+=.5')
    },
    handleFirstLoad(){
      this.$bus.$on('LOADED',this.handleLoad)
    },
    handleLoad(){
      gsap.timeline({delay:.5})
        .to(this.$refs.loading,.25,{opacity:0},0)
        .fromTo(this.$refs.el,1,{y:0},{y:'-100%', ease:'expo.out'},.25)
        .add(()=>this.$bus.$emit('REVEAL'),.25)
        .set(this.$refs.el,{clearProps:'all'},1)
    }
  }
}
</script>

<style lang="scss">
#c-page-transition{
  position: fixed;
  top:0px;
  left:0px;
  width:100%;
  height:100%;
  z-index: 97;
  @include rainbow-gradient;
  transform: translateY(100%);
  display: none;

  .c-page-transition__loading--wrapper{
    height: 100%;
    width: 100%;
    opacity: 0;
  }

  .c-page-transition__loading {
    flex: 0 0 auto;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .c-page-transition__loading div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .c-page-transition__loading div:nth-child(1) {
    left: 8px;
    animation: c-page-transition__loading 0.6s infinite;
  }
  .c-page-transition__loading div:nth-child(2) {
    left: 8px;
    animation: c-page-transition__loading2 0.6s infinite;
  }
  .c-page-transition__loading div:nth-child(3) {
    left: 32px;
    animation: c-page-transition__loading2 0.6s infinite;
  }
  .c-page-transition__loading div:nth-child(4) {
    left: 56px;
    animation: c-page-transition__loading3 0.6s infinite;
  }

  @keyframes c-page-transition__loading {
    0% {transform: scale(0)}
    100% {transform: scale(1)}
  }
  @keyframes c-page-transition__loading2 {
    0% {transform: translate(0, 0)}
    100% {transform: translate(24px, 0)}
  }
  @keyframes c-page-transition__loading3 {
    0% {transform: scale(1)}
    100% {transform: scale(0)}
  }

  @media(min-width: $screen-md){
    padding-left: $nav-side;
  }
}
</style>
