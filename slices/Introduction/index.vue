<template lang="html">

  <component :is="useContainer ? 'Container' : 'div'" doubleTop doubleBottom outerBottom :class="containerClasses" class="overflow-hidden">
    <div class="relative z-10 py-space w-full" ref="trigger">

      <prismic-rich-text :field="slice.primary.title" class="intro-title font-header font-bold uppercase leading-09 text-center lg:text-left"/>

      <div class="absolute inset-0 flex flex-row justify-center lg:justify-end z-back-1">
        <icon ball :class="ballClasses" ref="ball" class="flex-shrink-0 h-full"/>
      </div>

    </div>
  </component>

</template>

<script>
export default {
  name:"IntroSlice",
  props:['slice','useContainer'],
  mounted(){
    this.$nextTick(this.initAnim)
  },
  destroyed(){
    this.anim && this.anim.kill()
  },
  computed:{
    containerClasses(){
      let bg = this.slice.primary.background
      return{
        'bg-white': bg == 'white' || bg == null,
        'bg-lime': bg == 'lime',
        'bg-green': bg == 'green',
        'bg-pink': bg == 'pink',
        'bg-black': bg == 'black'
      }
    },
    ballClasses(){
      let bg = this.slice.primary.background
      return{
        'fill-lime': bg != 'lime',
        'fill-white': bg == 'lime'
      }
    }
  },
  methods:{
    initAnim(){
      this.anim = gsap.to(this.$refs.ball.$el,{rotate:180,ease:'none', scrollTrigger:{
        trigger: this.$refs.trigger,
        scrub: 1,
        start: 0,
        end: 'bottom top'
      }})
    }
  }
}
</script>

<style lang="css">
  .intro-title{
    font-size: 15vw
  }
  .intro-title strong{
    color: theme('colors.pink');
  }
  @media screen and (min-width: theme('screens.sm')){
    .intro-title{
      font-size: 3.5rem;
    }
  }
  @media screen and (min-width: theme('screens.md')){
    .intro-title{
      font-size: calc((100vw - theme('spacing.nav-side')) / 14 );
    }
  }
</style>
