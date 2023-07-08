<template xmlns="http://www.w3.org/1999/html">
  <div>
    <modal v-if="showModal" :player=editingPlayer @handle-update-score="addScore" />

    <status-loading :loaded="isLoaded">
      <div v-cloak class="card main-card">
        <div class="top-container d-flex flex-wrap">
          <h1 contenteditable class="editable-cell board-name" role="textbox"
              aria-label="player name"
              @click="handleClickEditableContent($event)"
              @blur="handleEditBoardName($event)"
              @keyup.enter="handleEditBoardName($event)"
          >
            {{ board ? board.name : "" }}
          </h1>
          <div class="period-container d-flex align-items-center mb-1 ml-auto">
            <h4 class="mb-0 period-text">
                <span><strong>current week: </strong></span>
                <span>{{
                  formatDate(periodStart,"PP") + " - " +
                  formatDate(periodEnd,"PP")
                }}</span>
            </h4>
            <div class="btn-group ml-2">
              <button class="btn btn-secondary btn-icon" @click="changePeriod('previous')">
                <font-awesome-icon icon="fas fa-angle-left fixed-width" />
              </button>
              <button class="btn btn-secondary btn-icon" @click="changePeriod('next')">
                <font-awesome-icon icon="fas fa-angle-right fixed-width" />
              </button>
            </div>
          </div>
        </div>
        <table data-toggle="table"
            data-search="true"
            class="table table-borderless"
            id="boardsTable"
        >
          <thead class="header">
            <tr>
              <th class="text-left header-player">
                <span class="sr-only">Player</span>
              </th>
              <th v-if="windowWidth >= getMediaBreakpoint('sm')"
                  class="text-center align-middle align-middle header-period"
                  v-for="(col, index) in periods"
                  :key="index"
              >
                {{ formatDate(col, setDateFormat()) }}
              </th>
              <th class="text-center align-middle total-cell total-week header-total">
                <div class="d-flex align-items-center">
                  <div>
                    Week<br>Total
                  </div>
                  <div class="sort-arrows d-flex flex-column ml-1 mb-3">
                    <font-awesome-icon
                        :class="{'sort-arrow': true, 'selected': sortCol === 'periodTotal' && sortDir === 'asc'}"
                        icon="fa-solid fa-caret-up"
                        aria-label="sort ascending"
                        @click="sortColumn('periodTotal', 'asc')"
                    />
                    <font-awesome-icon
                        :class="{'sort-arrow': true, 'selected': sortCol === 'periodTotal' && sortDir === 'desc'}"
                        icon="fa-solid fa-caret-down"
                        aria-label="sort descending"
                        @click="sortColumn('periodTotal', 'desc')"
                    />
                  </div>
                </div>
              </th>
              <th v-if="windowWidth > getMediaBreakpoint('md') || windowWidth < getMediaBreakpoint('sm')"
                  class="text-center align-middle total-cell total-overall header-total"
              >
                <div class="d-flex align-items-center">
                  <div>
                    Overall<br>Total
                  </div>
                  <div class="sort-arrows d-flex flex-column ml-1 mb-3">
