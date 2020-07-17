<template>
  <div class="container-outside-wrapper">
    <Navbar />
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="signIn">
            <form class="w-100" @submit.prevent.stop="handleSignInForm">
              <div class="text-center my-3">
                <h1 class="h3 font-weight-normal">Sign In</h1>
              </div>

              <div class="form-label-group mb-2">
                <label for="email">Email</label>
                <input
                  id="email"
                  v-model="form.email"
                  name="email"
                  type="email"
                  class="form-control"
                  placeholder="email"
                  required
                  autofocus
                />
              </div>

              <div class="form-label-group mb-3">
                <label for="password">Password</label>
                <input
                  id="password"
                  v-model="form.password"
                  name="password"
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  required
                />
              </div>

              <button
                class="btn btn-primary btn-block mb-3"
                type="submit"
                :class="windowWidth > 600 ? 'btn-lg' : ''"
                :disabled="isValidatingUser"
              >
                Submit
              </button>

              <div class="text-center mb-3">
                <p>
                  <router-link to="/signup"
                    >Not a member? Register here!</router-link
                  >
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import { mapGetters, mapActions } from "vuex";
import { Toast } from "./../utils/mixin";

export default {
  name: "SignIn",
  components: { Navbar },
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters(["isValidatingUser", "windowWidth"])
  },
  methods: {
    ...mapActions(["signIn"]),
    async validation() {
      const emailRule = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/gim;

      if (!this.form.email || !this.form.password) {
        Toast.fire({
          icon: "warning",
          title: "Please enter email and password"
        });
        return false;
      }

      if (!this.form.email.match(emailRule)) {
        Toast.fire({
          icon: "warning",
          title: "Please check your email format."
        });
        return false;
      }

      return true;
    },

    async handleSignInForm() {
      try {
        let validationFormResult = await this.validation();

        if(validationFormResult){
          let fetchingResult = await this.signIn(this.form);

          if (fetchingResult) {
            Toast.fire({
              icon: "success",
              title: "Login Successfully!"
            });
            this.$router.push({ name: "homepage" });
          } else {
            Toast.fire({
              icon: "warning",
              title: "Email or Password is not correct!"
            });
          }
        }
       
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

