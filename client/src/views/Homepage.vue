<template>
  <div class="container-outside-wrapper">
    <Navbar />
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="homepage">
            <h3 class="landingPage__title">Hello, {{ landingPageName }}</h3>

            <template v-if="currentUser.id !== -1">
              <div class="logInUser">
                <div class="profile_img__wrapper">
                  <img
                    :src="currentUser.profile_img"
                    alt="profile_img"
                    class="profile_img"
                  />
                </div>
                <div class="profile__info">
                  <p>Name : {{ currentUser.name }}</p>
                  <p>Age : {{ currentUser.age }}</p>
                  <p>Email : {{ currentUser.email }}</p>
                </div>
              </div>
            </template>

            <div class="jobRecords">
              <div
                class="person"
                v-for="(person, index) in jobRecords"
                :key="person.id"
              >
                <h4
                  class="person__title"
                  v-if="!isAuthenticated || index !== 0"
                >
                  {{ person.name }}
                </h4>
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
                          <b-button pill variant="primary">Edit</b-button>
                        </router-link>
                        <b-button pill href="#" variant="danger"
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
    ...mapActions("jobRecords", ["getJobRecords"])
  }
};
</script>

<style lang="scss" src="../styles/homepage.scss"></style>
