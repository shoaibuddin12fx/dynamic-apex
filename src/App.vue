<template>
  <div id="app">
    <select class="form-control" v-on:change="changeChartType($event)">
      <option v-for="type of chartType.chartTypes" :key="type.index">
        {{ type }}
      </option>
    </select>
    <MainView />
  </div>
</template>

<script>
import MainView from "./components/MainView.vue";
const chartType = require("././assets/UI/outerseries.json");
import { bus } from "./main";
export default {
  name: "App",
  components: {
    MainView,
  },
  data() {
    return {
      chartType: chartType,
    };
  },

  methods: {
    changeChartType($event) {
      bus.$emit("change chart Type", $event.target.value);
    },
  },

  mounted() {
    console.log("there are charts here", this.chartType);
  },
};
</script>

<style>
@import "~bootstrap";
@import "~bootstrap-vue";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
