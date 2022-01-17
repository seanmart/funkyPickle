<template lang="html">
  <widget class="c-location-widget">
    <template #header>
      <div class="c-header">
        <div class="c-icon">
          <icon wayfinder />
        </div>
        <div class="c-location">
          <h2 class="c-title t-header" v-html="place"/>
          <span class="c-address" v-html="formatCityState(address, city, state)"/>
        </div>
      </div>
    </template>
    <template #contentWide>
      <div class="c-map">

      </div>
    </template>
  </widget>
</template>

<script>
import widget from './widget'
export default {
  name: 'LocationWidget',
  components:{widget},
  props:['place','address','city','state','uid'],
  methods:{
    formatCityState(address,city,state){
      let str = ""
      new Array(address,city,state).forEach(s =>{
        if(s && str != '') str +=', '
        str += s || ''
      })
      return str || 'No Location Announced'
    }
  }
}
</script>

<style lang="scss">
.c-location-widget{

  .c-header{
    display: flex;
    flex-direction: row;
    padding-top: .5rem;

    .c-icon{
      flex: 0 0 auto;
      padding-right: 1rem;
    }
    svg{
      height: 4.3rem;
      fill: $pink;
    }
    .c-location{
      flex: 1 1 auto;
    }
    .c-title{
      font-size: 3rem;
    }
    .c-address{
      opacity: .5;
    }
  }

  .c-map{
    background: $black;
    height: 300px;
  }

}
</style>
