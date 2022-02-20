<template lang="html">
  <main id="page">

    <div class="shadow-bottom bg-white">

      <landing center v-if="data.image.url" :image="data.image.url" class="h-350 md:h-250 pb-0" />

      <container noTop noBottom v-if="data.banner_image.url">
        <div class="relative z-10 flex flex-row justify-center items-center h-0">
          <div class="w-full pb-2/5 shadow-bottom bg-cover bg-center rounded-lg relative" :style="{ backgroundImage: `url(${data.banner_image.url})` }" />
        </div>
        <div class="w-full"><div class="pt-1/5" /></div>
      </container>

      <div class="py-50">

        <container noTop noBottom>
          <h1 v-if="data.title" v-html="data.title" class="text-center font-header font-bold uppercase text-45 leading-09" />

            <div class="text-left flex flex-row flex-wrap mt-40 -mx-05">

              <widget class="flex-auto text-center">
                <div class="inline-flex flex-row items-center">
                  <div class="w-40 h-40 flex justify-center items-center bg-pink fill-white rounded-lg">
                    <icon calendar class="w-20"/>
                  </div>
                  <div class="text-left ml-15 font-medium">
                    <span class="block whitespace-nowrap" v-html="`${formatDate(data.start_date, 'dddd, mmmm dd, yyyy')}`" />
                    <span class="block whitespace-nowrap" v-html="`${formatDate(data.end_date, 'dddd, mmmm dd, yyyy')}`" />
                  </div>
                </div>
              </widget>

              <widget class="flex-auto text-center">
                <div class="inline-flex flex-row items-center">
                  <div class="w-40 h-40 flex justify-center items-center bg-pink fill-white rounded-lg">
                    <icon wayfinder class="w-20"/>
                  </div>
                  <div class="text-left ml-15 font-medium">
                    <span class="block whitespace-nowrap" v-html="data.place" />
                    <span class="block whitespace-nowrap" v-html="`${data.city}, ${data.state}`" />
                  </div>
                </div>
              </widget>

            </div>
        </container>

        <!-- <sticky-header> -->
          <container noTop noBottom>
            <div class="mt-40 text-center">
              <btn pink wide value="Register" />
            </div>
          </container>
        <!-- </sticky-header> -->

      </div>

    </div>

    <container id="event__widgets" class="flex flex-col xl:flex-row -mx-05">
      <div class="flex-initial xl:flex-auto">

        <widget class="text-center" v-if="theWeather">
          <div class="inline-flex flex-row items-center">
            <div class=" h-60 w-60 md:w-50 md:h-50 p-10 flex justify-center items-center bg-black fill-white rounded-lg">
              <icon :icon="theWeather.icon" class="w-full"/>
            </div>
            <div class="mx-15 sm:mx-20">
              <h3 class="font-header font-bold whitespace-nowrap uppercase text-50 md:text-40 leading-none" v-html="theWeather.temp"/>
              <p  class="font-medium text-12 whitespace-nowrap md:text-10" v-html="theWeather.desc"/>
            </div>
            <div class="border-l pl-15 sm:pl-20 border-gray"><table><tbody>
              <template v-for="(item, i) in theWeather.table">
                <tr class="leading-11 text-11px sm:text-13px" :class="{'border-t border-gray': i > 0}">
                  <td class="py-02 pr-10 whitespace-nowrap font-medium" v-html="`${item.label}:`"/>
                  <td class="py-02 whitespace-nowrap font-bold" v-html="item.value"/>
                </tr>
              </template>
            </tbody></table></div>
          </div>
        </widget>

        <widget>
          map
        </widget>
      </div>
      <div class="flex-initial min-w-200">
        <widget>
          sponsors
        </widget>
      </div>
    </container>
  </main>
</template>

<script>
import { formatDate,getTemp,getTime } from "@/assets/helpers";
import {mapState} from 'vuex'
export default {
  async asyncData({ store, params, $prismic, payload }) {
    let res = null;
    let uid = params.uid;

    if (payload) store.commit("EVENT", [uid, payload.data]);

    if (!store.state.events[uid]) {
      res = await $prismic.api.getByUID("event", uid);
      res && store.commit("EVENT", [uid, res.data]);
    }
    let data = store.state.events[uid] || null;
    if (data) return { data, uid };
  },
  data: () => ({
    data: [],
    uid: null,
    headerActive: false,
  }),
  computed:{
    ...mapState({
      weather: state => state.weather
    }),
    theWeather(){
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
  methods:{
    formatDate
  }
};
</script>

<style lang="css">
#event__widgets {
  height: 100vh;
}
</style>
