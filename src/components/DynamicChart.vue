<template>
  <div>
    <apexchart
      ref="realtimeChart"
      width="500"
      type="line"
      :options="options"
      :series="series"
    ></apexchart>
    <!--  -->
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
      type: "line",
      options: {
        chart: {
          id: "vuechart-example",
          type: this.type,
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          // type: "column",
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91, 40],
        },
      ],
      chart: "line",
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
      console.log("update series called");
      const value = data;
      console.log(value);
      this.$refs.realtimeChart.updateSeries([
        {
          data: value,
        },
      ]);
    });
    bus.$on("update chart from csv", (data) => {
      console.log("update chart from csv");
      const value = { ...data };
      if(value.data_type == "single_value"){
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
      }
      if(value.data_type == "paired_value"){
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
      }
    });
    bus.$on("send dynamic options", (data) => {
      console.log("send dynamic options called");
      const value = { ...data };
      var op = { ...data };
      console.log("here op",op);
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
      console.log("change chart Type called");
      this.$refs.realtimeChart.updateSeries([]);
      this.$refs.realtimeChart.updateOptions({});
      
      var opt = { ...data };
      // this.chart = opt.chart;
      this.type = opt.chart;

      if (opt.series) {
        this.series = opt.series;
      }

      // this.series = data.series;
      // const chart_data = data.data;
      console.log(opt.series);
      this.$refs.realtimeChart.updateSeries(opt.series);
      console.log(opt.options);
       this.$refs.realtimeChart.updateOptions(opt.options);
      window.dispatchEvent(new Event("resize"));
    });
    bus.$on("send uploaded json", (data) => {
      console.log("send uploaded json called");
      // console.log("previous series data", this.series[0].data);
      console.log("data", data);

      if (this.series && this.series[0]) {
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
      }
    });
  },
};
</script>

<style scoped>
</style>