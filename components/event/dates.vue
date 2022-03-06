<template lang="html">
  <container-widget v-if="startDate || endDate" class="min-w-1/2 flex flex-col justify-center items-center text-16">
      <text-label v-if="startDate" value="starts:" first/>
      <text-icon v-if="startDate" icon="calendar" :value="startDate" class="text-black"/>
      <text-label v-if="endDate" value="ends:"/>
      <text-icon v-if="endDate" icon="calendar" :value="endDate" class="text-black"/>
  </container-widget>
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
