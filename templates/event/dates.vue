<template lang="html">
  <widget v-if="startDate || endDate">
      <label-text v-if="startDate" value="starts:" first/>
      <icon-text v-if="startDate" icon="calendar" :value="startDate"/>
      <label-text v-if="endDate" value="ends:"/>
      <icon-text v-if="endDate" icon="calendar" :value="endDate"/>
  </widget>
</template>

<script>
import { formatDate} from "@/assets/helpers";
export default {
  props:['data'],
  computed:{
    startDate(){
      let sd = this.data.start_date
      return sd ? formatDate(sd, 'dddd, mmmm dd, yyyy') : null
    },
    endDate(){
      let ed = this.data.end_date
      return ed ? formatDate(ed, 'dddd, mmmm dd, yyyy') : null
    }
  }
}
</script>
