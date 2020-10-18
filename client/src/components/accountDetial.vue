<template>
  <div>
    <div class="contentCenter">
      <div class="page">
        <span>帳號詳細內容</span>
      </div>
    </div>

    <div class="detail">
      <div class="leftContent">
        <a href="#"><img src="https://fakeimg.pl/125x125/" alt="" /></a>
      </div>
      <div class="rightContent">
        <h2>個人資料</h2>
        <button id="personal" v-on:click="editPersonal()">編輯</button>
        <div class="clear"></div>
        <div class="personalDetail">
          <ul>
            <li>
              所屬單位&nbsp;:&nbsp;<input
                type="text"
                readonly="readonly"
                v-model="userAccountDetail.department"
                id="department"
              />
            </li>
            <li>
              姓名&nbsp;:&nbsp;<input
                type="text"
                readonly="readonly"
                v-model="userAccountDetail.userName"
                id="userName"
              />
            </li>
            <li>
              員工編號&nbsp;:&nbsp;<input
                type="text"
                readonly="readonly"
                v-model="userAccountDetail.employeeNumber"
                id="employeeNumber"
              />
            </li>
          </ul>
        </div>
        <h2>聯絡資訊</h2>
        <button v-on:click="editContactInfo()" id="contact">編輯</button>
        <div class="clear"></div>
        <div class="contactInfo">
          <ul>
            <li>
              手機&nbsp;:&nbsp;<input
                type="text"
                readonly="readonly"
                id="phone"
              />
            </li>
            <li>
              信箱&nbsp;:&nbsp;<input
                type="text"
                readonly="readonly"
                v-model="userAccountDetail.email"
                id="email"
              />
            </li>
          </ul>
        </div>
        <h2>隱私權</h2>
        <div class="clear"></div>
        <div class="private">
          <ul>
            <li>
              權限&nbsp;:&nbsp;<input
                type="text"
                readonly="readonly"
                :value="userAccountDetail.employeeLimit"
              />
            </li>
            <li>
              密碼&nbsp;:&nbsp;<input
                class="form-control"
                type="password"
                readonly="readonly"
                :value="userAccountDetail.password"
              />
              <span v-on:click="changePassword" v-if="pass_type === 'password'"
                ><font-awesome-icon icon="eye"
              /></span>
              <span v-on:click="changePassword" v-else
                ><font-awesome-icon icon="eye-slash"
              /></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";

export default {
  name: "accountDetial",
  data() {
    return {
      userAccountDetail: {},
      userID: this.$route.params.userID,
      editPersonalBtn: false,
      editContactInfoBtn: false,
      pass_type: "password",
    };
  },
  mounted() {
    let self = this;
    axios
      .get("https://hotelapi.im.nuk.edu.tw/api/account/" + self.userID)
      .then((response) => {
        console.log(response.data);
        self.userAccountDetail = response.data;
        console.log(self.userAccountDetail);
        // self.id=response.data.id;
        // self.name=response.data.name;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    updateAccount: function () {
      let updateUser = this.userAccountDetail;
      let id = this.userID;
      axios
        .put("https://hotelapi.im.nuk.edu.tw/api/account/" + id, updateUser)
        .then((response) => {
          //this.userAccountDetail=updateUser;
          //寫在mounted的如果數據改會自動更著改且不會重新整理
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editPersonal: function () {
      if (this.editPersonalBtn) {
        console.log("true 編輯");
        this.updateAccount();
        console.log(this.userAccountDetail);
        document.getElementById("personal").innerHTML = "編輯";
        document.getElementById("department").setAttribute("readOnly", true);
        document.getElementById("department").style.cssText = "border:none;";
        document.getElementById("userName").setAttribute("readOnly", true);
        document.getElementById("userName").style.cssText = "border:none;";
        document
          .getElementById("employeeNumber")
          .setAttribute("readOnly", true);
        document.getElementById("employeeNumber").style.cssText =
          "border:none;";

        this.editPersonalBtn = false;
      } else {
        console.log("false 儲存");
        document.getElementById("personal").innerHTML = "儲存";
        document.getElementById("department").removeAttribute("readOnly");
        document.getElementById("department").style.cssText =
          "border:1px solid;";
        document.getElementById("userName").removeAttribute("readOnly");
        document.getElementById("userName").style.cssText = "border:1px solid;";
        document.getElementById("employeeNumber").removeAttribute("readOnly");
        document.getElementById("employeeNumber").style.cssText =
          "border:1px solid;";
        console.log(this.userAccountDetail);
        this.editPersonalBtn = true;
      }
    },
    editContactInfo: function () {
      if (this.editContactInfoBtn) {
        console.log("true 編輯");
        this.updateAccount();
        document.getElementById("contact").innerHTML = "編輯";
        document.getElementById("phone").setAttribute("readOnly", true);
        document.getElementById("phone").style.cssText = "border:none;";
        document.getElementById("email").setAttribute("readOnly", true);
        document.getElementById("email").style.cssText = "border:none;";
        this.updateAccount();

        this.editContactInfoBtn = false;
      } else {
        console.log("false 儲存");
        document.getElementById("contact").innerHTML = "儲存";
        document.getElementById("phone").removeAttribute("readOnly");
        document.getElementById("phone").style.cssText = "border:1px solid;";
        document.getElementById("email").removeAttribute("readOnly");
        document.getElementById("email").style.cssText = "border:1px solid;";
        this.editContactInfoBtn = true;
      }
    },
    changePassword: function () {
      if (this.pass_type === "password") {
        $("input.form-control").attr("type", "text");
        this.pass_type = "text";
      } else {
        $("input.form-control").attr("type", "password");
        this.pass_type = "password";
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src= '../assets/css/accountDetial.css'></style>
