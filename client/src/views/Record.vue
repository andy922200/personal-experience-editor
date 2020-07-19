<template>
  <div class="container-outside-wrapper">
    <Navbar />
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="jobRecord">
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
              @submit.prevent.stop="handleUpdateJobRecordForm"
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
                  :disabled="form.current_position"
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
                Update
              </button>

              <div class="text-center mb-3">
                <p>
                  <router-link :to="{ name: 'homepage' }">
                    Back
                  </router-link>
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
import moment from "moment";
import _ from "lodash";
import { Toast } from "./../utils/mixin";

export default {
  name: "JobRecord",
  components: { Navbar },
  data() {
    return {
      form: {
        title: "",
        company_name: "",
        company_logo: "",
        start_date: "",
        end_date: "",
        public_status: false,
        description: "",
        current_position: ""
      },
      openAlert: true,
      lastEntriesExisting: false,
      lastEntries: {}
    };
  },
  async created() {
    try {
      let selectedRecordId = this.$route.params.recordId;
      await this.getOneJobRecord(selectedRecordId);
      this.form = {
        ...this.form,
        ...this.selectedJobRecord[0]
      };
      this.checkLastEntries();
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    ...mapGetters(["windowWidth", "today"]),
    ...mapGetters("jobRecords", ["selectedJobRecord", "isUpdating"])
  },
  methods: {
    ...mapActions("jobRecords", ["getOneJobRecord", "updateOneJobRecord"]),

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

      return true;
    },

    async handleUpdateJobRecordForm(event) {
      try {
        const formRawData = event.target;
        const formData = new FormData(formRawData);
        let validationFormResult = await this.validation();

        if (validationFormResult) {
          for (let [name, value] of formData.entries()) {
            console.log(name + ": " + value);
          }
          let fetchingResult = await this.updateOneJobRecord({
            recordId: this.form.id,
            data: formData
          });
          if (fetchingResult) {
            console.log("success");
            // Toast.fire({
            //   icon: "success",
            //   title: "Register Successfully! Please log in again."
            // });
            // this.$router.push({ name: "homepage" });
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
    },
    checkLastEntries() {
      if (localStorage[`editForm${this.form.id}`]) {
        this.lastEntries = JSON.parse(localStorage[`editForm${this.form.id}`]);
        return _.isEqual(this.lastEntries, this.selectedJobRecord[0])
          ? (this.lastEntriesExisting = false)
          : (this.lastEntriesExisting = true);
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
    }
  },
  watch: {
    form: {
      async handler(newVal) {
        if (newVal) {
          localStorage[`editForm${this.form.id}`] = JSON.stringify(newVal);
        }
      },
      deep: true
    },
    "form.current_position": {
      async handler(newVal) {
        return newVal
          ? (this.form.end_date = moment().format("YYYY-MM-DD"))
          : (this.form.end_date = this.selectedJobRecord[0].end_date);
      }
    }
  }
};
</script>

<style lang="scss" src="../styles/record.scss"></style>
