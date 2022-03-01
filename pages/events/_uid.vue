<template lang="html">
  <main id="page" class="event">

    <template v-if="data.banner_image.url">
    <div class="h-300 md:h-100 relative">
      <div class="absolute top-0 left-0 right-0 -bottom-100">
        <landing center class="event-landing pb-0" :image="data.image.url "/>
      </div>
    </div>
  </template>

    <template v-else>
      <landing center class="h-300 md:h-200" :image="data.image.url "/>
    </template>

    <container noTop>

      <img class="rounded-lg shadow-bottom" :src="data.banner_image.url" :alt="data.banner_image.alt">

      <div class="mb-50" :class="{'mt-50':data.banner_image.url }">
        <h1 v-html="this.data.title" class="font-header uppercase font-bold text-40 text-center leading-09 max-w-30ch mx-auto"/>
      </div>

      <div class="flex flex-row flex-wrap -m-05 lg:text-12 text-center">

        <div v-if="timeData" class="flex flex-col flex-auto">
          <widget class="m-05">
              <p v-if="timeData.start" class="label" v-html="'starts:'"/>
              <div class="inline-flex flex-row items-center mt-5px">
                <icon-btn lime small icon="calendar" class="mr-10px"/>
                <h3 v-if="timeData.start" v-html="timeData.start" class="font-semibold"/>
              </div>
              <p v-if="timeData.end" class="label" v-html="'ends:'"/>
              <div class="inline-flex flex-row items-center mt-5px">
                <icon-btn lime small icon="calendar" class="mr-10px"/>
                <h3 v-if="timeData.end" v-html="timeData.end" class="font-semibold"/>
              </div>
          </widget>
        </div>

        <widget v-if="weatherData" class="m-05 flex-auto flex flex-row justify-center items-center">
          <div class="flex-initial self-stretch text-center bg-lime py-10px px-20px rounded-lg flex flex-row items-center">
            <icon :icon="weatherData.icon" class="h-20 mr-20px"/>
            <h3 v-html="weatherData.temp" class="font-header font-bold uppercase text-45 lg:text-40 leading-10"/>
          </div>
          <div class="flex-initial px-20px">
            <p class="label" v-html="'feels like:'"/>
            <h3 v-html="weatherData.feels" class="font-semibold"/>
            <p class="label" v-html="'description:'"/>
            <h3 v-html="weatherData.desc" class="font-semibold"/>
          </div>
        </widget>

        <widget v-if="locationData" class="flex-auto w-full m-05 flex flex-col xl:flex-row xl:items-center">
          <div class="flex-auto flex flex-row items-center justify-center">
            <div class="flex-initial">
              <p v-html="'location:'" class="label"/>
              <div class="inline-flex flex-row items-center mt-5px mb-05">
                <icon-btn lime small icon="wayfinder" class="mr-10px"/>
                <h3 v-html="locationData.place" class="font-bold leading-10 text-20 lg:text-15"/>
              </div>
              <p v-html="locationData.address" class="text-14px"/>
              <p v-html="locationData.address2" class="text-14px"/>
            </div>
          </div>
          <div class="flex-grow flex-shrink-0 min-w-1/2 mt-20px xl:ml-20px xl:mt-0 rounded-md overflow-hidden">
            <app-map :longitude="locationData.longitude" :latitude="locationData.latitude" class="w-full h-300px"/>
          </div>
        </widget>

      </div>


    </container>

    <div class="h-80px relative z-30" ref="headerSpacer">
      <container noTop noBottom class="flex flex-row justify-center items-center h-80px" ref="header">
        <btn pink wide value="Register" class="mx-05"/>
      </container>
    </div>

    <container last ref="content">

      <div class="flex flex-col lg:flex-row" v-if="content">
        <div class="flex-auto" ref="innerContent">
          <template v-for="(section,i) in content">
            <div :id="section.id" :class="{'pb-50':i < content.length - 1}">
              <section-title :value="section.label"/>
              <div class="h-200">
                {{section.label}} content
              </div>
            </div>
          </template>
        </div>
        <div class="flex-initial ml-30 w-130 hidden lg:block" ref="sidebarSpacer">
          <aside ref="sidebar">
            <template v-for="(section,i) in content">
              <a
              :id="`${section.id}-button`"
              v-html="section.label"
              :href="`#${section.id}`"
              @click.prevent="scrollTo(`#${section.id}`,`${section.id}-button`)"
              class="sidebar-button block py-05 pl-10 bg-white rounded-full shadow-bottom font-semibold"
              :class="{'mt-05':i}"
              />
            </template>
          </aside>
        </div>
      </div>

      <div v-else class="text-center">
        Event Content coming soon!
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
    data: null,
    uid: null,
    cancelSectionAnim: false
  }),
  mounted(){
    this.$nextTick(this.init)
  },
  destroyed(){
    this.shAnim && this.shAnim.kill()
    this.sbAnim && this.sbAnim.kill()
    this.sectionAnims && this.sectionAnims.forEach(a => a.kill())
  },
  methods:{
    init(){
      this.initScrollTriggers()
    },
    initScrollTriggers(){
      if (!this.content) return
      let header = this.$refs.header.$el
      let sidebar = this.$refs.sidebar
      let content = this.$refs.content.$el
      let innerContent = this.$refs.innerContent

      this.shAnim = ScrollTrigger.create({
        trigger: content,
        start: ()=> `top top+=${header.offsetHeight}`,
        end: ()=> `bottom top+=${header.offsetHeight}`,
        pin:header,
        pinSpacing: false,
        pinSpacer: this.$refs.headerSpacer,
        invalidateOnRefresh:true,
        onEnter:()=> {
          header.classList.add('bg-white','shadow-bottom')
          this.$bus.$emit('MOBILE_HEADER_DISABLED',true)
        },
        onLeaveBack:()=>{
          header.classList.remove('bg-white','shadow-bottom')
          this.$bus.$emit('MOBILE_HEADER_DISABLED',false)
        }
      })

      this.sbAnim = ScrollTrigger.create({
        trigger: content,
        start: ()=> `top top+=${header.offsetHeight + 50 - innerContent.offsetTop}`,
        end: ()=> {
          let pt = header.offsetHeight + 50
          let pb = content.offsetHeight - innerContent.offsetTop - innerContent.offsetHeight
          return `bottom top+=${pt + sidebar.offsetHeight + pb}`
        },
        pin:sidebar,
        pinSpacing: false,
        pinSpacer: this.$refs.sidebarSpacer,
        invalidateOnRefresh:true
      })

      if(this.content){
        this.sectionAnims = []
        this.content.forEach((s,i) => {
          let btn = document.getElementById(`${s.id}-button`)
          this.sectionAnims.push(
            ScrollTrigger.create({
            trigger: `#${s.id}`,
            start: i == 0 ? 'top bottom' : 'top top+=200',
            end: i == this.content.length - 1 ? 'bottom top-=200' : 'bottom top+=200',
            onToggle:()=> !this.cancelSectionAnim && btn.classList.toggle('active')
          }))
        })
      }
    },
    scrollTo(id,sender){
      this.content.forEach(c => {
        let btnId = `${c.id}-button`
        document.getElementById(btnId).classList[btnId == sender ? 'add' : 'remove']('active')
      })
      this.cancelSectionAnim = true
      gsap.to('#scroller', {
        duration: .75,
        ease: 'power2.out',
        scrollTo:{y:id,offsetY:this.$refs.header.$el.offsetHeight + 40},
        onComplete:()=> this.cancelSectionAnim = false
      });
    }
  },
  computed:{
    ...mapState(['weather']),
    content(){
      return [
        {label:'Sponsors',id:'sponsors'},
        {label:'Entertainment',id:'entertainment'},
        {label:'Center Court',id:'centercourt'},
        {label:'Vendors',id:'vendors'},
        {label:'Activities',id:'activities'},
        {label:'Lodging',id:'lodging'}
      ]
    },
    weatherData(){
      let data = this.weather[this.uid]
      if (!data) return null
      return {
        icon: data.weather[0].icon,
        temp: getTemp(data.main.temp),
        feels: getTemp(data.main.feels_like),
        desc: data.weather[0].main
      }
    },
    locationData(){
      let data = {}
      let address = []

      if (this.data.map.latitude) data.latitude = this.data.map.latitude
      if (this.data.map.longitude) data.longitude = this.data.map.longitude
      if (this.data.address) data.address = this.data.address
      if(this.data.city) address.push(this.data.city)
      if(this.data.state) address.push(this.data.state)
      if (this.data.place) data.place = this.data.place
      if(address.length > 0) data.address2 = address.join(', ')

      return Object.keys(data).length > 0 ? data : null
    },
    timeData(){
      let data = {}
      if(this.data.start_date) data.start = formatDate(this.data.start_date, 'dddd, mmmm dd, yyyy')
      if(this.data.end_date) data.end = formatDate(this.data.end_date, 'dddd, mmmm dd, yyyy')
      return Object.keys(data).length > 0 ? data : null
    }
  }
};
</script>

<style lang="css">
  .event .event-landing{
    height:100%;
  }
  .event .label{
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    opacity: .4;
    letter-spacing: 2px;
    margin-top: 8px;
  }
  .event .label:first-child{
    margin-top:0px;
  }
  .event .sidebar-button{
    transition: background .25s, color .25s;
  }
  .event .sidebar-button:hover{
    outline: 2px solid theme('colors.black');
  }
  .event .sidebar-button.active{
    background: theme('colors.black');
    color: theme('colors.white');
  }

</style>
