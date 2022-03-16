<template lang="html">
  <FormulateForm :class="{'multi-column': multiColumn}" @submit="handleSubmit">

    <div class="formulate-fields -m-05">
      <template v-for="field in formFields">
        <FormulateInput
          class="m-05 text-left"
          :class="{'field-required':field.required}"
          :type="field.type"
          :name="field.key"
          :label="field.label"
          :validation="field.validation"
          :options="field.options"
          :placeholder="field.placeholder"
          @validation="handleValidation"
        />
      </template>
    </div>

    <div class="mt-20" v-if="action">
      <FormulateInput type="submit" class="button bg-pink text-white" :class="{'button-disabled': errors > 0}" :value="status || buttonLabel"/>
    </div>

  </FormulateForm>
</template>

<script>
export default {
  props:{
    multiColumn:Boolean,
    fields: {type:Array, default: ()=>[]},
    buttonLabel:{type:String,default:'Submit'},
    action:{type:String,default:null}
  },
  data:()=>({
    status:null,
    errors:0
  }),
  created(){
    this.errorsSet = new Set()
  },
  computed:{
    formFields(){
      return this.fields.map(s => {

        let type = s.type || 'text'
        let options = s.options ? s.options.split(',').map(v => v.trim()) : null
        let validation = s.required ? `required|${type}`
                       : type == 'tel' ? "matches:/^\\(?([0-9]{3})\\)?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4})/"
                       : null

        return{...s,type,options,validation}
      })
    }
  },
  methods:{
    handleValidation(e){
      e.hasErrors ? this.errorsSet.add(e.name) : this.errorsSet.delete(e.name)
      console.log(this.errorsSet.size)
      this.errors = this.errorsSet.size
    },
    async handleSubmit(data){
      if(!this.action){
        this.$emit('submit',data)
      } else {

        let formData = new FormData()
        Object.keys(data).forEach(key => formData.append(key,data[key]))
        this.status = "Sending..."
        await fetch(this.onSubmit, {method: 'POST',body:formData})
        this.status = "Sent!"

      }
    }
  }
}
</script>

<style lang="css">

.formulate-form.multi-column .formulate-fields{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.formulate-form.multi-column .formulate-input[data-type="textarea"]{
  flex: 1 1 100%;
}

.formulate-form.multi-column .formulate-input[data-type="text"],
.formulate-form.multi-column .formulate-input[data-type="email"]{
  flex: 1 1 300px;
}

.formulate-form.multi-column .formulate-input[data-type="tel"]{
  flex: 1 1 200px;
}

.formulate-form.multi-column .formulate-input[data-type="select"]{
  flex: 1 1 auto;
}

.formulate-form input,
.formulate-form textarea,
.formulate-form select{
  display: block;
  padding: .75rem  1.25rem;
  border-radius: .25rem;
  box-shadow: 0px 1px 3px rgba(theme('colors.bluergb'),.3);
  border: 1px solid rgba(theme('colors.bluergb'),.2);
  width:100%;
  margin: 0px;
  background: white;
  font-size: 1rem;
  appearance:none;
}
.formulate-form label{
  margin-bottom:.5rem;
  display: inline-block;
}

.formulate-form .formulate-input.field-required label::after{
  content:'*';
  color: theme('colors.pink');
  margin-left:5px;
}

.formulate-input-element--select{
  position: relative;
}
.formulate-input-element--select::before {
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

.formulate-form [data-is-showing-errors="true"] input,
.formulate-form [data-is-showing-errors="true"] select,
.formulate-form [data-is-showing-errors="true"] textarea{
  border: 1px solid theme('colors.pink');
  box-shadow: 0px 1px 3px rgba(theme('colors.pinkrgb'),.3);
}
.formulate-form [data-is-showing-errors="true"] label{
  color: theme('colors.pink')
}
.formulate-input-errors{
  display: none;
}

.formulate-input-element--submit--label{
  font-weight: bold;
}

</style>
