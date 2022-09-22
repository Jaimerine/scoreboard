<template>
  <div id="bar"></div>
</template>

<script>
import Bar from "rough-viz/src/Bar.js";
import StackedBar from "rough-viz/src/StackedBar.js"
import {putAttrsToObj} from "../../mixins/putAttrsToObj.js";

export default {
  name: "RoughBar",
  mixins: [putAttrsToObj],
  mounted() {
    let barAttr = this.putAttrsToObj;
    barAttr.element = "#bar";
    return new StackedBar(barAttr);
  }
}
</script>
<!--<template>-->
<!--  <canvas id="bar"></canvas>-->
<!--</template>-->
<!--<script>-->
<!--import { Chart } from "chart.js";-->
<!--Chart.register(...registerables);-->
<!--import rough from "roughjs";-->
<!--// import { BarChart } from "vue-chart-3";-->
<!--import ChartRough from "chartjs-plugin-rough";-->
<!--export default {-->
<!--  // extends: BarChart,-->
<!--  props: ["data", "options"],-->
<!--  plugins: [ChartRough],-->
<!--  mounted() {-->
<!--    this.addPlugin(ChartRough);-->

<!--    var ctx = document.getElementById('myChart').getContext('2d');-->

<!--    var chart = new Chart(ctx, {-->

<!--      type: 'bar',-->

<!--      data: {-->

<!--        labels: ['January', 'February', 'March', 'April', 'May', 'June'],-->

<!--        datasets: [{-->

<!--          data: [45, 20, 64, 32, 76, 51],-->

<!--          backgroundColor: 'rgb(255, 99, 132)',-->

<!--          borderColor: 'rgb(255, 99, 132)',-->

<!--          borderWidth: 3-->

<!--        }]-->

<!--      },-->

<!--      plugins: [ChartRough]-->

<!--    });-->


<!--    // this.renderChart({-->
<!--    //   labels: [-->
<!--    //     "January",-->
<!--    //     "February",-->
<!--    //     "March",-->
<!--    //     "April",-->
<!--    //     "May",-->
<!--    //     "June",-->
<!--    //     "July"-->
<!--    //   ],-->
<!--    //   datasets: [-->
<!--    //     {-->
<!--    //       label: "Data One",-->
<!--    //       backgroundColor: [-->
<!--    //         "#ff6384",-->
<!--    //         "#36a2eb",-->
<!--    //         "#cc65fe",-->
<!--    //         "#ffce56",-->
<!--    //         "red",-->
<!--    //         "green",-->
<!--    //         "blue"-->
<!--    //       ],-->
<!--    //       data: [40, 39, 20, 40, 39, 80, 40],-->
<!--    //       rough: {-->
<!--    //         fillStyle: "cross-hatch",-->
<!--    //         hachureGap: 8-->
<!--    //       }-->
<!--    //     },-->
<!--    //     {-->
<!--    //       label: "Data Two",-->
<!--    //       borderColor: "#79f879",-->
<!--    //       backgroundColor: [-->
<!--    //         "#ffce56",-->
<!--    //         "red",-->
<!--    //         "green",-->
<!--    //         "blue",-->
<!--    //         "#ff6384",-->
<!--    //         "#36a2eb",-->
<!--    //         "#cc65fe"-->
<!--    //       ],-->
<!--    //       data: [39, 10, 40, 39, 80, 100, 22],-->
<!--    //       rough: {-->
<!--    //         fillStyle: "cross-hatch",-->
<!--    //         hachureGap: 8-->
<!--    //       }-->
<!--    //     },-->
<!--    //     {-->
<!--    //       label: "Data Three",-->
<!--    //       borderColor: "#79f879",-->
<!--    //       backgroundColor: [-->
<!--    //         "blue",-->
<!--    //         "#ff6384",-->
<!--    //         "#36a2eb",-->
<!--    //         "red",-->
<!--    //         "green",-->
<!--    //         "#cc65fe",-->
<!--    //         "#ffce56"-->
<!--    //       ],-->
<!--    //       data: [29, 40, 10, 69, 10, 30, 92],-->
<!--    //       rough: {-->
<!--    //         fillStyle: "cross-hatch",-->
<!--    //         hachureGap: 8-->
<!--    //       }-->
<!--    //     }-->
<!--    //   ]-->
<!--    // },-->
<!--    //     {-->
<!--    //       responsive: true,-->
<!--    //       maintainAspectRatio: false,-->
<!--    //       scales: {-->
<!--    //         xAxes: [-->
<!--    //           {-->
<!--    //             scaleLabel: {-->
<!--    //               display: true,-->
<!--    //               labelString: "My X-axis Label"-->
<!--    //             }-->
<!--    //           }-->
<!--    //         ],-->
<!--    //         yAxes: [-->
<!--    //           {-->
<!--    //             ticks: {-->
<!--    //               min: 0,-->
<!--    //               stepSize: 5-->
<!--    //             },-->
<!--    //             scaleLabel: {-->
<!--    //               display: true,-->
<!--    //               labelString: "My Y-axis Label"-->
<!--    //             }-->
<!--    //           }-->
<!--    //         ]-->
<!--    //       },-->
<!--    //       plugins: {-->
<!--    //         rough: {-->
<!--    //           enabled: true-->
<!--    //         }-->
<!--    //       }-->
<!--    //     });-->
<!--  }-->
<!--};-->
<!--</script>-->