<template>
  <div>
    <div class="accordion" id="accordionExample">
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
              <div v-for="element of obj.elements" :key="element.label">
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
                        v-on:change="passOptions($event)"
                      >
                        <option v-for="opt of element.options" :key="opt">
                          {{ opt }}
                        </option>
                      </select>
                      <input
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
    </div>
  </div>
</template>
<script>
const json = require("./../assets/elements.json");
import { bus } from '../main'
export default {
  name: "DynamicElements",
  data() {
    return {
      json: json,
      options: {},
    };
  },
  methods:{
    passOptions($event){
      console.log($event.target.value);
      console.log(this.options.chart);
      bus.$emit("send dynamic options",{'options':this.options});
    },
    setOptionValues(){
      this.options = {
       "chart": {...this.json.filter((value)=>value.id == 2)},
      }
      console.log(this.options.chart);
    }
  },
  mounted(){
    this.setOptionValues()
  }
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
