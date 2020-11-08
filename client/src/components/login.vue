<template>
  <div>
    <div class="page">
      <img class="photo" src="https://fakeimg.pl/100x100/" alt="" />
      <div class="clear"></div>
      <h1>登入</h1>
      <!-- the submit event will no longer reload the page -->
      <form v-on:submit.prevent="logging">
        <label>帳號&nbsp;:&nbsp;</label>
        <input
          type="text"
          v-model="userName"
          required
          placeholder="請輸入員工號碼"
        />
        <div class="clear"></div>
        <label>密碼&nbsp;:&nbsp;</label>
        <input
          type="password"
          v-model="passWord"
          required
          placeholder="請輸入密碼"
        />
        <div class="clear"></div>
        <router-link :to="'../forgetPassword'" class="link">忘記密碼 ?</router-link>
        <div class="btn">
          <button type="submit">確&nbsp;認</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dateTime from "../assets/js/dateTime";

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
    };
  },
  mounted() {
    let self = this;
    axios
      .get("https://hotelapi.im.nuk.edu.tw/api/account")
      .then((response) => {
        self.accountInfo = response.data;
        if (localStorage.getItem("token")) {
          var logining = localStorage.getItem("token");
          var loginData = JSON.parse(logining);
          this.$router.push({
            name: "commentList",
            params: { collections: loginData.companyName },
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
      for (i = 0; i < this.accountInfo.length; i++) {
        if (
          this.userName == this.accountInfo[i].employeeNumber &&
          this.passWord == this.accountInfo[i].password
        ) {
          this.logingAccount = this.accountInfo[i];
          //var userID = this.accountInfo[i]._id;
          var currentTime = new Date().getTime(); //取得從 1970-01-01 00:00:00 UTC 累計的毫秒數
          this.logingAccount.lastLoginDate = dateTime.recordDate();
          this.logingAccount.lastLoginTime = dateTime.recordTime();
          localStorage.setItem(
            "token",
            JSON.stringify({
              id: this.logingAccount._id,
              time: currentTime+1,
              companyName: this.logingAccount.companyName,
            })
          );
          document.getElementById("menu").style.visibility = "visible";
          document.getElementById("breadcrumb").style.visibility = "visible";
          this.updateAccount();
          this.loginRecord();

          if (this.accountInfo[i].firstLogin) {
            this.$router.push({ name: "changePassword" });
            window.location.reload();
            break;
          } else {
            this.$router.push({
              name: "commentList",
              params: { collections: this.accountInfo[i].companyName },
            });
            window.location.reload();
            break;
          } //決定登入後要導到哪一頁
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
    },
    updateAccount: function () {
      let updateUser = this.logingAccount;
      let id = this.logingAccount._id;
      axios
        .put("https://hotelapi.im.nuk.edu.tw/api/account/" + id, updateUser)
        .then((response) => {
          console.log(response);
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
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped src= '../assets/css/login.css'></style>
