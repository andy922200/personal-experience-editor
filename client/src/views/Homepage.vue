<template>
  <div class="container-outside-wrapper">
    <Navbar />
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="homepage">
            <h3>Hello, {{landingPageName}}</h3>

            <template v-if="currentUser.id !== -1">
              <img :src="currentUser.profile_img" alt="profile_img">
              <p>Name : {{currentUser.name}} </p>
              <p>Age : {{currentUser.age}} </p>
              <p>Email : {{currentUser.email}} </p>
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
import { mapGetters } from "vuex";

export default {
  name: "Homepage",
  components: { Navbar },
  created() {
    console.log("currentUserId", this.currentUser.id);
  },
  computed: {
    ...mapGetters(["currentUser"]),
    landingPageName(){
      return this.currentUser.id === -1 ? "Anonymous" : this.currentUser.name;
    }
  }
};
</script>

<style lang="scss" src="../styles/homepage.scss"></style>
