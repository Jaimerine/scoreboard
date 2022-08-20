<template>
  <div>
  
    <Modal v-if="showModal" :player=editingPlayer @handle-update-score="addScore" />

    <table data-toggle="table"
      data-search="true"
      class="table table-hover mt-5"
      id="boardsTable"
    >
      <thead class="header">
        <tr>
          <th class="text-left">
            <span class="sr-only">Player</span>
          </th>
          <th class="text-center" v-for="(col, index) in periods" :key="index">
            {{ period === "week" ? formatDate(col,"EEE") : null }}
          </th>
          <th class="text-center"> 
            Week Total
          </th>
          <th class="text-center"> 
            Overall Total
          </th>
          <th class="text-center">
            <span class="sr-only">Add score</span>
          </th> 
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(player, key) in playerScores"
          :key="key"
        >
          <td>{{ player.name }}</td>
          
          <td class="text-center" v-for="(score, index) in player.scores" key="index">
            {{ score }}
          </td>

          <td class="text-center">
            {{ player.periodTotal }}
          </td>

          <td class="text-center">
            {{ player.overallTotal }}
          </td>

          <td class="text-center">
            <button @click="editingPlayer=player; showModal=true" 
              class="btn btn-icon ml-2" 
              v-tooltip data-placement="left" title="Add or edit score"
            >
              <font-awesome-icon icon="fas fa-plus-square" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="d-flex mb-2 mt-5">
      <input type="text" id="userName" aria-label="New Player Name" placeholder="Player Name" class="form-control">
      <button @click="createPlayer()" class="btn btn-primary ml-2">Add Player</button>
    </div>
  </div>
</template>

<script>
// import { mapActions, mapMutations, mapGetters, mapState } from "vuex";
import UserDataService from "../services/UserDataService.js";
import PlayerDataService from "../services/PlayerDataService.js";
import ScoreDataService from "../services/ScoreDataService.js";
import Modal from "../components/Modal.vue"
import { format as formatDate, startOfWeek, endOfWeek, eachDayOfInterval, isEqual } from 'date-fns'

export default {
  components: {
    Modal
  },
  name: "ScoreBoard",
  props: {
    id: String
  },
  data() {
    return {
      showModal: false,
      editingPlayer: null,
      boardId: null,
      playerId: null,
      scores: [],
      players: [],
      period: "week"
    };
  },
  sockets: {
    scoreAdded() {
      console.log("scoreAdded")
      this.getScores();
    },
  },
  computed: {
    periods() {
      const today = new Date()
      const startDate = startOfWeek(today, {weekStartsOn: 1});
      const endDate = endOfWeek(today, { weekStartsOn: 1 });
      return eachDayOfInterval({ start: startDate, end: endDate });
    },
    playerScores() {
      let playerScores = [];
      this.players.forEach(player => {
        //get overall total
        const allScores = this.scores.filter(score => score.playerId === player.id);
        const overallTotal = allScores.reduce((prev, curr) => {
          return prev + (isNaN(curr.score) ? 0 : parseInt(curr.score))
        }, 0);

        //get period scores and total
        let periodScores = {}
        let periodTotal = 0;
        this.periods.forEach(period => {
          let score = allScores.filter(score => {
            const scoreDate = new Date(score.date);
            scoreDate.setHours(0, 0, 0, 0);
            return isEqual(scoreDate, period);
          })
          periodTotal = periodTotal + (score.length ? score[0].score : 0);
          periodScores[period] = score.length ? score[0].score : ""
        })

        let playerObj = {};
        playerScores.push(
          playerObj[player.id] = { id: player.id, name: player.name, scores: periodScores, periodTotal: periodTotal, overallTotal: overallTotal }
        )
      })
      return playerScores;
    }
  },
  async created() {
    if (!this.id) {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const boardId = urlParams.get('board');
      
      if (boardId) {
        this.boardId = boardId;
      } else {
        //TODO: friendly error, board not found
      }
    } else {
      this.boardId = this.id;
    }
    this.$socket.emit("joinBoard", this.boardId)
    this.getPlayers();
    this.getScores();
  },
  methods: {
    createPlayer() {
      const nameInput = document.getElementById("userName");

      if (!nameInput.value.length) {
        return alert("error");
      }

      const data = {
        name: nameInput.value,
        boardId: this.id,
        userId: null //TODO
      };

      PlayerDataService.create(data)
        .then(response => {
          const playerId = response.data.id;
          console.log("playerID", response.data);
          this.playerId = playerId;
          this.goToPlayer(playerId);
          this.$socket.emit("playerCreated", playerId, this.boardId);
        })
        .catch(e => {
          console.log(e);
        });
    },
    goToPlayer(playerId) {
      this.$router.push({ path: `${this.boardId}/player/${playerId}` })
    },
    addScore(score = null, date = null) {
      if (score !== null && date !== null) {
        console.log("player",this.editingPlayer)
        //update score
        const data = {
          score: parseInt(score),
          playerId: this.editingPlayer.id,
          boardId: this.id,
          date: new Date(date)
          // date: new Date().toISOString().slice(0, 10)
        };

        ScoreDataService.create(data)
          .then(response => {
            const scoreId = response.data.id;
            console.log("scoreId", response.data);
            this.$socket.emit("scoreAdded", scoreId, this.editingPlayer, this.boardId);
          })
          .catch(e => {
            console.log(e);
          });
      }

      this.showModal = false;

      
    },
    getScores() {
      ScoreDataService.getAllByBoard(this.boardId)
        .then(response => {
          const scoreId = response.data.id;
          console.log("scores", response.data);
          this.scores = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getPlayers() {
      PlayerDataService.getAllByBoard(this.boardId)
        .then(response => {
          console.log("players", response.data);
          this.players = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    formatDate(date, format) {
      //workaround to use format function in template
      return formatDate(date, format)
    }
  },
}
</script>

<style lang="scss">

</style>
