<template lang="html">
  <container>
    <div class="p-30 bg-white rounded-lg shadow-bottom sm:p-50" :class="classes">
      <div class="mb-40">
        <h3 v-if="data.primary.title" v-html="data.primary.title" class="text-25 font-bold" :class="{'text-pink':bg == 'white'}"/>
        <app-text v-if="data.primary.description" :data="data.primary.description"/>
      </div>
      <app-form columns :data="data.items" class="mx-auto" :btn="btn" :onSubmit="data.submit"/>
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
    classes(){
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
