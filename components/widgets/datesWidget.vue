<template lang="html">
  <widget-container wideLeft class="c-dates-widget">
    <template #icon><icon calendar/></template>
    <template #content>
      <widget-rows>
        <widget-row label="start" big :value="formatDate(start,'dddd, mmmm dd, yyyy')"/>
        <widget-row label="end" big :value="formatDate(end,'dddd, mmmm dd, yyyy')"/>
    </widget-rows>
    </template>
  </widget-container>
</template>

<script>
import {formatDate} from '~/@js/helpers'
export default {
  props:{
    start:String,
    end:String
  },
  methods:{formatDate}
}
</script>
