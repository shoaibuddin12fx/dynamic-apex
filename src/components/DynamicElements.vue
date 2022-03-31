<template>
  <div>
    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle="'accordion-l2'" variant="info">
            Chart Type
          </b-button>
        </b-card-header>
        <b-collapse
          :id="'accordion-l2'"
          visible
          accordion="my-accordion"
          role="tabpanel"
        >
          <b-card-body>
            <div class="outer form">
              <div class="row">
                <label class="col-12 col-form-label">Chart Type </label>
                <div class="col-8">
                  <select
                    class="form-control"
                    v-on:change="changeChartType($event.target.value)"
                  >
                    <option
                      v-for="type of chartType.chartTypes"
                      :key="type.index"
                    >
                      {{ type }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>

    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle="'accordion-l1'" variant="info">
            Data Upload
          </b-button>
        </b-card-header>
        <b-collapse
          :id="'accordion-l1'"
          visible
          accordion="my-accordion"
          role="tabpanel"
        >
          <b-card-body>
            <DynamicCSVImport />
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>

    <div class="accordion" role="tablist" v-for="obj of json" :key="obj.id">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle="'accordion-' + obj.id" variant="info">{{
            obj.label
          }}</b-button>
        </b-card-header>
        <b-collapse
          :id="'accordion-' + obj.id"
          visible
          accordion="my-accordion"
          role="tabpanel"
        >
          <b-card-body>
            <form>
              <div v-for="element of obj.elements" :key="element.index">
                <div
                  v-if="element.heading && element.show !== 0"
                  class="headings"
                >
                  {{ element.label }}
                </div>

                <div
                  v-if="!element.heading && element.show !== 0"
                  class="element"
                >
                  <div class="form-group row">
                    <label class="col-sm-6 col-form-label"
                      >{{ element.label }}
                      <span v-if="element.type == 'range'"
                        >({{ element.selected_value }})</span
                      ></label
                    >
                    <div class="col-sm-6" v-if="element.type != 'array'">
                      <select
                        class="form-control"
                        id="positon"
                        v-if="element.type == 'select'"
                        v-on:change="passOptions($event, element)"
                      >
                        <option v-for="opt of element.options" :key="opt.index">
                          {{ opt }}
                        </option>
                      </select>
                      <input
                        v-on:change="passOptions($event, element)"
                        v-if="element.type == 'color'"
                        type="color"
                        class="form-control"
                      />
                      <input
                        v-if="element.type == 'text'"
                        v-on:change="passOptions($event, element)"
                        type="text"
                        class="form-control"
                      /><span v-if="element.type == 'text' && element.eg">example: {{element.eg}}</span>
                      <input
                        v-on:change="passOptions($event, element)"
                        v-model="element.selected_value"
                        :min="element.min"
                        :max="element.max"
                        :step="element.step"
                        v-if="element.type == 'range'"
                        type="range"
                        class="form-control"
                      />
                    </div>
                    <div class="col-sm-12" v-if="element.type == 'array'">
                      <div class="add-button" @click="addArrayOf(element)">
                        Add +
                      </div>

                      <div
                        class="form-group row my-3"
                        v-for="(v, index) of element.values"
                        :key="index"
                      >
                        <label
                          class="
                            col-sm-1 col-form-label
                            btn btn-info
                            index-highlight
                          "
                          >{{ index }}
                        </label>
                        <div class="col-sm-11">
                          <input
                            v-if="element.arrayOf == 'colors'"
                            type="color"
                            class="form-control"
                            v-model="element.values[index].color"
                            v-on:change="setColor(element.values)"
                          />
                          <input
                            v-if="element.arrayOf == 'text'"
                            type="text"
                            class="form-control"
                          />

                          <div v-if="element.arrayOf == 'objects'">
                            <div
                              class="form-group row"
                              v-for="(vv, index_le1) of v"
                              :key="index_le1"
                            >
                              <div
                                v-if="vv.heading"
                                class="form-label headings"
                              >
                                {{ vv.label }}
                              </div>

                              <label
                                v-if="!vv.heading"
                                class="col-sm-6 col-form-label"
                                >{{ vv.label }}</label
                              >
                              <div class="col-sm-6">
                                <input
                                  v-if="vv.type == 'text'"
                                  v-on:change="
                                    passChildOptions($event, vv, index)
                                  "
                                  type="text"
                                  class="form-control"
                                /><span v-if="vv.type == 'text' && vv.eg">example: {{vv.eg}}</span>
                                <input
                                  v-if="vv.type == 'color'"
                                  v-on:change="
                                    passChildOptions($event, vv, index)
                                  "
                                  type="color"
                                  class="form-control"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="
                    element.show !== 0 && element.childs && element.shown !== 0
                  "
                  class="element"
                >
                  <div
                    v-for="element of element.childs"
                    :key="element.index"
                    class="form-group row"
                  >
                    <label class="col-sm-6 col-form-label"
                      >{{ element.label }}
                      <span v-if="element.type == 'range'"
                        >({{ element.selected_value }})</span
                      ></label
                    >
                    <div class="col-sm-6" v-if="element.type != 'array'">
                      <select
                        class="form-control"
                        id="positon"
                        v-if="element.type == 'select'"
                        v-on:change="passOptions($event, element)"
                      >
                        <option v-for="opt of element.options" :key="opt.index">
                          {{ opt }}
                        </option>
                      </select>
                      <input
                        v-on:change="passOptions($event, element)"
                        v-if="element.type == 'color'"
                        type="color"
                        class="form-control"
                      />
                      <input
                        v-if="element.type == 'text'"
                        v-on:change="passOptions($event, element)"
                        type="text"
                        class="form-control"
                      /><span v-if="element.type == 'text' && element.eg">example: {{element.eg}}</span>
                      <input
                        v-on:change="passOptions($event, element)"
                        v-model="element.selected_value"
                        :min="element.min"
                        :max="element.max"
                        :step="element.step"
                        v-if="element.type == 'range'"
                        type="range"
                        class="form-control"
                      />
                    </div>
                    <div class="col-sm-12" v-if="element.type == 'array'">
                      <div class="add-button" @click="addArrayOf(element)">
                        Add +
                      </div>

                      <div
                        class="form-group row my-3"
                        v-for="(v, index) of element.values"
                        :key="index"
                      >
                        <label
                          class="
                            col-sm-1 col-form-label
                            btn btn-info
                            index-highlight
                          "
                          >{{ index }}
                        </label>
                        <div class="col-sm-11">
                          <input
                            v-if="element.arrayOf == 'colors'"
                            type="color"
                            class="form-control"
                            v-model="element.values[index].color"
                            v-on:change="setColor(element.values)"
                          />
                          <input
                            v-if="element.arrayOf == 'text'"
                            type="text"
                            class="form-control"
                          />
                          <input
                            v-if="element.arrayOf == 'range'"
                            type="range"
                            class="form-control"
                          />

                          <div v-if="element.arrayOf == 'objects'">
                            <div
                              class="form-group row"
                              v-for="(vv, index_le1) of v"
                              :key="index_le1"
                            >
                              <div
                                v-if="vv.heading"
                                class="form-label headings"
                              >
                                {{ vv.label }}
                              </div>
                              <label
                                v-if="!vv.heading"
                                class="col-sm-6 col-form-label"
                                >{{ vv.label }}<span v-if="vv.type == 'range'"
                                >({{ element.selected_value }})</span
                              ></label
                              >
                              <div class="col-sm-6">
                                <input
                                  v-if="vv.type == 'text'"
                                  v-on:change="
                                    passChildOptions($event, vv, index)
                                  "
                                  type="text"
                                  class="form-control"
                                /><span v-if="vv.type == 'text' && vv.eg">example: {{vv.eg}}</span>
                                <input
                                  v-if="vv.type == 'color'"
                                  v-on:change="
                                    passChildOptions($event, vv, index)
                                  "
                                  type="color"
                                  class="form-control"
                                />
                                <input
                                  v-on:change="
                                    passChildOptions($event, vv, index)
                                  "
                                  v-model="element.selected_value"
                                  :min="vv.min"
                                  :max="vv.max"
                                  :step="vv.step"
                                  v-if="vv.type == 'range'"
                                  type="range"
                                  class="form-control"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
const json = require("./../assets/elements.json");
const annotations = require("./../assets/UI/annotations.json");
const charts = require("./../assets/UI/charts.json");
const colors = require("./../assets/UI/colors.json");
const dataLabels = require("./../assets/UI/dataLabels.json");
const fill = require("./../assets/UI/fill.json");
const forecastDataPoints = require("./../assets/UI/forecastdatapoints.json");
const grid = require("./../assets/UI/grid.json");
const labels = require("./../assets/UI/labels.json");
const legend = require("./../assets/UI/legend.json");
const markers = require("./../assets/UI/markers.json");
const noData = require("./../assets/UI/noData.json");
const plotOptions = require("./../assets/UI/plotOptions.json");
const responsive = require("./../assets/UI/responsive.json");
const series = require("./../assets/UI/series.json");
const states = require("./../assets/UI/states.json");
const stroke = require("./../assets/UI/stroke.json");
const subtitle = require("./../assets/UI/subtitle.json");
const theme = require("./../assets/UI/theme.json");
const title = require("./../assets/UI/title.json");
const tooltip = require("./../assets/UI/tooltip.json");
const Xaxis = require("./../assets/UI/Xaxis.json");
const Yaxis = require("./../assets/UI/Yaxis.json");
const chartType = require("./../assets/UI/outerseries.json");

import { bus } from "../main";
import DynamicCSVImport from "./DynamicCSVImport.vue";
export default {
  name: "DynamicElements",
  components: {
    DynamicCSVImport,
  },
  data() {
    return {
      json: json,
      options: {},
      countColor: 0,
      newColor: "",
      chartType: chartType,
    };
  },
  methods: {
    changeChartType(changeValue) {
      var options = {};
      var value = changeValue;
      var series = [];

      if (value == "line" || value == "bar" || value == "area") {
        options = {
          chart: {
            type: value,
          },
          xaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
            ],
          },
        };
        series = [
          {
            type: value,
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
          },
        ];
      }

      if (value == "radar") {
        options = {
          // labels: ["April", "May", "June", "July", "August", "September"],
          xaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
            ],
          },
          chart: {
            type: "radar",
          },
        };

        series = [
          {
            name: "Radar Series 1",
            data: [51, 49, 62, 69, 45, 52, 38, 24, 33],
          },
          {
            name: "Radar Series 2",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
          },
        ];
      }

      if (value == "donut" || value == "pie" || value == "radialBar") {
        options = {
          chart: {
            type: value,
          },
          labels: ["Apple", "Mango", "Orange", "Watermelon"],
          dataLabels: {
            enabled: true,
          },
        };
        series = [50, 25, 10, 15];
      }

      if (value == "candlestick") {
        options = {
          chart: {
            type: "candlestick",
          },
        };

        series = [
          {
            data: [
              {
                x: "January",
                y: [51.98, 56.29, 51.59, 53.85],
              },
              {
                x: "February",
                y: [53.66, 54.99, 51.35, 52.95],
              },
              {
                x: "March",
                y: [52.76, 57.35, 52.15, 57.03],
              },
              {
                x: "April",
                y: [51.98, 56.29, 51.59, 53.85],
              },
              {
                x: "May",
                y: [53.66, 54.99, 51.35, 52.95],
              },
              {
                x: "June",
                y: [52.76, 57.35, 52.15, 57.03],
              },
              {
                x: "July",
                y: [51.98, 56.29, 51.59, 53.85],
              },
              {
                x: "September",
                y: [53.66, 54.99, 51.35, 52.95],
              },
              {
                x: "October",
                y: [52.76, 57.35, 52.15, 57.03],
              },
              {
                x: "November",
                y: [51.98, 56.29, 51.59, 53.85],
              },
              {
                x: "December",
                y: [53.66, 54.99, 51.35, 52.95],
              },
            ],
          },
        ];
      }

      // if (value == "radialBar") {
      //   options = {
      //     chart: {
      //       height: 350,
      //       type: "radialBar",
      //     },
      //     labels: ["Progress1", "Progress2"],
      //   };

      //   series = [70, 20];
      // }

      if (value == "heatmap") {
        options = {
          chart: {
            type: "heatmap",
          },
        };

        series = [
          {
            name: "Series 1",
            data: [
              {
                x: "W1",
                y: 22,
              },
              {
                x: "W2",
                y: 29,
              },
              {
                x: "W3",
                y: 13,
              },
              {
                x: "W4",
                y: 32,
              },
            ],
          },
          {
            name: "Series 2",
            data: [
              {
                x: "W1",
                y: 43,
              },
              {
                x: "W2",
                y: 43,
              },
              {
                x: "W3",
                y: 43,
              },
              {
                x: "W4",
                y: 43,
              },
            ],
          },
        ];
      }

      if (value == "boxPlot") {
        options = {
          chart: {
            type: value,
          },
        };
        series = [
          {
            data: [
              {
                x: "category 1",
                y: [40, 51.98, 56.29, 59.59, 63.85],
              },
              {
                x: "category 2",
                y: [43.66, 44.99, 51.35, 52.95, 59.42],
              },
              {
                x: "category n",
                y: [52.76, 57.35, 59.15, 63.03, 67.98],
              },
            ],
          },
        ];
      }

      if (value == "treemap") {
        options = {
          chart: {
            height: 350,
            type: value,
          },
        };

        series = [
          {
            data: [
              {
                x: "New Delhi",
                y: 218,
              },
              {
                x: "Kolkata",
                y: 149,
              },
              {
                x: "Mumbai",
                y: 184,
              },
              {
                x: "Ahmedabad",
                y: 55,
              },
              {
                x: "Bangaluru",
                y: 84,
              },
              {
                x: "Pune",
                y: 31,
              },
              {
                x: "Chennai",
                y: 70,
              },
            ],
          },
        ];
      }

      bus.$emit("change chart Type", {
        chart: value,
        options: options,
        series: series,
      });
    },
    passOptions($event, element, index = null) {
      console.log("pass option", index, element, $event.target.value);
      if (element.shown == 0) {
        element.shown = 1;
      } else {
        element.shown = 0;
      }
      console.log("json", fill);
      var obj = { ...element };
      obj["selected_value"] = $event.target.value;
      console.log(this.options.chart);
      bus.$emit("send dynamic options", obj);
      console.log(obj);
      // if(element.key.includes("animations")){

      // }
      if ($event.target.value === "gradient") {
        console.log("gradient", fill[0].elements[3].show);
        fill[0].elements[5].show = 0;
        fill[0].elements[4].show = 0;
        fill[0].elements[3].show = 1;
      } else if ($event.target.value === "pattern") {
        console.log("pattern", fill[0].elements[5].show);
        fill[0].elements[4].show = 0;
        fill[0].elements[3].show = 0;
        fill[0].elements[5].show = 1;
      } else if ($event.target.value === "image") {
        fill[0].elements[3].show = 0;
        fill[0].elements[5].show = 0;
        fill[0].elements[4].show = 1;
        console.log("images");
      } else if ($event.target.value === "solid") {
        fill[0].elements[4].show = 0;
        fill[0].elements[5].show = 0;
        fill[0].elements[3].show = 0;
        console.log("solid");
      }
    },

    passChildOptions($event, element, index) {
      console.log(index, element, $event.target.value);

      var obj = { ...element };
      obj["index"] = index;
      obj["selected_value"] = $event.target.value;
      //   console.log(this.options.chart);
      bus.$emit("send dynamic options", obj);
    },

    setOptionValues() {
      this.options = {
        chart: this.json.filter((value) => value.id == 2),
      };
      console.log("opt", this.options.chart);
    },
    addArrayOf(element) {
      if (element.arrayOf == "colors") {
        element.values.push(element.obj);
        console.log("pushing", element);
      }
      if (element.arrayOf == "text") {
        element.values.push("");
      }
      if (element.arrayOf == "objects") {
        console.log("pushing", element);
        element.values.push(element.obj);
      }
    },
    // setColor(colorArray){
    //   console.log("newColort",this.newColor)
    //   console.log("colorArray", colorArray)
    //   bus.$emit("send color options", colorArray);
    // }
  },
  mounted() {
    this.json = [
      ...colors,
      ...fill,
      ...charts,
      ...forecastDataPoints,
      ...dataLabels,
      ...annotations,
      ...grid,
      ...labels,
      ...legend,
      ...markers,
      ...noData,
      ...plotOptions,
      ...responsive,
      ...series,
      ...states,
      ...stroke,
      ...subtitle,
      ...theme,
      ...title,
      ...tooltip,
      ...Xaxis,
      ...Yaxis,
    ];
    console.log("json values", this.json);
    this.setOptionValues();
    this.changeChartType("line");
  },
};
</script>

<style scoped>
.accordion {
  text-align: left;
}

.headings {
  font-weight: bold;
  border-bottom: 1px solid gray;
  margin-bottom: 19px;
}

.accordion *:first-letter {
  text-transform: capitalize;
}

.add-button {
  background: purple;
  border: 1px solid lightgray;
  padding: 3px 15px;
  font-size: 12px;
  border-radius: 10px;
  width: 75px;
  cursor: pointer;
  font-weight: bold;
  color: white;
}

.index-highlight {
  /* background: green; */
  padding: 5px 0;
}
</style>
