<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark">
      <router-link to="/" class="navbar-brand">
        <img src="./assets/scorecard-logo.svg" alt="scorecard logo" class="logo"/>
      </router-link>
    </nav>    
    <div id="main" class="inner-content container mt-3">
      <transition name="fade">
        <router-view />
      </transition>
    </div>
    <footer>
        <p>made with <font-awesome-icon icon="fa-solid fa-heart" /> by aunty jammy</p>
    </footer>
  </div>
  <div id="modal"></div>
</template>

<script>

import { mapActions, mapMutations, mapGetters, mapState } from "vuex";

export default {
  name: "app",
  components: {
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
        alert('Oops, something has gone wrong. Please try refreshing the page.')
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

    // updateUsers(serverUsers) {
    //     let removedUsers = this.getUsers.filter((p) =>
    //         serverUsers.findIndex((s) => s.id === p.id)
    //     );
    //     for (let user of removedUsers) {
    //         this.removeUser(user.id);
    //     }
    //     for (let i = 0; i < serverUsers.length; i++) {
    //         let userFromServer = serverUsers[i];
    //         if (!this.userExists(userFromServer)) {
    //             // this.addUser(new User(userFromServer.name, userFromServer.id, userFromServer.roomId));
    //         }
    //     }
    // },
    // userExists(userFromServer) {
    //     for (let i = 0; i < this.users.length; i++) {
    //         if (this.users[i].id === userFromServer.id) {
    //             return true;
    //         }
    //     }
    //     return false;
    // },
    // createUser(name) {
    //     const newUser = new User(name, this.userId, this.roomId);
    //     this.addUser(newUser);
    //     this.setActiveUserId(this.userId);
    //     this.$socket.emit("newUserJoined", newUser)
    //     this.joinedGame = true;
    //     this.initialize();
    // },
    // updateScore(user, score) {
    //     this.$socket.emit("updateScore", user, score);
    // }
  },
}
</script>

