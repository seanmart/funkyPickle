<template lang="html">
  <main>
    <div class="relative z-10 pt-200px">
      <div class="absolute inset-0 -bottom-100px md:-bottom-100 overflow-hidden">
        <Landing :image="event.background" />
      </div>
    </div>

    <Container noTop doubleBottom class="relative z-20">
      <div class="bg-white px-20 py-50 lg:px-50 shadow-b-blue rounded-lg">

        <h3 v-html="event.title" :style="{ color: event.primary }" class="text-15 font-bold text-center mb-20"/>

        <Marquee v-if="data.title">
          <h1 v-html="data.title" class="font-header font-bold uppercase leading-09 text-60 px-20"/>
        </Marquee>

        <div class="mt-space bg-white shadow-b-blue rounded-lg">
          <div class="flex flex-row">
            <template v-for="(slice,i) in slices">
              <button class="flex-auto py-10 px-20 text-white" :style="{ color: event.primary }"  v-html="`Step ${i+1}`"/>
            </template>
          </div>
          <div class="flex flex-row overflow-hidden p-40">
            <template v-for="slice in slices">
              <div class="flex-shrink-0 w-full">
                <ElementForm v-if="slice.slice_type == 'form'" :fields="slice.items" multiColumn/>
                <StripeForm v-else-if="slice.slice_type == 'stripe'" :data="slice"/>
              </div>
            </template>
          </div>

        </div>


      </div>

    </Container>
  </main>
</template>

<script>
import { random } from "@/assets/helpers";
export default {
  async asyncData({ payload, redirect, store, params, $prismic }) {

    let eventId = params.event;
    let formId = params.form;
    let event = store.state.events[eventId];
    let data = store.state.forms[formId];

    if (!event) {
      let res1 = await $prismic.api.getByUID("event", eventId);
      if (res1) {
        store.commit("EVENT", [eventId, res1.data]);
        event = res1.data;
      }
    }

    if (!data) {
      let res2 = await $prismic.api.getByUID('form',formId);
      if (res2) {
        store.commit("FORM", [formId, res2.data]);
        data = res2.data;
      }
    }

    if (data && event) return { data, event };
    redirect("/404");
  },
  data: () => ({
    data: {},
    event: {},
    status: null,
    step: 1
  }),
  mounted() {
    this.$bus.$emit("LOADED");
  },
  computed: {
    slices(){
      if(!this.data.slices) return []
      let slices = []
      this.data.slices.forEach((s,i) => {
        (s.primary.publish || s.primary.publish == null) && slices.push(s)
      })
      return slices
    },
    fields() {
      return this.data.slices.map((f) => f.primary);
    },
    link() {
      let link = this.event.links.find((l) => l.link.uid == this.$route.params.form);
      return link || {};
    },
  },
  methods: {

  },
};
</script>
