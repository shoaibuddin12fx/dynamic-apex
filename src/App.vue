<template>
  <div id="app">
    <select class="form-control" v-on:change="changeChartType($event)">
      <option v-for="type of chartType.chartTypes" :key="type.index">
        {{ type }}
      </option>
    </select>
    <button class="link-primary" @click="downloadSampleCSV">
      <i class="icon-download"></i> Download json file
    </button>
    <label class="input-container"
      ><i class="icon-file-plus mr-1"></i>Select json File
      <input
        class="form-control"
        multiple="multiple"
        placeholder="Upload File"
        style="display: none"
        type="file"
        @change="onFileSelected"
        accept=".json"
      />
    </label>
    <MainView />
  </div>
</template>

<script>
import MainView from "./components/MainView.vue";
const chartType = require("././assets/UI/outerseries.json");
// const charts = require("././assets/UI/charts.json");
import { bus } from "./main";
export default {
  name: "App",
  components: {
    MainView,
  },
  data() {
    return {
      chartType: chartType,
      csvFile: "",
      import_file: "",
      series: [
        {
          data: [23, 34, 12, 54, 32, 43],
        },
      ],
    };
  },

  methods: {
    changeChartType($event) {
      bus.$emit("change chart Type", $event.target.value);
    },
    downloadSampleCSV() {
      let csv = `[\n { \n "data" : \n [ \n`;
      this.series[0].data.forEach((row, index) => {
        if (index === this.series[0].data.length - 1) {
          console.log("length full");
          console.log(index, this.series[0].data.length - 2);
          csv += row + " \n ] \n } \n ]";
        } else {
          csv += row + ",";
        }
      });

      const anchor = document.createElement("a");
      anchor.href = "data:text/json;charset=utf-8," + encodeURIComponent(csv);
      anchor.target = "_blank";
      anchor.download = "sampleBuildingCSV.json";
      anchor.click();
    },
    onFileSelected(event) {
      console.log(event);
      this.import_file = event.target.files[0];
      console.log(this.import_file);
      this.uploadCSV();
    },
    async uploadCSV() {
      try {
        console.log("Here");
        var reader = new FileReader();
        reader.onload = function (event) {
          var jsonObj = JSON.parse(event.target.result);
          console.log("json", jsonObj[0]);
          bus.$emit("send uploaded json", jsonObj[0]);
        };

        reader.readAsText(event.target.files[0]);
        this.loading = true;
        let formData = new FormData();
        console.log("me");
        formData.append("import_file", this.import_file);
        this.loading = false;
        this.import_file = "";
        this.rerenderInput++;
      } catch (e) {
        console.log("error", e);
      }
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
