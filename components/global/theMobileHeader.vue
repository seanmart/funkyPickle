<template lang="html">
  <header id="c-mobile-header" class="u-shadow-y u-shadow--hover">
    <nuxt-link to="/" class="c-mobile-header__logo">
      <the-logo horizontal rainbow animate/>
    </nuxt-link>
  </header>
</template>

<script>
export default {
}
</script>

<style lang="scss">
#c-mobile-header{
    position: relative;
    z-index: 100;
    height: $nav-top + 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    transition-property: transform;
    transition-duration: .5s;
    transition-timing-function: $ease;
    transform: translateY(-1px);

  .c-mobile-header__logo{
    flex: 0 0 auto;
    height: 70%;
    svg{
      display: block;
      height: 100%;
    }
  }
}
</style>
