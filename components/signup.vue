<template lang="html">
  <section class="c-signup o-space-inner">
    <div class="c-content o-container">
      <div class="c-title--wrapper">
        <h2 class="c-title t-header" v-html="`Join the Philanthropic Pickle People`" />
      </div>

      <form class="c-form">
        <input class="c-field" type="text" name="" value="" placeholder="Name" />
        <input class="c-field" type="text" name="" value="" placeholder="Email" />
        <btn class="c-submit u-gap-top-rg" lime>sign up!</btn>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  props: ["data"],
};
</script>

<style lang="scss">
.c-signup {
  @include dark-tropical-gradient;

  .c-content {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .c-title--wrapper {
    flex: 0 0 50%;
    margin-right: $space;
  }

  .c-title {
    color: $lime;
    font-size: 6.4vw;
  }

  .c-form {
    flex: 1 1 auto;

    .c-field {
      background: none;
      padding: 1vw;
      border: 2px solid $lime;
      margin: 0.5rem 0px;
      color: $lime;
      font-size: 1.5vw;
      display: block;
      width: 100%;
      text-align: left;
    }

    input::-webkit-input-placeholder {
      color: $lime;
      opacity: 1;
    }
    input:-moz-placeholder {
      color: $lime;
      opacity: 1;
    }
    input:-ms-input-placeholder {
      color: $lime;
      opacity: 1;
    }
    input::placeholder {
      color: $lime;
      opacity: 1;
    }
  }

}
</style>
