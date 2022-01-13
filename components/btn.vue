<template lang="html">

      <nuxt-link v-if="to" :to="to" class="c-btn" :class="classes">
        <div class="c-btn-text">
          <icon v-if="icon" class="c-btn-icon" :icon="icon"/>
          <slot/>
        </div>
        <icon v-if="arrow" class="c-btn-arrow" arrow/>
      </nuxt-link>

      <button v-else type="button" name="button" class="c-btn" :class="classes">
        <div class="c-btn-text">
          <icon v-if="icon" class="c-btn-icon" :icon="icon"/>
          <slot/>
        </div>
        <icon v-if="arrow" class="c-btn-arrow" arrow/>
      </button>

</template>

<script>
export default {
  props:{
    rainbow:Boolean,
    lime:Boolean,
    to: String,
    knockout:Boolean,
    arrow: Boolean,
    tight: Boolean,
    icon: {type: String, default: null},
  },
  computed:{
    classes(){
      return{
        'is-rainbow': this.rainbow,
        'is-lime': this.lime,
        'is-knockout': this.knockout,
        'is-tight': this.tight,
        'is-circle': this.icon && Object.keys(this.$slots).length == 0,
        'has-arrow': this.arrow,
        'has-icon': !!this.icon,
      }
    }
  }
}
</script>

<style lang="scss">

  .c-btn{
    border: none;
    border-radius: 3rem;
    @include header;
    font-size: 2rem;
    font-weight: 400;
    letter-spacing: .1rem;
    padding: 1.5rem 5rem;
    display: inline-block;
    cursor: pointer;

    &.is-tight,
    &.is-circle{
      padding: 1.5rem;
    }

    &.is-lime{
      background: $lime;
      color: $black;
      fill: $black;
      transition: background .25s;
    }

    &.is-rainbow{
      @include rainbow-gradient;
      animation: animate-gradient 3s ease infinite;
      background-size: 200% 100%;
      transition: box-shadow .25s;
      box-shadow: 0 0 0 $blue;
      color: white;
      fill: white;
    }

    &.is-knockout{
      background: white;
      color: $purple;
      fill: $purple
    }

    &.has-arrow{
      position:relative;
      .c-btn-arrow{
        position: absolute;
        top: 35%;
        bottom: 35%;
        right: 1rem;
        height: 30%;
        opacity: 0;
      }
    }

    &.has-icon{
      display: inline-flex;
      align-items: center;
      &.is-circle{
        justify-content: center;
        height:2rem;
        width: 2rem;
        box-sizing: content-box;
      }
    }

    .c-btn-text,
    .c-btn-arrow{
      transition: transform .25s, opacity .25s;
    }
    .c-btn-arrow{
      fill: inherit !important;
    }
    .c-btn-icon{
      height: 2rem;
      display: block;
    }

    @media screen and (max-width:$tablet){
      border-radius: 4rem;
      padding: 2.5rem 6rem;

      &.is-tight,
      &.is-circle{
        padding: 2.5rem;
      }

    }

  }

  .c-btn.is-rainbow:hover,
  .c-btn.is-rainbow:active,
  .is-desktop .c-btn.is-rainbow:focus{
    outline: none;
    @include tropical-gradient;
    background-size: 200% 100%;
    &.has-arrow{
      .c-btn-text{
        transform: translateX(-2rem);
      }
      .c-btn-arrow{
        transform: translateX(-2rem);
        opacity: 1;
      }
    }
  }

  .c-btn.is-lime:hover,
  .c-btn.is-lime:active,
  .is-desktop .c-btn.is-lime:focus{
    outline: none;
    background: white;
  }

</style>
