<template>
  <div class="container-outside-wrapper">
    <Navbar />
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="jobRecord">
            <form class="w-100" @submit.prevent.stop="handleUpdateJobRecordForm">
              <div class="text-center my-3">
                <h1 class="h3 font-weight-normal">{{form.title}} @ {{form.company_name}}</h1>
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
                  required
                  autofocus
                />
              </div>
              
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
                <b-form-radio v-model="form.public_status" name="public_status" :value="true">Yes</b-form-radio>
                <b-form-radio v-model="form.public_status" name="public_status" :value="false">No</b-form-radio>
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
                  <router-link :to="{name:'homepage'}">
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
// import { Toast } from "./../utils/mixin";

export default {
  name: "JobRecord",
  components: { Navbar },
  data(){
    return {
      form:{
        title:"",
        company_name:"",
        company_logo:"",
        start_date: "",
        end_date: "",
        public_status:false,
        description:""
      }
    }
  },
  async created() {
    try{  
      let selectedRecordId = this.$route.params.recordId;
      await this.getOneJobRecord(selectedRecordId);
      this.form = {
        ...this.form,
        ...this.selectedJobRecord[0]
      };
    }catch(err){
      console.log(err)
    }
  },
  computed: {
    ...mapGetters(["windowWidth"]),
    ...mapGetters("jobRecords", ["selectedJobRecord","isUpdating"]),
  },
  methods: {
    ...mapActions("jobRecords", ["getOneJobRecord"]),
    handleUpdateJobRecordForm(event){
      const formRawData = event.target;
      const formData = new FormData(formRawData);
      for (let [name, value] of formData.entries()) {
        console.log(name + ': ' + value)
      }
    }
  }
};
</script>

<style></style>
