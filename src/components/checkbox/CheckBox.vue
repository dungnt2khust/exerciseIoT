<template lang="">
    <div @click="toggleCheckbox" class="checkbox mi-20 cur-p" tabindex="0">
        <div v-show="value" class="mi-tick scale-1.3"></div>
    </div>
</template>
<script>
/* eslint-disable */
export default {
  name: "CheckBox",
  props: {
    value: {
      type: [Number, String, Boolean],
      default: false,
    },
    label: {
      type: [Number, String],
      default: null,
    },
  },
  methods: {
    /**
     * Chuyển trạng thái checkbox
     * CreatedBy: NTDUNG (08/12/2021)
     */
    toggleCheckbox(e) {
      e.stopPropagation();
      this.$emit("input", !this.value);
      this.$emit("changeState", !this.value);
    },
  },
};
</script>
<style lang="scss">
@import "../../assets/scss/components/checkbox/checkbox.scss";
</style>