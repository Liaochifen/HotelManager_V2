<template>
  <div id="app" class="warp">
    <div class="header">
      <div class="headerContent">
        <!-- <a class="showMenu" href="#"><img src="https://fakeimg.pl/15x15/" alt=""></a> -->
        <!-- <img class="companyImg" src="https://fakeimg.pl/50x50/" alt=""> -->
        <!-- <div class="company">
                <p class="title">旅館評論管理系統</p>
                <div class="clear"></div>
            </div> -->
        <div class="menu" id="menu" >
          <p class="system">Hotel</p>
          <p class="system">System</p>
          <p class="functionList">功能列</p>
          <ul>
            <!-- <img src="./assets/icon/info9.svg" class="icons" alt=""> -->
            <li id="accountManage">
              <router-link :to="{ name: 'accountList' }"
                ><img class="icons"
                  src="./assets/icon/accountlist.png"
                  alt=""
                /><span>帳號管理</span></router-link
              >
            </li>
            <!-- <img src="./assets/icon/comment.svg" class="icons" alt=""> -->
            <li> 
              <router-link
                :to="{
                  name: 'competition',
                }"
                ><img class="icons"
                  src="./assets/icon/comment.png"
                  alt=""
                /><span>評論管理</span></router-link
              >
              <!-- <router-link
                :to="{
                  name: 'competition'
                }"
                ><img
                  src="https://fakeimg.pl/15x15/"
                  alt=""
                />評論管理</router-link
              > -->
            </li>
            <li id="statisticalResults">
              <router-link
                :to="{
                  name: 'statistic',
                  params: { collections: companyName },
                }"
                ><img class="icons"
                  src="./assets/icon/statistics.png"
                  alt=""
                /><span>統計結果</span></router-link
              >
            </li>
            <!-- <li>
              <router-link
                :to="{
                  name: 'competition',
                  params: { collections: companyName },
                }"
                ><img
                  src="https://fakeimg.pl/15x15/"
                  alt=""
                />競爭對手</router-link
              >
            </li> -->
            <!-- <img src="./assets/icon/info9.svg" class="icons" alt=""> -->
            <li>
              <router-link
                :to="{ name: 'history', params: { company: companyName } }"
                ><img  class="icons"
                  src="./assets/icon/history.png"
                  alt=""
                /><span>歷史紀錄</span></router-link
              >
            </li>
            <div class="clear"></div>
          </ul>
          <div class="clear"></div>
        </div>
        <!-- 側邊選單 -->
        <div class="left_menu">
          <!-- <p>功能列</p> -->
          <div class="close_btn"><a href="">X</a></div>
          <ul class="leftul" id="menuUl">
            <li>
              <router-link :to="{ name: 'accountList' }"
                ><img
                  src="./assets/icon/accountlist.png"
                  alt=""
                />帳號管理</router-link
              >
            </li>
            <li>
              <router-link
                :to="{
                  name: 'commentList',
                  params: { collections: companyName },
                }"
                ><img
                  src="./assets/icon/comment.png"
                  alt=""
                />評論管理</router-link
              >
            </li>
            <li>
              <router-link
                :to="{
                  name: 'statistic',
                  params: { collections: companyName },
                }"
                ><img
                  src="./assets/icon/statistics.png"
                  alt=""
                />統計結果</router-link
              >
            </li>
            <!-- <li>
              <router-link
                :to="{
                  name: 'competition',
                  params: { collections: companyName },
                }"
                ><img
                  src="https://fakeimg.pl/15x15/"
                  alt=""
                />競爭對手</router-link
              >
            </li> -->
            <!-- <img src="./assets/icon/info9.svg" class="icons" alt=""> -->
            <li>
              <router-link
                :to="{ name: 'history', params: { company: companyName } }"
                ><img
                  src="./assets/icon/history.png"
                  alt=""
                />歷史紀錄</router-link
              >
            </li>
            <li >
              <button class="left_logout"
                  v-on:click="logouted()"
                >
                  登出
                </button>
            </li>
            <div class="clear"></div>
          </ul>
          <div class="clear"></div>
        </div>
        <div class="clear"></div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="content">
      <div class="contentTop">
        <!-- <a id="menubtn" class="showMenu" href="#"
          ><img src="https://fakeimg.pl/15x15/" alt=""
        /></a>
        <div class="breadcrumb" id="breadcrumb">
          <a class="breadcrumb-item" href="#">首頁</a>
          <a class="breadcrumb-item" href="/commentlist">評論管理</a>
          <a href="#">評論列表</a>
          <div class="clear"></div>
        </div> -->
        <div class="personalInfo" id="personalInfo">
          <img
            class="photo"
            :src="picture"
            width="30px"
            alt=""
            v-on:click="personalState()"
          />
          <p id="limitWord"></p>
          <div class="clear"></div>
        </div>
        <div class="loginingInfo" id="logining">
          <div class="nameEmail">
            <img :src="picture" alt="" width="50px" />
            <ul>
              <li>{{ userAccountDetail.userName }}</li>
              <li>{{ userAccountDetail.email }}</li>
            </ul>
            <div class="clear"></div>
          </div>
          <div class="personalMenu">
            <ul>
              <li v-on:click="link('accountDetial')">
                <button >
                  <img class="editButton" src="./assets/icon/account.png" alt="" />
                  <span>個人資料</span>
                </button>
              </li>
              <li  v-on:click="link('history')">
                <button >
                  <img  class="editButton"  src="./assets/icon/history.png" alt="" />
                  <span>歷史記錄</span>
                </button>
              </li>
            </ul>
                <!-- <img src="https://fakeimg.pl/20x20/" alt="" /> -->
                <button v-on:click="logouted()" class="bigheadLogout">登出</button>
          </div>
          <div class="clear"></div>
        </div>
        <div class="logoutInfo" id="logoutInfo">
          <img class="photo" src="https://fakeimg.pl/50x50/" alt="" />
          <div class="clear"></div>
          <button v-on:click="login()">登入</button>
        </div>
        <div class="clear"></div>
      </div>
      <router-view></router-view>
    </div>
    <div class="clear"></div>

    <div class="footer">
        <ul class="phoneMenu" id="phoneMenu" >
        <li> 
          <router-link
            :to="{
              name: 'competition',
            }"
            ><img class="icons"
              src="./assets/icon/comment.png"
              alt=""
            /></router-link
          >
        </li>
        <li id="statisticalResultsPhone">
          <router-link
            :to="{
              name: 'statistic',
              params: { collections: companyName },
            }"
            ><img class="icons"
              src="./assets/icon/statistics.png"
              alt=""
            /></router-link
          >
        </li>
        
        <li id="accountManagePhone">
              <router-link :to="{ name: 'accountList' }"
                ><img class="icons"
                  src="./assets/icon/account.png"
                  alt=""
                /></router-link
              >
        </li>
        <li>
          <router-link
            :to="{ name: 'history', params: { company: companyName } }"
            ><img  class="icons"
              src="./assets/icon/history.png"
              alt=""
            /></router-link
          >
        </li>
        <li>
          <a href="#" v-on:click="link('accountDetial')"><img class="icons" src="./assets/icon/account.png" alt="" /></a>
        </li>
      </ul>
      
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import $ from "../node_modules/jquery";
import dateTime from "../src/assets/js/dateTime";
import util from "./assets/js/utility";

