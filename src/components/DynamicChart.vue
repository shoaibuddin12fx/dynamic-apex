<template>
  <div>
    <apexchart
      ref="realtimeChart"
      width="500"
      type="bar"
      :options="options"
      :series="series"
      :theme="theme"
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
      theme: null,
      chart: undefined,
    };
  },
  methods: {
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
    bus.$on("update chart from csv", (data) => {
      const value = { ...data };
      this.$refs.realtimeChart.updateOptions({
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: value.x_axis,
        },
      });
      this.$refs.realtimeChart.updateSeries([
        {
          data: value.y_axis,
        },
      ]);
    });
    bus.$on("send dynamic options", (data) => {
      const value = { ...data };
      var op = { ...this.options };
      console.log("dynamic chart options", value);
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
      this.chart = data.chart;
      console.log(this.chart);
      this.series[0].type = this.chart;
      // const chart_data = data.data;

      this.$refs.realtimeChart.updateOptions(data.options);
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