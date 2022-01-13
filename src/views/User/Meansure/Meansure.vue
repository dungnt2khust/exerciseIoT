<template>
  <Base-Content-Area bgColor="#fff" title="Ket qua do">
    <template v-slot:content>
      <EdFrame bgColor="#fff" class="h-full fx-col" autoScroll>
        <EdListGridAdvance
          class="flex-1 w-full"
          :listHeader="listHeader"
          :listCheck="listCheck"
          :pagingInfo="pagingInfo"
          :showSearch="false"
          :showCheck="false"
          :showPaging="false"
          :editRow="false"
          @Delete="deleteMeansure"
          @DeleteMulti="DeleteMulti"
          @changeListCheck="changeListCheck($event)"
          v-model="listMeansure"
          itemID="ProductID"
        >
          <template v-slot:header>
            <EdButton
              :method="handleShowAddMeansure"
              label="Them lan do"
              :styleBtn="1"
            />
          </template>
        </EdListGridAdvance>
        <AddMeansure
          v-if="showAddMeansure"
          @close="showAddMeansure = false"
          :meansureInfo="meansureInfo"
          @addMeansure="addMeansure"
        />
      </EdFrame>
    </template>
  </Base-Content-Area>
</template>

<script>
import MeansureAPI from "../../../api/components/Meansure/MeansureAPI.js";
import AddMeansure from "./AddMeansure";

export default {
  name: "Meansure",
  components: {
    AddMeansure,
  },
  data() {
    return {
      showAddMeansure: false,
      listMeansure: [],
      listCheck: [],
      listHeader: [
        {
          title: "Nhip tim",
          field: "HeartBeat",
          type: "text",
          width: 130,
          headerPos: "left",
          dataPos: "left",
          pin: true,
        },
        {
          title: "Ngay do",
          field: "CreatedDate",
          type: "text",
          width: 150,
          headerPos: "left",
          dataPos: "left",
          wrap: true,
        },
        {
          title: "Nguoi do",
          field: "CreatedBy",
          type: "text",
          width: 150,
          headerPos: "left",
          dataPos: "left",
          wrap: true,
        },
      ],
      pagingInfo: {
        filterString: "",
        pageNum: 1,
        pageSize: 10,
        filterData: {
          Sorts: [{ Field: "CreatedBy", Desc: true }],
        },
      },
      meansureInfo: {
        HeartBeat: 0,
      },
    };
  },
  mounted() {
    this.getMeansureData();
  },
  methods: {
    getMeansureData() {
      MeansureAPI.GetAll("", 1, 20)
        .then((res) => {
          if (res.data.Success) {
            this.listMeansure = res.data.Data;
            this.meansureInfo.CreatedBy = this._getLocalStorage(
              "AccountData"
            ).DisplayName;
            this.meansureInfo.UserID = this._getLocalStorageNotParse(
              "AccountID"
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteMeansure(meansure) {
      this.$dialog.confirm("Ban co chac muon xoa thong so nay?", {
        YES: () => {
          MeansureAPI.Delete(meansure.MeansureID)
            .then((res) => {
              this.$toast.success("Xoa thanh cong");
            })
            .catch((err) => {
              this.$toast.error("Xoa that bai");
            });
        },
      });
    },
    DeleteMulti(meansure) {
      console.log(meansure);
    },
    /**
     * Thay đổi danh sách được check
     * CreatedBy: NTDUNG (23/12/2021)
     */
    changeListCheck(newListCheck) {
      this.listCheck = newListCheck;
    },
    handleShowAddMeansure() {
      this.showAddMeansure = true;
    },
    addMeansure() {
      MeansureAPI.post(this.meansureInfo)
        .then((res) => {
          this.$toast.success("Them moi thanh cong");
          this.getMeansureData();
          this.showAddMeansure = false;
        })
        .catch((err) => {
          this.$toast.error("Them moi that bai");
        });
    },
  },
};
</script>

<style>
</style>