import { jobRecordsAPI } from "../../utils/apis";
import _ from "lodash";
import moment from "moment";

const data = {
  namespaced: true,

  state: {
    jobRecords: [],
    fetchingData: false
  },

  getters: {
    jobRecords: state => state.jobRecords,
    fetchingData: state => state.fetchingData
  },

  mutations: {
    setJobRecords(state, data) {
      state.jobRecords = data;
    },
    setFetchingData(state, status) {
      state.fetchingData = status;
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

        let currentUserData = tempResult.filter(item => item.id === currentUserId);
        let otherUsersData = tempResult.filter(item => item.id !== currentUserId);
        finalResult = [...currentUserData, ...otherUsersData];

        commit("setJobRecords", finalResult);
        commit("setFetchingData", false);
      } catch (err) {
        console.log(err);
        commit("setFetchingData", false);
      }
    }
  }
};

export default data;
