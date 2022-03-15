<template lang="html">
  <form>

    <div class="flex -mx-07" :class="classes.form">
      <template v-for="(field,i) in fields">
        <FormField :field="field" :id="i" @change="handleChange"/>
      </template>
    </div>

    <div class="mt-20 text-center" :class="classes.submit" v-if="!getSubmit">
      <input type="submit" :value="btnLabel" class="button bg-pink text-white shadow-none border-none" @click.prevent="handleClick">
    </div>

  </form>
</template>

<script>
import FormField from '../slices/FormField'
export default {
  components:{FormField},
  props:{
    fields: {type:Array, default: ()=>[]},
    action: {type: String, default: null},
    formData: {type: Object, default: null},
    multiColumn: {type:Boolean, default: false},
    getSubmit:{type:Function, default: null}
  },
  data:()=>({
    data:{},
    errors:{},
    btnLabel: 'Submit'
  }),
  mounted(){
    this.getSubmit && this.getSubmit(this.handleSubmit)
  },
  destroyed(){
    this.el && this.el.removeEventListener('click',this.handleSubmit)
  },
  computed:{
    classes(){
      return{
        form:{
          'flex-row flex-wrap':this.multiColumn,
          'flex-col':!this.multiColumn
        },
        submit:{
          'md:text-left':this.multiColumn,
          'xl:text-left':!this.multiColumn
        }
      }
    }
  },
  methods:{
    handleClick(){
      this.handleSubmit({
        sending:()=> this.btnLabel = "Sending...",
        sent:()=> this.btnLabel = "Sent!",
        error:()=> (alert("Please correct the errors in the form and try submitting again"))
      })
    },
    handleChange(c){
      this.data[c.id] = c.data
      this.errors[c.id] = c.error
    },
    async handleSubmit({sending,sent,error}){
      let hasError = false

      Object.keys(this.errors).forEach(e => {
        if(this.errors[e]) hasError = true
      })

      if(!hasError && !!this.action){

        let formData = new FormData()
        let data = {...this.data}
        if (this.formData) data.formData = this.formData

        sending()

        Object.keys(data).forEach(key => formData.append(data[key].column,data[key].value))
        await fetch(this.action, {method: 'POST',body:formData})
        sent()
      } else {
        error()
      }
    }
  },
}
</script>
