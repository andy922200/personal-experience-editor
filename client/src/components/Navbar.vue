<template>
  <nav class="navbar navbar-dark bg-dark navbar-custom">
    <div class="icon">
      <router-link to="/">
        <img src="../assets/icons.svg" alt="logo" width="48" height="48" />
      </router-link>
    </div>

    <div class="button-group">
      <router-link
        v-if="isAuthenticated"
        :to="{ name: 'profile', params: { userId: currentUser.id } }"
      >
        <button type="button" class="btn btn-outline-secondary btn--custom">
          Your Profile
        </button>
      </router-link>
      <router-link :to="{ name: 'signUp' }">
        <button type="button" class="btn btn-outline-primary btn--custom">
          Register
        </button>
      </router-link>
      <router-link :to="{ name: 'signIn' }" v-if="!isAuthenticated">
        <button type="button" class="btn btn-outline-success btn--custom">
          Sign In
        </button>
      </router-link>
      <button
        type="button"
        v-else
        class="btn btn-outline-danger btn--custom"
        @click="triggerLogOut"
      >
        Log Out
      </button>
    </div>

    <div class="button-group__wrapper" v-if="windowWidth <= 600">
      <div v-if="isExpanded" class="button-group__mobile">
        <router-link
          v-if="isAuthenticated"
          :to="{ name: 'profile', params: { userId: currentUser.id } }"
        >
          <button
            type="button"
            class="btn btn-outline-secondary btn-sm btn--custom"
          >
            Profile
          </button>
        </router-link>
        <router-link :to="{ name: 'signUp' }">
          <button
            type="button"
            class="btn btn-outline-primary btn-sm btn--custom"
          >
            Register
          </button>
        </router-link>
        <router-link :to="{ name: 'signIn' }" v-if="!isAuthenticated">
          <button
            type="button"
            class="btn btn-outline-success btn-sm btn--custom"
          >
            Sign In
          </button>
        </router-link>
        <button
          type="button"
          v-else
          class="btn btn-outline-danger btn-sm btn--custom"
          @click="triggerLogOut"
        >
          Log Out
        </button>
      </div>
      <b-icon
        icon="chevron-down"
        font-scale="1"
        class="icon-style"
        @click="changeExpansion(true)"
        v-if="!isExpanded"
      ></b-icon>
      <b-icon
        icon="chevron-up"
        font-scale="1"
        class="icon-style"
        @click="changeExpansion(false)"
        v-else
      ></b-icon>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { Toast } from "./../utils/mixin";

export default {
  name: "Navbar",
  data() {
    return {
      isExpanded: false
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "windowWidth", "currentUser"])
  },
  methods: {
    ...mapMutations(["revokeAuthentication", "fetchCurrentUser"]),
    ...mapActions("jobRecords", ["getJobRecords"]),
    changeExpansion(status) {
      status ? (this.isExpanded = true) : (this.isExpanded = false);
    },
    async triggerLogOut() {
      try {
        this.revokeAuthentication();
        if (this.$route.name !== "homepage") {
          this.$router.push({ name: "homepage" });
        } else {
          this.getJobRecords("default");
        }
        Toast.fire({
          icon: "success",
          title: "Log Out Successfully!"
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style lang="scss" src="../styles/Navbar.scss"></style>
