<template lang="html">
  <nav>

    <div id="nav__top" class="md:hidden fixed z-50 top-0 left-0 right-0 h-nav-top shadow-bottom bg-white" ref="nav">
      <div class="h-full flex flex-row justify-center items-center p-10px overflow-hidden">
        <nuxt-link to="/">
          <logo horizontal animate hover class="nav__logo h-full"/>
        </nuxt-link>
      </div>
    </div>

    <div id="nav__side" class="md:block fixed z-40 top-0 left-0 bottom-0 w-nav-side shadow-side bg-white hidden">
      <div class="h-full flex flex-col justify-start items-stretch p-40px">
        <nuxt-link to="/">
          <logo vertical animate hover class="nav__logo w-full"/>
        </nuxt-link>
        <div class="links mt-40px pb-40px -ml-pxsm font-header uppercase font-bold text-30px leading-none">
          <template v-for="link in links">
            <a v-if="link.href" target="_blank" :href="link.href" class="nav__link block p-5px py-7px overflow-hidden cursor-pointer">
              <span class="block" v-html="link.label" />
            </a>
            <nuxt-link v-if="link.to" :to="link.to" class="block p-5px py-7px overflow-hidden cursor-pointer">
              <span class="block" v-html="link.label" />
            </nuxt-link>
          </template>
        </div>
      </div>
    </div>

    <div id="nav__mobile" ref="mobileNav" class="md:hidden fixed inset-0 z-40 h-full p-nav-top bg-black text-white flex flex-col justify-center">
      <div class="links -ml-pxsm font-header uppercase font-bold text-50 leading-none">

        <nuxt-link :to="'/'" class="nav__link block p-5px py-7px overflow-hidden cursor-pointer">
          <span class="block" v-html="'Home'" />
        </nuxt-link>

        <template v-for="link in links">
          <a v-if="link.href" target="_blank" :href="link.href" class="nav__link block p-5px py-7px overflow-hidden cursor-pointer">
            <span class="block" v-html="link.label" />
          </a>
          <nuxt-link v-if="link.to" :to="link.to" class="nav__link block p-5px py-7px overflow-hidden cursor-pointer">
            <span class="block nav__link" v-html="link.label" />
          </nuxt-link>
        </template>
      </div>
    </div>

    <div id="nav__button" class="md:hidden fixed bottom-30 right-20 z-40">
      <button type="button" name="button" class="h-70px w-70px rounded-full bg-black p-15px flex flex-col justify-center items-center" @click="toggleMenu" ref="btn">
        <div v-for="i in 3" class="h-2px w-full bg-white my-3px" ref="bar"/>
      </button>
    </div>

  </nav>
</template>

<script>
import {mapState} from 'vuex'
import config from '@/tailwind.config.js'
export default {
  mounted(){
    this.$nextTick(this.init)
    this.$bus.$on('MOBILE_HEADER_DISABLED',(d)=> this.mobileHeaderDisabled = d)
    this.$bus.$on('TOP_NAV',(s)=> this.navHidden = !s)
    this.$bus.$once('REVEAL',this.reveal)
  },
  data:()=>({
    navHidden: false,
    mobileHeaderDisabled: false,
    menuOpen: false
  }),
  computed: mapState({
    links: state => state.settings.links
  }),
  watch:{
    navHidden(hide){
      hide
      ? gsap.to(this.$refs.nav,.75,{y: '-110%', ease: 'expo.inOut'})
      : gsap.to(this.$refs.nav,.75,{y: 0, ease: 'expo.inOut'})
    },
    menuOpen(open){

      if(open){
        this.navWasHidden = this.navHidden
        this.navHidden = false
        gsap.timeline()
            .to(this.$refs.mobileNav,.75,{x:'0',ease:'expo.inOut'})
            .to(this.$refs.bar[0],.75,{rotate:45,y:8,ease:'expo.inOut'},'<')
            .to(this.$refs.bar[1],.75,{scale:0,ease:'expo.inOut'},'<')
            .to(this.$refs.bar[2],.75,{rotate:-45,y:-8,ease:'expo.inOut'},'<')
            .to(this.$refs.btn,.75,{scale:1.2,background: config.theme.colors.pink, ease:'expo.inOut'},'<')

        setTimeout(()=> window.addEventListener('click',this.handleMenuClick),100)
      } else {
        gsap.timeline()
            .to(this.$refs.mobileNav,.75,{x:'-100%',ease:'expo.inOut'})
            .to(this.$refs.bar[0],.75,{rotate:0,y:0,ease:'expo.inOut'},'<')
            .to(this.$refs.bar[1],.75,{scale:1,ease:'expo.inOut'},'<')
            .to(this.$refs.bar[2],.75,{rotate:0,y:0,ease:'expo.inOut'},'<')
            .to(this.$refs.btn,.75,{scale:1,background:config.theme.colors.black,ease:'expo.inOut'},'<')
            .set([this.$refs.bar,this.$refs.btn],{clearProps:'all'})

        window.removeEventListener('click',this.handleMenuClick)
      }

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
            onUpdate:(self)=> this.navHidden = self.direction == 1 || this.mobileHeaderDisabled
          })
        }
      })

      gsap.timeline()
          .set('#nav__side .nav__logo',{x: '-130%'})
          .set('#nav__side .nav__link span',{y:'130%'})
          .set('#nav__top',{y: '-100%'})
    },
    reveal(){
      gsap.timeline()
          .to('#nav__side .nav__logo',1,{x: 0,ease:'expo.out'})
          .to('#nav__top',1,{y: 0,ease:'expo.out'})
          .to('#nav__side .nav__link span',1,{y:0,stagger: .1,ease:'expo.out'},'<')
    },
    handleMenuClick(e){
      let x = this.navWasHidden
      if (e.path){
        for(let i = 0; i < e.path.length; i++){
          if (e.path[i].classList && e.path[i].classList.contains('nav__link')){
            x = false
            break
          }
        }
      } else if(e.srcElement) {
        if (e.srcElement.classList.contains('nav__link')) x = false
      }
      this.navHidden = x
      this.menuOpen = false
    },
    toggleMenu(){
      this.menuOpen = !this.menuOpen
      if(!this.menuOpen) this.navHidden = this.navWasHidden
    }
  }
}
</script>

<style lang="css">
.nav__link{
  transition-property: color;
  transition-duration: .25s;
}
.nav__link:hover{
  color: theme('colors.pink');
}

#nav__mobile{
  transform: translateX(-100%);
}

</style>
