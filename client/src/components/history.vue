<template>
  <div class="historyContent">
    <div class="contentCenter">
      <div class="page">
        <span>歷史紀錄</span>
      </div>
    </div>
    <button @click="changePage(0)" class="pageButton0 pageButtonStart phone_none">評論動態</button>
    <button @click="changePage(1)" class="pageButton1 phone_none">個人動態</button>
    <button @click="changePage(2)" class="pageButton2 phone_none" id="userInfoRecord">紀錄</button>
    <div class="clear"></div>
    <div class="history_list_phone">
      <button @click="changePage(0)" class="pageButton0 pageButtonStart">評論動態</button>
      <button @click="changePage(1)" class="pageButton1">個人動態</button>
      <button @click="changePage(2)" class="pageButton2" id="userInfoRecord">帳號紀錄</button>
    </div>
    <div class="historydataArea">
      <!-- 後臺管理員區塊 -->
      <!-- <template v-if="===123>"> -->

      <!-- </template> -->
      <template>
        <span v-if="page === 0">
          <template>
            <div>
              <!-- .condition -->
              <div v-for="(item, index) in commentFilter[0].condition" :key="index" class="commentArea">
                <!-- 放大頭照 -->
                <!-- <p>{{item.employeeNumber}}</p> -->
                <span><img src="https://fakeimg.pl/15x15/"  alt=""/></span>
                <span class="commentHistoryContent">將評論 <router-link :to="{ name: 'commentDetails', params: { _id: item.commentID } }">{{item.title}}</router-link> 由{{item.old}}{{item.modify}}成{{item.new}}</span>
                <!-- 手機板變成在評論底下，縮小 -->
                <span class="commentTimeHistory">{{item.time}}</span>
              </div>
              <div v-for="(item, index1) in commentFilter[0].tags" :key="index1" class="commentArea">
                <span><img src="https://fakeimg.pl/15x15/"  alt=""/></span>
                <span class="commentHistoryContent">將評論<router-link :to="{ name: 'commentDetails', params: { _id: item.commentID } }">{{item.title}}</router-link>{{item.modify}}了"{{item.new}}"標籤</span>
                <span class="commentTimeHistory">{{item.time}}</span>
              </div>
            </div>
          </template>
        </span>
        <span v-else-if="page === 1">
          <p>帳號管理</p>
        </span>
        <span v-else-if="page === 2">
          <p>後臺管理員部分</p>
          <button  v-on:click="manager(0)">登入</button>
          <button  v-on:click="manager(1)">登出</button>
          <button  v-on:click="manager(2)">忘記密碼</button>
          <button  v-on:click="manager(3)">修改帳號資料</button>
          <button  v-on:click="manager(4)">新增刪除使用者</button>
          <div  v-if="userInfoPage === 0">
            <div v-for="(item, loginIndex) in loginNew" :key="loginIndex" class="commentArea">
              <span><img src="https://fakeimg.pl/15x15/"  alt=""/></span>
              <span class="commentHistoryContent">{{item.employeeNumber}} 登入</span>
              <span class="commentTimeHistory">{{item.loginTime}}</span>
            </div>
          </div>
          <div  v-else-if="userInfoPage === 1">
            <div v-for="(item, logoutIndex) in logoutNew" :key="logoutIndex" class="commentArea">
              <span><img src="https://fakeimg.pl/15x15/"  alt=""/></span>
              <span class="commentHistoryContent">{{item.employeeNumber}} 登出</span>
              <span class="commentTimeHistory">{{item.logoutTime}}</span>
            </div>
          </div>
          <div  v-else-if="userInfoPage === 2">
            <div v-for="(item, userIndex) in userNew" :key="userIndex" class="commentArea">
              <span><img src="https://fakeimg.pl/15x15/"  alt=""/></span>
              <span class="commentHistoryContent">{{item.employeeNumber}} 忘記密碼 驗證 
                <span v-if="item.forgetPassword.verification === true">成功</span>
                <span v-else>失敗</span>
                 </span>
              <span class="commentTimeHistory">{{item.forgetPassword.verificationTime}}</span>
            </div>
          </div>
          <div  v-else-if="userInfoPage === 3">
            <div v-for="(item, userDetailModifyIndex) in userDetailModifyNew" :key="userDetailModifyIndex" class="commentArea">
              <span><img src="https://fakeimg.pl/15x15/"  alt=""/></span>
              <span class="commentHistoryContent">{{item.modifyInfo}} {{item.modifyPerson}} 把 {{item.employeeNumber}} 由 {{item.old}} 改為 {{item.new}} </span>
              <span class="commentTimeHistory">{{item.time}}</span>
            </div>
          </div>
          <div  v-else-if="userInfoPage === 4">
            <div v-for="(item, userListModifyIndex) in userListModifyNew" :key="userListModifyIndex" class="commentArea">
              <span><img src="https://fakeimg.pl/15x15/"  alt=""/></span>
              <span class="commentHistoryContent">{{item.modify}} 使用者 {{item.employeeNumber}} </span>
              <span class="commentTimeHistory">{{item.time}}</span>
            </div>
          </div>
        </span>
      </template>
    <div class="clear"></div>
    </div>
    <div class="clear"></div>
  </div>
