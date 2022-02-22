<template lang="html">
  <table>
    <tr>
      <template v-for="header in headers">
        <th class="table-header px-10 py-05 text-left bg-gray">
          <span v-html="header"/>
        </th>
      </template>
    </tr>
    <tbody>
      <template v-for="row in data">
        <tr class="table-row">
          <template v-for="header in headers">
            <td v-html="row[header]" class="px-10 py-05"/>
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
    data:Array
  }
}
</script>

<style lang="css">
  .table-header:first-child{
    border-top-left-radius: .25rem;
    border-bottom-left-radius: .25rem;
  }
  .table-header:last-child{
    border-top-right-radius: .25rem;
    border-bottom-right-radius: .25rem;
  }
  .table-row{
    border-bottom: 1px solid theme('colors.gray');
  }
  .table-row:last-child{
    border-bottom: 0px;
  }
</style>
