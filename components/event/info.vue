<template lang="html">
  <section class="c-event-info o-margins">
    <text-scroll class="c-title--wrapper" :duration="35" v-if="title">
      <h1 class="t-header c-title" v-html="title" />
    </text-scroll>
    <div class="c-date--wrapper">
      <icon calendar class="c-date-icon" />
      <div class="c-date" v-html="">
        <span v-if="start" v-html="formatDate(start)" />
        <span v-if="start && end" v-html="'&nbsp–&nbsp'" />
        <span v-if="end" v-html="formatDate(end)" />
      </div>
    </div>
  </section>
</template>

<script>
import { getDay, getMonth, getYear } from "@/assets/js/helpers";
export default {
  props:['title','start','end'],
  methods: {
    formatDate(date) {
      if (!date) return;
      let year = getYear(date);
      let month = getMonth(date, "long");
      let day = getDay(date);
      return `${month} ${day}, ${year}`;
    },
  }
}
</script>

<style lang="scss">
.c-event-info{
  padding-top: 19.5vw;
  padding-bottom: 8vw;
  background: white;

  .c-title--wrapper{
    height: 10vw;
  }
  .c-title{
    font-size: 10vw;
    padding-left: 6vw;
  }
  .c-date--wrapper{
    margin-top: 3vw;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
  }
  .c-date-icon{
    height: 3vw;
    fill: $pink;
    margin-right: 2vw;
  }
  .c-date{
    font-size: 3vw;
  }

  @media screen and (min-width: $medium){
    padding-top: 8rem;
    padding-bottom: 4rem;

    .c-title--wrapper{
      height: 4rem;
    }
    .c-title{
      font-size: 4rem;
      padding-left: 2.5rem;
    }
    .c-date-icon{
      height: 1.25rem;
      fill: $pink;
      margin-right: 1rem;
    }
    .c-date{
      font-size: 1.25rem;
    }
  }

}
</style>
