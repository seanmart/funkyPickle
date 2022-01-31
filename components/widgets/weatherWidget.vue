<template lang="html">
  <widget-container iconBlack wideLeft class="c-dates-widget" v-if="data">
    <template #icon><icon v-if="icon" :icon="icon"/></template>
    <template #contentRow>
      <widget-block v-if="temp" expand alignCenter>
        <h3 class="t-header c-dates-widget__temp" v-html="getTemp(temp)"/>
        <span v-if="description" v-html="description"/>
      </widget-block>
      <widget-rows>
        <widget-row v-if="feelsLike" tight label="Feels Like" :value="getTemp(feelsLike)"/>
        <widget-row v-if="humidity" tight label="Humidity" :value="`${humidity}%`"/>
        <widget-row v-if="sunRise" tight label="Sunrise" :value="getTime(sunRise,data.timezone || 0)"/>
        <widget-row v-if="sunSet" tight label="Sunset" :value="getTime(sunSet,data.timezone || 0)"/>
      </widget-rows>
    </template>
  </widget-container>
</template>

<script>
import {getTemp,getTime} from '@/assets/js/helpers'
import {mapState} from 'vuex'
export default {
  props:{
    uid:String
  },
  computed:{
    ...mapState(['weather']),
    data(){
      return this.weather[this.uid] || null
    },
    icon(){
      if (!this.data) return null
      return this.data.weather[0].icon
    },
    description(){
      if (!this.data) return null
      return this.data.weather[0].main
    },
    temp(){
      if (!this.data) return null
      return this.data.main.temp || null
    },
    feelsLike(){
      if (!this.data) return null
      return this.data.main.feels_like || null
    },
    humidity(){
      if (!this.data) return null
      return this.data.main.humidity || null
    },
    sunRise(){
      if (!this.data) return null
      return this.data.sys.sunrise || null
    },
    sunSet(){
      if (!this.data) return null
      return this.data.sys.sunset || null
    }
  },
  methods:{getTemp,getTime}
}
</script>

<style lang="scss">
  .c-dates-widget{
    .c-dates-widget__temp{
      font-size: 5rem;
    }
  }
</style>
