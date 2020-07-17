<template>
  <div class="container-outside-wrapper">
    <Navbar />
    <div class="container">
      <div class="row">
        <div class="col-12">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import { mapGetters } from "vuex";

export default {
  name: "Homepage",
  components: { Navbar },
  data() {
    return {
      selected: ""
    };
  },
  created() {
    console.log("currentUserId", this.currentUser.id);
  },
  computed: {
    ...mapGetters(["currentUser"])
  }
};
</script>

<style lang="scss" src="../styles/homepage.scss"></style>
