<template lang="html">
    <container class="signup bg-lime relative overflow-hidden" ref="container">

      <div class="flex flex-col lg:flex-row lg:items-center">

        <div class="flex-auto">
          <h3 class="font-header font-bold uppercase leading-09 text-center text-60 lg:text-left lg:text-50">
          <template v-for="line in data.title">
            <span class="block" v-html="line.text"/>
          </template>
          </h3>
        </div>

        <div class="flex-initial lg:w-250 pt-20 lg:pl-20 lg:pt-0">
          <app-form :data="data.form" :onSubmit="data.submit"/>
        </div>
      </div>

      <div class="signup__bg absolute inset-0 -top-100px z-back bg-cover bg-center opacity-50" ref="bg"/>
    </container>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data:()=>({
    isSent: false
  }),
  computed:{
    ...mapState({
      data: state => state.settings.signup,
    })
  }
}
</script>

<style lang="css">
.signup__bg{
  background-image: url("/fp_giraffe.svg");
}

</style>
