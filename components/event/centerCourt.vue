<template lang="html">
  <container-widget full>
    <app-table :headers="tableData.headers" :data="tableData.rows"/>
  </container-widget>
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
