<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Wordlers</router-link>
      <!-- <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/board/1" class="nav-link">Board</router-link>
        </li>
      </div> -->
    </nav>    
    <div id="main" class="inner-content container mt-3">
      <transition name="fade">
        <router-view />
      </transition>
    </div>
  </div>
  <div id="modal"></div>
</template>

<script>

import { mapActions, mapMutations, mapGetters, mapState } from "vuex";
// import ScoreBoards from './components/ScoreBoards.vue'
import BoardDataService from "./services/BoardDataService.js";
// import User from "./models/User.js";

export default {
  name: "app",
  components: {
    // ScoreBoards
  },
  data() {
    return {
      connected: false,
      connectId: '',
    };
  },
  sockets: {
    connect() {
        this.connected = true;
    },
    connectId(connectId) {
        this.connectId = connectId;
    },
    disconnect() {
        this.connected = false;
        alert('Oops, something has gone wrong. You have been disconnected from the game.')
    },
    // newUserJoined(data) {
    //     this.updateUsers(data[2]);
    //     if (data[0].id !== this.userId) {
    //         this.addNotification(data[0].name + " has just joined.");
    //     } else {
    //         // this.initialize();
    //     }
    // },
    // disconnectUser(userId) {
    //     this.removeUser(userId)
    //     const user = this.getUserIndexById(userId);
    //     this.addNotification(user.name + " has left.");
    // },
    // updatedUsersList(users) {
    //     this.updateUsers(users);
    // }
  },
  computed: {
    // ...mapState(["users"]),
    // ...mapGetters(["getUsers", "getNotifications", "getActiveUserIndex", "getUserIndexById"]),
    // activeUser() {
    //   return this.users[this.getActiveUserIndex];
    // }
  },
  methods: {
    // ...mapActions(["initialize"]),
    // ...mapMutations(["addUser", "removeUser", "addNotification", "updateUsers", "setActiveUserId"]),

    updateUsers(serverUsers) {
        let removedUsers = this.getUsers.filter((p) =>
            serverUsers.findIndex((s) => s.id === p.id)
        );
        for (let user of removedUsers) {
            this.removeUser(user.id);
        }
        for (let i = 0; i < serverUsers.length; i++) {
            let userFromServer = serverUsers[i];
            if (!this.userExists(userFromServer)) {
                // this.addUser(new User(userFromServer.name, userFromServer.id, userFromServer.roomId));
            }
        }
    },
    userExists(userFromServer) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === userFromServer.id) {
                return true;
            }
        }
        return false;
    },
    createUser(name) {
        const newUser = new User(name, this.userId, this.roomId);
        this.addUser(newUser);
        this.setActiveUserId(this.userId);
        this.$socket.emit("newUserJoined", newUser)
        this.joinedGame = true;
        this.initialize();
    },
    updateScore(user, score) {
        this.$socket.emit("updateScore", user, score);
    }
  },
}
</script>

