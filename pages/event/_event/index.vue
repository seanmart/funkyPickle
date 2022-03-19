<template lang="html">
  <main id="event" ref="page">
    <div class="bg-white relative z-50">

      <div class="relative z-10 pt-400px md:pt-200px">
        <div class="absolute inset-0 -bottom-100px md:-bottom-100 overflow-hidden">
          <Landing :image="data.background" />
        </div>
      </div>

      <Container noTop noBottom class="relative z-20">
        <prismic-image :field="data.banner" class="rounded-lg shadow-b-blue"/>
      </Container>

      <Container>
          <h1 v-html="data.title" class="font-header font-bold text-center uppercase leading-09 text-30 md:text-50"/>
      </Container>

      <StickyHeader
        scrollId="#event"
        :items="links"
        :backgroundStyles="{background:data.primary || null}"
        ref="stickyHeader"
        mobileLabel="Event Links"
      />

    </div>

    <Container noBottom class="relative z-10" :style="{fill:data.primary}">
      <div class="-m-05 flex flex-row flex-wrap">
        <EventDate :date="data.date" class="m-05 flex-auto"/>
        <EventWeather :uid="uid" class="m-05 flex-auto"/>
        <EventLocation class="m-05 flex-initial w-full" :address="data.address" :map="data.map" :city="data.city" :state="data.state" :venue="data.venue"/>
      </div>
    </Container>

    <Container class="relative z-10" :class="{'flex flex-row': slices}" ref="slices">
      <template v-if="slices">
        <div class="flex-auto">
          <Slices :slices="slices" class="page-content" inline/>
        </div>

        <div class="flex-initial hidden xl:block">

          <aside ref="sidebar" class="flex flex-col pl-20">
            <template v-for="(item,i) in slices">
              <button
                v-if="item.primary.title && item.id"
                v-html="item.primary.title"
                :data-id="item.id"
                @click="()=>scrollTo(item.id)"
                class="button bg-pink text-white"
                :class="{'mb-05':i < slices.length - 1}"
                />
            </template>
          </aside>

        </div>
      </template>
      <div v-else class="text-center">
        <h1 class="font-bold text-20 leading-12" :style="{color: data.primary}">More Information Coming Soon!</h1>
      </div>
    </Container>

    </div>
  </main>
</template>

<script>
import {random} from '@/assets/helpers'
import config from '@/tailwind.config.js'
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

    gsap.set('#event .bg-pink',{background: this.data.primary})
    gsap.set('#event .bg-green',{background: this.data.secondary})

    if (this.slices){
      let sticky = this.$refs.stickyHeader.$el
      let sidebar = this.$refs.sidebar

      this.sidebarAnim = ScrollTrigger.create({
        trigger: this.$refs.slices.$el,
        start:()=>`top top+=${sticky.offsetHeight}`,
        end: ()=> `bottom top+=${sidebar.offsetHeight + sticky.offsetHeight + (this.getSpace() * 2)}`,
        pin: this.$refs.sidebar,
        pinSpacing: false,
        invalidateOnRefresh:true
      })

    }
  },
  destroyed(){
    this.sidebarAnim && this.sidebarAnim.kill()
  },
  computed:{
    slices(){
      if(!this.data.slices || this.data.slices.length == 0) return null

      let slices = []
      this.data.slices.forEach((s,i) => {
        (s.primary.publish || s.primary.publish == null) && slices.push({...s,id:`${s.slice_type}-${i}`})
      })
      return slices
    },
    links(){
      if (this.data.links.length == 0) return [
        {label:'Registration Coming Soon'}
      ]
      return this.data.links.map(link => {
        return {
          label: link.label,
          onClick: ()=> this.$router.push(`/event/${this.uid}/${link.link.uid}`)
        }
      })
    }
  },
  methods:{
    getSpace(){
      let space = parseInt(config.theme.spacing.space)
      let size = window.innerWidth >= parseInt(config.theme.screens.md) ? 'desktop' : 'mobile'
      let rem = parseInt(config.theme.fontSize[size])
      return space * rem
    },
    scrollTo(id){
      let el = document.getElementById(id)
      let offset = this.$refs.stickyHeader.$el.offsetHeight + this.getSpace() - 5
      gsap.to(window,1,{ease: 'power2.out', scrollTo:{y:el,offsetY:offset}})
    }
  }
}
</script>

<style lang="css">
  #event .page-content > div{
    margin-top: theme('spacing.space')
  }
  #event .page-content > div:first-child{
    margin-top: 0px;
  }
</style>
