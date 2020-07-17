<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="icon">
      <router-link to="/">
        <img src="../assets/icons.svg" alt="logo" width="48" height="48" />
      </router-link>
    </div>
    <div class="button-group">
      <button type="button" class="btn btn-outline-success">Log In</button>
      <button type="button" class="btn btn-outline-danger">Log Out</button>
      <button type="button" class="btn btn-outline-primary">Register</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style></style>
