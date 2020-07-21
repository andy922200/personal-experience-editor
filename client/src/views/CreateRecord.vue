<template>
  <div class="container-outside-wrapper">
    <Navbar />
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="createRecord">
            <Spinner v-if="isUpdating" />
            <template v-else>
              <b-alert
                v-if="lastEntriesExisting"
                :show="openAlert"
                dismissible
                fade
                class="alert--custom"
              >
                <p>
                  Would you like to recover the last entries?
                  <span
                    ><b-button
                      pill
                      class="button--custom"
                      variant="success"
                      @click="recoverLastEntries"
                      >Yes</b-button
                    ></span
                  >
                </p>
              </b-alert>

              <form
                class="w-100"
                @submit.prevent.stop="handleCreateJobRecordForm"
              >
                <div class="text-center my-3">
                  <h1 class="h3 font-weight-normal">
                    {{ form.title }} @ {{ form.company_name }}
                  </h1>
                </div>

                <div class="form-label-group mb-2">
                  <label for="title">Job Title</label>
                  <input
                    id="title"
                    name="title"
                    v-model.trim="form.title"
                    type="text"
                    class="form-control"
                    placeholder="Title"
                    required
                    autofocus
                  />
                </div>

                <div class="form-label-group mb-2">
                  <label for="company_name">Company Name</label>
                  <input
                    id="company_name"
                    name="company_name"
                    v-model.trim="form.company_name"
                    type="text"
                    class="form-control"
                    placeholder="Company Name"
                    required
                    autofocus
                  />
                </div>

                <div class="form-group">
                  <label for="company_logo">Company Logo</label>
                  <input
                    id="company_logo"
                    type="file"
                    name="company_logo"
                    accept="image/*"
                    class="form-control-file"
                  />
                  <p class="warning-message text-danger mt-2">
                    The file size must be lower than 3MB.
                  </p>
                </div>

                <div class="form-group">
                  <label for="start_date">Start Date</label>
                  <input
                    id="start_date"
                    name="start_date"
                    v-model="form.start_date"
                    type="date"
                    class="form-control"
                    placeholder="Start Date"
                    :max="today"
                    required
                    autofocus
                  />
                </div>

                <div class="form-group">
                  <label for="end_date">End Date</label>
                  <input
                    id="end_date"
                    name="end_date"
                    v-model="form.end_date"
                    type="date"
                    class="form-control"
                    placeholder="End Date"
                    :max="today"
                    :readonly="form.current_position"
                    required
                    autofocus
                  />
                </div>

                <b-form-group label="Current Position?">
                  <b-form-radio
                    v-model="form.current_position"
                    name="current_position"
                    :value="true"
                    >Yes</b-form-radio
                  >
                  <b-form-radio
                    v-model="form.current_position"
                    name="current_position"
                    :value="false"
                    >No</b-form-radio
                  >
                </b-form-group>

                <div class="form-group">
                  <label for="description">Description</label>
                  <b-form-textarea
                    id="description"
                    v-model="form.description"
                    name="description"
                    placeholder="Enter something..."
                    :state="form.description.length > 0"
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </div>

                <b-form-group label="Is it public?">
                  <b-form-radio
                    v-model="form.public_status"
                    name="public_status"
                    :value="true"
                    >Yes</b-form-radio
                  >
                  <b-form-radio
                    v-model="form.public_status"
                    name="public_status"
                    :value="false"
                    >No</b-form-radio
                  >
                </b-form-group>

                <button
                  class="btn btn-primary btn-block mb-3"
                  type="submit"
                  :class="windowWidth > 600 ? 'btn-lg' : ''"
                  :disabled="isUpdating"
                >
                  Create
                </button>

                <div class="text-center mb-3">
                  <p>
                    <router-link :to="{ name: 'homepage' }">
                      Back
                    </router-link>
                  </p>
                </div>
              </form>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import { mapGetters, mapActions } from "vuex";
import { Toast } from "./../utils/mixin";
import moment from "moment";
import _ from "lodash";

export default {
  name: "CreateRecord",
  components: { Navbar, Spinner },
  data() {
    return {
      form: {
        title: "Job Title",
        company_name: "Company Name",
        company_logo: "",
        start_date: "",
        end_date: "",
        public_status: false,
        description: "",
        current_position: false
      },
      openAlert: true,
      lastEntriesExisting: false,
      lastEntries: {}
    };
  },
  created() {
    this.checkLastEntries();
  },
  computed: {
    ...mapGetters(["windowWidth", "today", "currentUser"]),
    ...mapGetters("jobRecords", ["selectedJobRecord", "isUpdating"])
  },
  methods: {
    ...mapActions("jobRecords", ["postOneJobRecord"]),

    checkLastEntries() {
      if (localStorage[`createForm`]) {
        this.lastEntries = JSON.parse(localStorage[`createForm`]);
        this.lastEntriesExisting = true;
      } else {
        return (this.lastEntriesExisting = false);
      }
    },

    async recoverLastEntries() {
      try {
        if (!_.isEmpty(this.lastEntries)) {
          this.form = this.lastEntries;
          this.openAlert = false;
        }
      } catch (err) {
        console.log(err);
      }
    },

    async validation() {
      if (
        !this.form.title ||
        !this.form.company_name ||
        !this.form.start_date ||
        !this.form.end_date ||
        !this.form.description
      ) {
        Toast.fire({
          icon: "warning",
          title: "Please make sure all fields are filled."
        });
        return false;
      }

      if (!moment(this.form.start_date).isBefore(this.form.end_date)) {
        Toast.fire({
          icon: "warning",
          title: "Start Date must be before End Date."
        });
        return false;
      }

      if (
        !this.form.current_position &&
        moment().format("YYYY-MM-DD") ===
          moment(this.form.end_date).format("YYYY-MM-DD")
      ) {
        Toast.fire({
          icon: "warning",
          title:
            "If this is not your current position, please do not fill 'today date' as 'end date'."
        });
        return false;
      }

      return true;
    },

    async handleCreateJobRecordForm(event) {
      try {
        const formRawData = event.target;
        const formData = new FormData(formRawData);
        let validationFormResult = await this.validation();

        if (validationFormResult) {
          let fetchingResult = await this.postOneJobRecord({
            userId: this.currentUser.id,
            data: formData
          });
          if (fetchingResult) {
            Toast.fire({
              icon: "success",
              title: "Update Successfully!"
            });
            localStorage.removeItem(`createForm`);
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
  },
  watch: {
    form: {
      async handler(newVal) {
        if (newVal) {
          localStorage[`createForm`] = JSON.stringify(newVal);
        }
      },
      deep: true
    },
    "form.current_position": {
      async handler(newVal) {
        if (newVal) {
          this.form.end_date = moment().format("YYYY-MM-DD");
        }
      }
    }
  }
};
</script>

<style lang="scss" src="../styles/createRecord.scss"></style>
