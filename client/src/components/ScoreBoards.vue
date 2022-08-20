<template>
  <div>
    <div class="d-flex mb-2">
      <input type="text" id="boardName" aria-label="Board Name" placeholder="Board Name" class="form-control">
      <button @click="createBoard()" class="btn btn-primary ml-2">Create Board</button>
    </div>

    <table
      data-toggle="table"
      data-search="true"
      class="table table-hover"
      id="boardsTable">
      <thead class="header">
        <tr>
          <th data-sortable="true">ID</th>
          <th data-sortable="true">Name</th>
          <th data-sortable="false"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="board in boards" :key="board.id">
            <td class="smcol">{{ board.id }}</td>
            <td>{{ board.name }}</td>
            <td><button class="btn btn-primary" @click="goToBoard(board.id)">Go</button></td>
        </tr>
      </tbody>
    </table>
    
  </div>
</template>

<script>
// import { mapActions, mapMutations, mapGetters, mapState } from "vuex";
import BoardDataService from "../services/BoardDataService.js";

export default {
  components: {   },
  name: "ScoreBoards",
  data() {
    return {
      boards: [],
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

  },
  methods: {
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