<template>
  <div class="forgetpw_wrap">
    <div class="forgetpw_page forgetPW_phone">
      <img src="../assets/icon/icon-96x96.png" alt="" />
      <div class="clear"></div>
      <h1>忘記密碼</h1>
      <div class="input_block">
        <form v-on:submit.prevent="forget">
          <p>帳號</p>
          <input class="input_all" type="text"  v-model="employeeNumber"  required  placeholder="請輸入帳號"/>
          <div class="clear"></div>
          <div class="btn"> 
            <button type="submit">確認</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "changePassword",
  data() {
    return {
      employeeNumber: "",
      accountInfo: [],
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
    forget() {
      let i;
      for (i = 0; i < this.accountInfo.length; i++) {
        if (this.employeeNumber == this.accountInfo[i].employeeNumber) {
          let userID = this.accountInfo[i]._id;
          console.log(this.accountInfo[i]._id);
          this.$router.push({ name: "verification", params: { userID } });
          //this.$router.push(`/verification/${userID}`);
          break;
        } else if (i == this.accountInfo.length - 1) {
          //this.$alert("使用者帳號錯誤!請重新輸入");
          // alert('使用者帳號錯誤!請重新輸入')
          this.$fire({
            title: "Error !!",
            text: "使用者帳號錯誤!請重新輸入",
            type: "error",
            // timer: 3000
          });
          this.employeeNumber = "";
        }
      }
    },
  },
};
</script>

<style scoped src= '../assets/css/forgetPassword.css'></style>