export default {
  name: "App",
  data() {
    return {
      networkDataReceived: false,
      userID: "",
      companyName: "",
      userAccountDetail: {},
      logout: {
        employeeNumber: "",
        logoutTime: "",
      },
      picture:"null",
    };
  },
  mounted() {
    let self = this;
    if (localStorage.getItem("token")) {
      var loginData = JSON.parse(localStorage.getItem("token"));
      self.companyName = loginData.companyName;
      self.userID = loginData.id;
      self.picture = loginData.pictureUrl;
      axios
        .get("https://hotelapi.im.nuk.edu.tw/api/account/" + self.userID)
        .then((response) => {
          console.log(response.data);
          self.networkDataReceived = true;
          self.userAccountDetail = response.data;
          if(self.userAccountDetail.employeeLimit === "一般使用者"){
            document.getElementById("accountManage").style.display = "none"; 
            document.getElementById("statisticalResults").style.display = "none";
            document.getElementById("statisticalResultsPhone").style.display = "none";
            document.getElementById("accountManagePhone").style.display = "none";
          }else if(self.userAccountDetail.employeeLimit === "主管使用者"){
            console.log(self.userAccountDetail.employeeLimit);
            document.getElementById("accountManage").style.display = "none"; 
            document.getElementById("accountManagePhone").style.display = "none"; 
          }
          document.getElementById("limitWord").innerHTML = self.userAccountDetail.employeeLimit;
          document.getElementById("menu").style.visibility = "visible";
          document.getElementById("personalInfo").style.visibility = "visible";
          document.getElementById("phoneMenu").style.visibility = "visible";
          // document.getElementById("breadcrumb").style.visibility = "visible";
        })
        .catch((error) => {
          console.log(error);
        });

      if ("indexedDB" in window) {
        console.log("Reading indexedDB...");
        util.readAllData("account").then(function (data) {
          if (!self.networkDataReceived) {
            console.log("From cache", data);
            for (var i in data) {
              if (data[i]._id === self.userID) {
                console.log('Match', data[i]);
                self.userAccountDetail = data[i];
                if(self.userAccountDetail.employeeLimit === "一般使用者"){
                  document.getElementById("accountManage").style.display = "none";
                  document.getElementById("statisticalResults").style.display = "none";
                  document.getElementById("statisticalResultsPhone").style.display = "none";
                  document.getElementById("accountManagePhone").style.display = "none";
                } else if (self.userAccountDetail.employeeLimit === "主管使用者") {
                  console.log(self.userAccountDetail.employeeLimit);
                  document.getElementById("accountManage").style.display = "none";
                  document.getElementById("accountManagePhone").style.display = "none";
                }
                document.getElementById("limitWord").innerHTML = self.userAccountDetail.employeeLimit;
                document.getElementById("menu").style.visibility = "visible";
                document.getElementById("phoneMenu").style.visibility = "visible";
                // document.getElementById("breadcrumb").style.visibility = "visible";
                break;
              }
            }
          }
        });
      }
    } else {
      $("#accountManage").show();
      $("#statisticalResults").show();
      $("#statisticalResultsPhone").show();
      $("#accountManagePhone").show();
      document.getElementById("limitWord").innerHTML = " ";
      document.getElementById("menu").style.visibility = "hidden";
      document.getElementById("personalInfo").style.visibility = "hidden";
      document.getElementById("phoneMenu").style.visibility = "hidden";
      // document.getElementById("breadcrumb").style.visibility = "hidden";
    }
  },
  methods: {
    editWindow: function () {
      event.stopPropagation();
      $("#logining").toggle("fast");
      $(document).click(function (event) {
        var area = $("#logining"); // 設定目標區域
        if (!area.is(event.target) && area.has(event.target).length === 0) {
          // $('#divTop').slideUp('slow');  //滑動消失
          $("#logining").hide(100); // 淡出消失
        }
      });
    },
    logouted: function () {
      $("#logining").hide(100); // 淡出消失
      localStorage.removeItem("token");
      this.logoutRecord();
      this.userID = "";
      this.companyName = "";
      this.userAccountDetail = {};
      $("#accountManage").show();
      $("#statisticalResults").show();
      $("#statisticalResultsPhone").show();
      $("#accountManagePhone").show();
      document.getElementById("limitWord").innerHTML = " ";
      document.getElementById("menu").style.visibility = "hidden";
      // document.getElementById("breadcrumb").style.visibility = "hidden";
      document.getElementById("personalInfo").style.visibility = "hidden";
      document.getElementById("phoneMenu").style.visibility = "hidden";
      this.$router.push("/login");
    },
    logoutRecord: function () {
      let record = "logout";
      let company = this.userAccountDetail.companyName;
      this.logout.employeeNumber = this.userAccountDetail.employeeNumber;
      this.logout.logoutTime =
        dateTime.recordDate() + " " + dateTime.recordTime();
      console.log(this.logout);
      axios
        .put(
          "https://hotelapi.im.nuk.edu.tw/api/history/" +
            company +
            "/" +
            record,
          this.logout
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    login: function () {
      this.$router.push("/login");
      $("#logining").hide(100); // 淡出消失
    },
    personalState: function () {
      if (localStorage.getItem("token")) {
        event.stopPropagation();
        $("#logining").toggle("fast");
        $(document).click(function (event) {
          var area = $("#logining"); // 設定目標區域
          if (!area.is(event.target) && area.has(event.target).length === 0) {
            // $('#divTop').slideUp('slow');  //滑動消失
            $("#logining").hide(100); // 淡出消失
          }
        });
      } else {
        event.stopPropagation();
        $("#logoutInfo").toggle("fast");
        $(document).click(function (event) {
          var area = $("#logoutInfo"); // 設定目標區域
          if (!area.is(event.target) && area.has(event.target).length === 0) {
            // $('#divTop').slideUp('slow');  //滑動消失
            $("#logoutInfo").hide(100); // 淡出消失
          }
        });
      }
    },
    link: function (page) {
      $("#logining").hide(100);
      let toPage = page;
      console.log(toPage);
      var logingData = JSON.parse(localStorage.getItem("token"));
      this.$router.push({ path: `/${toPage}/${logingData.id}` });
    },
  },
};
</script>
<style>
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  text-decoration: none;
}

.warp {
  width: 100%;
  margin: auto;
  height: 100vh;
  font-family: 微軟正黑體;
  background-color: #f7f7f7;
  overflow-x: hidden;
}

.header {
  width: 10.5%;
  height: 100vh;
  float: left;
}

.footer {
  background-color: #f7f7f7;
}
/* header */
.headerContent {
  width: 10.5%;
  height: 100vh;
  position: fixed;
  top: 0;
  padding-right: 5px;
  background-color: #fff;
  box-shadow: 1px 2px 2px 1px rgba(0, 0, 0, 0.2);
  color: white;
}

.icons{
  width: 24px;
  height: 24px;
  margin-right: 10px;
}
.menu {
  margin-top: 10px;
  margin-left: 15px;
  font-size: 16px;
  z-index: 100;
  position: absolute;
}
#menu{
  visibility: hidden;
}
.system{
  font-size: 14x;
  color: #a89090;
  text-align: center;
}
.functionList{
  font-size: 12x;
  color: #a89090;
  margin-top: 20px;
  margin-left: 10px;
}