</template>
<script>
import axios from "axios";
import $ from "jquery";
// import dateTime from "../assets/js/dateTime";

export default {
  name: "history",
  data() {
    return {
      // msg: 'hello',
      historyData: [],
      commentFilter: [],
      personFilter: [],
      logout: {
        employeeNumber: "info01",
        logoutTime: "2020/10/11",
      },
      // page === 0 顯示評論動態，page === 1顯示個人動態
      page: 0,
      loginNew:[],
      logoutNew:[],
      userNew:[],
      userDetailModifyNew:[],
      userListModifyNew:[],
      userInfoPage:0,
    };
  },
  mounted() {
    let self = this;
    // var value = 0;
    //  + value
    var logining = localStorage.getItem("token");
    var userID = JSON.parse(logining).companyName.id;
    axios
      .get("https://hotelapi.im.nuk.edu.tw/api/account/" + userID)
      .then((response) => {
        if(response.limit === '後台管理員' ){
          document.getElementById("userInfoRecord").style.visibility = "visible";
        }
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        "https://hotelapi.im.nuk.edu.tw/api/history/" +
          JSON.parse(logining).companyName
      )
      .then((response) => {
        var arr = ['old', 'new']
        self.historyData = response.data;
        self.loginNew=self.historyData.login;
        self.logoutNew=self.historyData.logout;
        self.userNew=self.historyData.user;
        self.userDetailModifyNew=self.historyData.userDetailModify;
        self.userListModifyNew=self.historyData.UserListModify;
        console.log(self.historyData)
        self.commentFilter.push({
          condition: self.historyData.condition,
          tags: self.historyData.tags
        })
        self.commentFilter[0].condition.forEach((item) => {
          arr.filter((child) => {
            if(item[child] === 0){
              item[child] = '未處理'
            }
            if(item[child] === 1){
              item[child] = '處理中'
            }
            if(item[child] === 2){
              item[child] = '已完成'
            }
          })
        })
        self.changePage(0)
        // self.personFilter.push({

        // })
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    changePage: function (value) {
      let self = this;
      if(value === 0){
        self.page = 0
        $(".pageButton0").addClass("focus");
        $(".pageButton0").removeClass("pageButtonStart");
        $(".pageButton1").removeClass("focus");
        $(".pageButton2").removeClass("focus");
      }else if(value === 1){
        self.page = 1
        $(".pageButton1").addClass("focus");
        $(".pageButton0").removeClass("pageButtonStart");
        $(".pageButton0").removeClass("focus");
        $(".pageButton2").removeClass("focus");
      }else{
        self.page = 2
        $(".pageButton2").addClass("focus");
        $(".pageButton1").removeClass("focus");
        $(".pageButton0").removeClass("pageButtonStart");
        $(".pageButton0").removeClass("focus");
      }
    },
    // record: function () {
    //   let record = "logout";
    //   var logining = localStorage.getItem("token");
    //   axios
    //     .put(
    //       "https://hotelapi.im.nuk.edu.tw/api/history/" +
    //         JSON.parse(logining).companyName +
    //         "/" +
    //         record,
    //       this.logout
    //     )
    //     .then((response) => {
    //       console.log(response);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
    // DateTime: function () {
    //   var date, Time;
    //   date = dateTime.recordDate();
    //   console.log(date);
    //   Time = dateTime.recordTime();
    //   console.log(Time);
    // },

    manager:function(page){
      this.userInfoPage = page;
    }
  },
};
</script>
<style scoped src= '../assets/css/history.css'></style>
