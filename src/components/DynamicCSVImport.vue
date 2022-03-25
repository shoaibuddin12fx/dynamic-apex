<template>
  <div class="outer form">
    <form>
      <div class="form-group row">
        <label class="col-12 col-form-label">Data Type </label>
        <div class="col-12">
          <div class="row">
            <div class="col-12">
              <select class="form-control" id="positon" v-model="data_type">
                <option value="single_value">Single values</option>
                <option value="paired_value">Paired values</option>
                <option value="timeline_value">Timeline Series</option>
                <option value="data_value">
                  Data for Pie/Donuts/RadialBars
                </option>
              </select>
            </div>
            <label class="col-12 col-form-label">Chart Type </label>
            <div class="col-8">
              <select class="form-control" id="positon" v-model="chart_type">
                <option value="numeric">Numeric</option>
                <option value="labels">labels</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="form-group row">
        <div class="col-12">
          <div @click="downloadSample()" class="btn btn-info">
            Download Sample
          </div>
        </div>
      </div>

      <div class="form-group row">
        <label class="col-12 col-form-label"> Upload File </label>
        <div class="col-8">
          <input
            v-on:change="uploadFile"
            class="form-group btn"
            type="file"
            rel="file"
            accept=".csv"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "DynamicCSVImport",
  data() {
    return {
      csv_data: null,
      data_type: "single_value",
      chart_type: "labels",
    };
  },
  mounted() {},
  methods: {
    uploadFile() {
      var file = this.$refs.file.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        const str = e.target.result;
        console.log(str);

        // call v-on for event handlers
        //     //
      };
      reader.readAsText(file);
    },
    downloadSample() {
      var csvData = [
        ["Jan", 25],
        ["Feb", 25],
        ["Mar", 25],
        ["Apr", 25],
        ["May", 25],
        ["Jun", 25],
        ["Jul", 25],
        ["Aug", 25],
        ["Sep", 25],
        ["Oct", 25],
        ["Nov", 25],
        ["Dec", 25],
      ];

      var csv = "";
      if (this.data_type == "single_value") {
        csv = "x-axis,y-axis\n";
      }

      // var csv = "Name,Profession\n";

      //merge the data with CSV
      csvData.forEach(function (row) {
        csv += row.join(",");
        csv += "\n";
      });

      //display the created CSV data on the web browser
      // document.write(csv);

      var hiddenElement = document.createElement("a");
      hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
      hiddenElement.target = "_blank";

      //provide the name for the CSV file to be downloaded
      hiddenElement.download = "Famous Personalities.csv";
      hiddenElement.click();
    },
    importCsv() {},
  },
};
</script>



<style scoped>
</style>