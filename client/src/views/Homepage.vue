<template>
  <div class="homepage">
    <h3>This is Homepage.</h3>
    <b-form-group label="Individual radios">
      <b-form-radio v-model="selected" name="some-radios" value="A"
        >Option A</b-form-radio
      >
      <b-form-radio v-model="selected" name="some-radios" value="B"
        >Option B</b-form-radio
      >
    </b-form-group>

    <div class="mt-3">
      Selected: <strong>{{ selected }}</strong>
    </div>
  </div>
</template>

<script>
export default {
  name: "Homepage",
  data() {
    return {
      selected: ""
    };
  }
};
</script>

<style lang="scss" src="../styles/homepage.scss"></style>
