<template lang="html">
  <main>

    <div class="relative z-10 pt-400px md:pt-200px">
      <div class="absolute inset-0 -bottom-100px md:-bottom-100 overflow-hidden">
        <Landing :image="event.background" />
      </div>
    </div>

    <Container noTop class="relative z-20">
      <div class="bg-white px-20 py-50 lg:px-50 shadow-b-blue rounded-lg">

        <h3 v-html="event.title" :style="{color: event.primary}" class="text-15 font-bold text-center mb-20"/>
        <Marquee>
          <h1 v-html="form.label" class="font-header font-bold uppercase leading-09 text-60 px-20"/>
        </Marquee>

        <DataForm
          multiColumn
          class="mt-space"
          :fields="fields"
          :action="data.action"
          :formData="{column:'sheet',value:form.sheet}"
          :getSubmit="(e)=> this.handleSubmit = e"
        />

        <div class="my-40 bg-gray p-40 text-center font-bold">
          stripe form will go here
        </div>

        <div class="text-center">
          <button class="button button-wide bg-pink text-white" v-html="btnLabel" @click="handleClick"/>
        </div>

      </div>
    </Container>
  </main>
</template>

<script>
import {random} from '@/assets/helpers'
export default {
  async asyncData({store,params,$prismic,payload}){

    let eventId = params.event
    let formId = params.form
    let formKey = `${eventId}__${formId}`
    let form = null
    let event = null
    let data = null
    let res = null

    if (!store.state.events[eventId]){
      res = await $prismic.api.getByUID("event", eventId);
      res && store.commit("EVENT", [eventId, res.data]);
    }

    event = store.state.events[eventId]

    if (Array.isArray(event.forms)){
      form = event.forms.find(f => f.uid == formId)
      if(!store.state.forms[formKey]){
        res = await $prismic.api.getByID(form.link.id)
        res && store.commit("FORM", [formKey, res.data]);
      }
      data = store.state.forms[formKey]
    }

    if (data) return {data,event,form}

  },
  data:()=>({
    data:{},
    event:{},
    form:{},
    handleSubmit: null,
    btnLabel: null
  }),
  mounted(){
    this.$bus.$emit('LOADED')

    this.btnLabel = this.data.label

    if(this.event.primary && this.event.secondary){
      let colors = [this.event.primary,this.event.secondary]
      gsap.to('#background .strip',.5,{fill:()=> colors[random(0,1)]})
    }
  },
  destroyed(){
    gsap.set('#background .strip',{clearProps:'all'})
  },
  computed:{
    fields(){
      return this.data.slices.map(f => f.primary)
    }
  },
  methods:{
    handleClick(){
      this.handleSubmit({
        sending:()=> this.btnLabel = "Sending...",
        sent:()=> this.btnLabel = "Sent!",
        error:()=> (alert("Please correct the errors in the form and try submitting again"))
      })
    }
  }
}
</script>
