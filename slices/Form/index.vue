<template lang="html">
  <component :is="component" :id="slice.id || null" class="form-section">
    <div :class="classes.wrapper">

      <div v-if="title" class="pl-20 md:pl-50 p-10" :class="classes.header">
        <h3 v-html="title" class="font-header uppercase text-20"/>
      </div>

      <div :class="classes.content">

        <prismic-rich-text v-if="description" :field="description" class="mb-30 font-bold text-15"/>

        <form @submit.prevent="handleSubmit">
          <div class="flex -mx-07" :class="classes.form">
            <template v-for="(field,i) in slice.items">
              <formInput :field="field" :id="i" @change="handleChange"/>
            </template>
          </div>

          <div class="mt-20 text-center" :class="classes.submit">
            <input type="submit" :value="btnLabel" class="button bg-pink text-white shadow-none border-none">
          </div>

        </form>

      </div>
    </div>
  </component>
</template>

<script>
import formInput from './formInput'
export default {
  name:"FormBlock",
  props:['slice'],
  components:{formInput},
  data:()=>({
    data:{},
    errors:{},
    btnLabel: 'Submit'
  }),
  methods:{
    handleChange(c){
      this.data[c.id] = c.data
      this.errors[c.id] = c.error
    },
    async handleSubmit(){
      let hasError = false
      let action = this.slice.primary.action

      Object.keys(this.errors).forEach(e => {
        if(this.errors[e]) hasError = true
      })

      if(!hasError && !!action){

        this.btnLabel = "Sending..."
        let formData = new FormData()
        Object.keys(this.data).forEach(key => formData.append(this.data[key].column,this.data[key].value))
        await fetch(action, {method: 'POST',body:formData})
        this.btnLabel = "Sent!"

      }
    }
  },
  computed:{
    title(){
      return this.slice.primary.title
    },
    description(){
      return this.slice.primary.description.length > 0
           ? this.slice.primary.description : null
    },
    component(){
      return this.slice.primary.inline ? 'div' : 'Container'
    },
    classes(){
      let inline = this.slice.primary.inline
      let bg = this.slice.primary.background

      return{
        wrapper:{
          'rounded-lg overflow-hidden shadow-b-blue': !inline
        },
        header:{
          'bg-pink text-white': bg == 'white' || bg == null,
          'bg-black text-white': bg == 'lime',
          'bg-lime': bg == 'black' || bg == 'pink' || bg == 'green'
        },
        content:{
          'bg-white': bg == 'white' || (bg == null && !inline),
          'bg-black text-white': bg == 'black',
          'bg-pink text-white': bg == 'pink',
          'bg-green text-white': bg == 'green',
          'bg-lime': bg == 'lime',
          'p-20 md:px-50 md:py-40': !inline,
        },
        form:{
          'flex-row flex-wrap':!inline,
          'flex-col':inline
        },
        submit:{
          'md:text-left':!inline,
          'xl:text-left':inline
        }
      }
    }
  }
}
</script>
