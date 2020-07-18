<template>
  <div class="container-outside-wrapper">
    <Navbar />
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="homepage">
            <h3>Hello, {{ landingPageName }}</h3>

            <template v-if="currentUser.id !== -1">
              <img :src="currentUser.profile_img" alt="profile_img" />
              <p>Name : {{ currentUser.name }}</p>
              <p>Age : {{ currentUser.age }}</p>
              <p>Email : {{ currentUser.email }}</p>
            </template>

            <!--get functions will be here.-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Homepage",
  components: { Navbar },
  created() {
    if (this.currentUser.id !== -1) {
      this.getJobRecords(this.currentUser.id);
    } else {
      this.getJobRecords();
    }
  },
  computed: {
    ...mapGetters(["currentUser"]),
    ...mapGetters("jobRecords", ["jobRecords"]),
    landingPageName() {
      return this.currentUser.id === -1 ? "Anonymous" : this.currentUser.name;
    }
  },
  methods: {
    ...mapActions("jobRecords", ["getJobRecords"])
  }
};
</script>

<style lang="scss" src="../styles/homepage.scss"></style>
