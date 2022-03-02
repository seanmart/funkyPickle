<template lang="html">
  <div class="bg-gray py-5px px-10px rounded-md inline-flex flex-row items-center font-bold text-12px" v-if="data">
    <icon :icon="icon" class="h-14px"/>
    <h5 v-html="`${temp}, ${description}`" class=" pl-10px"/>
  </div>
</template>

<script>
import { getTemp } from "@/assets/helpers";
import {mapState} from 'vuex'
export default {
  props:{
    uid:String,
  },
  computed:{
    ...mapState(['weather']),
    data(){
      return this.weather[this.uid] || null
    },
    icon(){
      return this.data ? this.data.weather[0].icon : null
    },
    temp(){
      return this.data ? getTemp(this.data.main.temp) : null
    },
    description(){
      return this.data ? this.data.weather[0].main : null
    }
  },
}
</script>

<style lang="css" scoped>
</style>
