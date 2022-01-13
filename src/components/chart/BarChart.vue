<template lang="">
  <div class="chart">
    <apexchart
      width="99%"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>
<script>
export default {
  name: "LineChart",
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    name: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      series: [
        {
          name: this.name,
          data: this.data,
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          // text: "Product Trends by Month",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: this.categories,
        },
      },
    };
  },
  mounted() {},
};
</script>
<style lang=""></style>
