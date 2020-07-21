import Vue from "vue";
import Vuex from "vuex";
import jobRecords from "./modules/jobRecords";

import moment from "moment";
import { usersAPI } from "./../utils/apis";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    windowWidth: 0,
    windowHeight: 0,
    today: moment().format("YYYY-MM-DD"),
    isValidatingUser: false,
    isAuthenticated: false,
    isRegistering: false,
    currentUser: {
      id: -1,
      name: "",
      email: ""
    },
    token: ""
  },
  getters: {
    windowWidth: state => state.windowWidth,
    windowHeight: state => state.windowHeight,
    today: state => state.today,
    isValidatingUser: state => state.isValidatingUser,
    isRegistering: state => state.isRegistering,
    isAuthenticated: state => state.isAuthenticated,
    currentUser: state => state.currentUser,
    token: state => state.token
  },
  mutations: {
    setWindowWidth(state, value) {
      state.windowWidth = value;
    },
    setWindowHeight(state, value) {
      state.windowHeight = value;
    },
    setIsRegistering(state, status) {
      state.isRegistering = status;
    },
    setIsValidatingUser(state, status) {
      state.isValidatingUser = status;
    },
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      };
      state.token = localStorage.getItem("token");
      state.isAuthenticated = true;
    },
    revokeAuthentication(state) {
      state.currentUser = {
        id: -1,
        name: "",
        email: ""
      };
      state.isAuthenticated = false;
      state.token = "";
      localStorage.removeItem("token");
    }
  },
  actions: {
    async signIn({ commit }, logInForm) {
      try {
        commit("setIsValidatingUser", true);

        let { statusText, data } = await usersAPI.signIn(logInForm);

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error();
        }

        localStorage.setItem("token", data.token);
        commit("setCurrentUser", data.user);

        commit("setIsValidatingUser", false);
        return true;
      } catch (err) {
        console.log(err);
        commit("setIsValidatingUser", false);
        return false;
      }
    },
    async signUp({ commit }, registerForm) {
      try {
        commit("setIsRegistering", true);
        let { statusText, data } = await usersAPI.signUp(registerForm);

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error();
        }

        commit("setIsRegistering", false);
        return true;
      } catch (err) {
        console.log(err);
        commit("setIsRegistering", false);
        return false;
      }
    },
    async updateProfile({ commit, dispatch }, formWithUserIdObject) {
      try {
        commit("setIsRegistering", true);
        let { statusText, data } = await usersAPI.putUser(formWithUserIdObject);

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error();
        }

        dispatch("fetchCurrentUser");
        commit("setIsRegistering", false);
        return true;
      } catch (err) {
        console.log(err);
        commit("setIsRegistering", false);
        return false;
      }
    },
    async fetchCurrentUser({ commit }) {
      try {
        const { data, statusText } = await usersAPI.getCurrentUser();

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        // change the state by commit and the response
        localStorage.setItem("token", data.token);
        commit("setCurrentUser", data.user);

        return true;
      } catch (err) {
        console.log(err);
        commit("revokeAuthentication");
        return false;
      }
    }
  },
  modules: {
    jobRecords
  }
});
