<template lang="html">
  <main id="c-event" :key="$route.path">

    <section class="c-event__intro">
      <landing class="c-event__landing" :image="data.image.url" />
      <div class="c-event__logo--wrapper u-center-row">
        <event-logo class="c-event__logo" :image="data.logo.url" :start="data.start_date" :end="data.end_date"/>
      </div>
      <div class="c-event__info u-py-xxl o-container">
        <text-scroll>
          <h1 class="c-event__title t-header u-px-lg" v-html="data.title" />
        </text-scroll>
      </div>
    </section>

    <section id="c-event-content">
      <sticky-header trigger="#c-event-content" headerClass="c-event__header o-container u-py-sm u-center-row">
        <btn class="c-header-btn__register" to="/" knockout value="Register"/>
        <btn knockout icon="facebook"/>
        <btn class="u-ml-sm" knockout icon="instagram"/>
      </sticky-header>
      <div class="c-event__columns o-container o-space">
        <div class="c-event__column-main">
          <dates-widget :start="data.start_date" :end="data.end_date"/>
          <location-widget :map="data.map" />
          <weather-widget :uid="data.uid"/>
        </div>
        <div class="c-event__column-side">
          <sponsors-widget/>
        </div>
      </div>
    </section>

  </main>
</template>

<script>
export default {
  async asyncData({ $prismic, $bus, params, error, store, payload }) {
    let uid = params.uid;

    if (store.state.events[uid]) {
      return { data: store.state.events[uid] };
    }

    if (payload && payload.data) {
      return { data: { ...payload.data, uid } };
    }

    let res = await $prismic.api.getByUID("event", uid);
    if (res) {
      let data = { ...res.data, uid };
      store.commit("EVENT", { key:uid, data });
      return { data };
    }

    error({ statusCode: 404, message: "Page not found" });
  },
  mounted() {
    this.$bus.$emit("LOADED");
  },
  data: () => ({
    data: null
  })
}
</script>

<style lang="scss">
  #c-event{
    .c-event__intro{

    }
    .c-event__landing{
      height: 316px;
    }
    .c-event__logo--wrapper{
      margin-bottom: 6rem;
      height: 0px;
    }
    .c-event__logo{
      height: 12rem;
      width:12rem;
    }
    .c-event__title{
      font-size: 6rem;
      letter-spacing: -.03rem;
    }
  }
  #c-event-content{
    .c-event__header{
      @include tropical-gradient;
    }
    .c-header-btn__register{
      margin-right: auto;
    }

    .c-event__columns{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
    }

    @media(min-width: $screen-lg){

      .c-event__columns{
        flex-direction: row;
      }

      .c-event__column-main{
        flex: 1 1 auto;
      }

      .c-event__column-side{
        flex: 0 1 30%;
        min-width: 150px;
      }
    }
  }
</style>
