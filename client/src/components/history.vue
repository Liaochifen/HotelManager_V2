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
      <button @click="changePage(2)" class="pageButton2 phone_none" id="userInfoRecord_phone">紀錄</button>
      <button @click="history_filter_phone()" class="history_filter_phone"><img src="../assets/icon/filter.png"/></button>
    </div>
    <div class="clear"></div>
    <div class="historydataArea">
      <template>
        <span v-if="page === 0">
          <ul class="history_inner__phone">
            <li class="his_comment"><button @click="publicManage(0)" >評論狀態動態</button></li>
            <li class="his_tags"><button @click="publicManage(1)" >評論標籤動態</button></li>
            <!-- <li class="his_reply"><button @click="publicManage(2)" >評論回覆動態</button></li> -->
            <div class="clear"></div>
          </ul>
          <div class="clear"></div>
          <!-- <template> -->
            <!-- <div> -->
              <!-- .condition -->
              <div v-if="publicPage === 0" class="public_record">
                <div class="clear"></div>
                <span v-if="commentFilter.length === 0">
                  <p>無任何記錄</p>
                </span>
                <span v-else-if="commentFilter.length !== 0">
                  <div v-for="(item, index) in commentFilter" :key="index+'con'" class="commentArea">
                  <!-- 放大頭照 -->

                    <span class="customer_num"><img :src="getPictureSrc(`${item.employeeNumber}`)" width="25px" alt=""/><span>{{item.employeeNumber}}</span></span>
                    <span class="commentHistoryContent">將評論 <router-link :to="{ name: 'commentDetails', params: { _id: item.commentID } }">{{item.title}}</router-link> 由{{item.old}}{{item.modify}}成{{item.new}}</span>
                    <!-- 手機板變成在評論底下，縮小 -->
                    <span class="commentTimeHistory">{{item.time}}</span>
                  </div>
                </span>
              </div>
              <div v-else-if="publicPage === 1" class="public_record"> 
                <span v-if="tagsFilter.length === 0">
                  <p>無任何記錄</p>
                </span>
                <span v-else-if="tagsFilter.length !== 0">
                  <div v-for="(item, index1) in tagsFilter" :key="index1+'tag'" class="commentArea">
                    <span class="customer_num"><img :src="getPictureSrc(`${item.employeeNumber}`)" width="25px" alt=""/><span>{{item.employeeNumber}}</span></span>
                    <span class="commentHistoryContent">將評論<router-link :to="{ name: 'commentDetails', params: { _id: item.commentID } }">{{item.title}}</router-link>{{item.modify}}了"{{item.new}}"標籤</span>
                    <span class="commentTimeHistory">{{item.time}}</span>
                  </div>
                </span>
              </div>
              <!-- <div v-else-if="publicPage === 2" class="public_record"> 
                <span v-if="replyFIlter.length === 0">
                  <p>無任何記錄</p>
                </span>
                <span v-else-if="replyFIlter.length !== 0">
                  <div v-for="(item, index1) in replyFIlter" :key="index1+'tag'" class="commentArea">
                    <span><img src="https://fakeimg.pl/15x15/"  alt=""/></span>
                    <span class="commentHistoryContent">將評論<router-link :to="{ name: 'commentDetails', params: { _id: item.commentID } }">{{item.title}}</router-link>的回覆狀態從"{{item.old}}"{{item.modify}}成"{{item.new}}"</span>
                    <span class="commentTimeHistory">{{item.time}}</span>
                  </div>
                </span>
              </div> -->
            <!-- </div> -->
          <!-- </template> -->
        </span>
        <span v-else-if="page === 1">
          <ul class="history_inner__phone">
            <li><button @click="personalManage(0)">評論狀態動態</button></li>
            <li><button @click="personalManage(1)">評論標籤動態</button></li>
            <li><button @click="personalManage(2)">我的最愛動態</button></li>
          </ul>
          <div v-if="personalPage === 0"  class="personal_record">
            <span v-if="personalCommentFilter.length === 0">
              <p>無任何記錄</p>
            </span>
            <span v-else-if="personalCommentFilter.length !== 0">
              <div v-for="(item, index) in personalCommentFilter" :key="index+'conPer'" class="commentArea">

                <span class="customer_num"><img :src="getPictureSrc(`${item.employeeNumber}`)" width="25px"  alt=""/><span>{{item.employeeNumber}}</span></span>
                <span class="commentHistoryContent">將評論 <router-link :to="{ name: 'commentDetails', params: { _id: item.commentID } }">{{item.title}}</router-link> 由{{item.old}}{{item.modify}}成{{item.new}}</span>
                <span class="commentTimeHistory">{{item.time}}</span>
              </div>
            </span>
          </div>
          <div v-else-if="personalPage === 1" class="personal_record">
            <span v-if="personalTagFilter.length === 0">
              <p>無任何記錄</p>
            </span>
            <span v-else-if="personalTagFilter.length !== 0">
              <div v-for="(item, index) in personalTagFilter" :key="index+'tagPer'" class="commentArea">
                <span class="customer_num"><img :src="getPictureSrc(`${item.employeeNumber}`)" width="25px" alt=""/><span>{{item.employeeNumber}}</span></span>
                    <span class="commentHistoryContent">將評論<router-link :to="{ name: 'commentDetails', params: { _id: item.commentID } }">{{item.title}}</router-link>{{item.modify}}了"{{item.new}}"標籤</span>
                <span class="commentTimeHistory">{{item.time}}</span>
              </div>
            </span>
          </div>
          <div v-else-if="personalPage === 2" class="personal_record">
            <span v-if="personalFavFilter.length === 0">
              <p>無任何記錄</p>
            </span>
            <span v-else-if="personalFavFilter.length !== 0">
              <div v-for="(item, index) in personalFavFilter" :key="index+'favPer'" class="commentArea">
                <span class="customer_num"><img src="https://fakeimg.pl/15x15/"  alt=""/><span>{{item.employeeNumber}}</span></span>
                <span v-if="item.modify === '取消'">
                  <span class="commentHistoryContent">將<router-link :to="{ name: 'competitionCommentList', params: { collections: item.company }}">{{item.hotelChineseName}}</router-link>從我的最愛中{{item.modify}}</span>
                  <span class="commentTimeHistory">{{item.time}}</span>
                </span>
                <span v-else-if="item.modify === '加入'">
                  <span class="commentHistoryContent">將<router-link :to="{ name: 'competitionCommentList', params: { collections: item.company }}">{{item.hotelChineseName}}</router-link>{{item.modify}}我的最愛</span>
                  <span class="commentTimeHistory">{{item.time}}</span>
                </span>
              </div>
            </span>
          </div>
          <div v-else-if="personalPage === 3" class="personal_record">
            <span v-if="personalFavFilter.length === 0">
              <p>無任何記錄</p>
            </span>
            <span v-else-if="replyFIlter.length !== 0">
              <div v-for="(item, index1) in replyFIlter" :key="index1+'tag'" class="commentArea">

                <span class="customer_num"><img :src="getPictureSrc(`${item.employeeNumber}`)"  alt=""/><span>{{item.employeeNumber}}</span></span>
                <span class="commentHistoryContent">將評論<router-link :to="{ name: 'commentDetails', params: { _id: item.commentID } }">{{item.title}}</router-link>的回覆狀態從"{{item.old}}"{{item.modify}}成"{{item.new}}"</span>
                <span class="commentTimeHistory">{{item.time}}</span>
              </div>
            </span>
          </div>
        </span>
        <span v-else-if="page === 2" >
          <ul class="history_inner__phone">
            <li><button  v-on:click="manager(0)">登入</button></li>
            <li><button  v-on:click="manager(1)">登出</button></li>
            <li><button  v-on:click="manager(2)">忘記密碼</button></li>
            <li><button  v-on:click="manager(3)">修改帳號資料</button></li>
            <li><button  v-on:click="manager(4)">新增刪除使用者</button></li>
            <li><button  v-on:click="manager(5)">評論狀態修改</button></li>
            <li><button  v-on:click="manager(6)">評論標籤修改</button></li>
            <li><button  v-on:click="manager(7)">我的最愛修改</button></li>
          </ul>
          <div  v-if="userInfoPage === 0" class="backend_record">
            <div v-for="(item, loginIndex) in loginNew.slice().reverse()" :key="loginIndex+'login'" class="commentArea">

              <span class="customer_num"><img :src="getPictureSrc(`${item.employeeNumber}`)" width="25px"  alt=""/><span>{{item.employeeNumber}}</span></span>
              <span class="commentHistoryContent">登入</span>
              <span class="commentTimeHistory">{{item.loginTime}}</span>
            </div>
          </div>
          <div  v-else-if="userInfoPage === 1" class="backend_record">
            <div v-for="(item, logoutIndex) in logoutNew.slice().reverse()" :key="logoutIndex+'logout'" class="commentArea">

              <span class="customer_num"><img :src="getPictureSrc(`${item.employeeNumber}`)" width="25px"  alt=""/><span>{{item.employeeNumber}}</span></span>
              <span class="commentHistoryContent">登出</span>
              <span class="commentTimeHistory">{{item.logoutTime}}</span>
            </div>
          </div>
          <div  v-else-if="userInfoPage === 2" class="backend_record">
            <div v-for="(item, userIndex) in userNew.slice().reverse()" :key="userIndex+'pw'" class="commentArea">

              <span class="customer_num"><img :src="getPictureSrc(`${item.employeeNumber}`)" width="25px"  alt=""/><span>{{item.employeeNumber}}</span></span>
              <span class="commentHistoryContent">忘記密碼 驗證 
                <span v-if="item.forgetPassword.verification === true">成功</span>
                <span v-else>失敗</span>
                 </span>
              <span class="commentTimeHistory">{{item.forgetPassword.verificationTime}}</span>
            </div>
          </div>
          <div  v-else-if="userInfoPage === 3" class="backend_record">
            <div v-for="(item, userDetailModifyIndex) in userDetailModifyNew.slice().reverse()" :key="userDetailModifyIndex+'acds'" class="commentArea">

              <span class="customer_num"><img :src="getPictureSrc(`${item.employeeNumber}`)" width="25px"  alt=""/></span>
              <span class="commentHistoryContent"><span class="custom_modify">{{item.modifyInfo}} </span>{{item.modifyPerson}} 把 {{item.employeeNumber}} 由 {{item.old}} 改為 {{item.new}} </span>
              <span class="commentTimeHistory">{{item.time}}</span>
            </div>
          </div>
          <div  v-else-if="userInfoPage === 4" class="backend_record">
            <div v-for="(item, userListModifyIndex) in userListModifyNew.slice().reverse()" :key="userListModifyIndex+'mod'" class="commentArea">

              <span class="customer_num"><img :src="getPictureSrc(`${item.employeeNumber}`)" width="25px"  alt=""/><span>{{item.employeeNumber}}</span></span>
              <span class="commentHistoryContent">{{item.modify}} 使用者 {{item.employeeNumber}} </span>
              <span class="commentTimeHistory">{{item.time}}</span>
            </div>
          </div>
          <div v-else-if="userInfoPage === 5" class="backend_record">
            <span v-if="personalCommentFilter.length === 0">
              <p>無任何記錄</p>
            </span>
            <span v-else-if="personalCommentFilter.length !== 0">
              <div v-for="(item, index) in personalCommentFilter" :key="index+'conPer'" class="commentArea">

                <span class="customer_num"><img :src="getPictureSrc(`${item.employeeNumber}`)" width="25px"  alt=""/><span>{{item.employeeNumber}}</span></span>
                <span class="commentHistoryContent">將評論 <router-link :to="{ name: 'commentDetails', params: { _id: item.commentID } }">{{item.title}}</router-link> 由{{item.old}}{{item.modify}}成{{item.new}}</span>
                <span class="commentTimeHistory">{{item.time}}</span>
              </div>
            </span>
          </div>
          <div v-else-if="userInfoPage === 6" class="backend_record">
            <span v-if="personalTagFilter.length === 0">
              <p>無任何記錄</p>
            </span>
            <span v-else-if="personalTagFilter.length !== 0">
              <div v-for="(item, index) in personalTagFilter" :key="index+'tagPer'" class="commentArea">
                <span class="customer_num"><img :src="getPictureSrc(`${item.employeeNumber}`)" width="25px"  alt=""/><span>{{item.employeeNumber}}</span></span>
                    <span class="commentHistoryContent">將評論<router-link :to="{ name: 'commentDetails', params: { _id: item.commentID } }">{{item.title}}</router-link>{{item.modify}}了"{{item.new}}"標籤</span>
                <span class="commentTimeHistory">{{item.time}}</span>
              </div>
            </span>
          </div>
          <div v-else-if="userInfoPage === 7" class="backend_record">
            <span v-if="personalFavFilter.length === 0">
              <p>無任何記錄</p>
            </span>
            <span v-else-if="personalFavFilter.length !== 0">
              <div v-for="(item, index) in personalFavFilter" :key="index+'favPer'" class="commentArea">

                <span class="customer_num"><img :src="getPictureSrc(`${item.employeeNumber}`)" width="25px"  alt=""/><span>{{item.employeeNumber}}</span></span>
                <span v-if="item.modify === '取消'">
                  <span class="commentHistoryContent">將{{item.company}}從我的最愛中{{item.modify}}</span>
                  <span class="commentTimeHistory">{{item.time}}</span>
                </span>
                <span v-else-if="item.modify === '加入'">
                  <span class="commentHistoryContent">將{{item.company}}{{item.modify}}我的最愛</span>
                  <span class="commentTimeHistory">{{item.time}}</span>
                </span>
              </div>
            </span>
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
import firebase from 'firebase/app';
import 'firebase/storage';
// import dateTime from "../assets/js/dateTime";