<!--                    https://dribbble.com/shots/6827054-Data-website-Filters-sorting-data-table/attachments/6827054-Data-website-Filters-sorting-data-table?mode=media-->
                    <font-awesome-icon
                        :class="{'sort-arrow': true, 'selected': sortCol === 'overallTotal' && sortDir === 'asc'}"
                        icon="fa-solid fa-caret-up"
                        aria-label="sort ascending"
                        @click="sortColumn('overallTotal', 'asc')"
                    />
                    <font-awesome-icon
                        :class="{'sort-arrow': true, 'selected': sortCol === 'overallTotal' && sortDir === 'desc'}"
                        icon="fa-solid fa-caret-down"
                        aria-label="sort descending"
                        @click="sortColumn('overallTotal', 'desc')"
                    />
                  </div>
                </div>
              </th>
              <th class="text-center align-middle header-extra">
                <span class="sr-only">Add score or view additional details</span>
              </th>
            </tr>
            <tr class="empty" aria-hidden="true">
              <td colspan="100"></td>
            </tr>
          </thead>
          <tbody>
            <template v-for="(player, key) in playerScoresSorted" :key="key">
              <tr :class="{'detail-view': detailedViewPlayer !== null && detailedViewPlayer.id===player.id}">
                <td class="align-middle">
                    <div class="avatar-container">
                      <div class="avatar-container-inner">
                        <!-- <img src="../assets/arrow-green-solid.svg" alt="arrow" class="arrow"/>-->
                        <span class="avatar target player-name">{{ player.name[0] }}</span>
                        <span contenteditable class="editable-cell player-name" role="textbox"
                              aria-label="player name"
                              @click="handleClickEditableContent($event)"
                              @blur="handleEditPlayerName($event, player)"
                              @keyup.enter="handleEditPlayerName($event, player)"
                        >
                          {{ player.name }}
                        </span>
                      </div>
                    </div>
                </td>

                <td v-if="windowWidth >= getMediaBreakpoint('sm')" class="text-center align-middle score-cell"
                    v-for="(score, index) in player.scores" key="index"
                >
                  <span contenteditable class="editable-cell score target"
                        @click="handleClickEditableContent($event, !isFuture(new Date(score.date)))"
                        @blur="!isFuture(score.date) ? handleEditScore($event, score) : null"
                        @keyup.enter="!isFuture(score.date) ? handleEditScore($event, score) : null"
                        @keydown="!isFuture(score.date) ? handleUpdateScore($event) : null"
                  >
                    {{ score.value }}
                  </span>
                </td>

                <td class="text-center align-middle total-cell total-week">
                  {{ player.periodTotal }}
                </td>

                <td v-if="windowWidth > getMediaBreakpoint('md') || windowWidth < getMediaBreakpoint('sm')"
                    class="text-center align-middle total-cell total-overall"
                >
                  {{ player.overallTotal }}
                </td>

                <td class="text-center align-middle">
                  <div class="d-flex edit-btn-container justify-content-end">
                    <button @click="editingPlayer=player; showModal=true"
                      class="btn btn-icon btn-table btn-primary" data-bs-toggle="tooltip"
                      data-placement="left" title="Add or edit score"
                    >
                      <font-awesome-icon icon="fas fa-plus fixed-width" />
                    </button>
                    <button @click="handleDetailedView(player)"
                            class="btn btn-secondary btn-icon btn-table" data-bs-toggle="tooltip"
                            data-placement="left" title="Show more information"
                    >
                      <font-awesome-icon icon="fas fa-angle-down fixed-width" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="detailedViewPlayer && detailedViewPlayer.id===player.id" class="details">
                <td colspan="100" class="details-cell">
                  <div class="d-flex flex-row justify-content-between w-100 mb-3">
                    <div class="card chart-average">
                      <h3>average performance</h3>
                      <apexchart :ref="'avgScoreChart_' + player.id" width="100%" type="bar"
                                 :options="avgScoreChart.options" :series="avgScoreChart.series" />
                    </div>
                    <div class="card chart-period">
                      <h3>this weeks performance</h3>
                      <apexchart :ref="'periodChart_' + player.id" width="100%" type="area"
                                 :options="periodChart.options" :series="periodChart.series" />
                    </div>
                  </div>
                </td>
              </tr>
              <tr v-if="detailedViewPlayer && detailedViewPlayer.id===player.id" class="empty" aria-hidden="true">
                <td colspan="100"></td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </status-loading>

    <div class="d-flex mb-5 mt-5">
      <input type="text" id="newPlayerName" aria-label="New Player Name" placeholder="Player Name" class="form-control">
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
import {
  format as formatDate,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isEqual,
  addWeeks,
  subWeeks,
  isFuture
} from 'date-fns'
import StatusLoading from "./StatusLoading.vue"
import { getMediaBreakpoint } from "../utils.js"
import BoardDataService from "../services/BoardDataService";
import {round} from "lodash";

