<template lang="html">
  <button type="button" name="button" class="c-btn" :class="{['is-rainbow']:rainbow,['has-arrow']:arrow}">

    <template v-if="link">
      <nuxt-link :to="link" class="c-btn--wrapper">
        <div class="c-btn-text">
          <slot/>
        </div>
        <icon v-if="arrow" arrow/>
      </nuxt-link>
    </template>

    <template v-else>
      <div class="c-btn--wrapper">
        <div class="c-btn-text">
          <slot/>
        </div>
        <icon v-if="arrow" class="c-btn-arrow" arrow/>
      </div>
    </template>

  </button>
</template>

<script>
export default {
  props:{
    rainbow:Boolean,
    link: String,
    arrow: Boolean
  }
}
</script>

<style lang="scss">
  .c-btn{
    border: none;
    padding: 1.5rem 5rem;
    border-radius: 3rem;
    @include header;
    font-size: 2rem;
    font-weight: 400;
    letter-spacing: .1rem;
    .c-btn-text,
    .c-btn-arrow{
      transition: transform .25s, opacity .25s;
    }
    &.is-rainbow{
      @include rainbow-gradient;
      animation: animate-gradient 3s ease infinite;
      background-size: 200% 100%;
      transition: box-shadow .25s;
      box-shadow: 0 0 0 $blue;
      color: white;
      &:hover{
        @include tropical-gradient;
        background-size: 200% 100%;
      }
      &.has-arrow{
        fill: white;
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
      &:hover{
        .c-btn-text{
          transform: translateX(-2rem);
        }
        .c-btn-arrow{
          transform: translateX(-2rem);
          opacity: 1;
        }
      }
    }

    .c-btn--wrapper{
      display: block;
    }




  }
</style>
