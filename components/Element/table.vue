<template lang="html">
  <table class="table-element w-full bg-white shadow-b-blue rounded-lg overflow-hidden p-10">
    <tbody>
    <tr>
      <template v-for="header in headers">
        <th v-html="header" class="text-left py-05 px-10 bg-black text-white"/>
      </template>
    </tr>
    <template v-for="(row,i) in rows">
      <tr :class="{'border-b border-gray': i < rows.length - 1}">
        <template v-for="cell in row">
          <td class="py-05 px-10" v-html="cell"/>
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
    rows:Array
  }
}
</script>
