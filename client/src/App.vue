<template>
  <div id="app" class="default-settings">
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "App",
  created() {
    this.initialize();
    window.addEventListener("resize", this.detectWindowWidth);
  },
  destroyed() {
    window.removeEventListener("resize", this.detectWindowWidth);
  },
  computed: {
    ...mapGetters([
      "windowWidth",
      "windowHeight",
      "today",
      "isValidatingUser",
      "isAuthenticated",
      "currentUser",
      "token"
    ])
  },
  methods: {
    ...mapMutations(["setWindowWidth", "setWindowHeight"]),
    initialize() {
      this.detectWindowWidth();
    },
    detectWindowWidth() {
      this.setWindowWidth(window.innerWidth);
      this.setWindowHeight(window.innerHeight);
    }
  }
};
</script>

<style lang="scss" src="./styles/app.scss"></style>
