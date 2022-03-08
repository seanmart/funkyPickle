<template lang="html">
  <container class="form-section">
    <div class="rounded-lg shadow-bottom overflow-hidden">
      <div  v-if="data.primary.title" :class="headerClasses" class="px-30 sm:px-50 py-10">
        <h3 v-html="data.primary.title" class="text-25 font-bold font-header uppercase leading-09"/>
      </div>
      <div class="p-30 sm:px-50 sm:pb-50" :class="contentClasses">
        <prismic-rich-text v-if="data.primary.description.length > 0" :field="data.primary.description" class="mb-30 font-semibold"/>
        <app-form columns :data="data.items" class="mx-auto" :btn="btn" :onSubmit="data.submit"/>
      </div>
    </div>
  </container>
</template>

<script>
export default {
  props:['data'],
  computed:{
    bg(){
      return this.data.primary.background
    },
    btn(){
      let black = this.bg == 'black'
      let pink = this.bg == 'pink'
      return{
        bg: pink ? 'lime' : 'pink',
        hoverBg: black ? 'lime' : 'black',
        activeBg: black ? 'lime' : 'black',
        color: pink ? 'black' : 'white',
        hoverColor: black ? 'black' : 'white',
        activeColor: black ? 'black' : 'white'
      }
    },
    headerClasses(){
      return{
        'bg-black text-white': this.bg != 'black',
        'bg-lime text-black': this.bg == 'black'
      }
    },
    contentClasses(){
      return{
        'bg-white':this.bg == 'white',
        'bg-pink text-white' : this.bg == 'pink',
        'bg-green':this.bg == 'green',
        'bg-lime': this.bg == 'lime',
        'bg-black text-white': this.bg =='black'
      }
    }
  }
}
</script>

<style media="screen">
  .text-section + .form-section,
  .form-section + .form-section{
    padding-top: 0px;
  }
</style>
