<template>
  <div id="app">
    <Drogas v-bind:drogas="drogas" v-on:del-droga="deleteDroga"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Drogas from './components/Drogas.vue'

export default {
  name: 'app',
  components: {
    Drogas
  },
  data(){
    return {
      drogas: [
        {
          id: 1,
          title: "paco",
          completed: true
        },{
          id: 2,
          title: "fafafa",
          completed: true
        },{
          id: 3,
          title: "fasuli",
          completed: false
        }
      ]
    }
  },
  methods: {
    deleteDroga(id) {
      this.drogas = this.drogas.filter(droga => droga.id !== id);
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
}
</style>
