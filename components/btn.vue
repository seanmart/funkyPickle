<template lang="html">
  <component
    :to="to"
    :is="to ? 'nuxt-link' : 'button'"
    class="button rounded-full inline-flex flex-row justify-center items-center font-semibold text-20px h-60px leading-none border-2"
    :class="classes"
  >
    <icon v-if="icon" :icon="icon" class="w-1/2"/>
    <slot>{{value}}</slot>
  </component>
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
    wide: Boolean
  },
  computed:{
    classes(){
      return{
        'text-white fill-white': !this.white && !this.lime,
        'bg-pink border-pink': this.pink,
        'bg-green border-green': this.green,
        'bg-lime border-lime': this.lime,
        'bg-white border-white': this.white,
        'bg-black border-black': this.black || (!this.pink && !this.white && !this.lime && !this.green),
        'px-30px': !this.icon && !this.wide,
        'px-60px': this.wide,
        'w-60px': this.icon
      }
    }
  }
}
</script>

<style lang="css">
  .button{
    cursor: pointer;
    transition: transform .25s, background .1s, color .1s;
    transform: scale(1.001);
  }

  .button:active{
    transform: scale(.95)
  }

  .is-desktop .button.bg-black:hover{
    background: none;
    color: theme('colors.black')
  }

  .is-desktop .button.bg-pink:hover{
    background: none;
    color: theme('colors.pink')
  }

  .is-desktop .button.bg-green:hover{
    background: none;
    color: theme('colors.green')
  }

  .is-desktop .button.bg-lime:hover{
    background: none;
    color: theme('colors.lime')
  }

</style>