.menu li, li {
  margin-bottom: 10px;
}
.menu li a {
  padding: 15px 15px;
  display: block;
}
.menu li a span{
  color: black;
  font-size: 16px;
  line-height: 26px;
  letter-spacing: 3px;
  vertical-align: top;
}


.menu li:hover {
  cursor: pointer;
  background-color: rgb(182, 96, 96);
}
.showMenu {
  display: none;
}
#logout {
  display: none;
}

/* Content */
.content {
  float: left;
  width: 89.5%;
  height: 100%;
}

.contentTop {
  width: 100%;
  padding: 1% 0%;
  box-shadow: 1px 0.5px 2px 0.5px rgba(0, 0, 0, 0.096);
  background-color: #fff;
}

.breadcrumb {
  float: left;
  width: 70%;
  margin-left: 20px;
}
.breadcrumb a {
  display: inline;
  /* float: left; */
  font-size: 14px;
  color: black;
}

.breadcrumb-item::after {
  content: "\00a0 >\00a0 ";
  color: black;
}

.photo {
  float: right;
}

.el-table th,
.el-table td {
  text-align: center;
}

.phoneMenu {
  display: none;
}
#phoneMenu{
  visibility: hidden;
}
.page {
  font-size: 24px;
  font-weight: bold;
  display: inline-block;
  margin: 20px;
}

