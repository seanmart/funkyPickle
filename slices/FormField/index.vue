<template lang="html">
  <div class="m-07" :class="classes">

    <label class="block uppercase text-07 font-semibold tracking-wide opacity-80 mb-05">
      <span v-html="field.label"/>
      <span v-if="field.required" class="text-pink" v-html="'*'"/>
    </label>

    <select v-if="type == 'dropdown'" class="bg-white" v-model="value" @change="handleChange">
      <option v-for="item in placeholder" :value="item" v-html="item"/>
    </select>

    <textarea
      v-else-if="type == 'textarea'"
      :placeholder="placeholder"
      @change="handleChange"
      v-model="value"
      rows="4"
      class="bg-white"/>

    <input
      v-else
      :type="type || 'text'"
      v-model="value"
      :placeholder="placeholder"
      @change="handleChange"
      :name="field.column"
      class="bg-white flex-auto"/>

  </div>
</template>

<script>
export default {
  name: 'FormField',
  props:['field','id'],
  data:()=>({
    invalid: false,
    error: false,
    value: "",
  }),
  mounted(){
    this.handleChange()
  },
  methods:{
    handleChange(){

      let emailErr = this.type == 'email' && !(/\S+@\S+\.\S+/).test(this.value)
      let phoneErr = this.type == 'tel' && !(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).test(this.value)

      this.invalid =  this.value.length > 0 && (emailErr || phoneErr)
      this.error = this.field.required && this.value.length == 0

      this.$emit('change',{
        id: this.id,
        data:{column: this.field.column, value:this.value},
        error: this.error || this.invalid,
      })
    }
  },
  computed:{
    type(){
      return this.field.type == 'phone' ? 'tel' : this.field.type
    },
    placeholder(){
      return this.type== 'dropdown' ? this.field.placeholder.split(',').map(i => i.trim()) : this.field.placeholder
    },
    classes(){
      return{
        'error': this.invalid,
        'flex-auto min-w-250px':this.field.type == 'text' || this.field.type == null || this.field.type == 'email',
        'flex-initial w-full':this.field.type == 'textarea',
        'flex-auto min-w-200px':this.field.ype == 'tel',
        'flex-grow':this.field.type == 'dropdown'
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
