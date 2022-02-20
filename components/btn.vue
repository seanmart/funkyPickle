<template lang="html">
  <component :is="to ? 'nuxt-link' : 'button'" :to="to" class="c-btn" :class="classes">
    <icon class="c-btn__icon" v-if="icon" :icon="icon"/>
    <span class="c-btn__value t-header">
      <slot>{{value}}</slot>
    </span>
    <icon v-if="to" arrow class="c-btn__arrow"/>
  </component>
</template>

<script>
export default {
  props:{
    to:String,
    value:String,
    icon:String,
    knockout: Boolean,
    rainbow: Boolean,
    big: Boolean
  },
  computed:{
    classes(){
      return{
        'has-arrow':this.to,
        'has-icon':this.icon,
        'is-knockout': this.knockout,
        'is-rainbow':this.rainbow,
        'is-big': this.big,
        'should-shrink': this.icon && !this.value && Object.keys(this.$slots).length == 0
      }
    }
  }
}
</script>

<style lang="scss">
.c-btn{
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 3rem;
  height: 4rem;
  border-radius: 2rem;
  position: relative;
  background: $black;
  color: white;
  fill: white;
  &:hover{
    color: $lime;
    fill:$lime;
  }

  .c-btn__value{
    flex: 0 0 auto;
    font-size: 2rem;
    line-height: 1;
    transition: transform .25s;
  }
  .c-btn__icon{
    height: 2rem;
    flex: 0 0 auto;
    line-height: 1;
  }
  .c-btn__arrow{
    height: 1.4rem;
    flex: 0 0 auto;
    line-height: 1;
    right: 2rem;
    position: absolute;
    transition: transform .25s, opacity .25s;
    transform: translateX(1rem);
    opacity: 0;
  }
  &.is-knockout{
    background: white;
    color: $purple;
    fill: $purple;
    &:hover{
      background: $purple;
      color: white;
      fill: white;
    }
  }
  &.should-shrink{
    padding:0px;
    width: 4rem;
  }
  &.has-arrow:hover{
    .c-btn__arrow{
      opacity: 1;
      transform: translateX(0px);
    }
    .c-btn__value{
      transform: translateX(-1rem);
    }
  }
  &.is-rainbow{
    @include rainbow-gradient(160);
    &:hover{
      color: white;
      fill: white;
      @include rainbow-gradient(-20)
    }
  }
  &.is-big{
    height: 5rem;
    border-radius: 2.5rem;
    &.should-shrink{
      padding:0px;
      width: 5rem;
    }
  }

  @media screen and (max-width:theme('screens.md-max')){
    .c-btn{
      height: 5rem;
      padding: 0px 4rem;
    }
  }
}
</style>
