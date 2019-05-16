<template>
  <div>
    <div v-bind:key="droga.id" v-for="droga in drogas">
      <DrogaDetail v-bind:droga="droga" v-on:del-droga="$emit('del-droga', droga.id)"/>
    </div>
  </div>
</template>

<script>
import DrogaDetail from './DrogaDetail.vue';

export default {
  name: "Drogas",
  components: {
    DrogaDetail
  },
  props: ["drogas"]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
