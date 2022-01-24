<template lang="html">
  <main id="c-event" class="o-container-wide">
    <landing :image="data.image" :logo="data.logo"/>
    <info :title="data.title" :start="data.start_date" :end="data.end_date"/>
    <toolbar endTrigger="#c-event-content"/>

    <section id="c-event-content" class="c-event-content o-margins o-space">
      <div class="c-event-content--wrapper">
        <div class="c-column-main">
          <weather class="c-event-widget" :uid="data.uid" />
          <location class="c-event-widget" :data="data" />
        </div>
        <div class="c-column-side">
          <sponsors class="c-event-widget" />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import landing from '@/components/event/landing'
import info from '@/components/event/info'
import toolbar from '@/components/event/toolbar'
import weather from "@/components/widgets/weather";
import sponsors from "@/components/widgets/sponsors";
import location from "@/components/widgets/location";
export default {
  name: "Event",
  components: { landing, info, toolbar, weather, sponsors, location },
  async asyncData({ $prismic, $bus, params, error, store, payload }) {
    let uid = params.event;

    if (store.state.events[uid]) {
      return { data: store.state.events[uid] };
    }

    if (payload && payload.data) {
      return { data: { ...payload.data, uid } };
    }

    let res = await $prismic.api.getByUID("event", uid);
    if (res) {
      let data = { ...res.data, uid };
      store.commit("events", { uid, data });
      return { data };
    }

    error({ statusCode: 404, message: "Page not found" });
  },
  mounted() {
    this.$bus.$emit("LOADED");
  },
  data: () => ({
    data: null,
  })
};
</script>

<style lang="scss">
  #c-event-content{
    .c-event-content--wrapper{
      margin: -2vw;
      display: flex;
      flex-direction: column;
    }
    .c-event-widget{
      padding: 2vw;
    }

    @media screen and (min-width: $medium){

      .c-event-content--wrapper{
        margin: -.5rem;
        flex-direction: row;
      }
      .c-column-main{
        flex: 1 1 auto;
      }
      .c-column-side{
        flex: 0 0 30%;
      }
      .c-event-widget{
        padding: .5rem;
      }
    }
  }
</style>
