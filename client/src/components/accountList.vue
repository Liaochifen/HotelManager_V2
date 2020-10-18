<template>
  <div class="insideContent">
    <div class="contentCenter">
      <div class="page">
        <span>帳號列表</span>
      </div>
    </div>
    <div class="vueGoodTable">
      <div class="addUser" id="addNewUser">
        <span class="addAccount">新增帳號</span>
        <button class="closeAdd" v-on:click="close()">X</button>
        <div class="clear"></div>
        <form v-on:submit.prevent="createAccount">
          <div class="input">
            <input
              id="employeeNumber"
              type="text"
              v-model="newAccount.employeeNumber"
              required
            />
            <span>*員工編號&nbsp;:&nbsp;</span>
            <!-- &nbsp; 不換行空格 -->
            <div class="clear"></div>
            <input
              id="email"
              type="email"
              v-model="newAccount.email"
              required
            /><span>*信箱&nbsp;:&nbsp;</span>
            <div class="clear"></div>
            <input
              id="password"
              type="text"
              v-model="newAccount.password"
              required
            /><span>*密碼&nbsp;: &nbsp;</span>
            <div class="clear"></div>
          </div>
          <div class="input">
            <select v-model="newAccount.department" class="addSelect">
              <option>資訊部</option>
              <option>行銷部</option>
            </select>
            <span>所屬單位&nbsp;: &nbsp;</span>
            <div class="clear"></div>
            <select v-model="newAccount.employeeLimit" class="addSelect">
              <option>後台管理者</option>
              <option>主管使用者</option>
              <option>一般使用者</option>
            </select>
            <span>員工權限&nbsp;: &nbsp;</span>
            <div class="clear"></div>
            <input
              id="userName"
              type="text"
              v-model="newAccount.userName"
              required
            /><span>*姓名&nbsp;: &nbsp;</span>
            <div class="clear"></div>
          </div>
          <div class="clear"></div>
          <div class="add_btn">
            <button class="functionButton" id="tableActionsBtn" type="submit">
              確認
            </button>
          </div>
        </form>
        <div class="add_btn">
          <button
            class="functionButton"
            id="tableActionsBtn"
            v-on:click="close()"
          >
            取消
          </button>
        </div>
      </div>

      <!-- 手機版的選單 -->

      <div slot="table-actions" class="account_select_phone">
        <div class="right_select">
          <div class="dep">所屬單位</div>
          <div class="limit">員工權限</div>
          <div>
            <select
              v-model="chooseDepartment"
              class="selectBox"
              v-on:click="selection()"
            >
              <option chooseDepartment>請選擇</option>
              <option>資訊部</option>
              <option>行銷部</option>
            </select>
          </div>
          <div>
            <select
              v-model="chooseLimit"
              class="selectBox"
              v-on:click="selection()"
            >
              <option chooseLimit>請選擇</option>
              <option>後台管理者</option>
              <option>主管使用者</option>
              <option>一般使用者</option>
            </select>
          </div>
        </div>
        <div class="left_btn">
          <div>
            <button class="functionButton" v-on:click="open()">新增</button>
          </div>
          <div>
            <button class="functionButton" v-on:click="deleteAccount()">
              刪除
            </button>
          </div>
        </div>
      </div>

      <!-- 手機版的選單 -->

      <vue-good-table
        class="el-table"
        styleClass="vgt-table striped"
        :columns="columns"
        :rows="accountList"
        :fixed-header="true"
        :search-options="{ enabled: true }"
        text-align="center"
        @on-selected-rows-change="selectionChanged"
        :select-options="{ enabled: true }"
        @on-cell-click="linkAccountDetial"
      >
        <div slot="table-actions" class="account_select">
          <span>所屬單位</span>
          <select
            v-model="chooseDepartment"
            class="selectBox"
            v-on:click="selection()"
          >
            <option chooseDepartment>請選擇</option>
            <option>資訊部</option>
            <option>行銷部</option>
          </select>
          <span>員工權限</span>
          <select
            v-model="chooseLimit"
            class="selectBox"
            v-on:click="selection()"
          >
            <option chooseLimit>請選擇</option>
            <option>後台管理者</option>
            <option>主管使用者</option>
            <option>一般使用者</option>
          </select>
          <button class="functionButton" v-on:click="deleteAccount()">
            刪除
          </button>
          <button class="functionButton" v-on:click="open()">新增</button>
        </div>
      </vue-good-table>
      <div class="clear"></div>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
