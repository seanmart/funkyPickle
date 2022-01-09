<template lang="html">
  <div class="c-event-list" ref="events" v-reveal="{after}">
    <template v-for="(event,i) in data">
      <nuxt-link :to="`/events/${event.uid}`" class="c-event">
        <div class="c-date--wrapper">
          <h3 class="c-date c-month t-header" v-html="month(event.data.date)"/>
          <h3 class="c-date c-day t-header" v-html="day(event.data.date)"/>
          <div class="c-rainbow"/>
        </div>
        <div class="c-logo--wrapper">
          <div class="c-logo" v-image:cover="event.data.logo.url"/>
        </div>
        <div class="c-info--wrapper">
          <text-scroll class="c-title--wrapper">
            <h3 class="c-title t-header" v-html="event.data.title"/>
          </text-scroll>
          <span class="c-location"><icon wayfinder/>{{`${event.data.city}, ${event.data.state}`}}</span>
        </div>
        <div class="c-arrow--wrapper">
          <div class="c-bg">
            <div class="c-rainbow">
              <icon arrow/>
            </div>
          </div>
        </div>
      </nuxt-link>
    </template>
  </div>
</template>

<script>
export default {
  props:['data'],
  methods:{
    after(){
      let els = this.$refs.events.querySelectorAll('.c-event')

      for(let i = 0; i < els.length;i++){
        gsap.fromTo(els[i],1,{y:100,opacity:0},{y:0,opacity:1, ease:'power2.out',scrollTrigger:{
          trigger: els[i],
          start:'top bottom'
        }})
      }
    },
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
.c-event-list{

  $event-list-space: 2.5rem;
  $event-list-duration: .25s;

  .c-event{
    display: flex;
    flex-direction: row;
    align-items: stretch;
    box-shadow: 0px 2px 5px rgba($blue,.2);
    background: white;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: $event-list-space / 2;
    transition-property: box-shadow;
    transition-duration: $event-list-duration;
    cursor: pointer;
    &:last-child{
      margin-bottom: 0px;
    }
  }

  .c-rainbow{
    opacity: 0;
    transition-duration: $event-list-duration;
    transition-property: opacity;
    animation: animate-gradient-vertical 5s infinite;
    animation-play-state: paused;
    @include cover;
    @include rainbow-gradient(0);
    background-size: 100% 200%;
  }

  .c-date--wrapper{
    flex: 0 0 auto;
    padding: $event-list-space 0px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 10rem;
    @include dark-gradient;
  }
  .c-date{
    flex: 0 0 auto;
    color: white;
    position: relative;
    z-index: 1;
    &.c-month{font-size: 4.5rem}
    &.c-day{font-size: 5.5rem}
  }

  .c-logo--wrapper{
    flex: 0 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: $event-list-space;
    padding-right: 0px;
    min-width: 10rem;
  }
  .c-logo{
    flex: 0 0 auto;
    height: 8rem;
    width: 8rem;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0px 2px 5px rgba($blue,.2);
    transition-duration: $event-list-duration;
    transition-property: box-shadow;
  }

  .c-info--wrapper{
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    padding:$event-list-space;
  }
  .c-title--wrapper{
    flex: 1 1 auto;
  }
  .c-title{
    font-size: 4rem;
    padding: 0px 2rem;
    transition-duration: $event-list-duration;
    transition-property: color;
  }
  .c-location{
    flex: 0 0 auto;
    display: block;
    opacity: .5;
    transition-duration: $event-list-duration;
    transition-property: opacity;
    svg{
      height: 1.2rem;
      margin-right: 1rem;
      transition-duration: $event-list-duration;
      transition-property: fill;
    }
  }

  .c-arrow--wrapper{
    flex: 0 0 auto;
    width: $event-list-space * 2;
    position: relative;
    overflow: hidden;
  }
  .c-bg{
    @include cover;
    @include dark-gradient;
    transform: translateX(50%);
    transition-duration: $event-list-duration;
    transition-property: transform;
    .c-rainbow{
      display: flex;
      justify-content: center;
      align-items: center;
      fill:white;
    }
    svg{
      flex: 0 0 40%;
      transition-duration: $event-list-duration;
      transition-property: opacity;
    }
  }

  .c-event:hover,
  .c-event:active,
  .c-event:focus{
    outline: none;
    box-shadow: 0px 5px 8px rgba($blue,.3);

    .c-rainbow{
      opacity: 1;
      animation-play-state: running;
    }
    .c-logo{
      box-shadow: 0px 5px 8px rgba($blue,.3);
    }
    .c-bg{
      transform: translateX(0px);
    }
    .c-location{
      opacity: 1;
      svg{
        fill: $pink;
      }
    }
    .c-title{
      color: $purple;
    }
  }

  @media screen and (max-width: $mobile){

    .c-date--wrapper .c-rainbow{
      display: none;
    }
    .c-logo--wrapper{
      display: none;
    }
    .c-arrow--wrapper{
      width: $event-list-space * 1.5;
    }
    .c-info--wrapper .c-location{
      display: none;
    }
    .c-bg{
      transition: none;
      transform: none;
      .c-rainbow{
        opacity: 1;
      }
    }
  }
}
</style>
