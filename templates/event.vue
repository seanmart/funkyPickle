<template lang="html">
  <main id="c-event" :key="$route.path">
    <section class="c-event-landing">
      <div class="c-image">
        <fancy-image :scale="1.3" :start="0" :image="data.image.url" />
      </div>
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
        <span class="c-date"> {{ formatDate(data.start_date) }} {{ data.start_date && data.end_date ? " - " : "" }} {{ formatDate(data.end_date) }}</span>
      </div>
    </section>
    <section class="c-event-header">
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
      <weather :uid="data.uid" />
    </section>
  </main>
</template>

<script>
import { getDay, getMonth } from "@/assets/js/helpers";
export default {
  name: "Event",
  async asyncData({ $prismic, $axios, params, error, store, payload }) {
    store.commit("loading", true);

    let uid = params.event;

    if (payload && payload.data) return { data: payload.data };
    if (store.state.events[uid]) return { data: store.state.events[uid] };

    let res = await $prismic.api.getByUID("event", uid);
    if (res) {
      let data = { ...res.data, uid };
      store.commit("events", { uid, data });
      return { data };
    }

    error({ statusCode: 404, message: "Page not found" });
  },
  data: () => ({
    data: null,
  }),
  mounted() {
    this.$nextTick(() => this.$store.dispatch("loadingComplete"));
  },
  methods: {
    formatDate(date) {
      if (!date) return;
      let month = getMonth(date, "long");
      let day = getDay(date);
      return `${month} ${day}`;
    },
  },
};
</script>

<style lang="scss">
#c-event {
  .c-event-landing {
    .c-image {
      height: 257px;
      @include dark-gradient(0);
    }
    .c-logo--wrapper {
      height: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 1;
      background: $black;
      margin-bottom: 5rem;
    }
    .c-logo {
      width: 12rem;
      height: 12rem;
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
      font-size: 1.6rem;
      font-weight: 500;
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
    min-height: 150vh;
  }

  @media screen and (max-width: $tablet) {
    .c-event-info {
      .c-title--wrapper {
        height: 5rem;
      }
      .c-title {
        font-size: 5rem;
        padding: 2rem;
      }
    }
  }
}
</style>