import axios from "axios";
import dateTime from "../assets/js/dateTime";
export default {
  name: "accountList",
  components: {
    "vue-good-table": require("vue-good-table").VueGoodTable,
  },
  data() {
    return {
      hotels: [],
      chooseDepartment: "請選擇",
      chooseLimit: "請選擇",
      checkedAccount: [],
      // checkedAccount:勾選的，accountList:最後要顯示的
      accountList: [],
      newAccount: {
        companyName: "",
        department: "資訊部",
        employeeNumber: "",
        employeeLimit: "一般使用者",
        email: "",
        userName: "",
        password: "",
        lastLoginDate: "New User",
        lastLoginTime: "",
        firstLogin: true,
      },
      columns: [
        {
          label: "所屬單位",
          field: "department",
          tdClass: "display",
          thClass: "display",
        },
        {
          label: "員工編號",
          field: "employeeNumber",
        },
        {
          label: "姓名",
          field: "userName",
        },
        {
          label: "信箱",
          field: "email",
          tdClass: "display_ipad",
          thClass: "display_ipad",
        },
        {
          label: "權限等級",
          field: "employeeLimit",
        },
        {
          label: "上次登入時間",
          field: "lastLoginDate",
          tdClass: "display",
          thClass: "display",
        },
      ],

      rowSelection: [],
      UserListModify: {
        modify: "",
        employeeNumber: "",
        time: "",
      },
      logingAccount: {}, //登入者的資訊
      company: "",
      record: "UserListModify",
      deleteRecord: [],
    };
  },
  mounted() {
    let self = this;
    // var r = 0;
    axios
      .get("https://hotelapi.im.nuk.edu.tw/api/account")
      .then((response) => {
        //console.log(response.data);
        self.hotels = response.data;
        self.accountList = self.hotels;
      })
      .catch((error) => {
        console.log(error);
      });
    var loginData = JSON.parse(localStorage.getItem("token"));
    var userID = loginData.id;
    axios
      .get("https://hotelapi.im.nuk.edu.tw/api/account/" + userID)
      .then((response) => {
        this.logingAccount = response.data;
        this.newAccount.companyName = this.logingAccount.companyName;
        this.company = this.logingAccount.companyName;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    selectionChanged(params) {
      let k;
      let self = this;
      this.checkedAccount = [];
      this.rowSelection = params.selectedRows;
      for (k = 0; k < self.rowSelection.length; k++) {
        this.checkedAccount.push(this.rowSelection[k]._id);
        console.log("selectionChanged");
        console.log(this.checkedAccount);
        console.log(this.rowSelection);
        // console.log(this.checkedAccount._id);
      }
    },
    linkAccountDetial(params) {
      let nowAccount = params.row;
      console.log(nowAccount._id);
      this.$router.push({ path: `/accountDetial/${nowAccount._id}` });
    },
    deleteAccount: function () {
      let k;
      let self = this;
      this.$fire({
        title: "你確定要刪除嗎?",
        text: "刪除後將不可復原",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "對!刪掉!!",
        cancelButtonText: "取消",
      }).then((result) => {
        this.deleteRecord = this.rowSelection;
        this.deletedRecord();
        if (result.value) {
          for (k = 0; k < self.checkedAccount.length; k++) {
            //console.log("id:"+self.checkedAccount[k])
            //var check = new String(self.checkedAccount[k]);
            let check = self.checkedAccount[k];
            console.log(
              self.checkedAccount[k] +
                ":" +
                self.checkedAccount[k].employeeNumber
            );
            //console.log(typeof(check));
            //找陣列裡的物件中的值
            var index = self.hotels.findIndex((s) => s._id == check);
            console.log(index);
            console.log(self.hotels[index]);
            self.hotels.splice(index, 1);
            console.log(k + ":" + self.checkedAccount[k]);
            console.log("delete:" + self.checkedAccount[k]);
            axios
              .delete(
                "https://hotelapi.im.nuk.edu.tw/api/account/" +
                  self.checkedAccount[k]
              ) //會等前面跑完才跑
              .then(() => {
                self.checkedAccount = [];
                console.log("delete successed:");
                console.log(this.checkedAccount);
              });
          }
          this.$fire({
            title: "Success !!",
            text: "成功刪除",
            type: "success",
          });
        }
      });

      //window.location.reload(); 網頁重新整理
    },
    createAccount: function () {
      let i;
      let newUser = this.newAccount;
      for (i = 0; i < this.hotels.length; i++) {
        // console.log("newAccount: "+this.newAccount.userName);
        // console.log("hotels: "+this.hotels[i].userName);
        if (this.newAccount.employeeNumber === this.hotels[i].employeeNumber) {
          this.$fire({
            title: "Warning !!",
            text:
              "員工編號(帳號) " +
              this.newAccount.employeeNumber +
              " 已經有人用了，換一個吧!!",
            type: "warning",
          });
          this.newAccount.employeeNumber = "";
          break;
        } else if (i === this.hotels.length - 1) {
          axios
            .post("https://hotelapi.im.nuk.edu.tw/api/account", newUser)
            .then(() => {
              // this.accountList.push(newUser);
              this.hotels.push(newUser);
              // this.searchResults.push(newUser);
              this.$fire({
                title: "Success !!",
                text: "成功新增使用者: " + newUser.userName,
                type: "success",
              });
              this.UserListModify.modify = "新增";
              this.UserListModify.employeeNumber = newUser.employeeNumber;
              this.UserListModify.time =
                dateTime.recordDate() + " " + dateTime.recordTime();
              console.log(this.UserListModify);
              axios
                .put(
                  "https://hotelapi.im.nuk.edu.tw/api/history/" +
                    this.company +
                    "/" +
                    this.record,
                  this.UserListModify
                )
                .then((responseRecord) => {
                  console.log(responseRecord);
                })
                .catch((errorRecord) => {
                  console.log(errorRecord);
                });
            })
            .catch((error) => {
              console.log(error);
            });
          this.close();
        }
      }
      // console.log(newUser);
    },
    selection: function () {
      let j;
      //console.log("begineselection:"+this.accountList)
      this.accountList = [];
      for (j = 0; j < this.hotels.length; j++) {
        if (
          this.hotels[j].department == this.chooseDepartment &&
          this.hotels[j].employeeLimit == this.chooseLimit
        ) {
          this.accountList.push(this.hotels[j]);
        } else if (
          this.hotels[j].department == this.chooseDepartment &&
          this.chooseLimit == "請選擇"
        ) {
          this.accountList.push(this.hotels[j]);
        } else if (
          this.chooseDepartment == "請選擇" &&
          this.hotels[j].employeeLimit == this.chooseLimit
        ) {
          this.accountList.push(this.hotels[j]);
        } else if (
          this.chooseDepartment == "請選擇" &&
          this.chooseLimit == "請選擇"
        ) {
          this.accountList.push(this.hotels[j]);
        }
        //console.log("inFor:accountList:"+this.accountList)
      }
      //console.log("accountList:"+this.accountList)
      //return this.accountList;
    },
    close: function () {
      console.log("close");
      document.getElementById("addNewUser").style.visibility = "hidden";
      document.getElementById("employeeNumber").removeAttribute("required");
      document.getElementById("email").removeAttribute("required");
      document.getElementById("password").removeAttribute("required");
      document.getElementById("userName").removeAttribute("required");
      this.newAccount = {};
      this.newAccount.department = "資訊部";
      this.newAccount.employeeLimit = "一般使用者";

      console.log("close");
    },
    open: function () {
      document.getElementById("employeeNumber").required = true;
      document.getElementById("email").required = true;
      document.getElementById("password").required = true;
      document.getElementById("userName").required = true;
      document.getElementById("addNewUser").style.visibility = "visible";
      console.log("open");
    },
    deletedRecord: function () {
      let newUser = this.newAccount;
      this.UserListModify.modify = "刪除";
      this.UserListModify.employeeNumber = newUser.employeeNumber;
      this.UserListModify.time =
        dateTime.recordDate() + " " + dateTime.recordTime();
      console.log(this.UserListModify);
      axios
        .put(
          "https://hotelapi.im.nuk.edu.tw/api/history/" +
            this.company +
            "/" +
            this.record,
          this.UserListModify
        )
        .then((responseRecord) => {
          console.log(responseRecord);
        })
        .catch((errorRecord) => {
          console.log(errorRecord);
        });
    },
  },
  // compoted:{
  //   countID:function(){
  //     let i;
  //     this.maxID=this.hotels[0].id;
  //     for(i=0;i<this.hotels.length;i++){
  //       if(this.hotels[i].id > this.maxID){
  //         this.maxID=this.hotels[i].id;
  //       }
  //     }
  //     return this.maxID;
  //     console.log(this.maxID);
  //   }
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src= '../assets/css/accountList.css'></style>
