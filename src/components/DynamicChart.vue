<template>
  <div>
    <form id="myForm">
      <input type="file" id="csvFile" accept=".csv" />
      <button v-on:click="import_csv()">Submit</button>
    </form>
    <apexchart
      ref="realtimeChart"
      width="500"
      type="bar"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { bus } from "../main";
import _ from "lodash";

export default {
  name: "DynamicChart",
  components: {
    apexchart: VueApexCharts,
  },
  data: function () {
    return {
      newValue: "",
      options: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          type: "column",
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91, 40],
        },
      ],
      chart: undefined,
    };
  },
  methods: {
    import_csv() {
      const myForm = document.getElementById("myForm");
      const csvFile = document.getElementById("csvFile");

      myForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const input = csvFile.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
          const str = e.target.result;
          const headers = str.slice(0, str.indexOf("\n")).split(",");
          const rows = str.slice(str.indexOf("\n") + 1).split("\n");
          const arr = rows.map(function (row) {
            const values = row.split(",");
            const el = headers.reduce(function (object, header, index) {
              object[header] = values[index];
              return object;
            }, {});
            return el;
          });
          var heading = [];
          var entries = Object.entries(arr[0]);
          entries.forEach((x) => {
            heading.push(x[0]);
          });
          var data = [];
          var all = {};
          arr.forEach((x) => {
            all = {
              x: x.category,
              y: x.series_1,
            };
            data.push(all);
          });
          bus.$emit("update series", data);
        };

        reader.readAsText(input);
      });
    },
    completed() {
      console.log(this.series[0].data);
      this.series[0].data.push(Number(this.newValue));
    },
  },
  mounted() {
    bus.$on("update series", (data) => {
      const value = data;
      console.log(value);
      this.$refs.realtimeChart.updateSeries([
        {
          data: value,
        },
      ]);
    });
    bus.$on("send dynamic options", (data) => {
      const value = { ...data };
      var op = { ...this.options };
      console.log("dynamic chart options",value);
      if (value.index != null) {
        console.log(value.index);
        value.key = value.key.replace(".${index}", "[" + value.index + "]");
        _.set(op, value.key, value.selected_value);
        this.options = op;
        console.log("send dynamic options", this.options);
      } else {
        // console.log("Index "+value.index);
        _.set(op, value.key, value.selected_value);
        this.options = op;
        console.log("send dynamic options", value);
      }
    });
    bus.$on("change chart Type", (data) => {
      this.chart = data;
      console.log(this.chart);
      this.series[0].type = this.chart;
      console.log(this.series[0]);
      this.$refs.realtimeChart.updateSeries(
        [
          {
            type: this.series[0].type,
          },
        ],
        false,
        true
      );
    });
    bus.$on("send uploaded json", (data) => {
      console.log("previous series data", this.series[0].data);
      console.log("data", data);
      this.series[0].data = data.data;
      this.$refs.realtimeChart.updateSeries(
        [
          {
            data: this.series[0].data,
          },
        ],
        false,
        true
      );
      console.log("new series data", this.series[0].data);
    });
  },
};
</script>

<style scoped>
</style>