export default {
  name: "history",
  data() {
    return {
      employeeNumber: '',
      historyData: [],
      commentFilter: [],
      tagsFilter: [],
      favoriteFilter: [],
      replyFIlter: [],
      personalFavFilter: [],
      personalCommentFilter: [],
      personalReplyFilter: [],
      personalTagFilter: [],
      page: 0,
      loginNew:[],
      logoutNew:[],
      userNew:[],
      userDetailModifyNew:[],
      userListModifyNew:[],
      userInfoPage:0,
      personalPage: 0,
      publicPage: 0,
      companyList: [
        {
          field: "GrandHotelTaipei",
          label: "台北圓山大飯店"
        },
        {
          field: "GrandHyattTaipei",
          label: "台北君悅酒店"
        },
        {
          field: "RegentTaipei",
          label: "台北晶華酒店"
        },
        {
          field: "W_Taipei",
          label: "台北W飯店"
        },
        {
          field: "RoyalNikkoTaipei",
          label: "台北老爺大酒店"
        },
        {
          field: "PalaisDeChineHotel",
          label: "君品酒店"
        },
        {
          field: "EasternPlazaHotelTaipei",
          label: "香格里拉台北遠東國際大飯店"
        },
        {
          field: "SheratonGrandTaipei",
          label: "台北喜來登大飯店"
        },
        {
          field: "OkuraPrestigeTaipei",
          label: "大倉久和大飯店"
        },
        {
          field: "GaiaHotelTaipei",
          label: "大地酒店"
        }
      ],
      userPicture:{},
      allAccount:[],
    };
  },
  mounted() {
    let self = this;
    // var value = 0;
    //  + value
    var logining = localStorage.getItem("token");
    // var userID = JSON.parse(logining).companyName;
    self.employeeNumber = JSON.parse(logining).employeeNumber

    if(JSON.parse(logining).limit === '後台管理者'){
      document.getElementById('userInfoRecord').style.visibility = 'visible';
      document.getElementById('userInfoRecord_phone').style.visibility = 'visible';
    }
    axios.get("https://hotelapi.im.nuk.edu.tw/api/account")
    .then((response) => {
      console.log(response);
      this.allAccount = response.data;
      this.getPicture();
     
      // this.userPicture.response.data[0].employeeNumber="text";
      console.log(this.userPicture);
    }).catch((error) => {
        console.log(error);
    });
    // axios
    //   .get("https://hotelapi.im.nuk.edu.tw/api/account/" + userID)
    //   .then((response) => {
    //     if(response.limit === '後台管理員' ){
    //       document.getElementById("userInfoRecord").style.visibility = "visible";
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
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
        self.commentFilter = self.historyData.condition;
        self.tagsFilter = self.historyData.tags;
        self.favoriteFilter = self.historyData.favorite
        self.replyFIlter = self.historyData.reply
        console.log(self.favoriteFilter)
        // self.commentFilter.push({
        //   condition: self.historyData.condition,
        //   tags: self.historyData.tags
        // })
        self.commentFilter.filter((item) => {
          if(item.employeeNumber === self.employeeNumber){
            self.personalCommentFilter.push(item)
          }
        })
        self.tagsFilter.filter((item) => {
          if(item.employeeNumber === self.employeeNumber){
            self.personalTagFilter.push(item)
          }
        })
        self.favoriteFilter.filter((item) => {
          if(item.employeeNumber === self.employeeNumber){
            self.personalFavFilter.push(item)
          }
        })
        self.replyFIlter.filter((item) => {
          if(item.employeeNumber === self.employeeNumber){
            self.personalReplyFilter.push(item)
          }
        })
        self.commentFilter.forEach((item) => {
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
        self.favoriteFilter.forEach((item) => {
          self.companyList.filter((child) => {
            if(child.field === item.company){
              item['hotelChineseName'] = child.label
            }
          })
        })
        self.changePage(0)
        self.publicManage(0)
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
    },
    personalManage: function(page){
      this.personalPage = page;
    },
    publicManage: function(page){
      this.publicPage = page;
      if(page === 0){
        $('.his_comment').addClass('bg')
        $('.his_tags').removeClass('bg')
        $('.his_reply').removeClass('bg')
      }else if(page === 1){
        $('.his_comment').removeClass('bg')
        $('.his_tags').addClass('bg')
        $('.his_reply').removeClass('bg')
      }
      // }else{
      //   $('.his_comment').removeClass('bg')
      //   $('.his_tags').removeClass('bg')
      //   $('.his_reply').addClass('bg')
      // }
<<<<<<< HEAD
    },
    getPicture(){
      var self = this;
      var i;
      for( i=0 ; i<self.allAccount.length ; i++){
        this.getPictureUrl(self.allAccount[i].employeeNumber,self.allAccount[i].picture);
      }
      console.log("picture");
      console.log(this.userPicture);
    },
    getPictureUrl(user,picture){
    var self = this;
      const storageRef = firebase.storage().ref(picture);
      storageRef.getDownloadURL().then(function(url) {
        self.userPicture[user]=url;
      }).catch(function(error) {
        console.log(error);
      });      
    },
    getPictureSrc(img){
      return this.userPicture[img];
    }
=======
    },history_filter_phone(){
      event.stopPropagation();
      $(".history_inner__phone").slideToggle("normal");
      $(document).click(function (event) {
        var area = $(".history_inner__phone"); // 設定目標區域
        if (!area.is(event.target) && area.has(event.target).length === 0) {
          $(".history_inner__phone").hide(); // 淡出消失
        }
      });
    },
>>>>>>> 50e6bfda4811c219da0e5c4a4a965de226772a20
  },
};
</script>
<style scoped src= '../assets/css/history.css'></style>
