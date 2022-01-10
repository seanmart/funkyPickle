<template lang="html">
  <section class="c-signup o-top">
    <div class="c-signup--wrapper">
      <div class="c-content o-container">

        <div class="c-title--wrapper">
          <h2 class="c-title t-header" v-html="`Join the Philanthropic Pickle People`"/>
        </div>

        <form class="c-form">
          <input class="c-field" type="text" name="" value="" placeholder="Name">
          <input class="c-field" type="text" name="" value="" placeholder="Email">
          <btn class="c-submit u-gap-top-rg" lime >sign up!</btn>
        </form>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  props:['data']
}
</script>

<style lang="scss">
.c-signup{

  .c-signup--wrapper{
    @include dark-tropical-gradient;
    padding: $space 0px;
  }

  .c-content{
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .c-title--wrapper{
    flex: 0 0 50%;
    margin-right:$space;
  }

  .c-title{
    color:$lime;
    font-size: 6.4vw;
  }

  .c-form{
    flex: 1 1 auto;

    .c-field{
      background: none;
      padding: 1.25rem;
      border: 2px solid $lime;
      margin: .5rem 0px;
      color: $lime;
      font-size: 1.5rem;
      display: block;
      width: 100%;
      text-align: left;
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

  }

  @media screen and (min-width: $navigation-width + $max-width + ($margins * 2)){
    .c-title{
      font-size: 80px;
    }
  }

  @media screen and (max-width: $tablet + 100px){

    .c-content{
      flex-direction: column;
      align-items: stretch;
    }
    .c-title--wrapper{
      margin-right:0px;
      margin-bottom: $space / 2;
      text-align: center;
    }
    .c-title{
      font-size: 10vw;
    }

    .c-form{
      flex: 0 0 auto;
      text-align: center;

      .c-field{
        max-width: 350px;
        margin-left: auto;
        margin-right: auto;
        font-size: 2rem;
      }
    }
  }

  @media screen and (max-width: $tablet){
    .c-title{
      font-size: 14vw;
    }
  }
}
</style>
