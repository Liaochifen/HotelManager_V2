<template>
  <div class="login_wrap">
    <div class="login_page" id="login_page">
      <img src="../assets/icon/icon-96x96.png" alt="" />
      <div class="clear"></div>
      <h1>登入</h1>
      <div class="input_block">
        <!-- the submit event will no longer reload the page -->
        <form v-on:submit.prevent="logging">
          <p>帳號</p>
          <input
            class="input_all"
            type="text"
            v-model="userName"
            required
            placeholder="請輸入員工號碼"
          />
          <div class="clear"></div>
          <p>密碼</p>
          <input
            class="input_all"
            type="password"
            v-model="passWord"
            required
            placeholder="請輸入密碼"
          />
          <div class="clear"></div>
          <div class="btn">
            <button type="submit">確&nbsp;認</button>
            <router-link :to="'../forgetPassword'" class="link">忘記密碼 ?</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dateTime from "../assets/js/dateTime";
import firebase from 'firebase/app';
import 'firebase/storage';

export default {
  name: "login",
  data() {
    return {
      userName: "",
      passWord: "",
      accountInfo: [],
      logingAccount: {},
      login: {
        employeeNumber: "",
        loginTime: "",
      },
      picture:null
    };
  },
  mounted() {
    let self = this;
    axios
      .get("https://hotelapi.im.nuk.edu.tw/api/account")
      .then((response) => {
        self.accountInfo = response.data;
        if (localStorage.getItem("token")) {
          // var logining = localStorage.getItem("token");
          // var loginData = JSON.parse(logining);
          // this.$router.push({
          //   name: "commentList",
          //   params: { collections: loginData.companyName },
          // });
          this.$router.push({
            name: "competition"
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    logging: function () {
      console.log("login");
      let i;
      var self = this;
      for (i = 0; i < this.accountInfo.length; i++) {
        if (
          this.userName == this.accountInfo[i].employeeNumber &&
          this.passWord == this.accountInfo[i].password
        ) {
          this.logingAccount = this.accountInfo[i];
          // this.updateAccount();
          // this.loginRecord();
          //var userID = this.accountInfo[i]._id;
          var currentTime = new Date().getTime(); //取得從 1970-01-01 00:00:00 UTC 累計的毫秒數

          // 抓圖片
          const storageRef = firebase.storage().ref(this.logingAccount.picture);
          storageRef.getDownloadURL().then(function(url) {
            console.log("url:"+url);
            self.picture = url;
            localStorage.setItem(
            "token",
            JSON.stringify({
              id: self.logingAccount._id,
              employeeNumber:self.logingAccount.employeeNumber,
              time: currentTime+1,
              companyName: self.logingAccount.companyName,
              limit:self.logingAccount.employeeLimit,
              pictureUrl:self.picture,
            })
            );
            self.updateAccount();
          }).catch(function(error) {
            console.log(error);
            self.picture = "http://192.168.50.108:8080/img/icon-192x192.23773b6f.png";
                 localStorage.setItem(
                  "token",
                  JSON.stringify({
                    id: self.logingAccount._id,
                    employeeNumber:self.logingAccount.employeeNumber,
                    time: currentTime+1,
                    companyName: self.logingAccount.companyName,
                    limit:self.logingAccount.employeeLimit,
                    pictureUrl:self.picture,
                  })
                  );
            self.updateAccount();
              // const storageRef2 = firebase.storage().ref('004.png');
              // storageRef2.getDownloadURL().then(function(url) {
              //   console.log("url:"+url);
                
              //     self.updateAccount();
              // }).catch(function(error2) {
              //   console.log(error2);
              // });
          });
          
          if(this.logingAccount.employeeLimit === "一般使用者"){
            document.getElementById("accountManage").style.display = "none"; 
            document.getElementById("statisticalResults").style.display = "none"; 
            document.getElementById("statisticalResultsPhone").style.display = "none";
            document.getElementById("accountManagePhone").style.display = "none";
          }else if(this.logingAccount.employeeLimit === "主管使用者"){
            document.getElementById("accountManage").style.display = "none";
            document.getElementById("accountManagePhone").style.display = "none";  
          } 
          document.getElementById("limitWord").innerHTML = this.logingAccount.employeeLimit; 
          document.getElementById("menu").style.visibility = "visible";
          document.getElementById("phoneMenu").style.visibility = "visible";
          // document.getElementById("breadcrumb").style.visibility = "visible";
          // localStorage.setItem(
          //   "token",
          //   JSON.stringify({
          //     id: this.logingAccount._id,
          //     employeeNumber:this.logingAccount.employeeNumber,
          //     time: currentTime+1,
          //     companyName: this.logingAccount.companyName,
          //     limit:this.logingAccount.employeeLimit,
          //     pictureUrl:this.picture,
          //   })
          // );
          break;
        } else if (i == this.accountInfo.length - 1) {
          // alert('使用者帳號密碼錯誤!請重新登入')
          this.$fire({
            title: "Error !!",
            text: "使用者帳號密碼錯誤!請重新登入",
            type: "error",
            // timer: 3000
          });
        }
      }
 
        // if (this.logingAccount.firstLogin) {
        //   this.$router.push({ name: "changePassword" });
        //   window.location.reload();
          
        // } else {
        //   // this.$router.push({
        //   //   name: "commentList",
        //   //   params: { collections: this.accountInfo[i].companyName },
        //   // });
          
        //   this.$router.push({ name: "competition" });
        //   window.location.reload();
        // } //決定登入後要導到哪一頁

        // this.logingAccount.lastLoginDate = dateTime.recordDate();
        // this.logingAccount.lastLoginTime = dateTime.recordTime();
        // let updateUser = this.logingAccount;
        // let id = this.logingAccount._id;
        // axios
        // .put("https://hotelapi.im.nuk.edu.tw/api/account/" + id, updateUser)
        // .then((response) => {
        //   console.log(response);
        //   let record = "login";
        //   let company = this.logingAccount.companyName;
        //   this.login.employeeNumber = this.logingAccount.employeeNumber;
        //   this.login.loginTime = dateTime.recordDate()+" "+ dateTime.recordTime();
        //   console.log(this.login);
        //   console.log(company);
        //   axios
        //     .put(
        //       "https://hotelapi.im.nuk.edu.tw/api/history/" +
        //         company +
        //         "/" +
        //         record,
        //       this.login
        //     )
        //     .then((response2) => {
        //       console.log(response2);
        //       if (this.logingAccount.firstLogin) {
        //       this.$router.push({ name: "changePassword" });
        //       window.location.reload();
        //       } else {
        //         this.$router.push({ name: "competition" });
        //         window.location.reload();
        //       } //決定登入後要導到哪一頁
        //       })
        //     .catch((error) => {
        //       console.log(error);
        //     });
        // })
        // .catch((error) => {
        //   console.log(error);
        // });
      
    
    },
    updateAccount: function () {
      this.logingAccount.lastLoginDate = dateTime.recordDate();
      this.logingAccount.lastLoginTime = dateTime.recordTime();
      let updateUser = this.logingAccount;
      let id = this.logingAccount._id;
      axios
        .put("https://hotelapi.im.nuk.edu.tw/api/account/" + id, updateUser)
        .then((response) => {
          console.log(response);
          this.loginRecord();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loginRecord: function () {
      let record = "login";
      let company = this.logingAccount.companyName;
      this.login.employeeNumber = this.logingAccount.employeeNumber;
      this.login.loginTime = dateTime.recordDate()+" "+ dateTime.recordTime();
      console.log(this.login);
      console.log(company);
      axios
        .put(
          "https://hotelapi.im.nuk.edu.tw/api/history/" +
            company +
            "/" +
            record,
          this.login
        )
        .then((response) => {
          console.log(response);
          if (this.logingAccount.firstLogin) {
            this.$router.push({ name: "changePassword" });
            window.location.reload();
          } else {
            this.$router.push({ name: "competition" });
            window.location.reload();
          } //決定登入後要導到哪一頁
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped src= '../assets/css/login.css'></style>
