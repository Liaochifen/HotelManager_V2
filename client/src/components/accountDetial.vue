  <!-- <div> -->
    <!-- <div class="contentCenter">
      <div class="page">
        <span>帳號詳細內容</span>
      </div>
    </div> -->
    <!-- <button v-on:click="edit()" class="editPersonalInfo">編輯</button> -->
    <!-- <div class="clear"></div> -->
    <!-- <span class="personalInfoLastLogin">上次登入時間：{{userAccountDetail.lastLoginDate}}</span> -->
    <!-- <div class="detail">
      <div class="leftContent">
        <a href="#"><img src="https://fakeimg.pl/125x125/" alt="" /></a>
      </div>

      <div class="rightContent">
          <ul>
            <li>
              員工編號&nbsp;:&nbsp;<input
                type="text"
                readonly="readonly"
                v-model="userAccountDetail.employeeNumber"
                id="employeeNumber"
              />
            </li>
            <div class="clear"></div>
            <li>
              姓名&nbsp;:&nbsp;<input
                type="text"
                readonly="readonly"
                v-model="userAccountDetail.userName"
                id="userName"
              />
            </li>
            <div class="clear"></div>
            <li>
              所屬單位&nbsp;:&nbsp;
              <input type="text" readonly="readonly" v-model="userAccountDetail.department" id="department" />
            </li>
            <div class="clear"></div>
            <li>
              信箱&nbsp;:&nbsp;<input
                type="text"
                readonly="readonly"
                v-model="userAccountDetail.email"
                id="email"
              />
            </li>
            <div class="clear"></div>
            <li>
              權限&nbsp;:&nbsp;
              <select v-model="userAccountDetail.employeeLimit" disabled id="limit">
              <option>一般使用者</option>
              <option>主管使用者</option>
              <option>後台管理者</option>
            </select>
            </li>
            <div class="clear"></div>
         
             <li>
               
              密碼&nbsp;:&nbsp;<input
                class="form-control"
                type="password"
                readonly="readonly"
                v-model="userAccountDetail.password"
                id="password"
              />
              <span id="passwordIcon" v-on:click="changePassword" v-if="pass_type === 'password'"
                ><font-awesome-icon icon="eye"
              /></span>
              <span id="passwordIcon" v-on:click="changePassword" v-else
                ><font-awesome-icon icon="eye-slash"
              /></span>
            </li>
            <div class="clear"></div>
          </ul>
        <button id="saveInfo" v-on:click="confirm()">儲存</button>
      </div>
      <div class="clear"></div>
    </div> -->
  <!-- </div> -->
