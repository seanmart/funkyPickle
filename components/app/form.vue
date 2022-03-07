<template lang="html">
  <client-only>
    <div class="form">
      <formulate-form #default="{ isLoading }" @submit="submit" class="-mx-10px">

          <div :class="{'flex flex-row flex-wrap has-columns': columns}">
            <template v-for="(field,i) in data">
              <formulate-input v-if="field.type == 'text'" :label="field.label" :name="field.id" :validation="getValidation(field)" type="text" class="text"/>
              <formulate-input v-else-if="field.type == 'name'" :label="field.label" :name="field.id" :validation="getValidation(field)" type="text" class="name"/>
              <formulate-input v-else-if="field.type == 'location'" :label="field.label" :name="field.id" :validation="getValidation(field)" type="text" class="location"/>
              <formulate-input v-else-if="field.type == 'email'" :label="field.label" :name="field.id" :validation="getValidation(field)" type="email" class="email"/>
              <formulate-input v-else-if="field.type == 'dropdown'" :label="field.label" :name="field.id"  type="select" :options="getValues(field)" class="dropdown"/>
              <formulate-input v-else-if="field.type == 'phone'" :label="field.label" :name="field.id"  type="tel" class="phone"/>
              <formulate-input v-else-if="field.type == 'textarea'" :label="field.label" :name="field.id"  type="textarea" class="textarea"/>
            </template>
          </div>

          <formulate-input type="submit" class="inline-block">
            <btn
              wide
              :value="isLoading ? 'Sending' : isSent ? 'Sent!' : 'Submit'"
              :bg="btnColors.bg"
              :hoverBg="btnColors.hoverBg"
              :activeBg="btnColors.activeBg"
              :color="btnColors.color"
              :hoverColor="btnColors.hoverColor"
              :activeColor="btnColors.activeColor"
            />
          </formulate-input>
      </formulate-form>
    </div>
</client-only>
</template>

<script>
export default {
  props:{
    data:Array,
    onSubmit:String,
    columns:Boolean,
    btn:{type:Object,default:()=>({})}
  },
  data:()=>({
    isSent:false
  }),
  computed:{
    btnColors(){
      return{
        bg: this.btn.bg || 'black',
        hoverBg: this.btn.hoverBg || 'pink',
        activeBg: this.btn.activeBg || 'pink',
        color: this.btn.color || 'white',
        hoverColor: this.btn.hoverColor || 'white',
        activeColor: this.btn.activeColor || 'white'
      }
    }
  },
  methods:{
    getValidation(field){
      return field.required ? `required|${field.type}` : ""
    },
    getValues(field){
      if(field.values.indexOf(', ') > 0) return field.values.split(', ')
      if(field.values.indexOf(',') > 0) return field.values.split(',')
    },
    async submit(data){
      if(!this.onSubmit){
        console.warn('No Destination set for form submission')
        return
      }

      let formData = new FormData()
      Object.keys(data).forEach(key => formData.append(key,data[key]))

      await fetch(this.onSubmit, {method: 'POST',body:formData})
      this.isSent = true
    }
  }
}
</script>

<style lang="css">

form input,
form select,
form textarea{
  padding: 12px 15px;
  width:100%;
  border-radius: 5px;
  background: white;
  border: 1px solid rgba(theme('colors.bluergb'),.25);
  box-shadow: 0px 2px 5px rgba(theme('colors.bluergb'),.25);
  color: theme('colors.black')
}

form select{
  appearance:none;
  padding-right: 40px;
}

form .formulate-input-element--select{
  position: relative;
}

form .formulate-input-element--select::before {
  content: "";
  width: 0;
  height: 0;
  border-color: #cecece transparent transparent;
  border-style: solid;
  border-width: 0.3em 0.3em 0;
  top: 50%;
  margin-top: -0.1em;
  right: 1em;
  position: absolute;
}

form .formulate-input-label{
  display: inline-block;
  margin-bottom: 5px;
  font-size: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 600;
  opacity: .75;
}

.formulate-input{
  margin: 10px;
  position: relative;
}

.formulate-input-element--submit{
  margin-top:25px;
}

.formulate-input-errors{
  display: none;
}


form .formulate-input[data-is-showing-errors="true"] input{
  border: 2px solid theme('colors.pink');
}

form .formulate-input[data-is-showing-errors="true"] .formulate-input-label{
  color: theme('colors.pink')
}

.has-columns .name,
.has-columns .email,
.has-columns .location{
  flex: 1 0 250px;
}
.has-columns .dropdown{
  flex: 1 1 auto;
}
.has-columns .textarea{
  flex: 1 1 100%;
}
.has-columns .text{
  flex: 1 1 100%;
}
.has-columns .phone{
  flex: 1 0 200px;
}

</style>
