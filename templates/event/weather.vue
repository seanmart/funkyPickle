<template lang="html">
  <widget v-if="weather" row >

    <div class="flex-auto self-stretch text-center bg-gray py-10px px-20px rounded-lg flex flex-row justify-center items-center">
      <icon :icon="icon" class="w-60 md:w-50 mr-20px"/>
      <h3 v-html="temp" class="text-40 md:text-35 leading-10"/>
    </div>

    <div class="flex-initial pl-20px">
      <label-text first value="feels like:"/>
      <h3 v-html="feels"/>
      <label-text value="description:"/>
      <h3 v-html="description"/>
    </div>

  </widget>
</template>

<script>
import {getTemp} from "@/assets/helpers";
export default {
  props:['uid'],
  computed:{
    weather(){
      return this.$store.state.weather[this.uid] || null
    },
    icon(){
      return this.weather.weather[0].icon
    },
    temp(){
      return getTemp(this.weather.main.temp)
    },
    feels(){
      return getTemp(this.weather.main.feels_like)
    },
    description(){
      return this.weather.weather[0].main
    }
  }
}
</script>
