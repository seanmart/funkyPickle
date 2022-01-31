<template lang="html">
  <header id="c-side-nav" class="u-shadow-x u-shadow-hover" ref="container">
    <div class="c-side-nav--wrapper">

      <a class="c-stmc" href="#scroller">skip to main content</a>

      <nuxt-link to="/" class="c-side-nav__logo" ref="logo">
        <the-logo vertical :rainbow="!knockout" :knockout="knockout" animate/>
      </nuxt-link>

      <nav class="c-side-nav__nav">
        <template v-for="link in links">
          <nuxt-link
            class="t-header c-side-nav__link"
            :to="link.to"
            v-html="link.label"
            ref="link"
          />
        </template>
      </nav>

    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
import vars from '~/@scss/_variables.scss'
export default {
  data:()=>({
    knockout: true
  }),
  mounted(){
    this.$bus.$on('OPEN_MENU',this.openMenu)
    this.$bus.$on('CLOSE_MENU',this.closeMenu)

    this.init()
  },
  computed: mapState({
    links: (state) => state.lists.nav
  }),
  methods:{
    setEls(){
      this.el = this.$refs.container
      this.logoEl = this.$refs.logo.$el
      this.linkEls = this.$refs.link.map(e => e.$el)
    },
    init(){
      this.setEls()

      let mq = window.matchMedia(`(min-width:${vars.screenMedium})`)
      mq.addEventListener('change',this.handleMatchMedia)
      this.handleMatchMedia(mq)
    },
    handleMatchMedia(e){
      this.knockout = !e.matches
      gsap.set([this.el,this.logoEl,this.linkEls],{clearProps:'all'})
    },
    openMenu(){

    },
    closeMenu(){

    }
  }
}
</script>

<style lang="scss">
#c-side-nav{
  position: fixed;
  z-index: 100;
  top: 0px;
  left: 0px;
  bottom:0px;
  width: $nav-side;
  background: $black;
  color:white;
  transform: translateX(-100%);
  display: none;

  .c-side-nav--wrapper{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    padding: 40px;
  }

  .c-stmc{
    height: 1px;
    margin: -1px;
    overflow: hidden;
    position: fixed;
    top: 0px;
    left: 0px;
  }

  .c-side-nav__logo{
    outline: none;
    width: 60%;
    svg{
      display: block;
      width: 100%;
    }
  }

  .c-side-nav__nav{
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .c-side-nav__link{
    display: block;
    font-size: 50px;
    letter-spacing: -.03px;
    &:hover,
    &:focus{
      color: $lime;
    }
  }

  @media(min-width:$screen-md){
    transform: translateX(0px);
    background: white;
    color: $black;
    display: block;

    .c-side-nav__nav{
      padding-top:40px;
      display: block;
    }

    .c-side-nav__logo{
      width: 100%;
    }

    .c-side-nav__link{
      font-size: 30px;
      letter-spacing: -.01px;
      padding: 10px 6px;
      &:hover,
      &:focus{
        color: $pink;
      }
    }

  }
}
</style>
