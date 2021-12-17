<template lang="html">
  <section class="navigation">
    <nav ref="nav">
      <template v-for="(link,a) in data">
        <nuxt-link class="link--wrapper" :to="link.url">
          <span class="label" v-html="link.label"/>
        </nuxt-link>
      </template>
    </nav>
  </section>
</template>

<script>
import vars from '../assets/_variables.scss'
export default {
  props:{data:Array},
  mounted(){
    let b1 = `linear-gradient(70deg, ${vars.pink} 0%, ${vars.violet} 100%)`
    let b2 = `linear-gradient(70deg, ${vars.violet} 0%, ${vars.pink} 100%)`
    //gsap.fromTo(this.$refs.nav, {background: b1}, {ease: "none", duration: 2, background: b2, repeat: -1});
  }
}
</script>

<style lang="scss">
.navigation{

  nav{
    display: flex;
    flex-direction: row;
    background: $pink;
    background: linear-gradient(70deg, $pink 0%, $violet 100%);
  }

  .link--wrapper{
    flex: 1 1 100%;
    display: block;
    padding: 2rem;
    padding-right: 0px;
    cursor: pointer;

    .label{
      text-transform: uppercase;
      font-size: 1.2rem;
      font-weight: 500;
      color: white;
      font-variation-settings: "wght" 600;
      transition: font-variation-settings .25s, color .25s;
    }

    &:hover .label,
    &:focus .label{
      color: $lime;
      font-variation-settings: "wght" 800;
    }
  }


}
</style>
