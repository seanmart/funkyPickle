<template lang="html">
  <main id="page" class="event">

    <div class="bg-white shadow-bottom" v-if="data">
      <event-landing :data="data"/>
      <event-header :data="data" :colors="colors" trigger="#content" class="pb-40"/>
    </div>

    <div id="content" ref="content">

      <container>
        <div class="flex flex-row flex-wrap -m-05 lg:text-12 text-center font-bold" :style="{fill:colors.secondary}">
          <event-dates :data="data" class="flex-auto m-05"/>
          <event-weather :uid="uid" class="flex-auto m-05"/>
          <event-location :data="data" class="flex-auto w-full m-05"/>
          <event-sponsors :data="data" class="flex-auto w-full m-05"/>
        </div>
      </container>

      <container noTop last id="sections">
        <div class="flex flex-col lg:flex-row" v-if="sections.length > 0">

          <div class="flex-auto">
            <template v-for="(section,i) in sections">
              <div :id="section.id" class="pb-40">
                <section-title :value="section.label" :color1="colors.primary" :color2="colors.secondary"/>
                <component :is="section.component" :data="section" :colors="colors"/>
              </div>
            </template>
          </div>

          <div class="flex-initial ml-30 hidden xl:block">
            <event-sidebar trigger="#sections" :sections="sections" :colors="colors" :offset="150"/>
          </div>

        </div>

        <div v-else class="text-center font-header uppercase font-bold text-pink text-30">
          Event Content coming soon!
        </div>

      </container>

    </div>

  </main>
</template>

<script>
import {camelize,formatSnakeToProper,random} from "@/assets/helpers";
import config from '@/tailwind.config.js'

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
    uid: null
  }),
  mounted(){
    let colors = [this.colors.primary,this.colors.secondary]
    gsap.to('#background .strip',.5,{fill:()=> colors[random(0,1)]})
  },
  computed:{
    colors(){
      return{
        primary: this.data.primary || config.theme.colors.pink,
        secondary: this.data.secondary ||  config.theme.colors.green
      }
    },
    sections(){
      return this.data.body.map(s=>({
        ...s,
        component: `event-${camelize(s.slice_type)}`,
        id: s.slice_type.replaceAll('_','-'),
        label:formatSnakeToProper(s.slice_type),
      }))
    },
  }
};
</script>
