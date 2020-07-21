<template>
  <div class="container-outside-wrapper">
    <Navbar />
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="signIn">
            <Spinner v-if="isRegistering" />
            <form v-else class="w-100" @submit.prevent.stop="handleUpdateUserForm">
              <div class="text-center my-3">
                <h1 class="h3 font-weight-normal">Your Profile</h1>
              </div>

              <div class="form-label-group mb-2">
                <label for="name">Name</label>
                <input
                  id="name"
                  name="name"
                  v-model.trim="form.name"
                  type="text"
                  class="form-control"
                  placeholder="Name"
                  required
                  autofocus
                />
              </div>

              <div class="form-label-group mb-2">
                <label for="age">Age</label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  v-model.trim="form.age"
                  class="form-control"
                  placeholder="Age"
                  min="1"
                  max="125"
                  required
                  autofocus
                />
              </div>

              <div class="form-label-group mb-2">
                <label for="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  v-model.trim="form.email"
                  class="form-control"
                  placeholder="Email"
                  required
                  autofocus
                />
              </div>

              <div class="form-label-group mb-3">
                <label for="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  v-model.trim="form.password"
                  class="form-control"
                  placeholder="Password"
                  required
                />
              </div>

              <div class="form-label-group mb-3">
                <label for="passwordCheck">Password Check</label>
                <input
                  id="passwordCheck"
                  name="passwordCheck"
                  type="password"
                  v-model.trim="form.passwordCheck"
                  class="form-control"
                  placeholder="Password Check"
                  required
                />
              </div>

              <div class="form-group">
                <label for="image">Image</label>
                <input
                  id="image"
                  type="file"
                  name="image"
                  accept="image/*"
                  class="form-control-file"
                />
                <p class="warning-message text-danger mt-2">The file size must be lower than 3MB.</p>
              </div>

              <button
                class="btn btn-primary btn-block mb-3"
                type="submit"
                :class="windowWidth > 600 ? 'btn-lg' : ''"
                :disabled="isRegistering"
              >
                Update
              </button>

              <div class="text-center mb-3">
                <p>
                  <router-link to="/">Back to Homepage</router-link>
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
import Spinner from "../components/Spinner"
import { mapGetters, mapActions } from "vuex";
import { Toast } from "./../utils/mixin";

export default {
  name: "Profile",
  components: { Navbar, Spinner },
  data() {
    return {
      form: {
        name: "",
        email: "",
        age: "",
        password: "",
        passwordCheck: "",
        profile_img: ""
      }
    };
  },
  mounted() {
    this.form = {
      ...this.form,
      ...this.currentUser
    };
  },
  computed: {
    ...mapGetters(["isRegistering", "windowWidth", "currentUser"])
  },
  methods: {
    ...mapActions(["updateProfile"]),
    async validation() {
      const emailRule = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/gim;

      if (
        !this.form.name ||
        !this.form.age ||
        !this.form.email ||
        !this.form.password ||
        !this.form.passwordCheck
      ) {
        Toast.fire({
          icon: "warning",
          title: "Please make sure all fields are filled."
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

      if (this.form.password !== this.form.passwordCheck) {
        Toast.fire({
          icon: "warning",
          title: "Two passwords do not match."
        });
        return false;
      }

      return true;
    },

    async handleUpdateUserForm(event) {
      try {
        const formRawData = event.target;
        const formData = new FormData(formRawData);
        let validationFormResult = await this.validation();

        if (validationFormResult) {
          let fetchingResult = await this.updateProfile({
            userId: this.currentUser.id,
            data: formData
          });
          if (fetchingResult) {
            Toast.fire({
              icon: "success",
              title: "Update Successfully!"
            });
            this.$router.push({ name: "homepage" });
          } else {
            Toast.fire({
              icon: "warning",
              title: "Something went wrong! Please try again later."
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
