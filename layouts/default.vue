<template lang="html">
  <div id="site" class="light-blue">
    <the-preloader/>
    <the-navigation/>
    <div id="scroller" class="md:pl-nav-side" ref="scroller">
      <nuxt/>
      <signup/>
      <the-footer/>
    </div>
    <the-svg-gradients/>
  </div>
</template>

<script>
export default {
  created(){
    if(process.server) return
    this.initCreated()
  },
  mounted(){
    this.$bus.$emit('LOADED')
  },
  watch:{
    $route(){
      this.$refs.scroller.scrollTo(0,0)
      ScrollTrigger.getAll().length > 0 && ScrollTrigger.refresh(true)
      gsap.to('#scroller',.5,{delay:.25, opacity:1,onComplete:()=>{
        this.$bus.$emit('REVEAL')
      }})
    }
  },
  middleware({route, from}){
    if (process.server || from.path == route.path) return;
    return new Promise(res =>{
      gsap.to('#scroller',.5,{opacity:0,onComplete:res})
    })
  },
  methods:{
    initCreated(){
      let timeout = null
      let html = document.documentElement

      gsap.registerPlugin(ScrollTrigger);
      gsap.registerPlugin(ScrollToPlugin);
      
      !isMobile && ScrollTrigger.defaults({scroller: "#scroller",pinType: 'fixed'});

      window.addEventListener('resize',()=>{
        timeout && clearTimeout(timeout)
        timeout = setTimeout(()=> {html.classList.remove('is-resizing')},100)
        html.classList.add('is-resizing')
      })

    },
  }
}
</script>

<style lang="css">
  html{
    background:white;
    font-size: 10px;
  }
  body{
    font-size: 1.6rem;
  }

  html.is-desktop,
  .is-desktop body{
    height: 100%;
    overflow: hidden;
  }

  .is-desktop #scroller{
    overflow: scroll;
    height: 100%;
  }

  #site{
    width: 100vw;
  }

  #page{
    min-height: 100vh;
  }

  .is-resizing *{
    transition: none !important;
  }

  .light-blue{
    background: rgba(theme('colors.bluergb'),.04);
  }

  .flex-divider{
    flex: 0 0 1px;
    background: theme('colors.blue');
    opacity: .2;
    border-radius: 1px;
  }


  @media screen and (min-width: theme('screens.md')){
    html{
      font-size: calc(10px + (100vw - 550px)/160);
    }
    body{
      font-size: 1.3rem;
    }
  }

  .gradient-90glp{
    background: linear-gradient(90deg, theme('colors.green') 0%, theme('colors.lime') 50%, theme('colors.pink') 100%);
  }
  .gradient-0glp{
    background: linear-gradient(0deg, theme('colors.green') 0%, theme('colors.lime') 50%, theme('colors.pink') 100%);
  }
  .gradient-45glp{
    background: linear-gradient(45deg, theme('colors.green') 0%, theme('colors.lime') 50%, theme('colors.pink') 100%);
  }
  .gradient-0gbp{
    background: linear-gradient(45deg, theme('colors.green') 0%, theme('colors.black') 50%, theme('colors.pink') 100%);
  }

  .clip{
    -webkit-background-clip: text;
    -webkit-text-fill-color: rgba(255, 255, 255, 0);
  }

  .gutter-left {
    padding-left: 5vw;
  }
  .gutter-right {
    padding-right: 5vw;
  }

  input{
    padding: 15px;
    width: 100%;
    background: none;
    border-radius: 5px;
  }

  .formulate-input-errors{
    font-size: 10px;
    line-height: 1;
    padding-top: 10px;
  }

  @media screen and (min-width: theme("screens.sm")) {
    .gutter-left {
      padding-left: calc((100vw - (theme("screens.sm") - 50px)) / 2);
    }
    .gutter-right {
      padding-right: calc((100vw - (theme("screens.sm") - 50px)) / 2);
    }
  }
  @media screen and (min-width: theme("screens.md")) {
    .gutter-left {
      padding-left: calc((100vw - (theme("screens.md") - 250px)) / 5);
    }
    .gutter-right {
      padding-right: calc((100vw - (theme("screens.md") - 250px)) / 5);
    }
  }

  @keyframes animate-scroll-left {
    0%{transform: translateX(0px)}
    100%{transform: translateX(-100%)}
  }

  @keyframes rotate{
    0%{transform: rotate(0deg)}
    50%{transform: rotate(180deg)}
    100%{transform: rotate(360deg)}
  }
</style>
