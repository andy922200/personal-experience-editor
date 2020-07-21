<template>
  <div class="container-outside-wrapper">
    <Navbar />
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="homepage">
            <h3 class="landingPage__title">Hello, {{ landingPageName }}</h3>

            <div class="jobRecords">
              <div class="person" v-for="person in jobRecords" :key="person.id">
                <h4
                  class="person__title"
                  v-if="!isAuthenticated || currentUser.id !== person.id"
                >
                  {{ person.name }}
                </h4>

                <template>
                  <div class="logInUser">
                    <div class="profile_img__wrapper">
                      <img
                        :src="person.profile_img"
                        alt="profile_img"
                        class="profile_img"
                      />
                    </div>
                    <div class="profile__info">
                      <p>Age : {{ person.age }}</p>
                      <p>Email : {{ person.email }}</p>
                    </div>
                  </div>
                  <div class="addRecord" v-if="currentUser.id === person.id">
                    <router-link :to="{ name: 'createRecord' }">
                      <b-button pill variant="primary"
                        >Add a new experience</b-button
                      >
                    </router-link>
                  </div>
                </template>

                <div class="cards">
                  <b-card
                    v-for="record in person.data"
                    :key="record.id"
                    :title="record.title"
                    img-alt="Image"
                    img-top
                    tag="article"
                    class="card__custom mb-2"
                  >
                    <b-card-text>
                      <div class="person__detail">
                        <p class="workPeriod">
                          From {{ record.start_date }}
                          {{
                            record.current_position
                              ? "until now"
                              : `to ${record.end_date}`
                          }}
                          <span
                            class="workPeriod__star"
                            v-if="record.current_position"
                            >*</span
                          >
                        </p>
                        <div class="company__info">
                          <img
                            :src="record.company_logo"
                            alt="company_logo"
                            width="80"
                            height="80"
                          />
                          <span class="company__name">{{
                            record.company_name
                          }}</span>
                        </div>
                        <h6 class="person__description">Description</h6>
                        <p>{{ record.description }}</p>
                      </div>
                    </b-card-text>

                    <template
                      v-slot:footer
                      v-if="isAuthenticated && currentUser.id === person.id"
                    >
                      <div class="button-group">
                        <router-link
                          :to="{
                            name: 'record',
                            params: {
                              userId: currentUser.id,
                              recordId: record.id
                            }
                          }"
                        >
                          <b-button pill variant="secondary">Edit</b-button>
                        </router-link>
                        <b-button
                          pill
                          variant="danger"
                          @click="
                            triggerDeleteRecord({
                              userId: currentUser.id,
                              recordId: record.id
                            })
                          "
                          >Delete</b-button
                        >
                      </div>
                    </template>
                  </b-card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import { mapGetters, mapActions } from "vuex";
import { Toast } from "./../utils/mixin";

export default {
  name: "Homepage",
  components: { Navbar },
  created() {
    if (this.currentUser.id !== -1) {
      this.getJobRecords(this.currentUser.id);
    } else {
      this.getJobRecords("default");
    }
  },
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"]),
    ...mapGetters("jobRecords", ["jobRecords"]),
    landingPageName() {
      return this.currentUser.id === -1 ? "Anonymous" : this.currentUser.name;
    }
  },
  methods: {
    ...mapActions("jobRecords", ["getJobRecords", "deleteOneJobRecord"]),
    async triggerDeleteRecord(idObject) {
      try {
        let fetchingResult = await this.deleteOneJobRecord(idObject);
        if (fetchingResult) {
          Toast.fire({
            icon: "success",
            title: "Delete Successfully!"
          });
          // reload homepage data
          this.getJobRecords(this.currentUser.id);
        } else {
          Toast.fire({
            icon: "warning",
            title: "Something went wrong! Please try again later."
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style lang="scss" src="../styles/homepage.scss"></style>
