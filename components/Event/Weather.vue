<template lang="html">
  <EventWidget v-if="uid" class="flex justify-center items-center">
    <div class="flex flex-row items-center">
      <div class="flex-initial text-center text-black p-10px rounded-lg text-center">
        <icon :icon="icon" class="inline-block w-50 md:w-40 mb-10px"/>
        <h3 v-html="temp" class="font-bold text-35 md:text-25 leading-10"/>
      </div>

      <div class="flex-initial pl-20px">
        <Label>Feels Like</Label>
        <h3 class="text-black font-bold" v-html="feels"/>
        <Label class="mt-10">Description</Label>
        <h3 class="text-black font-bold" v-html="description"/>
      </div>
    </div>
  </EventWidget>
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
