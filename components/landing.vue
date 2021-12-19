<template lang="html">
  <section class="landing block block--no-top block--fullwidth">

    <div class="image--wrapper" v-if="data.primary.image">
      <fancyImage class="media--image" :image="data.primary.image.url" :scale="1.1" start="top top" />
    </div>

    <nav v-if="data.primary.nav" ref="nav">
      <template v-for="(link,a) in nav">
        <nuxt-link class="link--wrapper" :to="link.url">
          <span class="label" v-html="link.label"/>
        </nuxt-link>
      </template>
    </nav>
  </section>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props:{data:Object},
  computed:mapState(['nav'])
}
</script>

<style lang="scss">

.landing{

  .media--image{
    padding-bottom: 50%;
    width:100%;
  }

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
