<template lang="">
  <div
    class="accountcontrols pos-relative"
    @click="showAccountControls = !showAccountControls"
    v-click-outside="hideAccount"
  >
    <div
      class="accountcontrols__icon fx-center cur-p"
      v-on="tooltipListeners($t('i18nAccount.Account'))"
    >
      <i class="fas fa-user-circle"></i>
    </div>
    <BaseContentFrame
      v-show="showAccountControls"
      :stopPropagation="true"
      tabindex="0"
      class="pos-absolute p-10"
      width="220px"
      top="100%"
      right="0"
      boxShadow="0px 4px 10px rgba(0,0,0, 0.2)"
      :zIndex="50"
    >
      <template v-slot:content>
        <ed-row class="fx-center">
          <div class="accountcontrols__avatar">
            <i class="fas fa-user-circle"></i>
          </div>
        </ed-row>
        <ed-row class="fx-center">
          <div class="accountcontrols__name">
            <span>{{ $store.getters.DisplayName }}</span>
          </div>
        </ed-row>
        <ed-row class="m-t-20">
          <ed-label value="Ngôn ngữ" class="m-v-10" />
          <ed-select-box
            class="w-full"
            width="100%"
            height="30px"
            v-model="language"
            @changeOption="changeLanguage($event)"
            :default="languages.findIndex(lan => lan.Data == $store.state.Language)"
            :options="languages"
            :listField="languageFields"
          />
        </ed-row>
        <ed-row class="m-t-30 fx-center">
          <ed-button
            v-if="_getLocalStorageNotParse('AccountID')"
            :label="$t('i18nMenu.Authen.Logout')"
            @click.native="logout"
            :styleBtn="1"
          />
          <div v-else class="fx-row">
            <ed-button
              :label="$t('i18nMenu.Authen.Login')"
              @click.native="login"
              :styleBtn="2"
            />
            <ed-button
              :label="$t('i18nMenu.Authen.Register')"
              @click.native="register"
              :styleBtn="1"
            />
          </div>
        </ed-row>
      </template>
    </BaseContentFrame>
  </div>
</template>
<script>
// Plugins
import { AccountType } from "@/models/enum/AccountType.js";
import UserAPI from "@/api/components/User/UserAPI.js";
import AdminAPI from "@/api/components/Admin/AdminAPI.js";

export default {
  name: "Account",
  data() {
    return {
      showAccountControls: false,
      languages: [
        { LanguageName: "Tiếng việt", Icon: "vn", Data: "vi" },
        {
          LanguageName: "English",
          Icon: "vg",
          Data: "en",
        },
      ],
      languageFields: [
        { field: "LanguageName", type: "text" },
        { field: "Icon", type: "flag", pos: "center", scale: "1.2" },
      ],
      language: 0,
    };
  },
  methods: {
    /**
     * Đăng xuất
     * CreatedBy: NTDUNG (23/11/2021)
     */
    logout() {
      this.showAccountControls = false;
      this.$router.push("/login");
    },
    /**
     * Đăng nhập
     * CreatedBy: NTDUNG (30/11/2021)
     */
    login() {
      this.showAccountControls = false;
      this.$router.push("/login");
    },
    /**
     * Đăng kí
     * CreatedBy: NTDUNG (30/11/2021)
     */
    register() {
      this.showAccountControls = false;
      this.$router.push("/register");
    },
    changeLanguage(index) {
      var language = this.languages[index].Data;
      this.$store.dispatch("setLang", language);
      this._setLocalStorage("Language", language);

      switch (this._getLocalStorage("AccountType")) {
        case AccountType.GUEST:
          break;
        case AccountType.ADMIN:
          AdminAPI.UpdateColumns(this._getLocalStorageNotParse("AccountID"), {
            Language: language,
          })
            .then((res) => {
              console.log(res);
              this.$toast.success("Cập nhật ngôn ngữ thành công");
            })
            .catch((err) => {
              console.log(err);
              this.$toast.warn("Cập nhật ngôn ngữ thất bại");
            });
          break;
        case AccountType.USER:
          UserAPI.UpdateColumns(this._getLocalStorageNotParse("AccountID"), {
            Language: language,
          })
            .then((res) => {
              console.log(res);
              this.$toast.success("Cập nhật ngôn ngữ thành công");
            })
            .catch((err) => {
              console.log(err);
              this.$toast.warn("Cập nhật ngôn ngữ thất bại");
            });
          break;
      }
    },
    hideAccount() {
      this.showAccountControls = false;
    },
  },
};
</script>
<style lang="scss">
@import "../../../assets/scss/layouts/navbar/accountcontrols/accountcontrols.scss";
</style>