/* 不是basic但comment共用 */
.dataArea {
  position: relative;
  float: left;
  width: 97%;
  margin-left: 20px;
  overflow: hidden;
}

/* footer */
.phoneMenu {
  display: none;
}
#personalInfo{
  visibility: hidden;
}
.personalInfo{
  float: right;
  padding-right: 30px;
}
.personalInfo p{
  float: right;
  margin-right: 10px;
}
#logining{
  display:none;
}
.loginingInfo{
  width: 250px;
  height: 270px;
  position: absolute;
  z-index: 100000;
  top: 7%;
  right: 2%;
  padding: 2%;
  background: white;
  border-radius: 3px;
  border: 0.5px solid rgb(211, 211, 211);
  box-shadow: 0.5px 0.5px 2px #adadad;
}
.nameEmail{
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 0.3px solid rgb(204, 204, 204);
}
.nameEmail img{
  float: left;
  margin-left: 10px;
  margin-right: 20px;
}
.nameEmail ul li{
  padding-top: 5px;
}
.personalMenu{
  margin-top: 20px;
}
.personalMenu ul li{
  padding: 20px;
  border-bottom: 0.3px solid rgb(204,204,204);
  margin-bottom: 0px;
}
.personalMenu ul li button{
  all:unset;
}
.personalMenu ul li span{
  margin-left: 20px;
  font-size: 16px;
  line-height: 18px;
  vertical-align: top;
  letter-spacing: 3px;
}
.personalMenu ul li:hover{
  cursor: pointer;
  background: rgb(206, 206, 206);
}
.bigheadLogout{
  all: unset;
  width: 40px;
  margin: 15% 32%;
  font-size: 16px;
  height: 30px;
  background-color: rgba(72, 133, 82, 0.877);
  border: 0.5px solid rgb(196, 196, 196);
  border-radius: 5px;
  padding: 2px 25px;
  color: white;
  letter-spacing: 3px;
  text-align: center;
}
.bigheadLogout:hover{
  cursor: pointer;
}

