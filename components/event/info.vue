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
  padding-top: 22vw;
  padding-bottom: 14vw;
  background: white;
  color: $black;

  .c-title--wrapper{
    height: 10vw;
  }
  .c-title{
    font-size: 10vw;
    padding-left: 6vw;
  }
  .c-date--wrapper{
    margin-top: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .c-date-icon{
    height: 18px;
    fill: $pink;
    margin-right: 12px;
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
    .c-date--wrapper{
      margin-top: 30px;
    }
    .c-date-icon{
      height: 20px;
      fill: $pink;
      margin-right: 15px;
    }
  }

}
</style>
