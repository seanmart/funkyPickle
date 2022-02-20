<template lang="html">
  <nav>

    <div id="nav__top" class="md:hidden fixed z-40 top-0 left-0 right-0 h-nav-top shadow-bottom bg-white" ref="nav">
      <div class="h-full flex flex-row justify-center items-center p-10px overflow-hidden">
        <nuxt-link to="/">
          <the-logo horizontal animate hover class="nav__logo h-full"/>
        </nuxt-link>
      </div>
    </div>

    <div id="nav__side" class="md:block fixed z-40 top-0 left-0 bottom-0 w-nav-side shadow-side bg-white hidden">
      <div class="h-full flex flex-col justify-start items-stretch p-40px">
        <nuxt-link to="/">
          <the-logo vertical animate hover class="nav__logo w-full"/>
        </nuxt-link>
        <div class="links mt-40px pb-40px -ml-pxsm font-header uppercase font-bold text-30px leading-none">
          <template v-for="link in links">
            <nuxt-link :to="link.to" class="nav__link block p-5px py-7px overflow-hidden">
              <span class="block" v-html="link.label" />
            </nuxt-link>
          </template>
        </div>
      </div>
    </div>

  </nav>
</template>

<script>
import {mapState} from 'vuex'
export default {
  mounted(){
    this.$nextTick(this.init)
    this.$bus.$on('MOBILE_HEADER_DISABLED',(d)=> this.mobileHeaderDisabled = d)
    this.$bus.$once('REVEAL',this.reveal)
  },
  data:()=>({
    hideNav: false,
    mobileHeaderDisabled: false
  }),
  computed: mapState({
    links: state => state.navigation
  }),
  watch:{
    hideNav(hide){
      hide
      ? gsap.to(this.$refs.nav,.75,{y: '-110%', ease: 'expo.inOut'})
      : gsap.to(this.$refs.nav,.75,{y: 0, ease: 'expo.inOut'})
    }
  },
  methods:{
    init(){
      ScreenBuddy.onMd((bigger)=>{
        this.anim && this.anim.kill()
        if (!bigger){
          this.anim = ScrollTrigger.create({
            start: 50,
            end: 99999,
            onUpdate:(self)=> this.hideNav = self.direction == 1 || this.mobileHeaderDisabled
          })
        }
      })

      gsap.timeline()
          .set('#nav__side .nav__logo',{x: '-130%'})
          .set('#nav__side .nav__link span',{y:'130%'})
          .set('#nav__top .nav__logo',{y: '130%'})
    },
    reveal(){
      gsap.timeline()
          .to('#nav__side .nav__logo',1,{x: 0,ease:'expo.out'})
          .to('#nav__top .nav__logo',1,{y: 0,ease:'expo.out'})
          .to('#nav__side .nav__link span',1,{y:0,stagger: .1,ease:'expo.out'},'<')
    }
  }
}
</script>

<style lang="css">
.nav__link span{
  transition-property: color;
  transition-duration: .25s;
}
.nav__link:hover span{
  color: theme('colors.pink');
}

</style>
