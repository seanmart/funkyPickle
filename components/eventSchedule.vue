<template lang="html">
  <section class="event-schedule block page-margin--right" v-if="events.length > 0">
    <header class="header--wrapper">
      <h4 class="title title--sm" v-html="data.primary.title"/>
      <btn class="link" type="black" link="/events">View All</btn>
    </header>
    <div class="content--wrapper">
      <template v-for="(evnt,i) in events.slice(0,data.primary.count)">
        <div class="event--wrapper">
          <div class="date--wrapper title--ft">
            <h3 class="day" v-html="evnt.date.getDate().toString().padStart(2, '0')"/>
            <h3 class="month" v-html="new Intl.DateTimeFormat('en-US', {month:'long'}).format(evnt.date)"/>
          </div>
          <div class="info--wrapper">
            <div class="text--wrapper">
              <h5 class="title--ft location" v-html="evnt.location"/>
              <p class="text--rg" v-html="evnt.description"/>
            </div>
            <div class="arrow--wrapper">
              <icon class="arrow" arrow/>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  props:{data:Object},
  computed: mapState({
    events: state => state.events || []
  })
}
</script>

<style lang="scss">
.event-schedule{

  .header--wrapper{

    margin-bottom: 3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .title{
      flex: 1 1 auto;
    }

    .link{
      flex: 0 0 25%;
    }

  }

  .event--wrapper{
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;
    color: $black;

    .date--wrapper{
      flex: 0 0 25%;
      padding: 2rem 0px;
      background: $pink;
      color: $lime;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .day{
        font-size: 6rem;
        line-height: .8;
      }

      .month{
        font-size: 2rem;
        text-transform: uppercase;
      }
    }

    .info--wrapper{
      flex: 1 1 auto;
      background: white;
      display: flex;
      flex-direction: row;
      padding: 3rem;

      .text--wrapper{
        flex: 1 1 100%;
      }

      .location{
        text-transform: uppercase;
        font-size: 3rem;
      }

      .arrow--wrapper{
        flex: 0 0 auto;

        .arrow{
          width: 3rem;
        }
      }
    }
  }

}
</style>
