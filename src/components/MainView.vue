
<template>
    <div class="outer-main row">

        <div class="header col-12">

        </div>
        <div class="leftside-chart col-8">
          <DynamicChart />
        </div>
        <div class="rightside-chart col-4">

          <DynamicElements />

        </div>


    </div>
</template>
<script>

import DynamicChart from './DynamicChart.vue'
import DynamicElements from './DynamicElements.vue'

export default {
  name: 'MainView',  
  components: {
    DynamicChart,
    DynamicElements
  }
}
</script>

<style scoped>

.header{
  height: 60px;
}

.rightside-chart{
  background: purple;
  min-height: 50px;
  height: calc(100vh - 340px);
  overflow-y: scroll;
}

</style>
