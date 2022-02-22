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

          <container noTop noBottom>
            <div class="mt-40 text-center">
              <btn pink wide value="Register" />
            </div>
          </container>

      </div>

    </div>

    <container id="event__widgets" class="is-last">
      <div class="flex flex-col-reverse xl:flex-row -mx-05">
        <div class="flex-initial xl:flex-auto">

          <widget>
            <weather :uid="uid"/>
          </widget>

          <widget headerClasses="bg-white">
            <template #header >
              <h3 v-html="`${data.place}`"/>
              <p class="text-11px font-medium sm:text-13px" v-html="`${data.address}, ${data.city}, ${data.state}`"/>
            </template>
            <template #full>
              <div class="relative pb-2/3">
                <app-map class="absolute inset-0" :longitude="data.map.longitude" :latitude="data.map.latitude"/>
              </div>
            </template>
          </widget>

          <widget>
            <template #header>
              <h3>Event Schedule</h3>
            </template>

            <template v-for="item in tableData.data">
              <app-table :headers="tableData.headers" :data="item" class="w-full my-15"/>
            </template>

          </widget>

        </div>

        <div class="flex-initial xl:w-150 xl:pl-10">

          <widget>
            <template #header>
              <h3 class="font-bold">Sponsors</h3>
            </template>
            <div class="flex flex-row flex-wrap items-center justify-center">
              <template v-for="sponsor in data.sponsors">
                <div class="p-30 xl:px-10 text-center">
                    <img class="w-150px max-w-full inline-block" :src="sponsor.sponsor_logo.url" :alt="sponsor.sponsor_logo.alt"/>
                </div>
              </template>
            </div>
          </widget>

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
    data: [],
    uid: null,
    headerActive: false,
  }),
  computed:{
    tableData(){
      return{
        headers:[
          'time',
          'main'
        ],
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
  },
  methods:{
    formatDate
  }
};
</script>
