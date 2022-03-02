<template lang="html">
  <main id="page" class="event">

    <div class="bg-white shadow-bottom" v-if="data">
      <landing :data="data"/>
      <sticky-header :data="data" trigger="#content" class="pb-40"/>
    </div>

    <div id="content" ref="content">

      <container noY inner>
        <div class="flex flex-row flex-wrap -m-05 lg:text-12 text-center font-bold">
          <dates :data="data" class="flex-auto m-05"/>
          <weather :uid="uid" class="flex-auto m-05"/>
          <location :data="data" class="flex-auto w-full m-05"/>
          <sponsors :data="data" class="flex-auto w-full m-05"/>
        </div>
      </container>

      <container noTop last id="sections">
        <div class="flex flex-col lg:flex-row" v-if="sections.length > 0">

          <div class="flex-auto">
            <template v-for="(section,i) in sections">
              <div :id="section.id" class="pb-40">
                <section-title :value="section.label"/>
                <component :is="section.component" :data="section" class="h-200px"/>
              </div>
            </template>
          </div>

          <div class="flex-initial ml-30 w-130 hidden lg:block">
            <sidebar trigger="#sections" :sections="sections" :offset="150"/>
          </div>

        </div>

        <div v-else class="text-center">
          Event Content coming soon!
        </div>

      </container>

    </div>

  </main>
</template>

<script>
import activities from '@/templates/event/activities'
import centerCourt from '@/templates/event/centerCourt'
import dates from '@/templates/event/dates'
import entertainment from '@/templates/event/entertainment'
import landing from '@/templates/event/landing'
import location from '@/templates/event/location'
import lodging from '@/templates/event/lodging'
import sidebar from '@/templates/event/sidebar'
import sponsors from '@/templates/event/sponsors'
import stickyHeader from '@/templates/event/stickyHeader'
import vendors from '@/templates/event/vendors'
import weather from '@/templates/event/weather'
import {camelize,formatSnakeToProper} from "@/assets/helpers";

export default {
  components:{
    activities,
    centerCourt,
    entertainment,
    landing,
    location,
    lodging,
    sidebar,
    sponsors,
    stickyHeader,
    dates,
    vendors,
    weather
  },
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
  computed:{
    sections(){
      return this.data.body.map(s=>({
        ...s,
        component: camelize(s.slice_type),
        id: s.slice_type.replaceAll('_','-'),
        label:formatSnakeToProper(s.slice_type)
      }))
    },
  }
};
</script>