<template>
  <div>
    <div class="contentCenter">
      <div class="page">
        <span>帳號詳細內容</span>
      </div>
    </div>
    <!-- <span class="personalInfoLastLogin">上次登入時間：{{userAccountDetail.lastLoginDate}}</span> -->
    <div class="wrap">
      <div class="accountPersonalMenu">
        <ul>
          <li><button @click="accountPage(0)">個人資料</button></li>
          <li><button @click="accountPage(1)">修改密碼</button></li>
          <li><button @click="accountPage(2)">歷史記錄</button></li>
        </ul>
      </div>
      <div class="accountPersonalInfo">
        <div class="accountPersonalBG" v-if="blockarea === 0">
          <div class="accountInfoDetails">
            <p>員工編號</p>
            <input type="text" readonly v-model="userAccountDetail.employeeNumber" id="employeeNumber"/>
          </div>
          <div class="accountInfoDetails">
            <p>所屬單位</p>
            <input type="text" readonly v-model="userAccountDetail.department" id="department"/>
          </div>
          <div class="accountInfoDetails">
            <p>姓名</p>
            <input type="text" readonly v-model="userAccountDetail.userName" id="userName"/>
          </div>
          <div class="accountInfoDetails">
            <p>使用者權限</p>
            <!-- disabled -->
            <select v-model="userAccountDetail.employeeLimit"  id="limit">
              <option>一般使用者</option>
              <option>主管使用者</option>
              <option>後台管理者</option>
            </select>
          </div>
          <div class="clear"></div>
          <div class="accountInfoDetails">
            <p>信箱</p>
            <input type="text" readonly v-model="userAccountDetail.email" id="email"/>
          </div>
          <div class="accountInfoDetails pw">
            <p>密碼</p>
            <input class="form-control"  type="password"  readonly="readonly"  v-model="userAccountDetail.password"  id="password"/>
              <span id="passwordIcon" v-on:click="changePassword" v-if="pass_type === 'password'"><font-awesome-icon icon="eye"/></span>
              <span id="passwordIcon" v-on:click="changePassword" v-else><font-awesome-icon icon="eye-slash"/></span>
          </div>
          <!-- <button id="saveInfo" v-on:click="confirm()">儲存</button> -->
          <div class="clear"></div>
        </div>
      </div>
    </div>
    <!-- <div class="changePassword">
    </div> -->
    <!-- <div class="history">
    </div> -->
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
      pass_type: "password",
      oldPassword:"",
      oldEmail:"",
      oldUserName:"",
      oldEmployeeLimit:"",
      oldDepartment:"",
      checkPassword:"",
      company:"",
      record:"userDetailModify",
      blockarea: 0
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
    changePassword: function () {
      if (this.pass_type === "password") {
        $("input.form-control").attr("type", "text");
        this.pass_type = "text";
      } else {
        $("input.form-control").attr("type", "password");
        this.pass_type = "password";
      }
    },
    edit:function(){
      document.getElementById("department").removeAttribute("readOnly");
      document.getElementById("department").style.cssText ="border:#707070 solid 1px; background-color:#D3D0D0; border-radius: 8px;";
      document.getElementById("userName").removeAttribute("readOnly");
      document.getElementById("userName").style.cssText = "border:#707070 solid 1px;background-color:#D3D0D0;border-radius: 8px;";
      document.getElementById("email").removeAttribute("readOnly");
      document.getElementById("email").style.cssText = "border:#707070 solid 1px;background-color:#D3D0D0;border-radius: 8px;";
      document.getElementById("limit").removeAttribute("disabled", false);
      document.getElementById("limit").style.cssText = "border:#707070 solid 1px;background-color:#D3D0D0;border-radius: 8px;";
      document.getElementById("password").removeAttribute("readOnly");
      document.getElementById("password").style.cssText = "border:#707070 solid 1px;background-color:#D3D0D0;border-radius: 8px;";
      document.getElementById("saveInfo").style.visibility = "visible";
    },
    confirm:function(){
      
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
      if(this.oldEmail != this.userAccountDetail.email){
          var email = this.oldEmail;
          this.recordUserDetailModify('修改Email',email,this.userAccountDetail.email);
          this.oldEmail = this.userAccountDetail.email; 
      }
      if(this.oldEmployeeLimit != this.userAccountDetail.employeeLimit){
          var limit = this.oldEmployeeLimit;
          this.recordUserDetailModify('修改權限',limit,this.userAccountDetail.employeeLimit);
          this.oldEmployeeLimit = this.userAccountDetail.employeeLimit; 
      }
      this.updateAccount();
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
            var password = this.oldPassword;
            this.oldPassword = this.userAccountDetail.password;
            this.recordUserDetailModify('修改密碼',password,this.userAccountDetail.password);
            this.$fire({
              title: "Success !!",
              text: "成功修改密碼~",
              type: "success",
            }); 
            this.updateAccount();
          }else{
            //沒有驗證成功(ex點空白關掉alert)改回本來的密碼
            this.userAccountDetail.password = this.oldPassword;
            this.updateAccount();
            this.$fire({
              title: "Error !!",
              text: "密碼沒有修改成功!!!!",
              type: "error",
            });
          }
        });
        }
      document.getElementById("department").setAttribute("readOnly", true);
      document.getElementById("department").style.cssText = "border-bottom: #9A9A9A solid 1px;";
      document.getElementById("userName").setAttribute("readOnly", true);
      document.getElementById("userName").style.cssText = "border-bottom: #9A9A9A solid 1px;";
      document.getElementById("email").setAttribute("readOnly", true);
      document.getElementById("email").style.cssText = "border-bottom: #9A9A9A solid 1px;";
      document.getElementById("limit").setAttribute("disabled", true);
      document.getElementById("limit").style.cssText = "border-bottom: #9A9A9A solid 1px;";
      document.getElementById("password").setAttribute("readOnly", true);
      document.getElementById("password").style.cssText = "border-bottom: #9A9A9A solid 1px; ";
      document.getElementById("saveInfo").style.visibility = "hidden";
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
    },
    accountPage: function(value){
      this.blockarea = value
    } 
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src= '../assets/css/accountDetial.css'></style>
