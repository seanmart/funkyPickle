<template lang="html">
  <main id="page" v-if="data">

    <div class="shadow-bottom bg-white">

      <landing center :image="landingImage" class="h-350 md:h-250 pb-0" />

      <template v-if="bannerImage">
        <container noTop noBottom>
          <div class="relative z-10 flex flex-row justify-center items-center h-0">
            <div class="w-full pb-2/5 shadow-bottom bg-cover bg-center rounded-lg relative" :style="bannerImage" />
          </div>
          <div class="w-full"><div class="pt-1/5" /></div>
        </container>
      </template>

      <div class="py-50">

        <container noTop noBottom>

          <h1 v-html="eventTitle" class="text-center font-header font-bold uppercase text-45 leading-09" />

          <div class="text-left flex flex-row flex-wrap mt-40 -mx-05">

            <template v-if="startDate || endDate">
              <widget class="flex-auto text-center">
                <div class="inline-flex flex-row items-center">
                  <div class="w-40 h-40 flex justify-center items-center bg-pink fill-white rounded-lg">
                    <icon calendar class="w-20"/>
                  </div>
                  <div class="text-left ml-15 font-medium">
                    <span v-if="startDate" class="block whitespace-nowrap" v-html="startDate" />
                    <span v-if="endDate" class="block whitespace-nowrap" v-html="endDate" />
                  </div>
                </div>
              </widget>
            </template>

            <template v-if="place || cityState">
              <widget class="flex-auto text-center">
                <div class="inline-flex flex-row items-center">
                  <div class="w-40 h-40 flex justify-center items-center bg-pink fill-white rounded-lg">
                    <icon wayfinder class="w-20"/>
                  </div>
                  <div class="text-left ml-15 font-medium">
                    <span v-if="place" class="block whitespace-nowrap" v-html="place" />
                    <span v-if="cityState" class="block whitespace-nowrap" v-html="cityState" />
                  </div>
                </div>
              </widget>
            </template>

          </div>

          <div class="mt-40 text-center">
            <btn pink wide value="Register" />
          </div>

        </container>

      </div>

    </div>

    <container id="event__widgets" class="is-last">
      <div class="flex flex-col-reverse xl:flex-row -mx-05">

        <div class="flex-initial xl:flex-auto">

          <template v-if="uid">
            <widget>
              <weather :uid="uid"/>
            </widget>
          </template>

          <template v-if="map">
            <widget headerClasses="bg-white">
                <template #header >
                  <template v-if="place || fullAddress">
                    <h3 v-if="place" v-html="place"/>
                    <p class="text-11px font-medium sm:text-13px" v-html="fullAddress"/>
                  </template>
                </template>
              <template #full>
                <div class="relative pb-2/3">
                  <app-map class="absolute inset-0" :longitude="map.longitude" :latitude="map.latitude"/>
                </div>
              </template>
            </widget>
          </template>

          <template v-if="schedule">
            <widget>
              <template #header>
                <h3>Event Schedule</h3>
              </template>
    
              <template v-for="item in schedule.data">
                <app-table :headers="schedule.headers" :data="item" class="w-full my-15"/>
              </template>

            </widget>
          </template>

        </div>

        <div class="flex-initial xl:w-150 xl:pl-10">

          <template v-if="sponsors">
            <widget>
              <template #header>
                <h3 class="font-bold">Sponsors</h3>
              </template>
              <div class="flex flex-row flex-wrap items-center justify-center">
                <template v-for="sponsor in sponsors">
                  <div class="p-30 xl:px-10 text-center">
                      <img class="w-150px max-w-full inline-block" :src="sponsor.sponsor_logo.url" :alt="sponsor.sponsor_logo.alt"/>
                  </div>
                </template>
              </div>
            </widget>
          </template>

        </div>
      </div>
    </container>
  </main>
</template>

<script>
import { formatDate } from "@/assets/helpers";
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
    data: null,
    uid: null,
  }),
  computed:{
    landingImage(){
      if (!this.data) return null
      return this.data.image.url || null
    },
    bannerImage(){
      if (!this.data || !this.data.banner_image.url) return null
      return {backgroundImage: `url(${this.data.banner_image.url})`}
    },
    eventTitle(){
      if (!this.data) return null
      return this.data.title || null
    },
    startDate(){
      if (!this.data || !this.data.start_date) return null
      return formatDate(this.data.start_date, 'dddd, mmmm dd, yyyy')
    },
    endDate(){
      if (!this.data || !this.data.end_date) return null
      return formatDate(this.data.end_date, 'dddd, mmmm dd, yyyy')
    },
    place(){
      if (!this.data) return null
      return this.data.place || null
    },
    cityState(){
      if (!this.data) return null
      let city = this.data.city || null
      let state = this.data.state || null
      return [city,state].filter(i => i !== null).join(', ')
    },
    fullAddress(){
      if (!this.data) return null
      let address =  this.data.address || null
      return [address,this.cityState].filter(i => i !== null).join(', ')
    },
    map(){
      if (!this.data) return null
      return this.data.map.longitude && this.data.map.latitude ? this.data.map : null
    },
    sponsors(){
      if (!this.data) return null
      return this.data.sponsors || null
    },
    schedule(){
      if (!this.data) return null
      return{
        headers:['time','main'],
        data:[
          [
            {time: '8:00am',main:'Intro Game'},
            {time: '8:00am',main:'Intro Game'},
            {time: '8:00am',main:'Intro Game'},
            {time: '8:00am',main:'Intro Game'},
            {time: '8:00am',main:'Intro Game'},
            {time: '8:00am',main:'Intro Game'},
            {time: '8:00am',main:'Intro Game'},
            {time: '8:00am',main:'Intro Game'}
          ],
          [
            {time: '8:00am',main:'Intro Game'},
            {time: '8:00am',main:'Intro Game'},
            {time: '8:00am',main:'Intro Game'},
            {time: '8:00am',main:'Intro Game'},
            {time: '8:00am',main:'Intro Game'},
            {time: '8:00am',main:'Intro Game'},
            {time: '8:00am',main:'Intro Game'},
            {time: '8:00am',main:'Intro Game'}
          ]
        ]
      }
    }
  }
};
</script>
