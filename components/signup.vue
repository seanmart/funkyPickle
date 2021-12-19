<template lang="html">
  <section class="signup block block--fullwidth block--no-top">
    <div class="signup--wrapper">
      <div class="content--wrapper">
        <h2 class="title title--ft" v-html="signup.title"/>
        <form class="form">
          <input class="field" type="text" name="" value="" placeholder="Name">
          <input class="field" type="text" name="" value="" placeholder="Email">
          <btn class="submit" type="lime">sign up!</btn>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: mapState({
    signup: state => state.signup.data || {}
  })
}
</script>

<style lang="scss">
.signup{

  .signup--wrapper{
    background: $pink;
  }

  .content--wrapper{
    max-width: 80%;
    display: flex;
    flex-direction: row;
  }

  .title{
    flex: 0 0 50%;
    padding: 7rem;
    font-size: 6rem;
    line-height: 1;
    text-transform: uppercase;
    color: $lime;
  }

  .form{
    flex: 1 1 auto;
    padding: 6rem 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .field{
      background: none;
      padding: 1.25rem;
      border: 2px solid $lime;
      margin: .5rem 0px;
      color: $lime;
      font-size: 1.5rem;
    }

    input::-webkit-input-placeholder{
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
    input::placeholder{
      color: $lime;
      opacity: 1;
    }

    .submit{
      margin-top: 1.5rem;
      align-self: flex-start;
    }
  }

}
</style>
