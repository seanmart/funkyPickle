<template lang="html">
  <nuxt-link v-if="to" :to="to" class="c-btn t-header" :class="classes">
    <div class="c-btn-text">
      <icon v-if="icon" class="c-btn-icon" :icon="icon" />
      <slot />
    </div>
    <icon v-if="arrow" class="c-btn-arrow" arrow />
  </nuxt-link>

  <button v-else type="button" name="button" class="c-btn t-header" :class="classes">
    <div class="c-btn-text">
      <icon v-if="icon" class="c-btn-icon" :icon="icon" />
      <slot />
    </div>
    <icon v-if="arrow" class="c-btn-arrow" arrow />
  </button>
</template>

<script>
export default {
  props: {
    rainbow: Boolean,
    lime: Boolean,
    to: String,
    knockout: Boolean,
    arrow: Boolean,
    icon: { type: String, default: null },
  },
  computed: {
    classes() {
      return {
        "is-rainbow": this.rainbow,
        "is-lime": this.lime,
        "is-knockout": this.knockout,
        "is-circle": this.icon && Object.keys(this.$slots).length == 0,
        "has-arrow": this.arrow,
        "has-icon": !!this.icon,
      };
    },
  },
};
</script>

<style lang="scss">
.c-btn {
  border: none;
  outline: none;
  display: inline-block;
  background: white;
  border-radius: 3rem;
  padding: 1rem 3rem;
  font-size: 1.25rem;
  letter-spacing: .02rem;
  line-height: 1;

  &.is-rainbow{
    @include rainbow-gradient;
    color: white;
    fill: white;
  }
  &.is-knockout{
    color: $purple;
    fill: $purple;
  }

  &.is-circle{
    padding: 1rem;
    .c-btn-text{
      height: 1.25rem;
      width: 1.25rem;
    }
    .c-btn-icon{
      max-width: 100%;
      max-height: 100%;
    }

  }

  @media screen and (min-width: $medium){
    border-radius: 3rem;
    padding: 1.1rem 3rem;
    font-size: 1.1rem;
    letter-spacing: .02rem;

    &.is-circle{
      padding: 1.1rem;
      .c-btn-text{
        height: 1.1rem;
        width: 1.1rem;
      }
    }
  }
}

.c-btn:active,
.is-desktop .c-btn:hover,
.is-desktop .c-btn:focus {
  &.is-rainbow{
    @include tropical-gradient;
  }
}
</style>
