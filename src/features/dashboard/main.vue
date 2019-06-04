<template lang="pug">
v-container.my-dashboard(
  fluid
  fill-height
  text-xs-center
  v-bind:grid-list-sm="$vuetify.breakpoint.smAndDown"
  v-bind:grid-list-lg="$vuetify.breakpoint.mdAndUp"
) 
  v-layout(row wrap)
  
    v-flex(d-flex xs12 sm12 md6)
      v-card
        v-card-title
          .title Sales
        v-card-text(style="position: relative; height: 100%; max-height: 400px;")
          chart( ref="sales" style="height: 100%;")
    v-flex(d-flex xs12 sm12 md6)
      <google-map @setCoordinates="getCoordinates" />

</template>

<script>
import Chart from './components/chart'
import GoogleMap from "./components/gmap";


export default {
  name: 'Maps',

  components: {
    Chart,
    GoogleMap
  },
  mounted(){
  },
  data () {
    return {
    }
  },
  methods: {
    getCoordinates(coords){
      this.$refs.sales.setCoordinates(coords)
    }
  }
}
</script>

<style lang="stylus">
.my-dashboard

  &__media
    height: 100%
    margin: 0

  .picker__title
    display: none !important

</style>
