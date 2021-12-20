<template lang="html">
  <nav id="main-menu">
    <nuxt-link to="/" class="logo-side--wrapper">
      <logo class="logo-side"/>
    </nuxt-link>
    <div class="menu-button">
      <div v-for="i in 3" :key="i" class="bar"/>
      <span class="menu-text">menu</span>
    </div>
    <div class="social">
      social
    </div>
  </nav>
</template>

<script>
import logo from "./logo"
export default {
  components:{logo}
}
</script>

<style lang="scss">

#main-menu{
  position: fixed;
  z-index: 100;
  top: 0px;
  left: 0px;
  bottom: 0px;
  width: $menu-width;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 2rem;

  .logo-side--wrapper{
    display: block;
  }

  .logo-side{
    width: 100%;
    max-width: 12rem;
    display: block;
  }

  .menu-button{
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    left: 2rem;
    top: 50%;
    font-size: 1rem;

    .bar{
      width: 3px;
      height: 35px;
      margin-right: 5px;
      background: black;
    }

    .menu-text{
      margin-left: 10px;
    }
  }

  @media screen and (max-width: 700px){

  width: $mobile-menu-width;

    .logo-side{
      display: none;
    }

    .menu-button{
      .menu-text{
        display: none;
      }
    }
  }
}

</style>
