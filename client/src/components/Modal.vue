<template>
  <div class="modal-container">
    <div class="modal-custom">
      <div class="modal-content">
        <div class="modal-header">
          <div>
            <h2>{{ player.name + (player.name[player.name.length - 1].toLowerCase() === "s" ? "' score" : "'s score")}}</h2>
          </div>
          <button class="btn-close" @click="closeModal(false)" aria-label="close">
            <font-awesome-icon icon="fas fa-times" aria-hidden="true"/>
          </button>
        </div>
        <div class="modal-body">

          <!-- date -->
          <div class="d-flex align-items-center">
            <h3>Date:</h3>
            <DatePicker v-model="date" mode="date" color="blue" trim-weeks :max-date="new Date()">
              <template v-slot="{ inputValue, inputEvents }">

                <div class="input-group ml-2">
                  <span id="dateGroup" class="input-group-text">
                    <font-awesome-icon icon="fa-regular fa-calendar" />
                    <label class="control-label sr-only" for="date">The date to add or edit a score for</label>
                  </span>
                  <input type="text"
                    id="date"
                    class="form-control"
                    :value="inputValue"
                    v-on="inputEvents"
                    aria-describedby="dateGroup"
                  />
                </div>
              </template>
            </DatePicker>
          </div>

          <!-- score -->
          <div class="d-flex align-items-center">
            <h3>Score:</h3>
            <div class="input-group ml-2">
              <span id="scoreGroup" class="input-group-text">
                <font-awesome-icon icon="fas fa-hashtag" />
                <label class="control-label sr-only" for="score">The score</label>
              </span>
              <input type="text"
                id="score"
                class="form-control"
                aria-describedby="scoreGroup"
              />
            </div>
          </div>
        </div>

        <hr>
        <div class="modal-bottom">
          <button class="btn btn-primary" @click="closeModal(true)">Update</button>
          <button class="btn btn-secondary" @click="closeModal(false)">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { format as formatDate } from 'date-fns'
import { DatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';

export default {
  components: {
    DatePicker
  },
  name: "Modal",
  props: {
    player: Object
  },
  data() {
    return {
      date: new Date(),
    };
  },
  // computed: {}

  mounted() {
    const main = document.querySelector("#main");
    main.classList.remove('scale-forward');
    main.classList.add('scale-back');
    const modalEl = document.querySelector("#modal");
    modalEl.appendChild(this.$el);
  },
  methods: {
    closeModal(updateScore = false) {
      let score = null;
      let date = null;
      if (updateScore) {
        const scoreInput = document.getElementById('score');
        if (!scoreInput.value.length || isNaN(parseInt(scoreInput.value)) ) {
          return alert("error");
        }
        score = scoreInput.value;
        date = this.date;
      }

      const main = document.querySelector("#main");
      main.classList.remove('scale-back');
      main.classList.add('scale-forward');

      const container = document.querySelector(".modal-container")
      container.classList.add('close');
      container.addEventListener("animationend", () => {
        this.$emit('handle-update-score', score, date);
      }, { once: true });
    },
    formatDate(date, format) {
      //workaround to use format function in template
      return formatDate(date, format)
    }
  }
}
</script>

<style lang="scss">

  .modal-container {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    transform: scale(1);
    z-index: 100;
    background: rgba(0,0,0,.0);
    animation: fadeIn .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
    &.close {
      animation: fadeOut .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
      .modal {
        animation: scaleDown .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
      }
    }

    &.modal-custom {
      width: max-content;
      max-width: 600px;
      padding: 10px;
      display: inline;
      opacity: 0;
      animation: scaleUp .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
      margin: 15px;
    }
  }


  .modal-header {
    h3 {
      text-transform: none !important;
    }

    .btn-close {
      font-size: 1.2rem;
      transition: color .2s, transform .3s;
      background: transparent;
      border: none;
      outline: none;
      margin-left: 20px;

      &:hover, &:focus, &:active {
        color: var(--primary-colour);
        transform: scale(1.1);
      }
    }
  }
  .modal-content {
    box-shadow: 0 0.1rem 0.6rem rgba(0, 0, 0, 0.5);
    padding: 10px;
  }
  .modal-body {
    padding: 1rem 1rem 0;
  }
  .modal-bottom {
    display: flex;
    flex-direction: row;
    justify-content: center;
    button:nth-child(1) {
      margin-right: 5px;
    }
    button:nth-child(2) {
      margin-left: 5px;
    }
  }
  @keyframes fadeIn {
    0% {
      background: rgba(0,0,0,.0);
    }
    100% {
      background: rgba(0,0,0,.7);
    }
  }
  @keyframes fadeOut {
    0% {
      background: rgba(0,0,0,.7);
    }
    100% {
      background: rgba(0,0,0,.0);
    }
  }
  @keyframes scaleUp {
    0% {
      transform: scale(.8) translateY(1000px);
      opacity: 0;
    }
    100% {
      transform: scale(1) translateY(0px);
      opacity: 1;
    }
  }
  @keyframes scaleDown {
    0% {
      transform: scale(1) translateY(0px);
      opacity: 1;
    }
    100% {
      transform: scale(.8) translateY(1000px);
      opacity: 0;
    }
  }
</style>