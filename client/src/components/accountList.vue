<template>
  <div class="insideContent">
    <div class="mask"></div>
    <div class="contentCenter account_contentCenter">
      <div class="page">
        <span>帳號列表</span>
      </div>
    </div>
    <div class="vueGoodTable">
      <div class="contentCenter" id="contentCenter_phone">
        <div class="page">
          <span>帳號列表</span>
        </div>
      </div>
      <div class="mask"></div>
      <div class="phone_mask"></div>
      <div class="addUser" id="addNewUser">
        <span class="addAccount">新增帳號</span>
        <button class="closeAdd" v-on:click="close()">X</button>
        <div class="clear"></div>
        <form v-on:submit.prevent="createAccount">
          <div class="input">
            <p class="p_all">所屬單位</p>
            <select v-model="newAccount.department" class="addSelect">
              <option v-for="item in departments" :key="item.value" :value="item.field">{{item.field}}</option>
            </select>
            
            <div class="clear"></div>
            <p class="p_all">員工權限</p>
            <select v-model="newAccount.employeeLimit" class="addSelect">
              <option>後台管理者</option>
              <option>主管使用者</option>
              <option>一般使用者</option>
            </select>
            
            <div class="clear"></div>
            <p class="p_all">*姓名</p>
            <input
              id="userName"
              class="input_all"
              type="text"
              v-model="newAccount.userName"
              required
            />
            <div class="clear"></div>
          </div>
          <div class="input">
            <p class="p_all">*員工編號</p>
            <input id="employeeNumber" class="input_all" type="text"       v-model="newAccount.employeeNumber"    required/>
            <!-- &nbsp; 不換行空格 -->
            <div class="clear"></div>
            <p class="p_all">*信箱</p>
            <input
              id="email"
              class="input_all"
              type="email"
              v-model="newAccount.email"
              required
            />
            <div class="clear"></div>
            <p class="p_all">*密碼</p>
            <input
              id="password"
              class="input_all"
              type="text"
              v-model="newAccount.password"
              required
            />
            <div class="clear"></div>
          </div>
          <div class="clear"></div>
          <div class="add_btn">
            <button class="functionButton addBTN" id="tableActionsBtn" type="submit">
              確認
            </button>
            <div class="clear"></div>
          </div>
          <div class="clear"></div>
        </form>
        <div class="add_btn" id="cancel">
          <button
            class="functionButton deleteBTN"
            id="tableActionsBtn"
            v-on:click="close()"
          >
            取消
          </button>
          <div class="clear"></div>
        </div>
        <div class="clear"></div>
      </div>
      <div class="buttonFunArea">
        <div class="buttonArea">
          <button class="editButton" @click="openFilter()" id="filter_phone">
          <img src="../assets/icon/filter.png"/>
          <span>篩選</span>
          </button>
          <button class="editButton" v-on:click="open()" id="add_user">
            <img src="../assets/icon/add.png"/>
            <span>新增使用者</span>
          </button>
          <button class="editButton " id="delete" v-on:click="deleteAccount()">
            <img src="../assets/icon/delete.png"/>
            <span>刪除使用者</span>
          </button>
          <button class="editButton clearALL" @click="clearALL()" >
            <img src="../assets/icon/clear.png"/>
            <span>清除篩選</span>
          </button>
          <div class="clear"></div>
        </div>
        <div class="clear"></div>
      </div>
      <!-- 手機版的選單 -->
      <div slot="table-actions" class="account_select_phone" id="account_select_phone">
        <!-- <div class="right_select"> -->
          <!-- <div class="dep">所屬單位</div>
          <div class="limit">員工權限</div> -->
          <div>
            <el-select
              v-model="chooseDepartment"
              class="selectBox"
              @change="selection(0)"
              placeholder="請選擇部門"
            >
              <el-option value="全選">全選</el-option>
              <el-option v-for="item in departments" :key="item.value" :value="item.field"></el-option>
            </el-select>
          </div>
          <div>
            <el-select
              v-model="chooseLimit"
              class="selectBox"
              @change="selection(1)"
              placeholder="請選擇權限"
            >
              <el-option value="全選">全選</el-option>
              <el-option value='後台管理者'>後台管理者</el-option>
              <el-option value='主管使用者'>主管使用者</el-option>
              <el-option value='一般使用者'>一般使用者</el-option>
            </el-select>
          </div>
        <!-- </div> -->
        <!-- <div class="left_btn">
          <div>
            <button id="add_user" class="functionButton" v-on:click="open()">十</button>
          </div>
          <div>
            <button  class="functionButton" v-on:click="deleteAccount()">
              刪除
            </button>
          </div>
        </div> -->
      </div>

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
        :pagination-options="{
            enabled: true,
            mode: 'pages',
            perPage: '',
            rowsPerPageLabel: '',
            position: 'bottom',
            dropdownAllowAll: false,
            setCurrentPage: 1,
            nextLabel: 'next',
            prevLabel: 'prev',
          }"
      >
        <!-- <div slot="table-actions" class="account_select">
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
        </div> -->
      </vue-good-table>
      <div class="clear"></div>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
