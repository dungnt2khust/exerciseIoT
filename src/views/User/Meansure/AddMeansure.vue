<template>
  <EdPopup title="Them lan do" :active="true" @close="$emit('close')">
    <template v-slot:content>
      <EdLabel value="Nhip tim" />
      <EdInput type="number" v-model="meansureInfo.HeartBeat" />
    </template>
    <template v-slot:footer>
      <EdButton
        :method="
          () => {
            $emit('addMeansure');
          }
        "
        label="Them moi"
        :styleBtn="1"
      />
    </template>
  </EdPopup>
</template>

<script>
export default {
  name: "AddMeansure",
  props: {
    meansureInfo: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style>
</style>