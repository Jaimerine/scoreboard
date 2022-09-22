<template xmlns="http://www.w3.org/1999/html">
  <div>
    <modal v-if="showModal" :player=editingPlayer @handle-update-score="addScore" />

    <status-loading :loaded="isLoaded">
<!--            <rough-svg-->
<!--                width="100vw"-->
<!--                height="300px"-->
<!--            >-->
<!--              <rough-rectangle-->
<!--                  :x1="0"-->
<!--                  :y1="0"-->
<!--                  :x2="600"-->
<!--                  :y2="200"-->
<!--                  :fill="getCssVariable('&#45;&#45;primary-colour')"-->
<!--                  :fill-style="'solid'"-->
<!--                  :roughness="0.5"-->
<!--                  :stroke="getCssVariable('&#45;&#45;secondary-colour')"-->
<!--                  :stroke-width="3"-->
<!--                  :hachureGap="5"-->
<!--                  :bowing="5"-->
<!--              />-->
<!--            </rough-svg>-->


<!--      <rough-bar-->
<!--         :data="[-->
<!--            {month:'Jan', Jaime:20, Molly: 5, Beans: 20},-->
<!--            {month:'Feb', Jaime:25, Molly: 10, Beans: 30},-->
<!--            {month:'Mar', Jaime:25, Molly: 10, Beans: 5},-->
<!--          ]"-->
<!--        :labels="'month'"-->
<!--         :font="1"-->
<!--         stroke="blue"-->
<!--         colors="['black', 'blue', 'grey']"-->
<!--      ></rough-bar>-->

      <table v-cloak data-toggle="table"
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
      <tbody v-for="(player, key) in playerScores"
             :key="key">
        <tr :class="{'detail-view': detailedViewPlayerId===player.id}">
          <td>
              <div class="avatar-container">
                <img src="../assets/arrow-green.svg" alt="arrow" class="arrow"/>
                <span class="avatar">{{ player.name[0] }}</span>{{ player.name }}
              </div>
          </td>
          
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
            <div class="d-flex">
              <button @click="editingPlayer=player; showModal=true"
                class="btn btn-icon btn-primary ml-2" data-bs-toggle="tooltip"
                data-placement="left" title="Add or edit score"
              >
                <font-awesome-icon icon="fas fa-plus fixed-width" />
              </button>
              <button @click="handleDetailedView(player)"
                      class="btn btn-secondary btn-icon ml-2" data-bs-toggle="tooltip"
                      data-placement="left" title="Show more information"
              >
                <font-awesome-icon icon="fas fa-angle-down fixed-width" />
              </button>
            </div>
          </td>
        </tr>
        <tr v-if="detailedViewPlayerId===player.id" class="details">
          <td colspan="100">
            <div class="d-flex flex-row justify-content-between w-100">
              <div class="card w-50 mr-2 ml-2">
                <h3>statistics</h3>
                <ul>
                  <li>total period wins: 4</li>
                  <li>total period wins: 4</li>
                  <li>total period wins: 4</li>
                  <li>total period wins: 4</li>
                </ul>
              </div>
              <apexchart :ref="'chart_' + player.id"
                         class="card score-chart w-50 mr-2 ml-2"
                         width="100%" type="area" :options="chart.options" :series="chart.series" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    </status-loading>

    <div class="d-flex mb-2 mt-5">
      <input type="text" id="userName" aria-label="New Player Name" placeholder="Player Name" class="form-control">
<!--      <rough-button @click="addPlayer()" class="ml-2" btn-text="Add Player" />-->
      <button @click="addPlayer()" class="btn btn-primary ml-2">Add Player</button>
    </div>
  </div>
</template>

<script>
// import { mapActions, mapMutations, mapGetters, mapState } from "vuex";
import UserDataService from "../services/UserDataService.js";
import PlayerDataService from "../services/PlayerDataService.js";
import ScoreDataService from "../services/ScoreDataService.js";
import Modal from "./Modal.vue"
import { format as formatDate, startOfWeek, endOfWeek, eachDayOfInterval, isEqual } from 'date-fns'
import StatusLoading from "./StatusLoading.vue"
import RoughButton from "./elements/RoughButton.vue"

// import {RoughLine, RoughSvg, RoughCanvas, RoughRectangle} from "./rough";
// import { DoughnutChart } from 'vue-chart-3';
// import { Chart, registerables } from "chart.js";
// Chart.register(...registerables);

// import RoughBar from "./rough/RoughBar.vue"

