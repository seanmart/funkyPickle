<template>
  <component :is="useContainer ? 'Container' : 'div'" :id="slice.id || null">
    <Title v-if="title" :value="title" class="mb-40"/>
    <prismic-rich-text v-if="description" :field="description" class="mb-40"/>

    <ElementTable :headers="headers" :rows="rows" class="graphic-box"/>
  </component>
</template>

<script>

export default {
  name: "Table",
  props: ['slice','useContainer'],
  async fetch(){
    if(!this.slice.primary.link) return
    let res = await fetch(this.slice.primary.link)
    if(res.ok){
      let data = await res.text()
      this.data = data.split('\n')
    }
  },
  data:()=>({
    data:[]
  }),
  watch:{
    data(){
      this.$nextTick(ScrollTrigger.refresh)
    }
  },
  computed:{
    title(){
      return this.slice.primary.title || null
    },
    description(){
      return this.slice.primary.description.length > 0
           ? this.slice.primary.description : null
    },
    headers(){
      let headers = null
      if (this.data) headers = this.data[0]
      if (this.slice.primary.headers) headers = this.slice.primary.headers
      return headers ? headers.split(',').map(i => i.trim()) : []
    },
    rows(){
      let rows = []
      if (this.data) rows = this.data.slice(1)
      if (this.slice.items[0].row) rows = this.slice.items.map(i => i.row)
      return rows.map(r => r.split(',').map(i => i.trim()))
    }

  }
}
</script>
