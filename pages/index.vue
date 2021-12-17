<template>
  <main id="home" class="page-margin">
    <section class="landing" ref="landing">
      <div class="media--wrapper">
        <div class="media--image" v-image:cover="home.landing.image.url" ref="img"/>
      </div>
      <nav ref="nav">
        <template v-for="(link,a) in nav">
          <nuxt-link class="link--wrapper" :to="link.url">
            <span class="label" v-html="link.label"/>
          </nuxt-link>
        </template>
      </nav>
    </section>

    <template v-for="(item,a) in home.slices">
      <component :class="{'block--first':a == 0}" :is="item.slice_type.replace(/_/g, '-')" :data="item" />
    </template>
    <signup/>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Home",
  computed: mapGetters(["home","nav"]),
  fetch({ store }) {
    return store.dispatch("getHome");
  },
  mounted(){
    !isMobile && scrollBuddy.reset()
    this.$nextTick(this.init)
  },
  methods:{
    init(){
      gsap.to(this.$refs.img,1,{scale:1.1,ease: 'none', scrollTrigger:{
        id: 'landing',
        trigger:this.$refs.landing,
        start: 'top top',
        scrub: true
      }})
    }
  },
  destroyed(){
    ScrollTrigger.getById('landing').kill()
  }
};
</script>

<style lang="scss">
  #home{

    .landing{

      .media--wrapper{
        overflow: hidden;
        position: relative;
        padding-bottom: 50%;
        width:100%;
      }

      .media--image{
        position: absolute;
        top:0px;
        left:0px;
        right:0px;
        bottom:0px;
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
  }

</style>