<style lang="scss">

  /*************** BASE STYLES ***************/
  :root {
      --primary-colour: #89c1d7; //blue
      --secondary-colour: #000511; //black
      --border: solid 3px var(--secondary-colour);
      --accent-colour-1: #f48d24; //orange
      --accent-colour-2: #419e43; //green
      --font-colour: var(--secondary-colour);
      --card-background: white;
  }


  //***************SCROLLBARS***************
  //firefox
  * {
    scrollbar-width: thin;
    scrollbar-color: var(--primary) var(--accent-colour-1);
  }

  //chrome, edge, safari
  *::-webkit-scrollbar {
    width: 10px;
  }
  *::-webkit-scrollbar-track {
    background: var(--accent-colour-1);
  }
  *::-webkit-scrollbar-thumb {
    background-color: var(--primary);
  }

  //***************DRAGGABLE***************
  .ghost {
    opacity: 0.5;
  }

  //***************ANIMATIONS***************
  .scale-back {
    animation: scaleBack .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
  }

  .scale-forward {
    animation: scaleForward .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
  }

  @keyframes scaleBack {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(.96);
    }
  }

  @keyframes scaleForward {
    0% {
      transform: scale(.96);
    }
    100% {
      transform: scale(1);
    }
  }

  .fade-enter-active {
    transition: all 1.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  #app {
    height: 100vh;
    width: 100vw
  }

  .btn.btn-icon {
    padding: 0;
    font-size: 1.8rem;
    line-height: 1.8rem;
    color: var(--primary);
  }

  // .inner-content {
  //   height: 100%;
  // }

  
  // @import url('https://fonts.googleapis.com/css2?family=Roboto&family=Patrick+Hand&family=Comic+Neue:wght@300;400;700&display=swap');
  


  * {
    box-sizing: border-box;
    // font-family: 'Comic Neue', sans-serif;
    font-family: 'Clear Sans', 'Helvetica Neue', Arial, sans-serif;
    // color: var(--font-colour);
    // margin: 0;
    // padding: 0;
  }

  .navbar > a {
    text-transform: uppercase;
  }
  
  // body {
  //     // background-color: var(--primary-colour);
  //     margin: 0;
  // }

  h1, h2, h3, button {
      text-transform: uppercase;
      font-family: 'Patrick Hand', sans-serif;
  }

  h1 {
      font-size: 2.2rem;
      padding-bottom: 5px;
  }

  h2 {
      font-size: 2rem;
      padding-bottom: 5px;
  }

  h3 {
      font-size: 1.5rem;
      padding-bottom: 5px;
  }

  h4 {
      font-size: 1.8rem;
      padding-bottom: 5px;
  }

  p {
      font-size: 1.4rem;
  }

  // ul {
  //     padding-left: 15px;
  // }

  button {
  //     // background: var(--primary-colour);
  //     // font-weight: bold;
  //     // margin: 10px 8px;
  //     // font-size: 1.3rem;
  //     transition: all .2s;
      white-space: nowrap;
  }

  // button, input {
  //     padding: 12px;
  //     border-radius: 6px;
  //     border: var(--border);
  //     border-width: 2px;

  //     &.btn-sm {
  //     padding: 5px 10px;
  //     font-size: 1.2rem;
  //     }

  //     &:focus, &:active {
  //     outline: solid 2px var(--primary-colour);
  //     }
  // }

  button:hover {
      // background-color: var(--accent-colour-1);
      transform: scale(1.01);
  }

  // input {
  //     font-size: 1.6rem;
  //     padding: 11px 12px;
  // }

  // .text-combo {
  //     margin-top: 16px;

  //     input {
  //     width: calc(100% - 122px);
  //     }

  //     button {
  //     margin-right: 0;
  //     }
  // }

  // .flex {
  //     display: flex;
  // }

  // .flex-row {
  //     flex-direction: row;
  //     align-items: center;
  //     justify-content: center;
  // }

  // .flex-col {
  //     flex-direction: column;
  // }

  // .full {
  //     width: 100%;
  //     height:80vh;
  // }

  // .card {
  //     background: var(--card-background);
  //     padding: 20px;
  //     border-radius: 5px;
  //     border: var(--border);
  //     margin-bottom: 10px;
  // }

  // .banner {
  //     background: var(--card-background);
  //     margin: 0 0 10px;
  //     // padding: 20px 0;
  //     width: 100%;
  //     // border-bottom: var(--border);
  //     padding: 20px 0 0;

  //     img {
  //     max-height: 52px;
  //     width: auto;
  //     }
  // }

  // .game {
  //     max-width: 1500px;
  //     margin: 0 auto;
  //     display: flex;
  //     justify-content: center;
  //     align-items: center;

  //     border: var(--border);
  //     border-radius: 5px;
  //     height: calc(100vh - 117px);
  //     margin: 20px;
  //     background: #89c1d738;

  //     .join {
  //     justify-content: center;
  //     align-content: center;
  //     align-items: center;
  //     max-width: 500px;
  //     padding: 30px 45px;
  //     // margin-top: 30px;

  //     }

  //     .game-start button {
  //     margin-left: 0;
  //     }
  // }

  // .pane {
  //     height: 80vh;
  //     overflow-y: auto;
  // }

  // .notification-pane {
  //     width: 30%;
  //     border-left: var(--border);
  //     padding: 0 10px;

  //     button {
  //     padding: 9px;
  //     font-size: 1rem;
  //     }

  //     input {
  //     padding: 8px;
  //     font-size: 1.2rem;
  //     }
  // }

  // .game-pane {
  //     width: 70%;
  //     margin: 0 10px;
  // }

</style>
