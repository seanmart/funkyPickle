<template lang="html">
  <container-widget class="flex flex-col xl:flex-row xl:items-center">
    <div class="flex-initial xl:px-20px">
      <text-icon icon="wayfinder" :value="place" class="mb-05"/>
      <div class="font-normal">
        <p v-html="address"/>
        <p v-html="cityState"/>
      </div>
    </div>
    <div v-if="long && lat" class="flex-grow flex-shrink-0 min-w-1/2 mt-20px xl:ml-20px xl:mt-0 rounded-md overflow-hidden">
      <app-map :longitude="long" :latitude="lat" class="w-full h-400px md:h-300px"/>
    </div>
  </container-widget>
</template>

<script>
export default {
  props:['data'],
  computed:{
    long(){
      return this.data.map.longitude || null
    },
    lat(){
      return this.data.map.latitude || null
    },
    address(){
      return this.data.address || null
    },
    place(){
      return this.data.place || null
    },
    cityState(){
      let cityState = []
      if(this.data.city) cityState.push(this.data.city)
      if(this.data.state) cityState.push(this.data.state)
      return cityState.length > 0 ? cityState.join(', ') : null
    }
  }
}
</script>
