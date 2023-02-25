<template>
  <div v-cloak>
    <status-loading :loaded="isLoaded">
      <div v-cloak class="card main-card">
        <div class="d-flex mb-4">
          <input type="text" id="boardName" aria-label="Board Name" placeholder="Board Name" class="form-control">
          <button @click="createBoard()" class="btn btn-primary ml-2">Create Board</button>
        </div>
        <h1>Boards</h1>
        <table :style="{visibility: isLoaded ? 'visible' : 'hidden'}"
        data-toggle="table"
        data-search="true"
        class="table table-borderless"
        id="boardsTable">
        <thead class="header">
          <tr>
            <th data-sortable="true">Name</th>
            <th data-sortable="true">Created</th>
            <th data-sortable="true">Updated</th>
            <th data-sortable="false"></th>
          </tr>
          <tr class="empty" aria-hidden="true">
            <td colspan="100"></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="board in boards" :key="board.id">
              <td class="align-middle">{{ board.name }}</td>
              <td class="smcol align-middle">{{ formatDate(new Date(board.createdAt), "PPPP") }}</td>
              <td class="smcol align-middle"><timeago :datetime="new Date(board.updatedAt)"/></td>
              <td class="align-middle"><button class="btn btn-primary" @click="goToBoard(board.id)">Go</button></td>
          </tr>
        </tbody>
      </table>
      </div>
    </status-loading>
  </div>
</template>

<script>
// import { mapActions, mapMutations, mapGetters, mapState } from "vuex";
import BoardDataService from "../services/BoardDataService.js";
import StatusLoading from "../components/StatusLoading.vue";
import { format as formatDate, differenceInSeconds, formatDistance } from 'date-fns';

export default {
  components: {
    StatusLoading
  },
  name: "ScoreBoards",
  data() {
    return {
      boards: [],
      isLoaded: false,
      formatDate: formatDate
    };
  },
  async created() {
    BoardDataService.getAll()
        .then(response => {
          this.boards = response.data;
          console.log("boards", response.data);
        })
        .catch(e => {
          console.log(e);
        });
    setTimeout(()=>{this.isLoaded = true;}, 1000)

  },
  methods: {
    getTimeAgo(date) {
      let diff = differenceInSeconds(new Date(), date);
      let interval = 0;

        const options = {
          addSuffix: true,
          includeSeconds: true
        }

      if (diff < 3600) {
        interval = 60000;
      } else if (diff >= 3600 && diff <= 86400) {
        interval = 3600000;
      } else {
        interval = 0;
      }

      if (interval > 0) {
        setTimeout(() => {
          formatDistance(date, { includeSeconds, addSuffix });
        }, interval);
      }

      if (diff < 30) {
        return 'now';
      } else {
        return formatDistance(date, new Date(), options);
      }

    },
    createBoard() {
      const nameInput = document.getElementById("boardName");
      console.log(nameInput)

      if (!nameInput.value.length) {
        return alert("error");
      }

      const data = {
        name: nameInput.value
      };

      BoardDataService.create(data)
        .then(response => {
          const boardId = response.data.id;
          console.log("boardID", response.data);
          this.goToBoard(boardId);
          this.$socket.emit("boardCreated", boardId);
        })
        .catch(e => {
          console.log(e);
        });
    },
    goToBoard(boardId) {
      this.$router.push({ path: `/board/${boardId}` })
    }
  },
}
</script>

<style lang="scss">

</style>