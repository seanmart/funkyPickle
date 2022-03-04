<template lang="html">
  <a v-if="href" :href="href" :target="noTarget ? null : '_blank'" :class="[mainClasses,customClasses]" ref="a">
    <icon v-if="icon" :icon="icon" class="w-1/2"/>
    <span class="inline-block relative z-10"><slot>{{value}}</slot></span>
  </a>

  <nuxt-link v-else-if="to" :to="to" :class="[mainClasses,customClasses]" ref="link">
  <icon v-if="icon" :icon="icon" class="w-1/2"/>
  <span class="inline-block relative z-10"><slot>{{value}}</slot></span>
  </nuxt-link>

  <button v-else :class="[mainClasses,customClasses]" ref="btn">
  <icon v-if="icon" :icon="icon" class="w-1/2"/>
  <span class="inline-block relative z-10"><slot>{{value}}</slot></span>
  </button>

</template>

<script>
export default {
  props:{
    pink:Boolean,
    white: Boolean,
    green: Boolean,
    black: Boolean,
    to: String,
    value: String,
    icon: String,
    wide: Boolean,
    href: String,
    color: String,
    noTarget: Boolean
  },
  mounted(){
    if (this.color){
      let el = this.$refs.a || this.$refs.btn || this.$refs.link.$el
      el.style.background = this.color
    }
  },
  computed:{
    mainClasses(){
      return 'button rounded-md inline-flex flex-row justify-center items-center font-semibold text-18px h-50px leading-none'
    },
    customClasses(){
      return{
        'text-white fill-white': !this.white && !this.lime,
        'bg-pink': this.pink,
        'bg-green': this.green,
        'bg-lime': this.lime,
        'bg-white': this.white,
        'bg-black': this.black,
        'px-30px': !this.icon && !this.wide,
        'px-40px md:px-50px': this.wide,
        'w-50px': this.icon
      }
    }
  }
}
</script>

<style lang="css">
  .button{
    position: relative;
    cursor: pointer;
    overflow: hidden;
    transition: transform .25s;
    transform: scale(1.001);
  }

  .button:active{
    transform: scale(.95)
  }

  .is-desktop .button:hover::after{
    content:'';
    position: absolute;
    background: rgba(theme('colors.blackrgb'),.2);
    top:0px;
    left:0px;
    right:0px;
    bottom:0px;
    transition: .1s;
    z-index: 0;
  }

</style>
