<template lang="">
  <div v-if="active" class="popup">
    <FullScreen bgColor="rgba(0, 0, 0, 0.5)" class="jus-c-center">
      <BaseContentFrame
        :autoScroll="false"
        :height="height"
        :maxWidth="maxWidth"
        :maxHeight="maxHeight"
        :minWidth="minWidth"
        :minHeight="minHeight"
        class="m-v-20"
      >
        <template v-slot:content>
          <div class="popup__header fx-s-between">
            <div class="popup__title">{{ title }}</div>
            <div>
              <slot name="header"></slot>
              <div class="popup__cancel">
                <div class="mi-cancel cur-p" @click="$emit('close')">
                  <i class="far fa-window-close"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="popup__content">
            <slot name="content"></slot>
          </div>
        </template>
        <template v-slot:footer>
  <div class="popup__footer p-t-20">
    <slot name="footer"></slot>
  </div>
</template>
      </BaseContentFrame>
    </FullScreen>
  </div>
</template>
<script>
export default {
  name: "Popup",
  props: {
    title: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "fit-content",
    },
    active: {
      type: Boolean,
      default: false,
    },
    maxWidth: {
      type: [Number, String],
      default: null,
    },
    maxHeight: {
      type: [Number, String],
      default: null,
    },
    minWidth: {
      type: [Number, String],
      default: "500px",
    },
    minHeight: {
      type: [Number, String],
      default: "200px",
    },
    contentFix: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss">
@import "../../assets/scss/components/popup/popup.scss";
</style>
