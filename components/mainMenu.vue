<template lang="html">
  <nav id="main-menu">
    <nuxt-link to="/" class="logo--wrapper">
      <logo class="logo"/>
    </nuxt-link>
    <div class="menu-button">
      <div v-for="i in 3" :key="i" class="bar"/>
      <span>menu</span>
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
  width: 16.666vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 2rem;

  .logo--wrapper{
    display: block;
  }

  .logo{
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

    span{
      margin-left: 10px;
    }
  }
}

</style>
