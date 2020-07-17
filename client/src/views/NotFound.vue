<template>
  <div class="container-outside-wrapper">
    <Navbar />
    <div class="container pa-5">
      <div id="for404">
        <div class="logo-404 half-area">
          <img src="../assets/404.png" alt="404" />
        </div>
        <div class="content half-area">
          <h3>Oops... We are missing!</h3>
          <p>
            If the browser doesn't redirect automatically, please click the
            button below.
          </p>
          <router-link to="/">
            <b-button variant="outline-info">Homepage</b-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";

export default {
  name: "NotFound",
  components: { Navbar },
  data() {
    return {
      timeOutProcessId: ""
    };
  },
  created() {
    this.timeOutProcessId = setTimeout(
      () => this.$router.push({ path: "/" }),
      3000
    );
  },
  destroyed() {
    clearTimeout(this.timeOutProcessId);
  }
};
</script>

<style lang="scss" scoped src="./../styles/NotFound.scss"></style>
