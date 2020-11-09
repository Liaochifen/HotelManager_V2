<template>
  <div>
    <div class="page">
      <img class="photo" src="https://fakeimg.pl/100x100/" alt="" />
      <div class="clear"></div>
      <h1>登入成功!!請修改密碼!!</h1>
      <form v-on:submit.prevent="confirm">
        <label>新密碼&nbsp;:&nbsp;</label>
        <input type="password" v-model="password" required />
        <div class="clear"></div>
        <label>再次輸入&nbsp;:&nbsp;</label>
        <input type="password" v-model="password2" required />
        <div class="clear"></div>
        <button type="submit">確&nbsp;認</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dateTime from "../assets/js/dateTime";
export default {
  name: "changePassword",
  data() {
    return {
      password: "",
      password2: "",
      accountInfo: [],
      logingAccount: {},
      userID: "",
    };
  },
  mounted() {
    let self = this;
    axios
      .get("https://hotelapi.im.nuk.edu.tw/api/account")
      .then((response) => {
        self.accountInfo = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    confirm: function () {
      var logining = localStorage.getItem("token");
      var loginData = JSON.parse(logining);
      this.userID = loginData.id;
      let i;
      if (this.password == this.password2) {
        for (i = 0; i < this.accountInfo.length; i++) {
          if (this.userID == this.accountInfo[i]._id) {
            this.logingAccount = this.accountInfo[i];
            var oldPassword= this.logingAccount.password;
            this.logingAccount.password = this.password;
            if(this.logingAccount.firstLogin==true){
              this.logingAccount.firstLogin = false;
              this.updateAccount();
              this.recordUserDetailModify("修改密碼","第一次登入",this.password);
            }else{
              this.updateAccount();
              this.recordUserDetailModify("修改密碼",oldPassword,this.password);
            }
            
            break;
          }
        }
      } else {
        // alert("密碼不相符，請重新輸入");
        this.$fire({
          title: "Error !!",
          text: "密碼不相符，請重新輸入",
          type: "error",
          // timer: 3000
        });
        this.logingAccount.password = "";
        this.logingAccount.password2 = "";
      }
    },
    updateAccount: function () {
      let updateUser = this.logingAccount;
      let id = this.logingAccount._id;
      axios
        .put("https://hotelapi.im.nuk.edu.tw/api/account/" + id, updateUser)
        .then((response) => {
          //this.userAccountDetail=updateUser;
          //寫在mounted的如果數據改會自動更著改且不會重新整理
          console.log(response);
          this.$fire({
            title: "Successful !!",
            text: "成功修改密碼",
            type: "success",
          }).then(() => {
            if(this.logingAccount.employeeLimit === "一般使用者"){
              document.getElementById("accountManage").style.display = "none"; 
              document.getElementById("statisticalResults").style.display = "none"; 
            }else if(this.logingAccount.employeeLimit === "主管使用者"){
              document.getElementById("accountManage").style.display = "none"; 
            }
            document.getElementById("limitWord").innerHTML = this.logingAccount.employeeLimit;
            document.getElementById("menu").style.visibility = "visible";
            document.getElementById("breadcrumb").style.visibility = "visible";
            this.$router.push({
              name: "commentList",
              params: { collections: this.logingAccount.companyName },
            });
            
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    recordUserDetailModify:function(change,oldInfo,newInfo){
      var userDetailModify = new Object();
      userDetailModify.modifyPerson = this.logingAccount.employeeNumber;
      userDetailModify.employeeNumber = this.logingAccount.employeeNumber;
      userDetailModify.modifyInfo= change;
      userDetailModify.new= newInfo;
      userDetailModify.old= oldInfo;  
      userDetailModify.time =dateTime.recordDate() + " " + dateTime.recordTime();
      var company = this.logingAccount.companyName;
      var record = "userDetailModify";
      axios.put("https://hotelapi.im.nuk.edu.tw/api/history/" +company +"/" +record,userDetailModify)
          .then((responseRecord) => {
            console.log(responseRecord);
          })
          .catch((errorRecord) => {
            console.log(errorRecord);
          });    
      }     
  }
};
</script>


<style scoped src= '../assets/css/changePassword.css'></style>