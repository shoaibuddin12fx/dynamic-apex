<template>
  <div>
    <apexchart
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
import _ from 'lodash';

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
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91, 40],
        },
      ],
    };
  },
  methods:{
      completed() {
          console.log(this.series[0].data);
            this.series[0].data.push(Number(this.newValue))
  },
  },
  mounted() {
    bus.$on("send dynamic options", (data) => {

      const value = { ...data};
      var op = {...this.options}
      _.set(op, value.key, value.selected_value);
      this.options = op;
      console.log("send dynamic options", value);
    });
  },
  
};
</script>

<style scoped>
</style>