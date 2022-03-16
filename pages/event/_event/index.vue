<template lang="html">
  <main id="event">
    <div class="bg-white relative z-50">

      <div class="relative z-10 pt-400px md:pt-200px">
        <div class="absolute inset-0 -bottom-100px md:-bottom-100 overflow-hidden">
          <Landing :image="data.background" />
        </div>
      </div>

      <Container noTop noBottom class="relative z-20">
        <prismic-image :field="data.banner" class="rounded-lg shadow-b-blue"/>
      </Container>

      <Container noLeft noRight>
        <Marquee>
          <h1 v-html="data.title" class="font-header font-bold uppercase leading-09 text-40 md:text-50 px-20"/>
        </Marquee>
      </Container>

      <StickyHeader scrollId="#event" :backgroundStyles="{background:data.primary || null}">
        <template v-if="data.forms.length > 0">
          <template v-for="form in data.forms">
            <nuxt-link
              class="button bg-white"
              :to="`/event/${uid}/${form.uid}`"
              :style="{color: data.primary}"
              v-html="form.label"
            />
          </template>
        </template>
        <h3 v-else class="font-header font-bold uppercase text-20 leading-09 text-white" v-html="'Registration Coming Soon'"/>
      </StickyHeader>

    </div>

    <Container class="relative z-10" :style="{fill:data.primary}">
      <div class="-m-05 flex flex-row flex-wrap">
        <EventDate :date="data.date" class="m-05 flex-auto"/>
        <EventWeather :uid="uid" class="m-05 flex-auto"/>
        <EventLocation class="m-05 flex-initial w-full" :address="data.address" :map="data.map" :city="data.city" :state="data.state" :venue="data.venue"/>
      </div>
    </Container>

    <Container class="relative z-10">
      slices
    </Container>

    </div>
  </main>
</template>

<script>
import {random} from '@/assets/helpers'
export default {
  async asyncData({redirect, store, params, $prismic, payload }) {
    let res = null;
    let uid = params.event;
    let data  = store.state.events[uid]

    if (payload){
      store.commit("EVENT", [uid, payload.data]);
      data = payload.data
    }

    if (!data) {
      res = await $prismic.api.getByUID("event", uid);
      if(res){
        store.commit("EVENT", [uid, res.data]);
        data = res.data
      }
    }

    if (data) return { data, uid };

    redirect('/404')
  },
  data: () => ({
    data: null,
    uid: null
  }),
  mounted(){
    this.$bus.$emit('LOADED')

    if(this.data.primary && this.data.secondary){
      let colors = [this.data.primary,this.data.secondary]
      gsap.to('#background .strip',.5,{fill:()=> colors[random(0,1)]})
    }
  },
  destroyed(){
    gsap.set('#background .strip',{clearProps:'all'})
  }
}
</script>

<style lang="css">
</style>
