<template>
<div class="spinner" :style="{ height: calculateHeight}">
  <b-spinner variant="primary" label="Spinning"></b-spinner>
</div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name:"Spinner",
  computed:{
    ...mapGetters(["windowHeight"]),

    calculateHeight(){
      let height = this.windowHeight - 64
      return `${height}px`
    }
  }
}
</script>

<style>
  .spinner{
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>