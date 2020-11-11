<template>
  <div class="historyContent">
    <button @click="changePage(0)" class="pageButton0 pageButtonStart">評論動態</button>
    <button @click="changePage(1)" class="pageButton1">個人動態</button>
    <div class="clear"></div>
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
    };
  },
  mounted() {
    let self = this;
    // var value = 0;
    //  + value
    var logining = localStorage.getItem("token");
    axios
      .get(
        "https://hotelapi.im.nuk.edu.tw/api/history/" +
          JSON.parse(logining).companyName
      )
      .then((response) => {
        var arr = ['old', 'new']
        self.historyData = response.data;
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
      }else{
        self.page = 1
        $(".pageButton1").addClass("focus");
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
  },
};
</script>
<style scoped src= '../assets/css/history.css'></style>
