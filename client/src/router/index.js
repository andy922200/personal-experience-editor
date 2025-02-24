import Vue from "vue";
import VueRouter from "vue-router";
import Homepage from "../views/Homepage.vue";
import NotFound from "../views/NotFound.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import Profile from "../views/Profile.vue";
import Record from "../views/Record.vue";
import createRecord from "../views/CreateRecord.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "homepage",
    component: Homepage
  },
  {
    path: "/signIn",
    name: "signIn",
    component: SignIn
  },
  {
    path: "/signUp",
    name: "signUp",
    component: SignUp
  },
  {
    path: "/create",
    name: "createRecord",
    component: createRecord
  },
  {
    path: "/record/:recordId/:userId",
    name: "record",
    component: Record
  },
  {
    path: "/profile/:userId",
    name: "profile",
    component: Profile
  },
  {
    path: "*",
    name: "not-found",
    component: NotFound
  }
];

const router = new VueRouter({
  routes
});

import { Toast } from "./../utils/mixin";

router.beforeEach(async (to, from, next) => {
  const tokenInStore = store.state.token;
  const tokenInLocalStorage = localStorage.getItem("token");
  let isAuthenticated = store.state.isAuthenticated;
  // compare the difference between the local and the store
  // if true, fetchCurrentUser
  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    isAuthenticated = await store.dispatch("fetchCurrentUser");
  }

  if (
    Number(to.params.userId) !== store.state.currentUser.id &&
    to.name === "profile"
  ) {
    Toast.fire({
      icon: "warning",
      title: "You don't have permission."
    });
    return;
  }

  if (!isAuthenticated && (to.name === "profile" || to.name === "record")) {
    next("signIn");
    return;
  }

  if (
    to.name === "record" &&
    store.state.currentUser.id !== Number(to.params.userId)
  ) {
    next("signIn");
    return;
  }
  next();
});

router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router;
