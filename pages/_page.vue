<template lang="html">
  <main id="page" :key="page">

    <container first noBottom v-if="pageTitle">
      <prismic-rich-text :field="pageTitle" :htmlSerializer="htmlSerializer" class="font-header font-bold uppercase leading-09 text-60"/>
    </container>

    <container :first="!pageTitle" noBottom noLeft noRight v-if="fixedHeader" class="hidden lg:block">
      <div class="h-40 relative">
        <container noTop noBottom class="absolute inset-0">
          <div class="h-full flex flex-row items-center bg-white shadow-bottom rounded-lg text-09 uppercase tracking-wide px-10 overflow-scroll">
            <template v-for="(id,i) in fixedHeader">
              <a :href="id.id" v-html="id.label" class="flex-initial px-10" @click.prevent="scrollTo(id.id)"/>
              <p v-if="i < fixedHeader.length - 1" v-html="`|`" class="opacity-50 text-pink"/>
            </template>
          </div>
        </container>
      </div>
    </container>

    <template v-for="(slice,i) in slices">
      <component
        :is="slice.component"
        :data="slice"
        :id="getId(slice,i)"
        :class="{'is-first':i == 0 && !pageTitle && !fixedHeader, 'is-last': i == slices.length - 1}"
      />

    </template>

  </main>
</template>

<script>
import {camelize} from '@/assets/helpers'
export default {
  async asyncData({ store, route, $prismic }) {
    let res = null;
    let page = route.path.replaceAll("/", "");

    if (!store.state.pages[page]) {
      res = await $prismic.api.getByUID('page',page);
      res && store.commit("PAGE", [page, res.data]);
    }
    let data = store.state.pages[page] || null;
    if (data) return { data,page };
  },
  data:()=>({
    data: [],
    page: null
  }),
  mounted(){
    this.$nextTick(()=>{
      this.$loaded('.image',{background: true},()=> this.$bus.$emit('LOADED'))
    })
  },
  computed:{
    fixedHeader(){
      if (!this.data.header) return false
      let ids = []
      this.slices.forEach((s,i) => {
        if (s.primary.title &&  s.primary.title !== "") ids.push({
          id:`#${this.getId(s,i)}`,
          label: s.primary.title
        })
      })
      return ids.length > 0 ? ids : null
    },
    pageTitle(){
      return this.data.title || null
    },
    slices(){
      let slices = []
      this.data.body.forEach(i => i.primary.publish && slices.push({
        ...i,
        component:`section-${camelize(i.slice_type)}`
      }))
      return slices
    }
  },
  methods:{
    getId(s,i){
      return `${s.slice_type}-${i}`
    },
    htmlSerializer(type, element, content, children){
      if(content && content.indexOf('-') > 0){
        let words = content.split(" ").map(c => c.indexOf('-') > 0 ? `<span class="whitespace-nowrap">${c}</span>`: c)
        content = words.join(" ")
      }
      switch(type){
        case 'em':
        return `<span class="text-green">${content}</span>`
        case 'strong':
        return `<span class="text-pink">${content}</span>`
        default:
        return content
      }
    },
    scrollTo(id){
      console.log(id)
      gsap.to(window, {
        duration: 1,
        ease: 'power2.out',
        scrollTo:{y:id}
      });
    }
  }
}
</script>
