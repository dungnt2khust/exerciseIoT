<template lang="">
  <div class="textarea">
    <textarea
      class="w-full default-scrollbar"
      :rows="row"
      :cols="col"
      :id="rules && Object.getOwnPropertyNames(rules).length ? name : ''"
      :name="rules && Object.getOwnPropertyNames(rules).length ? name : 'DefaultTextarea'"
      :style="customizeStyle(styleCustom)"
      v-on="textareaListeners"
      :value="value"
      :class="{ 'input--invalid': errMsg != '', 'input--disabled': disabled }"
      :readonly="disabled"
      :title="errMsg"
      v-validate="rules"
    />
    <div
      v-if="errMsg"
      class="input__error txt-reg-1 txt-s-12 m-t-10"
      style="color: red;"
    >
      {{ errMsg }}
    </div>
  </div>
</template>
<script>
export default {
  name: "Textarea",
  inject: {
    parentValidator: {
      default: null,
    },
  },
  props: {
    col: {
      type: Number,
      default: 1,
    },
    row: {
      type: Number,
      default: 5,
    },
    resize: {
      type: String,
      default: "none",
    },
    width: {
      type: String,
      default: null,
    },
    height: {
      type: String,
      default: null,
    },
    value: {
      type: [Number, String],
      default: null,
    },
    rules: {
      type: [Object, String],
      default: () => {},
    },
    name: {
      type: [Number, String],
      default: "DefaultTextArea",
    },
    errMsg: {
      type: [Number, String],
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      styleCustom: {
        resize: this.resize,
        width: this.width,
        height: this.height,
      },
    };
  },
  created() {
    this.$validator = this.parentValidator;
  },
  mounted() {
    if (this.parentValidator) {
      var error = {
        custom: {
          [this.name]: {},
        },
      };
      if (this.rules && "required" in this.rules) {
        error.custom[this.name].required = () =>
          this.$t("i18nValidate.Required", { Field: this.label || this.name });
      }
      if (this.rules && this.rules.max) {
        error.custom[this.name].max = (...rest) =>
          this.$t("i18nValidate.Max", {
            Field: this.label || this.name,
            Max: rest[1],
          });
      }
      this.$validator.localize(this.$store.state.Language, error);
    }
  },
  computed: {
    /**
     * Lắng nghe textarea
     * CreatedBy: NTDUNG (24/11/2021)
     */
    textareaListeners() {
      return Object.assign({}, this.listeners, {
        input: (event) => {
          this.$emit("input", event.target.value);
        },
      });
    },
  },
};
</script>
<style lang="scss">
@import "../../assets/scss/components/textarea/textarea.scss";
</style>