.editButton{
    all: unset;
    width: 16px;
    height: 16px;
    border-radius: 3px;
    vertical-align: bottom;
    margin: auto;
    justify-content: center; 
}

/* .personalInfo {
  float: right;
  padding-right: 30px;
}
.personalInfo p {
  float: right;
  margin-right: 10px;
}
.loginingInfo {
  background-color: #fff;
  padding-top: 20px;
  font-size: 16px;
  top: 7%;
  right: 2%;
  color: black;
  position: absolute;
  width: 260px;
  height: 260px;
  border: #cac7c7 solid 0.5px;
  border-radius: 5px;
  box-shadow: 1px 2px 2px 1px #a0a0a02f;
  z-index: 100;
}
#logining {
  display: none;
}
.loginingInfo .nameEmail {
  padding-bottom: 20px;
  width: 240px;
  margin: auto;
  border-bottom: #707070 solid 0.5px;
}
.nameEmail img {
  float: left;
}
.nameEmail li {
  float: left;
  padding: 5px 5px 5px 10px;
}
.personalMenu {
  font-size: 18px;
  margin-top: 30px;
}
.personalMenu ul {
  margin-left: 35px;
}
.personalMenu li {
  margin-top: 30px;
  vertical-align: middle;
}
.personalMenu img {
  margin-right: 15px;
} */
.logoutInfo {
  background-color: #fff;
  padding-top: 20px;
  font-size: 16px;
  top: 80px;
  color: black;
  right: 100px;
  position: absolute;
  width: 260px;
  height: 260px;
  border: #cac7c7 solid 0.5px;
}
#logoutInfo {
  /* visibility: hidden; */
  display: none;
}

