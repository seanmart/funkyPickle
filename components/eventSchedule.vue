<template lang="html">
  <section class="c-event-schedule o-container o-top o-bottom">

    <h2 class="t-headline-rg u-gap-btm-rg" v-html="data.primary.title"/>

    <template v-for="(event,i) in events.slice(0,data.primary.count)">

      <div class="c-event">

        <div class="c-event-date--wrapper">
          <h3 class="c-event-date month t-header" v-html="month(event.data.date)"/>
          <h3 class="c-event-date day t-header" v-html="day(event.data.date)"/>
          <div class="c-event-rainbow c-event-date-bar"/>
        </div>

        <div class="c-event-logo--wrapper" v-if="event.data.logo.url">
          <div class="c-event-logo" v-image:cover="event.data.logo.url"/>
        </div>

        <div class="c-event-info--wrapper">
          <div class="c-event-info-fade"/>
          <text-scroll>
            <h3 class="c-event-info-title t-header" v-html="event.data.title"/>
          </text-scroll>
          <span class="c-event-location"><icon wayfinder/>{{`${event.data.city}, ${event.data.state}`}}</span>
        </div>

        <div class="c-event-link--wrapper">
            <div class="c-event-link-bar--wrapper">
              <div class="c-event-rainbow c-event-link-bar">
                <icon arrow/>
              </div>
            </div>
        </div>

        <nuxt-link class="c-event-link" :to="`/events/${event.uid}`"/>

      </div>

    </template>

    <btn class="u-gap-top-rg" to="/events" rainbow arrow>view all events</btn>

  </section>
</template>

<script>
import queries from '@/assets/js/queries'
let name = "eventSchedule"

export default {
  props:['data'],
  data:()=>({events:[]}),
  async fetch(){
    if (!this.$store.state.components[name]){
      let results = await this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'event'),{'graphQuery':queries.events})
      results && this.$store.commit('component',{name,data: results.results})
    }
    this.events = this.$store.state.components[name]
  },
  methods:{
    day(date){
      date = new Date(`${date}T00:00:00-07:00`)
      return date.getDate().toString().padStart(2, '0')
    },
    month(date){
      date = new Date(`${date}T00:00:00-07:00`)
      return new Intl.DateTimeFormat('en-US', {month:'short'}).format(date)
    }
  }
}
</script>

<style lang="scss">

.c-event-schedule{
  $event-space: 2.5rem;

  .c-event{
    display: flex;
    background: white;
    margin-bottom: $event-space / 3;
    box-shadow: 0px 2px 5px rgba($blue,.2);
    transition: box-shadow .25s;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
  }

  .c-event-date--wrapper{
    flex: 0 0 auto;
    padding: $event-space;
    color:white;
    text-align: center;
    position: relative;
    @include dark-gradient;
    .c-event-date{
      width: 8rem;
      position: relative;
      z-index: 1;
      &.month{font-size: 4.5rem}
      &.day{font-size: 5.5rem}
    }

    .c-event-date-bar{
      @include cover;
    }
  }

  .c-event-logo--wrapper{
    flex: 0 0 auto;
    padding: $event-space;
    padding-right: $event-space / 2;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .c-event-logo{
      width: 8rem;
      padding-bottom: 100%;
      border-radius: 50%;
      box-shadow: 0px 2px 5px rgba($blue,.2);
      transition: transform .25s;
    }
  }

  .c-event-info--wrapper{
    flex: 1 1 auto;
    padding: $event-space $event-space / 3;
    position: relative;
    display: flex;
    flex-direction: column;
    .c-event-info-fade{
      @include cover;
      z-index: 1;
      background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 85%, rgba(255,255,255,1) 95%);
    }
    .c-event-info-title{
      font-size: 4rem;
      padding: 0px 2rem;
      transition: color .25s;
    }
    .c-event-location{
      opacity: .5;
      transition: opacity .25s;
      svg{
        display: inline-block;
        height: 1.3rem;
        margin-right: 1rem;
        transition: fill .25s;
      }
    }
  }

  .c-event-link--wrapper{
    flex: 0 0 auto;
    width: $event-space * 1.5;
    .c-event-link-bar--wrapper{
      @include dark-gradient;
      width: 100%;
      height: 100%;
      transform: translateX(50%);
      transition: transform .25s;
    }
    .c-event-link-bar{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
    svg{
      fill: white;
      width: 50%;
    }
  }

  .c-event-rainbow{
    @include rainbow-gradient(0);
    background-size: 100% 200%;
    opacity: 0;
    transition: opacity .25s;
    animation: animate-gradient-vertical 5s infinite;
  }

  .c-event-link{
    @include cover;
    z-index: 1;
  }

  .c-event:hover{
    box-shadow: 0px 5px 8px rgba($blue,.2);
    .c-event-date--wrapper{

      animation: animate-gradient-vertical 5s infinite;
    }
    .c-event-logo--wrapper{
      .c-event-logo{
        transform: scale(1.1);
      }
    }
    .c-event-info--wrapper{
      .c-event-info-title{
        color: $purple;
      }
      .c-event-location{opacity: 1;}
      svg{fill: $pink}
    }
    .c-event-link-bar--wrapper{
      transform: translateX(0px);
    }
    .c-event-rainbow{
      opacity: 1;
    }
  }
}
</style>
