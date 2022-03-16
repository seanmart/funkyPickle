<template lang="html">
  <main>
    <div class="relative z-10 pt-400px md:pt-200px">
      <div class="absolute inset-0 -bottom-100px md:-bottom-100 overflow-hidden">
        <Landing :image="eventData.background" />
      </div>
    </div>

    <Container noTop doubleBottom class="relative z-20">
      <div class="bg-white px-20 py-50 lg:px-50 shadow-b-blue rounded-lg">

        <h3
          v-html="eventData.title"
          :style="{ color: eventData.primary }"
          class="text-15 font-bold text-center mb-20"
        />

        <Marquee v-if="form.label">
          <h1 v-html="form.label" class="font-header font-bold uppercase leading-09 text-60 px-20"/>
        </Marquee>

        <div class="overflow-hidden mt-space">
          <div class="flex flex-row ">
            <div class="w-full flex-shrink-0">
              <DataForm v-if="formData.action" id="form" multiColumn :fields="fields"/>
            </div>
            <div class="w-full flex-shrink-0">
              <StripeForm/>
            </div>
          </div>

          <div class="mt-20 text-center">
            <button v-html="'Prev'" class="button button-disabled bg-pink text-white"/>
            <button v-html="'Next'" class="button bg-pink text-white"/>
          </div>

        </div>

        <!-- <div class="text-center" v-if="formData.action">
          <button
            class="button button-wide bg-pink text-white"
            form="form"
            v-html="status || formData.label"
          />
        </div> -->
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
    let formKey = `${eventId}__${formId}`;
    let eventData = store.state.events[eventId];
    let formData = store.state.forms[formKey];

    if (!eventData) {
      let res1 = await $prismic.api.getByUID("event", eventId);
      if (res1) {
        store.commit("EVENT", [eventId, res1.data]);
        eventData = res1.data;
      }
    }

    if (!formData && eventData) {
      let form = eventData.forms.find((f) => f.uid == formId);
      if (form) {
        let res2 = await $prismic.api.getByID(form.link.id);
        if (res2) {
          store.commit("FORM", [formKey, res2.data]);
          formData = res2.data;
        }
      }
    }

    if (formData && eventData) return { formData, eventData };
    redirect("/404");
  },
  data: () => ({
    formData: {},
    eventData: {},
    status: null,
  }),
  mounted() {
    this.$bus.$emit("LOADED");

    if (this.eventData.primary && this.eventData.secondary) {
      let colors = [this.eventData.primary, this.eventData.secondary];
      gsap.to("#background .strip", 0.5, { fill: () => colors[random(0, 1)] });
    }
  },
  destroyed() {
    gsap.set("#background .strip", { clearProps: "all" });
  },
  computed: {
    fields() {
      return this.formData.slices.map((f) => f.primary);
    },
    form() {
      let form = this.eventData.forms.find((f) => f.uid == this.$route.params.form);
      return form || {};
    },
  },
  methods: {

  },
};
</script>
