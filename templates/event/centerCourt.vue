<template lang="html">
  <div class="">
    <app-table :headers="tableData.headers" :data="tableData.rows" class="bg-white shadow-bottom border-4 border-white"/>
  </div>
</template>

<script>
import {getTimeFromDate} from '@/assets/helpers'
export default {
  props:['data'],
  computed:{
    tableData(){
      return{
        headers:['Time','Description'],
        rows: this.data.items.map(item => ({...item, date: getTimeFromDate(item.date)}))
      }
    }
  }
}
</script>