.clear {
  clear: both;
}
.left_menu {
  display: none;
}
@media (max-width: 768px) {
  .contentCenter{
    background: white;
    position: fixed;
    width: 100%;
    text-align: center;
    height: 39px;
    line-height: 39px;
    box-shadow: 1px 0.5px 2px 0.5px rgba(0, 0, 0, 0.096);
    z-index: 1;
    top: 0;
    left: 0;
  }
  .page {
    font-size: 18px;
    margin: 0;
    
    /* z-index: 1; */
    /* top: 12px; */
    /* left: 50%; */
  }
  .header {
    /* height: 0; */
    /* position: relative; */
    /* z-index: 2; */
    display: none;
  }
  .headerContent {
    display: inline;
    /* background-color: rgb(47, 58, 76); */
    background-color: #fff;
    width: 100%;
    height: 0;
    padding: 0;
    position: relative;
    z-index: 1;
    /* display: none; */
  }
  .icons{
    margin-top: 5px;
    width: 22px;
    height: 20px;
  }
  .content {
    width: 100%;
    padding: 0;
    /* position: absolute; */
    /* top: 39px; */
    /* bottom: 40px; */
    z-index: 1;
  }
  .contentTop {
    position: fixed;
    top: 0;
    /* background-color: rgb(47, 58, 76); */
    background-color: #fff;
    height: 39px;
    margin: 0;
    padding: 0;
    z-index: 1;
    display: none;
  }
  .companyImg {
    display: none;
  }
  .title {
    font-size: 16px;
    margin: 5 auto;
    width: 65%;
    padding: 10px;
    text-align: center;
  }
  .photo {
    display: none;
  }
  .identity {
    display: none;
  }
  .breadcrumb {
    display: none;
  }
  .personalInfo {
    display: none;
  }
  /* 側邊選單 */
  .menu{
    display: none;
  }
  .showMenu {
    /* display: block; */
    display: none;
    width: 20%;
    line-height: 39px;
    text-align: center;
    position: absolute;
    left: 1%;
  }
  .close_btn {
    position: relative;
    margin: 16px;
    text-align: right;
    font-size: 1.5em;
  }
  .close_btn a{
    color: white;
  }
  .close_btn a:hover {
    cursor: pointer;
    color: rgb(182, 96, 96);
  }
  .left_menu {
    display: block;
    /* background-color: rgb(47, 58, 76); */
    background-color: #fff;
    color: white;
    height: 100%;
    width: 60vw;
    z-index: 4;
    position: fixed;
    left: -100%;
    transition: all 0.5s;
  }
  .left_menu.active {
    position: fixed;
    top: 0;
    left: 0%;
    transition: all 0.5s;
  }
  .leftul li {
    list-style: none;
    font-size: 1.5em;
    text-align: center;
    padding: 20px 0;
  }
  .leftul li:hover {
    background: rgb(182, 96, 96);
    cursor: pointer;
  }
  .leftul li a{
    color: white;
  }
  #logout {
    display: block;
  }
  .left_logout{
    border:0;
    background-color:none;
    background:none;
    color: white;
    font-size: 1em;
    padding: 0;
    text-align: center;
  }
  /* 底部選單 */
  .footer{
    position: fixed;
    width: 100%;
    /* position: relative; */
    z-index: 1;
    bottom: 0;
    height: 39px;
  }
  .phoneMenu {
    width: 100%;
    /* display: block; */
    
    /* bottom: 0; */
    /* text-align: center; */
    /* background-color: rgb(47, 58, 76); */
    background-color: #fff;
    border-top: 0.3px solid rgb(221, 221, 221);
    display: flex;
    justify-content: space-around;
    flex-direction: row;
  }
  .phoneMenu li {
    margin: 5px 0;
    text-align: center;
  }
  .phoneMenu button{
    border:0;
    background-color:none;
    background:none;
    padding: 0;
  }
}
@media (max-width: 425px) {
  .personalInfo {
    width: 30%;
  }

  .company {
    display: none;
  }
  .companyImg {
    display: none;
  }
  .photo {
    display: none;
  }
  .identity {
    display: none;
  }
  .breadcrumb {
    display: none;
  }
}
</style>
