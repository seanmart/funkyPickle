<template lang="html">
  <container-widget full>
    <app-table :headers="tableData.headers" :data="tableData.rows" :color="colors.secondary"/>
  </container-widget>
</template>

<script>
import {getTimeFromDate} from '@/assets/helpers'
export default {
  props:['data','colors'],
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