<style lang="scss">

  .logo {
    height: 50px;
    padding-bottom: 7px;
  }

  //***************SCROLLBARS***************
  //firefox
  * {
    scrollbar-width: thin;
    scrollbar-color: var(--primary-colour) var(--secondary-colour);
  }

  //chrome, edge, safari
  *::-webkit-scrollbar {
    width: 10px;
  }
  *::-webkit-scrollbar-track {
    background: var(--secondary-colour);
  }
  *::-webkit-scrollbar-thumb {
    background-color: var(--primary-colour);
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
    background-color: var(--background-colour);
    //background-image: url("./assets/natural-paper.png");
  }

  //buttons
  button.btn {
    white-space: nowrap;

    &:hover {
      border-color: transparent;
      transform: scale(1.03);
    }

    &.btn-primary {
      color: var(--font-colour-light);

      &:hover {
        background-color: darken($primary, 5%);
      }
    }

    &.btn-secondary {
      &:focus, &:active {
        background-color: $secondary;
      }

      &:hover {
        background-color: darken($secondary, 5%);
      }

      &.btn-icon.btn-table:hover {
        background-color: scale-color($secondary, $lightness: 80%) !important;
      }
    }

    &.btn-icon {
      border-color: transparent;
      font-size: 1.2rem;
      line-height: 0;
      width: 1.6rem;
      height: 1.6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      padding: .9rem;
      transition: none;
      &:hover {
        transform: scale(1.05);
      }

      @include media-breakpoint-down(sm) {
        font-size: .9rem !important;
      }
    }
  }

   .inner-content.container {
     max-width: 90vw;
     @include media-breakpoint-up(xxl) {
       max-width: 1200px;
     }
     @include media-breakpoint-down(md) {
       max-width: 95vw;
     }
     @include media-breakpoint-down(sm) {
       max-width: 100vw;
     }
   }

   @import url("https://use.typekit.net/dmu7pgf.css");

  * {
    box-sizing: border-box;
    font-family: aaux-next, sans-serif;
    font-style: normal;
    font-weight: 400;
    line-height: 1.2;
  }

  body, .apexcharts-text, .form-control, button.btn {
    font-size: 1.2rem !important;
    @include media-breakpoint-down(md) {
      font-size: 1.1rem !important;
    }
    @include media-breakpoint-down(sm) {
      font-size: 1rem !important;
    }
  }

  .apexcharts-text {
    font-size: 1rem !important;
    font-family: aaux-next, sans-serif !important;
    font-style: normal;
    font-weight: 300;
  }

  .btn, input::placeholder, .header, .apexcharts-text, .modal-body {
    text-transform: lowercase !important;
  }

  #main {
    margin-top: -70px !important;

    @include media-breakpoint-down(sm) {
      padding-right: 0;
      padding-left: 0;
    }
  }

  #app .card {
    border-radius: .5rem;
    border: 3px solid var(--secondary-colour);
    background-color: var(--background-colour);

    &.main-card {
      border: 5px solid var(--secondary-colour);

      @include media-breakpoint-down(sm) {
        padding: .5rem;
      }
    }

    @include media-breakpoint-down(sm) {
      padding: .5rem;
    }
  }

  #app .navbar {
    height: 162px;

    &.navbar-expand {
      align-items: flex-start;
    }

    & > .navbar-brand {
      margin-top: 12px;
    }

    & > a {
      text-transform: lowercase;
      font-size: 1.7rem;
    }

    &.navbar-dark {
      background-color: var(--secondary-colour)
    }
  }

  //tables
  table.table {
    td, th {
      padding: 0.5rem;

      @include media-breakpoint-down(xs) {
        padding: 0.2rem;
      }
    }

    thead th {
      font-size: 1.4rem;
      line-height: 1.2;
      border-bottom: solid 3px var(--primary);

      @include media-breakpoint-down(xs) {
        font-size: 1.2rem;
      }
    }

    border-collapse: separate;
    border-spacing: 0;

    tr.empty td {
      padding: 4px 0;
    }

    tr:not(.empty) {
      &:hover, &:focus, &:active, &.detail-view {
        .avatar-container .arrow {
          display: inline;
        }

        & > td:not(.score-cell):not(.details-cell) {
          color: var(--font-colour-light);
        }
      }

      td {
        border-top: solid 3px transparent;
        border-bottom: solid 3px transparent;
        padding: 10px;

        @include media-breakpoint-down(sm) {
          padding: 3px;
        }

        &:first-child {
          border-top-left-radius: 0.5rem;
          border-bottom-left-radius: 0.5rem;
          border-left: solid 3px transparent;
        }

        &:last-child {
          border-top-right-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          border-right: solid 3px transparent;
        }
      }
    }

    tr:hover:not(.empty), tr.detail-view, tr.details {
      .btn-secondary {
        background-color: var(--font-colour-light);
        color: var(--font-colour);
      }

      td {
        transition: color .3s, background-color .4s;
        background-color: var(--secondary-colour);

        &.score-cell {
          line-height: 1rem;
        }

        & .avatar.target {
          outline-color: var(--font-colour-light);
          background: var(--font-colour-light);
          color: var(--font-colour);
        }

        & span.player-name {
          color: var(--font-colour-light);
        }
      }
    }

    tr.details:not(.empty) td {
      background-color: var(--secondary-colour) !important;
      border-top: none;
      border-top-left-radius: 0;
      border-top-right-radius: 0;

      & > div .card {
        width: 50%;
        &.chart-average {
          margin-right: .5rem;
          margin-left: 1rem;
        }
        &.chart-period {
          margin-left: .5rem;
          margin-right: 1rem;
        }

        @include media-breakpoint-down(sm) {
          flex-wrap: wrap;
          width: 100%;
        }
      }
    }

    tr.detail-view:not(.empty) td {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  //target (avatar & scores)
  .target {
    border-radius: 50%;
    margin: 10px 20px 10px 10px;
    height: 2.3rem;
    width: 2.3rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: var(--secondary-colour);
    text-transform: lowercase;
    outline: solid 3px var(--secondary-colour);
    outline-offset: 6px;

    @include media-breakpoint-down(sm) {
      &.avatar {
        margin: 6px 12px 6px 6px;
      }
      height: 2rem;
      width: 2rem;
      outline-offset: 4px;
    }

    @include media-breakpoint-down(xs) {
      height: 1.6rem;
      width: 1.6rem;
      outline-offset: 3px;
    }

    &.score {
      margin: 0 2px;
      //height: 2.3rem;
      //width: 2.3rem;
      background: var(--primary-colour-light15);
      outline-color: var(--primary-colour-light15);
    }

    &.avatar {
      color: var(--font-colour-light);
    }
  }

  .avatar-container {
    position: relative;
    display: flex;

    .arrow {
      display: none;
      position: absolute;
      //transform: rotate(275deg);
      height: 3.8rem;
      left: -2.1rem;
      top: -2.6rem;
      animation-name: arrow;
      animation-duration: .3s;
      animation-fill-mode: forwards
    }
  }

  .avatar-container-inner {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 300px;
    min-width: 150px;

    @include media-breakpoint-down(sm) {
      max-width: 150px;
    }

    @include media-breakpoint-down(xs) {
      max-width: 150px;
    }
  }

  #app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    .card {
      background: var(--background-colour);
      border: 3px solid var(--secondary-colour);
      padding: 1rem;
      border-radius: 1.2rem;
    }

    h1 {
      font-size: 2.5rem;

      @include media-breakpoint-down(md) {
        font-size: 2rem !important;
      }
      @include media-breakpoint-down(sm) {
        font-size: 1.8rem !important;
      }
    }

    h1, h2, h3, h4, footer {
      text-transform: lowercase;
    }

    h2 {
        font-size: 2rem;

      @include media-breakpoint-down(md) {
        font-size: 1.8rem !important;
      }
      @include media-breakpoint-down(sm) {
        font-size: 1.6rem !important;
      }
    }

    h3 {
        font-size: 1.5rem;
      @include media-breakpoint-down(md) {
        font-size: 1.4rem !important;
      }
      @include media-breakpoint-down(sm) {
        font-size: 1.3rem !important;
      }
    }

    h4 {
        font-size: 1.2rem;
    }

    .editable-cell {
      &:not(.form-control) {
        caret-color: transparent;
        &:not(.score) {
          outline: none;
        }
      }
      &.form-control {
        color: var(--font-colour);
        display: inline;
        margin-right: 4px;
        &.score {
          display: inline-block;
        }
      }
      &:hover {
        cursor: pointer;
      }
    }

    .sort-arrows {
      & > .sort-arrow {
        margin-bottom: -.9rem;
        height: 1.5rem;
        cursor: pointer;
        &.selected {
          color: var(--primary-colour);
        }
      }
    }

    footer {
      .fa-heart {
        color: var(--primary-colour);
      }
      p {
        margin: 0;
      }
      display: flex;
      justify-content: center;
      width: 100%;
      background: var(--secondary);
      color: white;
      padding: 20px;
      margin-top: auto;
    }
  }

  //@keyframes arrow {
  //  0%,
  //  100% {
  //    left: calc(50% - 75%);
  //    transform: rotateZ(275deg);
  //  }
  //  21% {
  //    left: calc(50% - 170px);
  //  }
  //  24%, 79% {
  //    left: calc(100% - 350px);
  //    transform-origin: right;
  //    transform: rotateZ(275deg);
  //  }
  //  80%, 82%, 84% {
  //    transform-origin: right;
  //    transform: rotateZ(200deg);
  //    left: calc(100% - 305px);
  //  }
  //  81%, 83%, 85% {
  //    transform-origin: right;
  //    transform: rotateZ(200deg);
  //    left: calc(100% - 305px);
  //  }
  //  86%, 95% {
  //    transform-origin: right;
  //    transform: rotateZ(275deg);
  //    left: calc(100% - 305px);
  //  }
  //}

  //@keyframes arrow {
  //  0% {
  //    left: -80px;
  //  }
  //  100% {
  //    left: -40px;
  //    top: -40px;
  //  }
  //}

</style>
