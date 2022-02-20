<template lang="html">
  <main id="page">
    <template v-if="data">
      <big-ball class="pt-space"/>
      <!-- <intro :title="data.title" /> -->
      <event-list :link="false" :title="theTitle" class="is-last" />
    </template>
  </main>
</template>

<script>
export default {
  async asyncData({ store, route, $prismic }) {
    let res = null;

    if (!store.state.pages.events) {
      res = await $prismic.api.getSingle("events");
      res && store.commit("PAGE", ["events", res.data]);
    }
    let data = store.state.pages.events || null;
    if (data) return { data };
  },
  data: () => ({
    data: {},
  }),
  computed:{
    theTitle(){
      return this.data.title.map((a,i)=> a.text).join(' ')
    }
  }
};
</script>
