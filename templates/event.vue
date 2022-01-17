<template lang="html">
  <main id="c-event">

    <section class="c-event-landing">
      <fancy-image class="c-image" :scale="1.3" :start="0" :key="data.image.url" :image="data.image.url" />
      <div class="c-logo--wrapper">
        <div class="c-logo" v-image:cover="data.logo.url" />
      </div>
    </section>

    <section class="c-event-info o-container">
      <text-scroll class="c-title--wrapper" :duration="45">
        <h1 v-if="data.title" class="t-header c-title" v-html="data.title" />
      </text-scroll>
      <div class="c-date--wrapper">
        <icon calendar class="c-date-icon" />
        <div class="c-date" v-html="">
          <span v-if="data.start_date" v-html="formatDate(data.start_date)"/>
          <span v-if="data.start_date && data.end_date" v-html="'&nbsp&nbsp–&nbsp&nbsp'"/>
          <span v-if="data.end_date" v-html="formatDate(data.end_date)"/>
        </div>
      </div>
    </section>

    <section class="c-event-header o-bottom">
      <sticky-header endTrigger="#c-event-content">
        <div class="c-header--wrapper">
          <div class="c-header-btns--wrapper o-container">
            <btn class="c-header-btn c-header-btn-left" knockout>Register</btn>
            <btn class="c-header-btn" knockout icon="facebook" />
            <btn class="c-header-btn" knockout icon="instagram" />
          </div>
        </div>
      </sticky-header>
    </section>

    <section id="c-event-content" class="c-event-content o-container o-top o-bottom">
      <div class="c-event-content--wrapper">
        <div class="c-column-main">

          <weather :uid="data.uid" />

          <location :place="data.place" :address="data.address" :city="data.city" :state="data.state" :uid="data.uid"/>

        </div>
        <div class="c-column-side">

          <sponsors/>

        </div>
      </div>
    </section>

  </main>
</template>

<script>
import { getDay, getMonth, getYear } from "@/assets/js/helpers";
import weather from '@/components/widgets/weather'
import sponsors from '@/components/widgets/sponsors'
import location from '@/components/widgets/location'
export default {
  name: "Event",
  components:{weather,sponsors,location},
  async asyncData({ $prismic, $bus, params, error, store, payload }) {

    let uid = params.event;

    if (store.state.events[uid]){
      return {data:store.state.events[uid]}
    }

    if(payload && payload.data){
      return {data:{...payload.data, uid }}
    }

    let res = await $prismic.api.getByUID("event", uid);
    if (res) {
      let data = { ...res.data, uid };
      store.commit("events", { uid, data });
      return {data}
    }

    error({ statusCode: 404, message: "Page not found" });

  },
  mounted(){
    this.$bus.$emit('LOADED')
  },
  data: () => ({
    data: null,
  }),
  methods: {
    formatDate(date) {
      if (!date) return;
      let year = getYear(date)
      let month = getMonth(date, "long");
      let day = getDay(date);
      return `${month} ${day}, ${year}`;
    },
  },
};
</script>

<style lang="scss">
#c-event {
  .c-event-landing {
    position: relative;
    height: 257px;
    margin-bottom: 7rem;
    @include dark-gradient(0);

    .c-logo--wrapper {
      position: absolute;
      z-index: 1;
      bottom:0px;
      left:0px;
      right:0px;
      transform: translateZ(0);
      height: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: $black;
    }
    .c-logo {
      width: 15rem;
      height: 15rem;
      border-radius: 50%;
      background-position: center center;
      box-shadow: 0px 2px 5px rgba($blue, 0.2);
    }
  }

  .c-event-info {
    padding: 5vw 0px;

    .c-title--wrapper {
      height: 5vw;
      margin-bottom: 3rem;
    }
    .c-title {
      font-size: 6vw;
      padding: 2vw;
    }
    .c-date--wrapper {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .c-date-icon {
      flex: 0 0 auto;
      height: 1.6rem;
      fill: $pink;
      margin-right: 1.6rem;
    }
    .c-date {
      flex: 0 0 auto;
      text-transform: uppercase;
      font-size: 2rem;
      font-weight: 600;
    }
  }

  .c-event-header {
    .c-header--wrapper {
      height: 80px;
      @include tropical-gradient;
      width: 100%;
    }
    .c-header-btns--wrapper {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .c-header-btn {
      margin-left: 1rem;
      &.c-header-btn-left {
        margin-right: auto;
        margin-left: 0px;
      }
    }
  }

  .c-event-content {

    .c-event-content--wrapper{
      display: flex;
      flex-direction: row;
      align-items: stretch;
      margin: 0px -1rem;
    }

    .c-column-main{
      flex: 0 0 66.666%;
    }
    .c-column-side{
      flex: 1 1 auto;
    }
  }

  @media screen and (max-width:1000px){
    .c-event-content{
      .c-event-content--wrapper{
        flex-direction: column;
      }
    }
  }

  @media screen and (max-width: $tablet) {
    .c-event-info {
      padding: 5rem 0px;

      .c-title--wrapper {
        height: 5rem;
        margin-bottom: 1rem;
      }
      .c-title {
        font-size: 5rem;
        padding: 2rem;
      }
    }
  }
}
</style>
