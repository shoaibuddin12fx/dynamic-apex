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
                    <label class="col-sm-6 col-form-label">{{
                      element.label
                    }}</label>
                    <div class="col-sm-6">
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
                        v-if="element.type == 'range'"
                        type="range"
                        class="form-control"
                      />
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
  },
  mounted() {
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
</style>
