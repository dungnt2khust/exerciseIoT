<template lang="">
  <div class="header">
    <nav-bar />
  </div>
</template>
<script>
// Components
import NavBar from "@/layouts/navbar/NavBar.vue";

export default {
  name: "Header",
  components: {
    NavBar,
  },
};
</script>
<style lang="scss">
@import "../../assets/scss/layouts/header/header.scss";
</style>
