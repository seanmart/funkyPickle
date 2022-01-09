<template lang="html">
  <section class="c-big-ball" v-reveal="reveal">
    <div class="c-ball--wrapper" ref="ballWrapper">
      <div class="c-ball" ref="ball"/>
    </div>
  </section>
</template>

<script>
export default {
  props:['data'],
  mounted(){
    gsap.set(this.$refs.ball,{scale:.5,opacity:0})
  },
  methods:{
    reveal(){
      gsap.to(this.$refs.ball,1,{scale:1,opacity:1, ease: 'power4.out',scrollTrigger:{
        trigger:this.$refs.ballWrapper,
        start: 'top 50%'
      }})
    }
  }
}
</script>

<style lang="scss">
.c-big-ball{
  position: relative;

  .c-ball--wrapper{
    position: absolute;
    top:$space;
    left: 60%;
    z-index: -1;
  }

  .c-ball{
    @include lime-gradient(45);
    width: 70vw;
    height:70vw;
    border-radius: 50%;
  }

  @media screen and (max-width:$tablet){
    .c-ball{
      width: 140vw;
      height:140vw;
    }
  }
}
</style>
