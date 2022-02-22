<template lang="html">
  <div class="text-center">
    <div class="inline-flex flex-row items-center">
      <div
        class="flex justify-center items-center"
        :class="{'h-60 w-60 md:w-50 md:h-50 p-10 bg-lime fill-black rounded-lg':!mini,'h-14px w-14px':mini}"
      >
        <icon :icon="data.icon" class="w-full"/>
      </div>
      <div :class="{'mx-15 sm:mx-20':!mini,'ml-5px':mini}">
        <h3
          class="font-bold whitespace-nowrap leading-none"
          :class="{'font-header uppercase text-50 md:text-40':!mini,'text-12px':mini}"
          v-html="mini ? `${data.temp}, ${data.desc}` : data.temp"
        />
        <p v-if="!mini" class="font-medium text-12 whitespace-nowrap md:text-10" v-html="data.desc"/>
      </div>
      <div v-if="!mini" class="border-l pl-15 sm:pl-20 border-gray"><table><tbody>
        <template v-for="(item, i) in data.table">
          <tr class="leading-11 text-11px sm:text-13px" :class="{'border-t border-gray': i > 0}">
            <td class="py-02 pr-10 whitespace-nowrap font-medium" v-html="`${item.label}:`"/>
            <td class="py-02 whitespace-nowrap font-bold" v-html="item.value"/>
          </tr>
        </template>
      </tbody></table></div>
    </div>
  </div>
</template>

<script>
import { getTemp,getTime } from "@/assets/helpers";
import {mapState} from 'vuex'
export default {
  props:{
    uid:String,
    mini:Boolean
  },
  computed:{
    ...mapState({
      weather: state => state.weather
    }),
    data(){
      let weather = this.weather[this.uid] || null
      if (weather){
        return {
          icon: weather.weather[0].icon,
          temp: getTemp(weather.main.temp),
          desc: weather.weather[0].main,
          table:[
            {label: 'Feels Like', value: getTemp(weather.main.feels_like)},
            {label: 'Humidity', value: `${weather.main.humidity}%`},
            {label: 'Sunrise', value: getTime(weather.sys.sunrise,weather.timezone)},
            {label: 'Sunset', value: getTime(weather.sys.sunset,weather.timezone)}
          ]
        }
      }
      return null
    }
  },
}
</script>

<style lang="css" scoped>
</style>