export default {
  components: {
    Modal,
    StatusLoading,
  },
  name: "ScoreBoard",
  data() {
    return {
      showModal: false,
      editingPlayer: null,
      detailedViewPlayer: null,
      boardId: null,
      board: null,
      playerId: null,
      scores: [],
      players: [],
      period: "week",
      currentPeriod: new Date(),
      dateFormat: "EEE",
      minScore: 0,
      maxScore: 6,
      isLoaded: false,
      windowWidth: window.innerWidth,
      avgScoreChart: {
        options: {
          chart: {
            type: 'bar',
            id: 'avg-chart-period',
            sparkline: {
              enabled: false,
            },
            colors: [this.primaryColour, this.secondaryColour],
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: true,
            style: {
              fontSize: "1rem",
            }
          },
          xaxis: {
            categories: ["average scores"],
            labels: {
              show: false,
            },
          },
          yaxis: {
            show: false
          },
          grid: {
            show: false,
          },
          zoom: {
            enabled: false
          },
          legend: {
            show: true,
            fontSize: '16px',
          },
          title: {
            show: false,
          },
          fill: {
            opacity: 1,
          },
          tooltip: {
            style: {
              fontSize: '0.8rem',
            }
          },
          plotOptions: {
            bar: {
              borderRadius: 5,
            },
            dataLabels: {
              total: {
                enabled: false,
              }
            }
          },
        },
        series: []
      },
      periodChart: {
        options: {
          chart: {
            type: 'area',
            id: 'score-period-chart',
            stroke: {
              curve: 'smooth'
            },
            dataLabels: {
              enabled: false
            },
            sparkline: {
              enabled: true,
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
          },
          tooltip: {
            style: {
              fontSize: '0.8rem',
            }
          },
        },
        series: [{
          name: '',
          data: []
        }]
      },
      playerChart: {},
      sortCol: "periodTotal",
      sortDir: "desc"
    };
  },
  sockets: {
    scoreAdded() {
      this.getScores();
    },
    playerAdded() {
      this.getPlayers()
    },
  },
  computed: {
    //TODO: accommodate other periods (i.e. months)
    periodStart() {
      return startOfWeek(this.currentPeriod, {weekStartsOn: 1});
    },
    periodEnd() {
      return endOfWeek(this.currentPeriod, { weekStartsOn: 1 });
    },
    periods() {
      return eachDayOfInterval({ start: this.periodStart, end: this.periodEnd });
    },
    periodsReformatted() {
      return this.periods.map((period) => formatDate(period,'EEEE').toLowerCase())
    },
    playerScores() {
      let playerScores = [];
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
          reformatPeriod.push(this.formatDate(period, this.setDateFormat()));
          let score = allScores.filter(score => {
            const scoreDate = new Date(score.date);
            scoreDate.setHours(0, 0, 0, 0);
            return isEqual(scoreDate, period);
          })
          periodTotal = periodTotal + (score.length ? score[0].score : 0);
          periodScores[period] = {
            value: score.length ? score[0].score : "",
            id: score.length ? score[0].id : "",
            date: period
          }
          this.playerChart[player.id].series.push(score.length ? score[0].score : 0);
        })

        let playerObj = {};
        playerScores.push(
          playerObj[player.id] = { id: player.id, name: player.name, scores: periodScores, periodTotal: periodTotal, overallTotal: overallTotal }
        )
      })

      //TODO: move this to another computed variable
      //chart rendering
      if (this.detailedViewPlayer) {
        //period performance
        let playerSeries = [];
        const periodChartColours = [];
        this.players.forEach((player) => {
          playerSeries.push({
            name: player.name,
            data: this.playerChart[player.id].series
          })
          if (player.id !== this.detailedViewPlayer.id) {
            periodChartColours.push(this.secondaryColour);
          } else {
            periodChartColours.push(this.primaryColour);
          }
        })

        this.periodChart.series = playerSeries;
        let options = this.periodChart.options;
        options.xaxis.categories = this.periodsReformatted;
        options.colors = periodChartColours;

        //average scores
        const detailedPlayerScores = this.scores.filter(score => score.playerId === this.detailedViewPlayer.id)
        const playerSumScores = detailedPlayerScores.reduce((prev, curr) => {
          return prev + (isNaN(curr.score) ? 0 : parseInt(curr.score))
        }, 0);
        const playerAvgScores = round((playerSumScores / detailedPlayerScores.length)) || 0;
        const boardSumScores = this.scores.reduce((prev, curr) => {
          return prev + (isNaN(curr.score) ? 0 : parseInt(curr.score))
        }, 0);
        const boardAvgScores = round((boardSumScores / this.scores.length)) || 0;

        this.avgScoreChart.series = [
          {name: this.detailedViewPlayer.name, data: [playerAvgScores]},
          {name: 'board', data: [boardAvgScores]}
        ]
        this.avgScoreChart.options.colors = [this.primaryColour, this.secondaryColour];
      }

      return playerScores;
    },
    playerScoresSorted() {
      return this.playerScores.sort((a,b) => {
        let modifier = 1;
        if (this.sortDir === 'desc') {
          modifier = -1;
        }
        if (a[this.sortCol] < b[this.sortCol]) return -1 * modifier;
        if (a[this.sortCol] > b[this.sortCol]) return 1 * modifier;
        return 0;
      });
    },
    primaryColour() {
      return '#3eb489';
      // return this.getCssVariable('--primary-colour'); //chart colour not right in chrome
    },
    secondaryColour() {
      return '#4f4f4f';
      // return this.getCssVariable('--secondary-colour');
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  async created() {
    const boardId = this.$route.params.id;
    if (boardId) {
      this.boardId = boardId;
    } else {
      //TODO: friendly error, board not found
    }
    this.$socket.emit("joinBoard", this.boardId)
    this.getBoard();
    this.getPlayers();
    this.getScores();
  },
  watch: {
    isLoaded(newVal) {
      console.log("Loaded", newVal);
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    getMediaBreakpoint: getMediaBreakpoint,
    formatDate: formatDate, //https://date-fns.org/v2.29.3/docs/format
    startOfWeek: startOfWeek,
    endOfWeek: endOfWeek,
    isFuture: isFuture,
    changePeriod(direction) {
      //TODO: update when support months or other periods (see add/sub fns for more flexibility: https://date-fns.org/v2.29.3/docs/add)
      if (direction === "next") {
        this.currentPeriod = addWeeks(this.currentPeriod, 1);
      } else if (direction === "previous") {
        this.currentPeriod = subWeeks(this.currentPeriod, 1);
      }
    },
    sortColumn(column, direction) {
      //if column == current sort, reverse
      if (column === this.sortCol) {
        this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
      }
      this.sortCol = column;
    },
    onResize() {
      this.windowWidth = window.innerWidth;
      //detect top header wrap
      const periodContainer = document.querySelector(".period-container");
      const periodTop = periodContainer.getBoundingClientRect().top;
      const headerTop = document.querySelector("h1").getBoundingClientRect().top;
      if (periodTop !== headerTop) {
        periodContainer.classList.remove("ml-auto");
      } else {
        periodContainer.classList.add("ml-auto");
      }
    },
    getCssVariable(name) {
      return getComputedStyle(document.documentElement).getPropertyValue(name);
    },
    addPlayer() {
      this.isLoaded = false;
      const nameInput = document.getElementById("newPlayerName");

      if (!nameInput.value.length) {
        this.isLoaded = true;
        return alert("error");
      }

      const data = {
        name: nameInput.value,
        boardId: this.boardId,
        userId: null //TODO
      };

      PlayerDataService.create(data)
          .then(response => {
            const playerId = response.data.id;
            this.playerId = playerId;
            // this.goToPlayer(playerId);
            this.$socket.emit("playerAdded", playerId, this.boardId);
            nameInput.value = null;
          })
          .catch(e => {
            console.log(e);
          });
      this.isLoaded = true;
    },
    goToPlayer(playerId) {
      this.$router.push({path: `${this.boardId}/player/${playerId}`})
    },
    addScore(score = null, date = null) {
      if (score !== null && date !== null) {
        //update score
        const data = {
          score: parseInt(score),
          playerId: this.editingPlayer.id,
          boardId: this.boardId,
          date: new Date(date)
          // date: new Date().toISOString().slice(0, 10)
        };

        ScoreDataService.create(data)
            .then(response => {
              const scoreId = response.data.id;
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
      ScoreDataService.getAllByBoard(this.boardId)
          .then(response => {
            const scoreId = response.data.id;
            // console.log("scores", response.data);
            this.scores = response.data;
            this.$nextTick(() => {
              this.isLoaded = true;
            })
          })
          .catch(e => {
            this.isLoaded = true;
            console.log(e);
          });
    },
    getBoard() {
      BoardDataService.get(this.boardId)
          .then(response => {
            this.board = response.data;
            // const players = response.data.players;
            // console.log("PLAYERS", players)
            // players.forEach(player => {
            //   this.getPlayer(player.playerId);
            // })
          })
          .catch(e => {
            console.log(e);
          });
    },
    getPlayers() {
      PlayerDataService.getAllByBoard(this.boardId)
          .then(response => {
            this.players = response.data;
          })
          .catch(e => {
            console.log(e);
          });
    },
    getPlayer(playerId) {
      PlayerDataService.get(playerId)
        .then(response => {
          console.log("player", response.data);
          this.players.push(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    handleDetailedView(player) {
      this.editingPlayer = player;
      if (this.detailedViewPlayer && this.detailedViewPlayer.id === player.id) {
        //toggle off
        this.detailedViewPlayer = null;
      } else {
        this.detailedViewPlayer = player;

        // //period performance
        // let playerSeries = [];
        // const periodChartColours = [];
        // this.players.forEach((player) => {
        //   playerSeries.push({
        //     name: player.name,
        //     data: this.playerChart[player.id].series
        //   })
        //   if (player.id !== this.detailedViewPlayer.id) {
        //     periodChartColours.push(this.secondaryColour);
        //   } else {
        //     periodChartColours.push(this.primaryColour);
        //   }
        // })
        //
        // this.periodChart.series = playerSeries;
        // let options = this.periodChart.options;
        // options.xaxis.categories = this.periodsReformatted;
        // options.colors = periodChartColours;
        //
        // //average scores
        // const detailedPlayerScores = this.scores.filter(score => score.playerId === this.detailedViewPlayer.id)
        // const playerSumScores = detailedPlayerScores.reduce((prev, curr) => {
        //   return prev + (isNaN(curr.score) ? 0 : parseInt(curr.score))
        // }, 0);
        // const playerAvgScores = round((playerSumScores / detailedPlayerScores.length)) || 0;
        // const boardSumScores = this.scores.reduce((prev, curr) => {
        //   return prev + (isNaN(curr.score) ? 0 : parseInt(curr.score))
        // }, 0);
        // const boardAvgScores = round((boardSumScores / this.scores.length)) || 0;
        //
        // this.avgScoreChart.series = [
        //   { name: this.detailedViewPlayer.name, data: [playerAvgScores] },
        //   { name: 'board',data: [boardAvgScores] }
        // ]
        // this.avgScoreChart.options.colors = [this.primaryColour, this.secondaryColour];
      }
    },
    setDateFormat() {
      //https://date-fns.org/v2.29.3/docs/format
      //TODO: update once other period types available
      if (this.windowWidth <= getMediaBreakpoint("lg")) {
        this.dateFormat = "EEEEEE";
      } else {
        this.dateFormat = "EEE";
      }
      return this.dateFormat;
    },
    handleClickEditableContent(event, allow = true) {
      if (allow) {
        event.target.classList.add('form-control');
      } else {
        alert("Sorry, you can't add scores for future dates.")
      }
    },
    handleUpdateEditableContent(event) {
      event.preventDefault();
      event.target.classList.remove('form-control');
    },
    handleEditBoardName(event) {
      this.handleUpdateEditableContent(event);

      const updatedName = event.target.innerText.trim();
      //TODO: handle empty
      if (updatedName.length && updatedName !== this.board.name) {
        BoardDataService.update(this.boardId, {name: `${updatedName}`})
            .then(response => {
              this.$socket.emit("boardUpdated", this.playerId, this.boardId);
            })
            .catch(e => {
              console.log(e);
            });
      }

      //ensure it's trimmed and no HTML
      event.target.innerHTML = updatedName;
    },
    handleEditPlayerName(event, player) {
      this.handleUpdateEditableContent(event);

      const updatedName = event.target.innerText.trim();
      //TODO: handle empty
      if (updatedName.length && updatedName !== player.name) {
        PlayerDataService.update(player.id, {name: `${updatedName}`})
            .then(response => {
              this.$socket.emit("playerUpdated", player.id, this.boardId);
            })
            .catch(e => {
              console.log(e);
            });
      }

      //ensure it's trimmed and no HTML
      event.target.innerHTML = updatedName;
    },
    handleUpdateScore(event) {
      //TODO: add config to allow/disallow decimals: event.code === 'Period'
        if (!(event.code.includes('Digit') || event.code.includes('Numpad') || event.code === 'Backspace'
            || event.code === 'ArrowLeft' || event.code === 'ArrowRight' || event.code === 'Delete')) {

          event.preventDefault()
        }
    },
    handleEditScore(event, score) {
      this.handleUpdateEditableContent(event);

      const updatedScore = event.target.innerText.trim();
      //TODO: handle empty, non number

      //add new score
      //TODO: handle new score added

      //update existing score
      if (updatedScore !== "" && updatedScore !== null && !Number.isNaN(updatedScore) && parseInt(updatedScore) !== parseInt(score.value)) {
        ScoreDataService.update(score.id, {score: `${parseInt(updatedScore)}`})
            .then(response => {
              const scoreId = response.data.id;
              this.$socket.emit("scoreAdded", scoreId, this.editingPlayer, this.boardId);
            })
            .catch(e => {
              console.log(e);
            });
      }

      //ensure it's trimmed and no HTML
      event.target.innerHTML = updatedScore;
    }
  },
}
</script>

<style lang="scss">

  .edit-btn-container {
    button.btn:first-child {
      margin-right: .5rem;

      @include media-breakpoint-down(sm) {
        margin-right: .3rem;
      }
    }

  }

   //@include media-breakpoint-down("xs") {
   //  .edit-btn-container {
   //    flex-wrap: wrap;
   //    width: 50px;
   //     & > .btn-primary {
   //       margin-bottom: 3px;
   //     }
   //  }
   //}

   //.total-cell {
   //  background-color: var(--primary-colour-light5);
   //}

   //.total-week {
   //  border-left: solid 3px var(--secondary-colour) !important;
   //}
   //
   //.total-overall {
   //  border-right: solid 3px var(--secondary-colour) !important;
   //}

</style>
