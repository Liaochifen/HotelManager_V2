<template>
  <div>
    <div class="page">
      <img class="photo" src="https://fakeimg.pl/100x100/" alt="" />
      <div class="clear"></div>
      <h1>已寄送驗證碼到此信箱</h1>
      <div class="clear"></div>
      <div class="send">
        <input type="text" readonly="true" v-model="userAccountDetail.email" />
        <button v-on:click="sendEmail()" class="cus">重新寄送</button>
      </div>
      <div class="clear"></div>
      <form v-on:submit.prevent="confirm">
        <label>請輸入驗證碼&nbsp;:&nbsp;</label>
        <div class="clear"></div>
        <input
          type="text"
          v-model="check"
          required
          placeholder="請輸入驗證碼"
        />
        <div class="clear"></div>
        <button type="submit">確&nbsp;認</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import emailjs from "emailjs-com";
import dateTime from "../assets/js/dateTime";
import firebase from 'firebase/app';
import 'firebase/storage';
export default {
  name: "verification",
  data() {
    return {
      userID: this.$route.params.userID,
      userAccountDetail: {},
      certification: "",
      check: "",
      login: {
        employeeNumber: "",
        loginTime: "",
      },
      user: {
        employeeNumber: "",
        forgetPassword: {
          verification: true,
          verificationTime: ""
        }
      },
      picture:null
    };
  },
  mounted() {
    let self = this;
    // this.certification = Math.round(Math.random()*1000000);    //取六位整數
    // console.log(self.certification);
    axios
      .get("https://hotelapi.im.nuk.edu.tw/api/account/" + self.userID)
      .then((response) => {
        self.userAccountDetail = response.data;
        console.log(self.userAccountDetail);
        this.sendEmail();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    sendEmail: function () {
      this.certification = Math.round(Math.random() * 1000000); //取六位整數
      console.log(this.certification);
      console.log("sendEmail");
      var emailData = {
        user_name: this.userAccountDetail.userName,
        user_email: this.userAccountDetail.email, //this.userAccountDetail.email
        message: this.certification,
      };
      // emailjs.sendForm('gmail', 'template_ih27sAiz', emailData, 'user_claUepgayYZIqK8g01tnK')
      // .then((result) => {
      //     console.log('SUCCESS!', result.status, result.text);
      // }, (error) => {
      //     console.log('FAILED...', error);
      // });
      emailjs
        .send(
          "gmail",
          "template_ih27sAiz",
          emailData,
          "user_claUepgayYZIqK8g01tnK"
        )
        .then(
          function (response) {
            console.log("SUCCESS!", response.status, response.text);
          },
          function (error) {
            console.log("FAILED...", error);
          }
        );
    },
    confirm() {
      if (this.check == this.certification) {
        var self = this;
        // this.updateAccount();
        // this.loginRecord();
        var currentTime = new Date().getTime(); //取得從 1970-01-01 00:00:00 UTC 累計的毫秒數
        this.recordLogingTime();
        console.log("currentTime"+currentTime)
        // localStorage.setItem('token', JSON.stringify({id:this.userID,time:currentTime}));
        // localStorage.setItem(
        //   "token",
        //   JSON.stringify({
        //     id: this.userAccountDetail._id,
        //     employeeNumber:this.logingAccount.employeeNumber,
        //     time: currentTime+1,
        //     companyName: this.userAccountDetail.companyName,
        //     limit:this.userAccountDetail.employeeLimit,
        //   })
        // );
        // 抓圖片
          const storageRef = firebase.storage().ref(this.userAccountDetail.picture);
          storageRef.getDownloadURL().then(function(url) {
            console.log("url:"+url);
            self.picture = url;
            localStorage.setItem(
            "token",
            JSON.stringify({
              id: self.userAccountDetail._id,
              employeeNumber:self.userAccountDetail.employeeNumber,
              time: currentTime+1,
              companyName: self.userAccountDetail.companyName,
              limit:self.userAccountDetail.employeeLimit,
              pictureUrl:self.picture,
            })
            );
          }).catch(function(error) {
            console.log(error);
              const storageRef2 = firebase.storage().ref('004.png');
              storageRef2.getDownloadURL().then(function(url) {
                console.log("url:"+url);
                self.picture = url;
                 localStorage.setItem(
                  "token",
                  JSON.stringify({
                    id: self.userAccountDetail._id,
                    employeeNumber:self.userAccountDetail.employeeNumber,
                    time: currentTime+1,
                    companyName: self.userAccountDetail.companyName,
                    limit:self.userAccountDetail.employeeLimit,
                    pictureUrl:self.picture,
                  })
                  );
              }).catch(function(error2) {
                console.log(error2);
              });
          });
        this.forgetPasswordRecord(true);
        // this.$router.push({ name: "changePassword" });
        // window.location.reload();
      } else {
        //alert('驗證碼錯誤!!請重新輸入或點選『重新寄送』按鈕');
        this.forgetPasswordRecord(false);
        this.$fire({
          title: "Error !!",
          text: "驗證碼錯誤!!請重新輸入或點選『重新寄送』按鈕",
          type: "error",
          // timer: 3000
        });
        this.check = "";
      }
    },
    updateAccount: function () {
      let updateUser = this.userAccountDetail;
      let id = this.userID;
      axios
        .put("https://hotelapi.im.nuk.edu.tw/api/account/" + id, updateUser)
        .then((response) => {
          //this.userAccountDetail=updateUser;
          //寫在mounted的如果數據改會自動更著改且不會重新整理
          console.log(response);
          this.loginRecord();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loginRecord: function () {
      let record = "login";
      let company = this.userAccountDetail.companyName;
      this.login.employeeNumber = this.userAccountDetail.employeeNumber;
      this.login.loginTime =
        this.userAccountDetail.lastLoginDate +
        " " +
        this.userAccountDetail.lastLoginTime;
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
          this.$router.push({ name: "changePassword" });
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    recordLogingTime: function () {
      this.userAccountDetail.lastLoginDate = dateTime.recordDate();
      this.userAccountDetail.lastLoginTime = dateTime.recordTime();
    },
    forgetPasswordRecord:function(verificate){
      var company = this.userAccountDetail.companyName;
      var record="user";
      this.user.employeeNumber = this.userAccountDetail.employeeNumber;
      this.user.forgetPassword.verification = verificate;
      this.user.forgetPassword.verificationTime = dateTime.recordDate() + " " + dateTime.recordTime();
      console.log(this.user);
       axios.put("https://hotelapi.im.nuk.edu.tw/api/history/" +company +"/" +record,this.user)
        .then((responseRecord) => {
          if(verificate){
            this.updateAccount();
          }
          console.log(responseRecord);
        })
        .catch((errorRecord) => {
          console.log(errorRecord);
        });
    }
  },
};
</script>

<style scoped src= '../assets/css/verification.css'></style>
