<template>
  <div class="container pa-5">
    <div id="for404">
      <div class="logo-404 half-area">
        <img src="../assets/404.png" alt="404" />
      </div>
      <div class="content half-area">
        <h3>Oops... We are missing!</h3>
        <p>
          If the browser doesn't redirect automatically, please click the button
          below.
        </p>
        <router-link to="/">
          <el-button type="info" size="medium">To Homepage</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  created() {
    setTimeout(() => this.$router.push({ path: "/" }), 5000);
  }
};
</script>

<style lang="scss" scoped src="./../styles/NotFound.scss"></style>
