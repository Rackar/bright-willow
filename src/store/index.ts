import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    temp: {
      ifTemp: false,
      title: "",
      content: ""
    },
    token: "",
    userid: "",
    username: "",
    currentPerson: {
      articles: [],
      name: "",
      _id: "",
      info: ""
    }
  },
  mutations: {
    login_saveToken(state, token: string) {
      let userinfo = setUserIdAndNameFormToken(token.split(" ")[1]);
      state.userid = userinfo.userid;
      state.username = userinfo.username;
      // state.token = 'Bearer ' + token
      state.token = token;
      window.localStorage.setItem("token", state.token);
      function parseJwt(token: string) {
        var base64Url = token.split(".")[1];
        var base64 = decodeURIComponent(
          atob(base64Url)
            .split("")
            .map(function(c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );

        return JSON.parse(base64);
      }
      function setUserIdAndNameFormToken(token: string) {
        let payloadInfo = parseJwt(token);
        let result = {
          userid: payloadInfo.userid,
          username: payloadInfo.username
        };
        return result;
      }
    },

    logout_delToken(state) {
      state.token = "";
      window.localStorage.removeItem("token");

      // console.log(dd);
      state.userid = "";
      state.username = "";
    },
    saveTempContent(state, data) {
      state.temp.title = data.title;
      state.temp.content = data.content;
      state.temp.ifTemp = true;
    },
    setCurrentPerson(state, data) {
      state.currentPerson = data;
    }
  },
  actions: {},
  modules: {}
});
