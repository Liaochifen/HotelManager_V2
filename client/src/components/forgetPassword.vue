<template>
  <div>
    <div class="page">
      <img class="photo" src="https://fakeimg.pl/100x100/" alt="" />
      <div class="clear"></div>
      <h1>忘記密碼</h1>
      <form v-on:submit.prevent="forget">
        <label>帳號&nbsp;:&nbsp;</label>
        <input
          type="text"
          v-model="employeeNumber"
          required
          placeholder="請輸入帳號"
        />
        <div class="clear"></div>
        <button type="submit">確&nbsp;認</button>
      </form>
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
