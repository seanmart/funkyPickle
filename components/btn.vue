<template lang="html">

      <nuxt-link v-if="to" :to="to" class="c-btn" :class="{['is-rainbow']:rainbow,['is-lime']:lime,['has-arrow']:arrow}">
        <div class="c-btn-text">
          <slot/>
        </div>
        <icon v-if="arrow" class="c-btn-arrow" arrow/>
      </nuxt-link>

      <button v-else type="button" name="button" class="c-btn" :class="{['is-rainbow']:rainbow,['is-lime']:lime,['has-arrow']:arrow}">
        <div class="c-btn-text">
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
    arrow: Boolean
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

    &.is-lime{
      background: $lime;
    }

    &.is-rainbow{
      @include rainbow-gradient;
      animation: animate-gradient 3s ease infinite;
      background-size: 200% 100%;
      transition: box-shadow .25s;
      box-shadow: 0 0 0 $blue;
      color: white;
      fill: white;
      &:hover,
      &:active,
      &:focus{
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
    .c-btn-text,
    .c-btn-arrow{
      transition: transform .25s, opacity .25s;
    }
    .c-btn-arrow{
      fill: inherit !important;
    }

    @media screen and (max-width:$tablet){

      border-radius: 4rem;

      .c-btn--wrapper{
        padding: 2.5rem 6rem;
      }
    }

  }
</style>
