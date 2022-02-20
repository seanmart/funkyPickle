<template lang="html">
  <div id="page">
    <container>
      <table>
        <tbody>
          <template v-for="item in data">
            <tr class="border-b border-gray">
              <td class="font-bold py-10 pr-20" v-html="`${item.label}:`"/>
              <td class="py-10" v-html="item.value"/>
            </tr>
          </template>
        </tbody>
      </table>
    </container>
  </div>
</template>

<script>
export default {
  computed:{
    data(){
      if (process.server) return null
      return [
        {label: 'Browser',value: navigator.userAgent},
        {label: 'maxTouchPoints',value: navigator.maxTouchPoints},
        {label: 'Platform', value: navigator.platform}
      ]
    }
  }
}
</script>

<style lang="css" scoped>
</style>
