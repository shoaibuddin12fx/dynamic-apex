<template>
  <div>
    <!-- <div class="accordion" id="accordionExample">
      <div class="card" v-for="obj of json" :key="obj.id">
        <div class="card-header" id="headingOne">
          <h2 class="mb-0">
            <button class="btn btn-link" type="button">
              {{ obj.label }}
            </button>
          </h2>
        </div>
        <div
          id="collapseOne"
          class="collapse show"
          aria-labelledby="headingOne"
          data-parent="#accordionExample"
        >
          <div class="card-body">
            <form>
              <div v-for="element of obj.elements" :key="element.index">
                <div v-if="element.heading" class="headings">
                  {{ element.label }}
                </div>

                <div v-if="!element.heading" class="element">
                  <div class="form-group row">
                    <label class="col-sm-6 col-form-label">{{
                      element.label
                    }}</label>
                    <div class="col-sm-6">
                      <select
                        class="form-control"
                        id="positon"
                        v-if="element.type == 'select'"
                        v-on:change="passOptions($event, element )"
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
                        type="text"
                        class="form-control"
                      />
                      <input
                        v-if="element.type == 'range'"
                        type="range"
                        class="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div> -->
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
                <div v-if="element.heading" class="headings">
                  {{ element.label }}
                </div>

                <div v-if="!element.heading" class="element">
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
                      />
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
                        class="form-group row"
                        v-for="(v, index) of element.values"
                        :key="v"
                      >
                        <label class="col-sm-2 col-form-label"
                          >{{ index }}
                        </label>
                        <div class="col-sm-8">
                          <input
                            v-if="element.arrayOf == 'color'"
                            type="color"
                            class="form-control"
                          />
                          <input
                            v-if="element.arrayOf == 'text'"
                            type="text"
                            class="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <b-card-text>{{ text }}</b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>

      <!-- <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-2 variant="info"
            >Accordion 2</b-button
          >
        </b-card-header>
        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>{{ text }}</b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card> -->

      <!-- <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-3 variant="info"
            >Accordion 3</b-button
          >
        </b-card-header>
        <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>{{ text }}</b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card> -->
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

import { bus } from "../main";

export default {
  name: "DynamicElements",
  data() {
    return {
      json: json,
      options: {},
    };
  },
  methods: {
    passOptions($event, element) {
      console.log(element, $event.target.value);

      var obj = { ...element };
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
        element.values.push("#c0c0c0");
      }
      if (element.arrayOf == "text") {
        element.values.push("");
      }
    },
  },
  mounted() {
    this.json = [
      ...annotations,
      ...charts,
      ...colors,
      ...dataLabels,
      ...fill,
      ...forecastDataPoints,
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
      ...Yaxis
    ];
    console.log("json values",this.json);
    this.setOptionValues();
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
  background: transparent;
  border: 1px solid lightgray;
  padding: 3px 15px;
  font-size: 12px;
  border-radius: 10px;
  width: 65px;
  cursor: pointer;
}
</style>
