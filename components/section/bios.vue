<template lang="html">
  <container>
    <template v-for="(person,i) in data.items">
    <div class="bg-white rounded-lg shadow-bottom overflow-hidden flex flex-col md:flex-row" :class="{'mb-10': i < data.items.length - 1}">

      <div class="flex-initial flex flex-row md:flex-col">
        <div v-for="c in colors" class="h-20 md:h-auto md:w-10 flex-auto" :class="`bg-${c}`"/>
      </div>

      <div class="flex flex-col md:flex-row p-30">
        <div class="flex-initial mb-30 md:mb-0 md:mr-30">
          <prismic-rich-text :field="person.name" class="font-header font-bold uppercase leading-09 text-pink text-50 md:text-30 min-w-100" />
        </div>
        <div class="flex-auto">
          <app-text :data="person.text" />
        </div>
      </div>

    </div>
    </template>
  </container>
</template>

<script>
export default {
  props:['data'],
  data:()=>({
    colors: ['pink','green','black']
  })
}
</script>
