<template lang="html">
  <header id="c-header" ref="header">

    <a class="c-stmc" href="#scroller">skip to main content</a>

    <div class="c-header-top">
      <nuxt-link class="c-logo" to="/">
        <logo horizontal rainbow animate class="c-logo" />
      </nuxt-link>
    </div>

    <button class="c-menu-button" type="button" name="button" @click="toggleMenu">
      <div v-for="i in 3" class="c-bar"/>
    </button>

    <div class="c-header-side">

      <nuxt-link class="c-logo" to="/">
        <logo vertical rainbow animate class="c-logo" />
      </nuxt-link>

      <nav class="c-nav t-header">
        <template v-for="(link, i) in nav">
          <nuxt-link v-if="link.to" class="c-link" :to="link.to" v-html="link.label" />
          <a v-if="link.href" class="c-link" :href="link.href" v-html="link.label" />
        </template>
      </nav>

    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["nav"]),
  data:()=>({
    hasScrolled: false,
    menuIsOpen: false
  }),
  watch:{
    menuIsOpen(open){
      if(open){
        document.body.classList.add('menu-is-open')
        this.timeout = setTimeout(()=> window.addEventListener('click',this.toggleMenu),250)
      } else {
        document.body.classList.remove('menu-is-open')
        this.timeout && clearTimeout(this.timeout)
        window.removeEventListener('click',this.toggleMenu)
      }
    },
    hasScrolled(scrolled){
      scrolled
      ? document.body.classList.add('has-scrolled')
      : document.body.classList.remove('has-scrolled')
    }
  },
  mounted() {
    setTimeout(this.init,250)

    this.$bus.$on('SHOW_COLUMNS',()=>{
      if (this.hasScrolled || this.menuIsOpen){
        this.hasScrolled = false
        this.menuIsOpen = false
      }
    })
  },
  methods:{
    init(){
      ScrollTrigger.create({
        trigger: this.$refs.header,
        start: 1,
        end: 20,
        onEnter:()=> this.hasScrolled = true,
        onEnterBack: ()=> this.hasScrolled = false,
        onLeaveBack: ()=> this.hasScrolled = false
      })
    },
    toggleMenu(){
      this.menuIsOpen = !this.menuIsOpen
    }
  }
};
</script>

<style lang="scss">
$header-dur: .5s;
$header-mobile-nav-width: 250px;

#c-header {

  .c-stmc{
    height: 1px;
    margin: -1px;
    overflow: hidden;
    position: fixed;
    top: 0px;
    left: 0px;
  }
  .c-header-top{
    z-index: 101;
    position: fixed;
    top: -2px;
    left: 0px;
    right: 0px;
    height: $s-nav + 2px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: white;
    box-shadow: 0px 2px 5px rgba($blue,.2);
    transition-duration: $header-dur;
    transition-timing-function: $ease;
    transition-property: transform;

    .c-logo{
      flex: 0 0 auto;
      height: $s-nav - 20px;
    }
  }

  .c-header-side{
    z-index: 100;
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 0px;
    width: $header-mobile-nav-width;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: translateX(-100%);
    padding: 30px;
    transition-duration: $header-dur;
    transition-timing-function: $ease;
    transition-property: transform;
    background: $black;
    color: white;
    .c-logo{
      width: 100%;
      display: none;
    }
    .c-nav{
      flex: 0 0 auto;
      width: 100%;
    }
    .c-link{
      display: block;
      font-size: 40px;
      padding: 3vw;
    }
  }

  .c-menu-button{
    z-index: 100;
    position: fixed;
    bottom: $s-margin * 2;
    right: $s-margin;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: $black;
    outline:none;
    border: 2px solid lighten($black,10%);

    .c-bar{
      height: 3px;
      width: 60%;
      margin: 3px;
      background: white;
    }
  }


  @media screen and (min-width: $medium){

    .c-header-top{
      display: none;
    }

    .c-header-side{
      transform: none;
      width: $m-nav;
      padding: 1.5rem;
      box-shadow: 2px 0px 5px rgba($blue,.2);
      background: white;
      color: $black;
      justify-content: flex-start;
      .c-logo{
        display: block;
      }
      .c-nav{
        margin-top: 3rem;
      }
      .c-link{
        font-size: 1.5rem;
        padding: .5rem;
      }
    }

    .c-menu-button{
      display: none;
    }


  }
}

main{
  transition-duration: $header-dur;
  transition-timing-function: $ease;
  transition-property: transform, opacity;
}

@media screen and (max-width:$medium - 1px){
  .has-scrolled{
    #c-header{
      .c-header-top{
        transform: translateY(-100%);
      }
    }
  }
  .menu-is-open{
    main{
      transform: translateX($header-mobile-nav-width);
      pointer-events: none;
    }
    #c-header{
      .c-header-side{
        transform: translateX(0);
      }
      .c-header-top{
        transform: translateY(0);
      }
    }
  }
}
</style>
