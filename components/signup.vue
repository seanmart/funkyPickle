<template lang="html">
  <container inner noY class="signup bg-lime relative z-10 overflow-hidden" ref="container">
    <div class="flex flex-col lg:flex-row lg:items-center">
      <div class="flex-auto">
        <h3 class="font-header font-bold uppercase leading-08 text-center text-60 lg:text-left lg:text-50">
        <template v-for="line in data.title">
          <span class="block" v-html="line.text"/>
        </template>
        </h3>
      </div>
      <div class="flex-initial lg:w-250 pt-20 lg:pl-20 lg:pt-0">
        <template v-for="field in data.form">
          <formulate-input :label="field.primary.label" :type="field.primary.type" :name="field.primary.ID" :validation="getValidation(field)"/>
        </template>
        <div class="mt-20 text-center lg:text-left">
          <btn wide value="Signup"/>
        </div>
      </div>
    </div>
    <div class="signup__bg absolute inset-0 -top-100px z-back bg-cover bg-center opacity-50" ref="bg"/>
  </container>
</template>

<script>
import {mapState} from 'vuex'
export default {
  mounted(){
    gsap.to(this.$refs.bg,1,{y: 100, ease: 'none',scrollTrigger:{
      trigger: this.$refs.container.$el,
      start: 'top bottom',
      scrub: true
    }})
  },
  computed:{
    ...mapState({
      data: state => state.settings.signup
    })
  },
  methods:{
    getValidation(field){
      return field.primary.required ? `required|${field.slice_type.replace('form_','')}` : ""
    }
  }
}
</script>

<style lang="css">
.signup__bg{
  background-image: url("/fp_giraffe.svg");
}

.signup .formulate-input{
  margin-top: .5rem;
}

.signup .formulate-input:first-child{
  margin-top: 0px;
}

.signup input{
  background: rgba(theme('colors.limergb'),.5);
  border: 2px solid theme('colors.black');
}

.signup .formulate-input-errors{
  display: none;
}

.signup .formulate-input[data-is-showing-errors="true"] input{
  border: 2px solid theme('colors.pink');
  background: rgba(theme('colors.pinkrgb'),.1);
}

.signup .formulate-input[data-is-showing-errors="true"] .formulate-input-label{
  color: theme('colors.pink')
}

</style>
