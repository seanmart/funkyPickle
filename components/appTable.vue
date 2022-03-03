<template lang="html">
  <table class="w-full overflow-hidden rounded-lg">
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
            <td v-html="row[item]" class="px-10 py-05" :class="{'opacity-40 pl-0 uppercase': item == 'header','py-1px': tight}"/>
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
  .table-row{
    border-bottom: 1px solid rgba(theme('colors.blackrgb'),.1);
  }
  .table-row:last-child{
    border-bottom: 0px;
  }
</style>
