<template lang="html">
<main id="c-event">

  <section class="c-event-landing">
    <div class="c-image" ref="img">
      <fancy-image :scale="1.3" :start="0" v-if="data.image.url" :image="data.image.url" />
    </div>
    <div class="c-logo--wrapper">
      <div class="c-logo" v-if="data.logo.url" v-image:cover="data.logo.url"/>
    </div>
  </section>

  <section class="c-event-info o-container o-top o-bottom">
    <text-scroll class="c-title--wrapper">
      <h1 class="t-header c-title" v-html="data.title"/>
    </text-scroll>
    <div class="c-date--wrapper">
      <icon calendar class="c-date-icon"/>
      <span class="c-date">{{formatDate(data.start_date)}} - {{formatDate(data.end_date)}}</span>
    </div>
  </section>

  <section class="c-event-register">
    <div class="c-register--wrapper">
      <btn class="c-register-btn" knockout>Register</btn>
    </div>
  </section>

  <section class="c-event-content o-container o-top o-bottom">
    content
  </section>

</main>
</template>

<script>
import {getDay,getMonth} from '@/assets/js/helpers'
export default {
  name: 'Event',
  data:()=>({data:[]}),
  async asyncData({ $prismic, params, error, store, payload }) {

    let id = params.event
    let data = null

    if (payload && payload.data) data = payload.data
    if (store.state.event[id])  data = store.state.page[id]

    if (!data){
      let results = await $prismic.api.getByUID('event',id)
      if (results){
        data = results.data
        store.commit('event',{id,data})
      }
    }

    if (data) return {data}
    error({ statusCode: 404, message: 'Page not found'})
  },
  mounted(){
    this.$store.commit('pageLoaded',true)
  },
  methods:{
    formatDate(date){
      let month = getMonth(date,'long')
      let day = getDay(date)
      return `${month} ${day}`
    }
  }
}
</script>

<style lang="scss">
#c-event{

  .c-event-landing{
    .c-image{
      height: 257px;
      @include dark-gradient(0);
    }
    .c-logo--wrapper{
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 1;
      @include dark-gradient(0);
      margin-bottom: 50px;
    }
    .c-logo{
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background-position: center center;
      box-shadow: 0px 2px 5px rgba($blue,.2);
    }
  }

  .c-event-info{
    .c-title--wrapper{
      height: 5vw;
      margin-bottom: 20px;
    }
    .c-title{
      font-size: 6vw;
      padding: 2vw;
    }
    .c-date--wrapper{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .c-date-icon{
      flex:0 0 auto;
      height: 20px;
      fill:$pink;
      margin-right: 20px;
    }
    .c-date{
      flex:0 0 auto;
      text-transform: uppercase;
      font-size: 2rem;
    }
  }

  .c-event-register{
    height: 80px;
    position: relative;
    .c-register--wrapper{
      @include cover;
      @include rainbow-gradient;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .c-event-content{
    min-height: 50vh;
  }



  @media screen and (max-width: $tablet){

    .c-event-info{
      .c-title--wrapper{
        height: 5rem;
      }
      .c-title{
        font-size: 5rem;
        padding: 2rem
      }
    }

  }
}
</style>
