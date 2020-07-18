import Vue from "vue";
import VueRouter from "vue-router";
import Homepage from "../views/Homepage.vue";
import NotFound from "../views/NotFound.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
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
    path: "*",
    name: "not-found",
    component: NotFound
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach(async (to, from, next) => {
  const tokenInStore = store.state.token;
  const tokenInLocalStorage = localStorage.getItem("token");
  let isAuthenticated = store.state.isAuthenticated;
  // compare the difference between the local and the store
  // if true, fetchCurrentUser
  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    isAuthenticated = await store.dispatch("fetchCurrentUser");
  }

  if (!isAuthenticated && to.name === "userFavoriteDrinks") {
    next("signIn");
    return;
  }
  next();
});

// router.afterEach(() => {
//   document
//     .querySelector("body")
//     .setAttribute("style", "background-color: #2F0900");
// });

export default router;
