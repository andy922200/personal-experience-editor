import { jobRecordsAPI } from "../../utils/apis";
import _ from "lodash";
import moment from "moment";

const data = {
  namespaced: true,

  state: {
    jobRecords: [],
    selectedJobRecord: [],
    fetchingData: false,
    isUpdating: false
  },

  getters: {
    jobRecords: state => state.jobRecords,
    selectedJobRecord: state => state.selectedJobRecord,
    fetchingData: state => state.fetchingData,
    isUpdating: state => state.isUpdating
  },

  mutations: {
    setJobRecords(state, data) {
      state.jobRecords = data;
    },
    setSelectedJobRecord(state, data) {
      state.selectedJobRecord = data;
    },
    setFetchingData(state, status) {
      state.fetchingData = status;
    },
    setIsUpdating(state, status) {
      state.isUpdating = status;
    }
  },

  actions: {
    async getJobRecords({ commit }, currentUserId) {
      try {
        commit("setFetchingData", true);

        let {
          statusText,
          data: { data: rawData }
        } = await jobRecordsAPI.getJobRecords(currentUserId);

        if (statusText !== "OK") {
          throw new Error();
        }

        let groupByData = _.groupBy(rawData, "UserId");
        let keys = Object.keys(groupByData);
        let tempResult = [];
        let finalResult = [];

        for (let i = 0; i < keys.length; i++) {
          let set = {};
          set.id = groupByData[keys[i]][0]["UserId"];
          set.name = groupByData[keys[i]][0].User.name;

          let formattedData = groupByData[keys[i]].map(d => {
            let formattedOneObject = { ...d };
            formattedOneObject.start_date = moment(
              formattedOneObject.start_date
            ).format("YYYY-MM-DD");
            formattedOneObject.end_date = d.current_position
              ? moment().format("YYYY-MM-DD")
              : moment(formattedOneObject.end_date).format("YYYY-MM-DD");
            return formattedOneObject;
          });

          let sortedData = formattedData.sort((a, b) => {
            return a.end_date > b.end_date ? -1 : 1;
          });

          set.data = sortedData;
          tempResult.push(set);
        }

        let currentUserData = tempResult.filter(
          item => item.id === currentUserId
        );
        let otherUsersData = tempResult.filter(
          item => item.id !== currentUserId
        );
        finalResult = [...currentUserData, ...otherUsersData];

        commit("setJobRecords", finalResult);
        commit("setFetchingData", false);
      } catch (err) {
        console.log(err);
        commit("setFetchingData", false);
      }
    },

    async getOneJobRecord({ commit }, recordId) {
      try {
        commit("setFetchingData", true);

        let {
          statusText,
          data: { data: rawData }
        } = await jobRecordsAPI.getOneJobRecord(recordId);

        if (statusText !== "OK") {
          throw new Error();
        }

        let formattedResult = { ...rawData };

        formattedResult.start_date = moment(formattedResult.start_date).format(
          "YYYY-MM-DD"
        );

        formattedResult.end_date = formattedResult.current_position
          ? moment().format("YYYY-MM-DD")
          : moment(formattedResult.end_date).format("YYYY-MM-DD");

        commit("setSelectedJobRecord", [formattedResult]);
        commit("setFetchingData", false);
      } catch (err) {
        console.log(err);
        commit("setFetchingData", true);
      }
    },

    async updateOneJobRecord({ commit }, dataSet) {
      try {
        commit("setIsUpdating", true);
        let {
          statusText,
          data: { data: rawData }
        } = await jobRecordsAPI.putOneJobRecord(dataSet);

        if (statusText !== "OK") {
          throw new Error();
        }

        console.log("rawData", rawData);

        commit("setIsUpdating", false);
      } catch (err) {
        console.log(err);
        commit("setIsUpdating", false);
      }
    }
  }
};

export default data;
