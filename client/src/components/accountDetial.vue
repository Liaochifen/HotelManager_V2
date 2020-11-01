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
              所屬單位&nbsp;:&nbsp;
              <input type="text" readonly="readonly" v-model="userAccountDetail.department" id="department" />
              
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
                id="email" style="width: 85%;"
              />
            </li>
          </ul>
        </div>
        <h2>隱私權</h2>
        <button v-on:click="editPrivateInfo()" id="private">編輯</button>
        <div class="clear"></div>
        <div class="private">
          <ul>
            <li>
              權限&nbsp;:&nbsp;
              <!-- <input
                type="text"
                readonly="readonly"
                :value="userAccountDetail.employeeLimit"
                id="limit"
              /> -->
              <select v-model="userAccountDetail.employeeLimit" disabled id="limit">
              <option>一般使用者</option>
              <option>主管使用者</option>
              <option>後台管理者</option>
            </select>
            </li>
            <li>
              密碼&nbsp;:&nbsp;<input
                class="form-control"
                type="password"
                readonly="readonly"
                v-model="userAccountDetail.password"
                id="password"
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
import dateTime from "../assets/js/dateTime";

export default {
  name: "accountDetial",
  data() {
    return {
      userAccountDetail: {},
      userID: this.$route.params.userID,
      editPersonalBtn: false,
      editContactInfoBtn: false,
      pass_type: "password",
      editPrivateInfoBtn:false,
      oldPassword:"",
      oldEmail:"",
      oldUserName:"",
      oldEmployeeLimit:"",
      oldDepartment:"",
      checkPassword:"",
      // userDetailModify: {
      //   modifyPerson: "",
      //   employeeNumber: "",
      //   modifyInfo: "",
      //   new: "",
      //   old: "",
      //   time: ""
      // },
      company:"",
      record:"userDetailModify"
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
        self.oldPassword = self.userAccountDetail.password;
        self.oldEmail = self.userAccountDetail.email;
        self.oldUserName = self.userAccountDetail.userName;
        self.oldEmployeeLimit = self.userAccountDetail.employeeLimit;
        self.oldDepartment = self.userAccountDetail.department;
        self.company = self.userAccountDetail.companyName;
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
        if(this.oldUserName != this.userAccountDetail.userName){
          var userName = this.oldUserName;
          this.recordUserDetailModify('修改姓名',userName,this.userAccountDetail.userName);
          this.oldUserName = this.userAccountDetail.userName; 
        }
        if(this.oldDepartment != this.userAccountDetail.department){
          var department = this.oldDepartment;
          this.recordUserDetailModify('修改所屬單位',department,this.userAccountDetail.department);
          this.oldDepartment = this.userAccountDetail.department; 
        }
        console.log(this.userAccountDetail);
        document.getElementById("personal").innerHTML = "編輯";
        document.getElementById("department").setAttribute("readOnly", true);
        document.getElementById("department").style.cssText = "border:none;";
        document.getElementById("userName").setAttribute("readOnly", true);
        document.getElementById("userName").style.cssText = "border:none;";
        // document
        //   .getElementById("employeeNumber")
        //   .setAttribute("readOnly", true);
        // document.getElementById("employeeNumber").style.cssText =
        //   "border:none;";
        this.updateAccount();
        this.editPersonalBtn = false;
      } else {
        console.log("false 儲存");
        document.getElementById("personal").innerHTML = "儲存";
        document.getElementById("department").removeAttribute("readOnly");
        document.getElementById("department").style.cssText =
          "border:1px solid;";
        document.getElementById("userName").removeAttribute("readOnly");
        document.getElementById("userName").style.cssText = "border:1px solid;";
        // document.getElementById("employeeNumber").removeAttribute("readOnly");
        // document.getElementById("employeeNumber").style.cssText =
        //   "border:1px solid;";
        console.log(this.userAccountDetail);
        this.editPersonalBtn = true;
      }
    },
    editContactInfo: function () {
      if (this.editContactInfoBtn) {
        if(this.oldEmail != this.userAccountDetail.email){
          var email = this.oldEmail;
          this.recordUserDetailModify('修改Email',email,this.userAccountDetail.email);
          this.oldEmail = this.userAccountDetail.email; 
        }
        console.log("true 編輯");
        // this.updateAccount();
        document.getElementById("contact").innerHTML = "編輯";
        document.getElementById("phone").setAttribute("readOnly", true);
        document.getElementById("phone").style.cssText = "border:none;";
        document.getElementById("email").setAttribute("readOnly", true);
        document.getElementById("email").style.cssText = "border:none; width: 85%;";
        this.updateAccount();

        this.editContactInfoBtn = false;
      } else {
        console.log("false 儲存");
        document.getElementById("contact").innerHTML = "儲存";
        document.getElementById("phone").removeAttribute("readOnly");
        document.getElementById("phone").style.cssText = "border:1px solid;";
        document.getElementById("email").removeAttribute("readOnly");
        document.getElementById("email").style.cssText = "border:1px solid; width: 85%;";
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
    editPrivateInfo: function(){
      if(this.editPrivateInfoBtn){
        console.log(this.oldPassword);
         if(this.oldPassword != this.userAccountDetail.password){
          this.$fire({
            type: 'warning',
            title: "請再輸入一次新密碼!!",
            input: "text",
            inputPlaceholder: 'New password',
            inputValidator: (value) => {
              return new Promise((resolve) => {
                if (value != this.userAccountDetail.password) {
                  // this.updateAccount();
                  resolve('密碼不同請在確認一次!!!!!')
                }else{
                  this.checkPassword = value;
                  resolve()
                } 
              })
            }
          }).then(r => {
            console.log(r.value);
            if(this.checkPassword == r.value){
              //當v-model修改時即會寫入資料庫
              // this.updateAccount();
              this.userDetailModify.old=this.oldPassword;
              this.userDetailModify.new=this.userAccountDetail.password;
              this.userDetailModify.modifyInfo='修改密碼';
              this.oldPassword = this.userAccountDetail.password;
              this.$fire({
                title: "Success !!",
                text: "成功修改密碼~",
                type: "success",
              });
              this.recordUserDetailModify();
            }else{
              //沒有驗證成功(ex點空白關掉alert)改回本來的密碼
              this.userAccountDetail.password = this.userDetailChange.password;
              this.updateAccount();
              this.$fire({
                title: "Error !!",
                text: "密碼沒有修改成功!!!!",
                type: "error",
              });
            }
          });
         }
        if(this.oldEmployeeLimit != this.userAccountDetail.employeeLimit){
          this.userDetailModify.old=this.oldEmployeeLimit;
          this.userDetailModify.new=this.userAccountDetail.employeeLimit;
          this.userDetailModify.modifyInfo='修改權限';
          this.oldEmployeeLimit = this.userAccountDetail.employeeLimit;    
          this.recordUserDetailModify();
        }
        this.updateAccount();
        document.getElementById("private").innerHTML = "編輯";
        document.getElementById("limit").setAttribute("disabled", true);
        // document.getElementById("limit").style.cssText = "border:none;";
        document.getElementById("password").setAttribute("readOnly", true);
        document.getElementById("password").style.cssText = "border:none;";
        this.editPrivateInfoBtn = false;
      } else {
        document.getElementById("private").innerHTML = "儲存";
        document.getElementById("limit").removeAttribute("disabled", false);
        // document.getElementById("limit").style.cssText = "border:none;";
        document.getElementById("password").removeAttribute("readOnly");
        document.getElementById("password").style.cssText = "border:1px solid;";
        this.editPrivateInfoBtn = true;
      }
    },
    recordUserDetailModify:function(change,oldInfo,newInfo){
      var userDetailModify = new Object();
      userDetailModify.modifyPerson = "";
      userDetailModify.employeeNumber = this.userAccountDetail.employeeNumber;
      userDetailModify.modifyInfo= change;
      userDetailModify.new= newInfo;
      userDetailModify.old= oldInfo;  
      userDetailModify.time =dateTime.recordDate() + " " + dateTime.recordTime();
      var loginData = JSON.parse(localStorage.getItem("token"));
      var userID = loginData.id;
      axios.get("https://hotelapi.im.nuk.edu.tw/api/account/" + userID)
        .then((response) => {
          userDetailModify.modifyPerson = response.data.employeeNumber;
          axios.put("https://hotelapi.im.nuk.edu.tw/api/history/" +this.company +"/" +this.record,userDetailModify)
          .then((responseRecord) => {
            console.log(responseRecord);
          })
          .catch((errorRecord) => {
            console.log(errorRecord);
          });
        })
        .catch((error) => {
          console.log(error);
        });
        console.log(userDetailModify);       
      }     
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src= '../assets/css/accountDetial.css'></style>
