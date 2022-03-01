<template lang="html">
  <table class="w-full">
    <tbody>
      <tr v-if="headers">
        <template v-for="header in headers">
          <th class="table-header px-10 py-05 text-left bg-gray">
            <span v-html="header"/>
          </th>
        </template>
      </tr>
      <template v-for="row in data">
        <tr class="table-row">
          <template v-for="(item,i) in Object.keys(row)">
            <td v-html="row[item]" class="px-05 py-05" :class="{'opacity-40 pl-0 uppercase': item == 'header','py-1px': tight}"/>
          </template>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
export default {
  props:{
    headers:Array,
    data:Array,
    tight: Boolean
  }
}
</script>

<style lang="css">
  table,tr,td{
    font-size: inherit;
    font-weight: inherit;
  }
  .table-header:first-child{
    border-top-left-radius: .25rem;
    border-bottom-left-radius: .25rem;
  }
  .table-header:last-child{
    border-top-right-radius: .25rem;
    border-bottom-right-radius: .25rem;
  }
  .table-row{
    border-bottom: 1px solid rgba(theme('colors.blackrgb'),.1);
  }
  .table-row:last-child{
    border-bottom: 0px;
  }
</style>