export default {
  components: {
    // RoughBar,
    Modal,
    StatusLoading,
    RoughButton,
    // RoughLine,
    // RoughSvg,
    // RoughRectangle,
    // DoughnutChart,
  },
  name: "ScoreBoard",
  props: {
    id: String
  },
  data() {
    return {
      // testData: {
      //   labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
      //   datasets: [
      //     {
      //       data: [30, 40, 60, 70, 5],
      //       backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
      //     },
      //   ],
      // },
      showModal: false,
      editingPlayer: null,
      detailedViewPlayerId: null,
      boardId: null,
      playerId: null,
      scores: [],
      players: [],
      period: "week",
      isLoaded: false,
      chart: {
        options: {
          chart: {
            type: 'area',
            id: 'score-chart',
            stroke: {
              curve: 'smooth'
            },
            dataLabels: {
              enabled: false
            },
            sparkline: {
              enabled: true,
            },
            zoom: {
              enabled: false
            },
            legend: {
              show: false,
            },
            colors: []
          },
          xaxis: {
            categories: [],
          },
          yaxis: {
            min: 0,
            max: 7,
            floating: false,

          },
          dataLabels: {
            enabled: false,
          }
        },
        series: [{
          name: '',
          data: []
        }]
      },
      playerChart: {}
    };
  },
  sockets: {
    scoreAdded() {
      console.log("scoreAdded")
      this.getScores();
    },
    playerAdded() {
      console.log("playerAdded")
      this.getPlayers();
    },
  },
  computed: {
    windowWidth() {
      return window.innerWidth;
    },
    periods() {
      const today = new Date()
      const startDate = startOfWeek(today, {weekStartsOn: 1});
      const endDate = endOfWeek(today, { weekStartsOn: 1 });
      return eachDayOfInterval({ start: startDate, end: endDate });
    },
    periodsReformatted() {
      return this.periods.map((period) => formatDate(period,'EEE'))
    },
    playerScores() {
      let playerScores = [];
      let playerSeries = [];
      let reformatPeriod = [];
      this.players.forEach(player => {
        //get overall total
        const allScores = this.scores.filter(score => score.playerId === player.id);
        const overallTotal = allScores.reduce((prev, curr) => {
          return prev + (isNaN(curr.score) ? 0 : parseInt(curr.score))
        }, 0);

        //get period scores and total
        let periodScores = {}
        let periodTotal = 0;

        this.playerChart[player.id] = {
          series: [],
          categories: []
        }
        this.periods.forEach(period => {
          reformatPeriod.push(formatDate(period, "EEE"));
          let score = allScores.filter(score => {
            const scoreDate = new Date(score.date);
            scoreDate.setHours(0, 0, 0, 0);
            return isEqual(scoreDate, period);
          })
          periodTotal = periodTotal + (score.length ? score[0].score : 0);
          periodScores[period] = score.length ? score[0].score : ""
          this.playerChart[player.id].series.push(score.length ? score[0].score : 0);
          // this.playerChart[player.id].categories.push(formatDate(period, "EEE"))
          // this.playerChart[player.id].categories.push(period);

        })

        playerSeries.push({
          name: player.name,
          data: this.playerChart[player.id].series
        })

        let playerObj = {};
        playerScores.push(
          playerObj[player.id] = { id: player.id, name: player.name, scores: periodScores, periodTotal: periodTotal, overallTotal: overallTotal }
        )
      })

      const chartColours = [];
      const secondaryColour = this.getCssVariable('--secondary-colour');
      const primaryColour = this.getCssVariable('--primary-colour');
      this.players.forEach((player) => {
        if (player.id !== this.detailedViewPlayerId) {
          chartColours.push(secondaryColour);
        } else {
          chartColours.push(primaryColour);
        }
      })

      if (this.detailedViewPlayerId) {
        const chartRef = 'chart_' + this.detailedViewPlayerId
        if (!this.$refs[chartRef]) {
          //initial chart rendering
          const options = this.chart.options;
          options.xaxis.categories = this.periodsReformatted;
          options.legend = {show: false};
          options.colors = chartColours;
          this.chart.series = playerSeries;
        } else {
          //updates to chart
          this.$refs[chartRef].updateSeries(playerSeries)
          this.$refs[chartRef].chart.updateOptions({
            xaxis: {
              categories: this.periodsReformatted,
            },
            colors: chartColours
          })
        }
      }


      return playerScores;
    },
  },
  mounted() {
    // this.isLoaded = false;
    // let tooltipTriggerList = [].slice.call(
    //   document.querySelectorAll('[data-bs-toggle="tooltip"]')
    // );
    // const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    //     return new Tooltip(tooltipTriggerEl);
    // });
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
  watch: {
    isLoaded(newVal) {
      console.log("Loaded", newVal);
    }
  },
  methods: {
    getCssVariable(name) {
      return getComputedStyle(document.documentElement).getPropertyValue(name);
    },
    lightenHexColour(col, position) {
      const numPlayers = this.players.length;
      const amt = (200 / numPlayers) * position;
      const num = parseInt(col,16);

      let usePound = false;
      if (col[0] === "#") {
        col = col.slice(1);
        usePound = true;
      }

      //red
      let r = (num >> 16) + amt;
      if (r > 255) {
        r = 255;
      } else if(r < 0) {
        r = 0;
      }

      //green
      let g = (num & 0x0000FF) + amt;
      if (g > 255) {
        g = 255;
      } else if(g < 0) {
        g = 0;
      }

      //blue
      let b = ((num >> 8) & 0x00FF) + amt;
      if (b > 255) {
        b = 255;
      } else if(b < 0) {
        b = 0;
      }

      return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    },
    addPlayer() {
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
          // this.goToPlayer(playerId);
          this.$socket.emit("playerAdded", playerId, this.boardId);
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
      this.isLoaded = false;
      console.log(false);
      ScoreDataService.getAllByBoard(this.boardId)
        .then(response => {
          const scoreId = response.data.id;
          console.log("scores", response.data);
          this.scores = response.data;
        })
        .catch(e => {
          console.log(e);
        });
      console.log(true);
      setTimeout(()=>{
        this.isLoaded = true;
      },1000)

    },
    getPlayers() {
      this.isLoaded = false;
      PlayerDataService.getAllByBoard(this.boardId)
        .then(response => {
          console.log("players", response.data);
          this.players = response.data;
        })
        .catch(e => {
          console.log(e);
        });
      this.isLoaded = false;
    },
    handleDetailedView(player) {
      this.editingPlayer = player;
      if (this.detailedViewPlayerId === player.id) {
        //toggle off
        this.detailedViewPlayerId = null;
      } else {
        this.detailedViewPlayerId = player.id;
      }
    },
    formatDate(date, format) {
      //workaround to use format function in template
      return formatDate(date, format)
    },
  },
}
</script>

<style lang="scss">

</style>
