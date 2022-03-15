<template lang="html">
  <EventWidget class="flex justify-center items-center">
    <div class="">
      <Label>Starts</Label>
      <div class="flex flex-row items-center">
        <Icon calendar class="pr-10 h-20 "/>
        <h3 class="font-bold text-20" v-html="formatDate(date,'dddd, mmmm dd, yyyy')"/>
      </div>
    </div>
  </EventWidget>
</template>

<script>
import {formatDate} from '@/assets/helpers'
export default {
  props:['date'],
  methods:{formatDate}
}
</script>