import axios from "axios";
import dateTime from "../assets/js/dateTime";
import util from "../assets/js/utility";
import $ from "jquery";

export default {
  name: "accountList",
  components: {
    "vue-good-table": require("vue-good-table").VueGoodTable,
  },
  data() {
    return {
      hotels: [],
      allHtols:[],
      networkDataReceived: false,
      networkDataReceivedAll: false, 
      chooseDepartment: "",
      chooseLimit: "",
      checkedAccount: [],
      departments: [],
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
        picture:"004.png",
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
      columns_computer: [
        {
          label: "所屬單位",
          field: "department",
          tdClass: "display",
          thClass: "display",
        },
        {
          label: "員工編號",
          field: "employeeNumber",
          sortable: false
        },
        {
          label: "姓名",
          field: "userName",
          sortable: false
        },
        {
          label: "信箱",
          field: "email",
          tdClass: "display_ipad",
          thClass: "display_ipad",
          sortable: false
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
      columns_phone: [
        {
          label: "員工編號",
          field: "employeeNumber",
          sortable: false
        },
        {
          label: "姓名",
          field: "userName",
          sortable: false
        },
        {
          label: "權限等級",
          field: "employeeLimit",
        }
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
      deleteEmployee: [],
      window_width: document.documentElement.clientWidth,
      isDepartment: false,
      isLimit: false,
      filterObj: {
        department: '',
        employeeLimit: ''
      },
      x: '',
      y: '',
    };
  },
  mounted() {
    let self = this;
    let promises = [];
    var loginData = JSON.parse(localStorage.getItem("token"));
    var userID = loginData.id;
    self.departments = [];
    self.hotels = [];
    if(loginData.limit != "後台管理者"){
      this.$router.push({ name: "competition" });
    }

    var inPromises = false;
    for (var i in promises) {
      console.log(promises);
      if (promises[i]._id === self.userID) {
        inPromises = true;
        break;
      }
    }
    if (!inPromises) {
      promises.push(
        axios
          .get("https://hotelapi.im.nuk.edu.tw/api/account/" + userID)
          .then((response) => {
            self.networkDataReceived = true;
            self.logingAccount = response.data;
            self.newAccount.companyName = this.logingAccount.companyName;
            self.company = this.logingAccount.companyName;
          })
          .catch((error) => {
            console.log(error);
          })
      );
    }

    if ("indexedDB" in window) {
      console.log("Reading indexedDB...");
      util.readAllData("account").then(function (data) {
        if (!self.networkDataReceived) {
          console.log("From cache", data);
          for (var i in data) {
            if (data[i]._id === userID) {
              promises.push(data[i]);
              self.logingAccount = data[i];
              self.newAccount.companyName = self.logingAccount.companyName;
              self.company = self.logingAccount.companyName;
              break;
            }
          }
        }
      });
    }
      
    Promise.all(promises).then(() => {
      axios
        .get("https://hotelapi.im.nuk.edu.tw/api/account")
        .then((response) => {
          self.networkDataReceivedAll = true;
          self.allHtols = response.data;
          for(var num=0; num< self.allHtols.length;num++){
            if(self.allHtols[num].companyName === self.logingAccount.companyName){
              var inHotels = false;
              for (var i in self.hotels) {
                if (self.hotels[i]._id === self.allHtols[num]._id){
                  inHotels = true;
                  break;
                }
              }
              if (!inHotels) {
                self.hotels.push(self.allHtols[num]);
              }
            } 
          }
          self.addDepartment();
          self.accountList = self.hotels;
      })
      .catch((error) => {
        console.log(error);
      });
      
      if ("indexedDB" in window) {
        console.log("Reading indexedDB...");
        util.readAllData("account").then(function (data) {
          if (!self.networkDataReceivedAll) {
            console.log("From cache", data);
            self.allHtols = data;
            for (var i in self.allHtols) {
              if(self.allHtols[i].companyName === self.logingAccount.companyName){
                self.hotels.push(self.allHtols[i]);
              }
            }
            self.addDepartment();
            self.accountList = self.hotels;
          }
        });
      }
    })

    var _this = this
    window.onresize = function () {
      _this.window_width = document.documentElement.clientWidth 
    }
    if(document.documentElement.clientWidth > 768){
        this.columns = this.columns_computer
    }else{
        this.columns = this.columns_phone
    }
  },
  watch: {
    'window_width': function (val) { 
      if(val > 768){
        this.columns = this.columns_computer
      }else{
        this.columns = this.columns_phone
      }
    }
  },
  methods: {
    clearALL(){
      let self = this;
      self.chooseDepartment = '';
      self.chooseLimit = ''
      self.accountList = self.hotels
      self.x = ''
      self.y = ''
    },
    addDepartment(){
      let self = this;
      var result = new Set();
      self.departments = []
      self.hotels.forEach((item) => {
        result.has(item.department) ? '' : self.departments.push({field: item.department, value: item._id}) && result.add(item.department)
      })
    },
    selectionChanged(params) {
      let k;
      let self = this;
      this.checkedAccount = [];
      this.deleteEmployee = [];
      this.rowSelection = params.selectedRows;
      if(this.rowSelection.length !== 0){
        $('#delete').show()
        $('#filter_phone').hide()
      }else{
        $('#delete').hide()
        $('#filter_phone').show()
      }
      for (k = 0; k < self.rowSelection.length; k++) {
        this.checkedAccount.push(this.rowSelection[k]._id);
        this.deleteEmployee.push(this.rowSelection[k].employeeNumber);
        // console.log(this.checkedAccount._id);
      }
    },
    openFilter(){
      let self = this;
      self.close()
      event.stopPropagation();
      $(".account_select_phone").slideToggle("normal");
      $(document).click(function (event) {
        var area = $(".account_select_phone"); // 設定目標區域
        if (!area.is(event.target) && area.has(event.target).length === 0) {
          // $('#divTop').slideUp('slow');  //滑動消失
          $(".account_select_phone").hide(); // 淡出消失
        }
      });
    },
    linkAccountDetial(params) {
      let nowAccount = params.row;
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
        if (result.value) {
          this.deletedRecord();
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

            util.deleteItemFromData("account", self.checkedAccount[k]);
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
      let self = this
      // this.newAccount.companyName = 
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
            .then((reponse) => {
              console.log(reponse);
              // this.accountList.push(newUser);
              this.hotels.push(reponse.data);
              self.addDepartment()
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
                   this.close();
                })
                .catch((errorRecord) => {
                  console.log(errorRecord);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },
    selection: function (value) {
      let self = this
      var arr = []
      if(value === 0){
        if(self.chooseDepartment !== '全選'){
          self.x = self.chooseDepartment
        }else{
          self.x = ''
        }
      }else{
        if(self.chooseLimit !== '全選'){
          self.y = self.chooseLimit
        }else{
          self.y = ''
        }
      }
      self.filterObj = {
        employeeLimit: self.y,
        department: self.x
      }
      console.log(self.filterObj)
      arr = this.selectionFilter(self.filterObj)
      self.accountList = arr
      return self.accountList
    },
    selectionFilter(filterObj1){
      let self = this
      const filterKeys = Object.keys(filterObj1);
      return self.hotels.filter((item) => {
        return filterKeys.every((key) => {
          if(!filterObj1[key].length){
            return true;
          }
          return !!~filterObj1[key].indexOf(item[key])
        })
      })
    },
    close: function () {
      document.getElementById("addNewUser").style.display = "none";
      $(".mask").hide(); 
      $(".phone_mask").hide(); 
      document.getElementById("employeeNumber").removeAttribute("required");
      document.getElementById("email").removeAttribute("required");
      document.getElementById("password").removeAttribute("required");
      document.getElementById("userName").removeAttribute("required");
      this.newAccount={};
      this.newAccount.companyName = this.logingAccount.companyName;
      this.newAccount.department = "資訊部";
      this.newAccount.employeeLimit = "一般使用者";
      this.newAccount.lastLoginDate = "New User";
      this.newAccount.lastLoginTime = "";
      this.newAccount.firstLogin = true;
      this.newAccount.picture = "004.png";
    },
    open: function () {
      document.getElementById("employeeNumber").required = true;
      document.getElementById("email").required = true;
      document.getElementById("password").required = true;
      document.getElementById("userName").required = true;
      event.stopPropagation();
      $('.mask').show();
      $('.phone_mask').show();
      $("#addNewUser").slideToggle("normal");
      // $(".account_select_phone").hide(500); // 淡出消失

      $(document).click(function (event) {
        var area = $("#addNewUser"); // 設定目標區域
        if (!area.is(event.target) && area.has(event.target).length === 0) {
          // $('#divTop').slideUp('slow');  //滑動消失
          $("#addNewUser").hide(); // 淡出消失
          $(".mask").hide(); // 淡出消失
          $(".phone_mask").hide(); // 淡出消失
        }
      });
      // document.getElementById("addNewUser").style.visibility = "visible";
    },
    deletedRecord: function () {
      console.log("deleteRecord");
      console.log(this.deleteEmployee);
      let i ,self = this;
      self.UserListModify.modify = "刪除";  
      self.UserListModify.time = dateTime.recordDate() + " " + dateTime.recordTime();
      console.log(self.UserListModify);
      for(i=0 ; i<self.deleteEmployee.length ; i++){
        self.UserListModify.employeeNumber = self.deleteEmployee[i];
        console.log(self.UserListModify);
        axios
        .put(
          "https://hotelapi.im.nuk.edu.tw/api/history/" +self.company +"/" +self.record,self.UserListModify
        ).then((responseRecord) => {
          console.log(responseRecord);
        }).catch((errorRecord) => {
          console.log(errorRecord);
        });
      }
      
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src= '../assets/css/accountList.css'></style>
