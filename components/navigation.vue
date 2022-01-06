<template lang="html">
  <header id="c-navigation">
    <div class="c-background"/>

    <nuxt-link class="c-logo" to="/">
      <logo vertical rainbow animate class="c-logo-desktop"/>
      <logo horizontal rainbow animate class="c-logo-mobile"/>
    </nuxt-link>


    <nav class="c-links">
      <ul class="c-links--wrapper">
        <template v-for="(link,i) in nav">
          <li :key="i" class="c-link">
            <nuxt-link v-if="link.to" :to="link.to" v-html="link.label"/>
            <a v-if="link.href" :href="link.href" v-html="link.label"/>
          </li>
        </template>
      </ul>
    </nav>
  </header>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed:mapState(['nav','reveal']),
  mounted(){
    if (!this.reveal){
      gsap.timeline()
      .set('#c-navigation .c-link',{x:'-100%'})
    }
  },
  watch:{
    reveal(){
      gsap.timeline()
      .to('#c-navigation .c-link',.75,{x:0,stagger:.1})
    }
  }
}
</script>

<style lang="scss">
#c-navigation{
  $nav-space: $navigation-width / 6;
  $m-nav-space:$navigation-height / 5;
  $nav-width: $nav-space * 4;
  $nav-height: $m-nav-space * 3;

  .c-background{
    z-index: 100;
    position: fixed;
    top: 0px;
    left: 0px;
    height:100vh;
    width: $navigation-width;
    background: white;
    box-shadow: 3px 0px 8px rgba($blue,.3);
  }

  .c-logo{
    z-index: 101;
    position: fixed;
    top: $nav-space;
    left: $nav-space;

    .c-logo-mobile{
      display: none;
      height: $nav-height;
    }
    .c-logo-desktop{
      display: block;
      width: $nav-width;
    }

    svg{
      max-height: 100%;
      max-width: 100%;
    }

  }

  .c-links{
    z-index: 101;
    position: fixed;
    top: 360px;
    left: $nav-space;
    width: $nav-width;
    overflow: hidden;

    .c-link{
      @include header;
      font-size: 25px;
      margin-bottom: 10px;
    }

    a{
      display: block;
      padding: 5px
    }
  }

  @media screen and (max-width: $tablet){

    .c-background{
      width: 100vw;
      height: $navigation-height;
      box-shadow: 0px 3px 8px rgba($blue,.2);
    }

    .c-logo{
      top: $m-nav-space;
      left: 50%;
      transform: translateX(-50%);

      .c-logo-mobile{
        display: block;
      }
      .c-logo-desktop{
        display: none;
      }
    }

    .c-links{
      top: 0px;
      bottom: 0px;
      left: 0px;
      width: 100vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: $m-margins;
      z-index: -1;
      opacity: 0;

      .c-links--wrapper{
        display: block;
        width: 100%;
        max-width: $m-max-width;
        margin: 0px auto;
      }

      .c-link{
        font-size: 60px;
      }
    }

  }
}

</style>
