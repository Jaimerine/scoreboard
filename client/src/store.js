import { createStore } from 'vuex'
// import * as utils from "./utils"

const store = createStore({
  state: {
    activeUserId: null,
    users: [],
    notifications: [],
  },
  getters: {
    getActiveUserIndex(state) {
      return state.users.findIndex(
        (user) => user.id === state.activeUserId
      );
    },
    getUsers(state) {
      return state.users;
    },
    getNotifications(state) {
      return state.notifications.reverse();
    },
    getUserIndexById: (state) => (userId) => {
      return state.users.findIndex((user) => user.id === userId);
    },
  },
  mutations: {
    addUser(state, user) {
      state.users.push(user);
    },
    setActiveUserId(state, id) {
      state.activeUserId = id;
    },
    removeUser(state, userId) {
      state.users = state.users.filter((user) => user.id !== userId);
    },
    addNotification(state, message) {
      state.notifications.push(message);
    },
  },
  actions: {
    // initialize({ state, commit, getters }) {

    //   commit("addNotification", "test");
    // },
    
  },
});

export default store;
