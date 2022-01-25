<template lang="html">
  <nuxt-link v-if="to" :to="to" class="c-btn" :class="classes">
    <icon v-if="icon" class="c-btn-icon" :icon="icon" />
    <span class="c-btn-text t-header"><slot /></span>
    <icon v-if="arrow" class="c-btn-arrow" arrow />
  </nuxt-link>

  <button v-else type="button" name="button" class="c-btn t-header" :class="classes">
    <icon v-if="icon" class="c-btn-icon" :icon="icon" />
    <span class="c-btn-text t-header"><slot /></span>
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
    big: Boolean,
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
        "is-big": this.big
      };
    },
  },
};
</script>

<style lang="scss">

$s-btn-space: 9vw;
$m-btn-space: 3rem;
$h-btn-space: 2.5rem;

.c-btn {
  border: none;
  outline: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: $s-btn-space;
  padding: 0px $s-btn-space;
  border-radius: $s-btn-space / 2;
  font-size: $s-btn-space / 2;
  background: white;

  .c-btn-text{
    line-height: 1;
    font-weight: 600;
  }
  .c-btn-icon{
    width: 50%;
    max-height: 50%;
  }

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
    padding: 0px;
    width: $s-btn-space;
  }
  &.is-big{
    height: $s-btn-space * 1.5;
    padding: 0px $s-btn-space * 1.5;
    border-radius: ($s-btn-space * 1.5) / 2;
    &.is-circle{
      width: $s-btn-space * 1.5;
    }
  }

  @media screen and (min-width: $medium ){

    height: $m-btn-space;
    padding: 0px $m-btn-space;
    border-radius: $m-btn-space / 2;
    font-size: $m-btn-space / 2;

    &.is-circle{
      width: $m-btn-space;
    }
    &.is-big{
      height: $m-btn-space * 1.5;
      padding: 0px $m-btn-space * 1.5;
      border-radius: ($m-btn-space * 1.5) / 2;
      &.is-circle{
        width: $m-btn-space * 1.5;
      }
    }

  }

  @media screen and (min-width: $huge ){

    height: $h-btn-space;
    padding: 0px $h-btn-space;
    border-radius: $h-btn-space / 2;
    font-size: $h-btn-space / 2;

    &.is-circle{
      width: $h-btn-space;
    }
    &.is-big{
      height: $h-btn-space * 1.5;
      padding: 0px $h-btn-space * 1.5;
      border-radius: ($h-btn-space * 1.5) / 2;
      &.is-circle{
        width: $h-btn-space * 1.5;
      }
    }

  }
}

.c-btn:active,
.is-desktop .c-btn:hover,
.is-desktop .c-btn:focus {
  &.is-rainbow{
    background: $pink;
  }
  &.is-knockout{
    background: $purple;
    color: white;
    fill: white;
  }
}
</style>
