<template>
  <div>
    <div class="contentCenter">
      <div class="page">
        <span>帳號詳細內容</span>
        <button id="logout_phone" @click="logout_phone()">登出</button>
      </div>
    </div>
    <div class="accountDetails_outsidediv">
    <span class="personalInfoLastLogin">上次登入時間：{{userAccountDetail.lastLoginDate}}</span>
    <div class="accountDetails">
      <div class="accountDetailsBG">     
        <ul class="pictureList">
          <li  class="photo_edit_phone">
            <div class="image-upload">
            <label for="file-input" class="edit_btn">
              <img src="../assets/icon/edit.png">
            </label>
            <input type="file" id="file-input" @change="previewImage" accept="image/png, image/jpeg" >
          </div>
          </li >
          <!-- <li><button class="edit_btn" ><img src="../assets/icon/edit.png"><input type="file"  accept="image/*" ></button></li> -->
          <li class="account_photo_phone"><img :src="picture" width="180px" alt=""></li>
        </ul>
        <ul class="DetailList">
          <li><span class="span_info">使用者編號</span><input type="text" readonly v-model="userAccountDetail.employeeNumber"></li>
          <li><span class="span_info">所屬部門</span><input type="text" readonly v-model="userAccountDetail.department" id="department"/><button class="edit_btn" @click="edit(0)"><img src="../assets/icon/edit.png"></button></li>
          <li><span class="span_info">使用者權限</span>
            <select v-model="userAccountDetail.employeeLimit" disabled  id="limit">
              <option>一般使用者</option>
              <option>主管使用者</option>
              <option>後台管理者</option>
            </select>
            <button class="edit_btn" @click="edit(4)"><img src="../assets/icon/edit.png"></button>
          </li>
          <li><span class="span_info">姓名</span><input type="text" readonly v-model="userAccountDetail.userName" id="userName"/><button class="edit_btn" @click="edit(1)"><img src="../assets/icon/edit.png"></button></li>
          <li><span class="span_info">信箱</span><input type="text" readonly v-model="userAccountDetail.email" id="email"/><button class="edit_btn" @click="edit(2)"><img src="../assets/icon/edit.png"></button></li>
          <li><span class="span_info">密碼</span>
            <input class="form-control"  type="password"  readonly="readonly"  v-model="userAccountDetail.password"  id="password"/>
            <span id="passwordIcon" v-on:click="changePassword" v-if="pass_type === 'password'"><font-awesome-icon icon="eye"/></span>
            <span id="passwordIcon" v-on:click="changePassword" v-else><font-awesome-icon icon="eye-slash"/></span>
            <button class="edit_btn" @click="edit(3)"><img src="../assets/icon/edit.png"></button>
          </li>
        </ul>
      </div>
    </div>
    <div class="btnBlock">
      <button id="saveInfo" v-on:click="confirm()">儲存</button>
      <button id="cancleInfo" v-on:click="cancleEditMode()">取消</button>   
    </div>
    <!-- <div class="pre_next">
      <button id="" v-on:click="findOther(0)">上一則</button>
      <button id="" v-on:click="findOther(1)">下一則</button>   
    </div> -->
    <!-- <button id="logout_phone" @click="logout_phone()">登出</button> -->
    </div>
    <button class="edit_phone" @click="edit1()"><img src="../assets/icon/edit.png"></button>

<!-- upload測試 -->
    <!-- <div class="upload">
      <input type="file"  accept="image/*" @change="previewImage">
    </div>
    <div class="schedule" >
      <p>progress  {{uploadValue.toFixed()+"%"}}
      <progress :value="uploadValue" max="100" ></progress>
      </p>
    </div>
    <div>
      <img :src="picture" alt="" class="preview">

      <button @click="previewImage">Upload</button>
    </div> -->
  </div>
</template>
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
        <a href="#"><img src="../assets/icon/icon-144x144.png" alt="" /></a>
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
  
<script>
import axios from "axios";
import $ from "jquery";
import dateTime from "../assets/js/dateTime";
import util from "../assets/js/utility";
import firebase from 'firebase/app';
import 'firebase/storage';

export default {
  name: "accountDetial",
  data() {
    return {
      userAccountDetail: {},
      networkDataReceived: false,
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
      blockarea: 0,
      next: 0,
      imageData:null,
      picture:null,
      uploadValue:0,
      reload:false,
      window_width: document.documentElement.clientWidth,
      logingID : "",
      logout: {
        employeeNumber: "",
        logoutTime: "",
      },
    };
  },
  mounted() {
    let self = this;
    var logining = localStorage.getItem("token");
    var loginData = JSON.parse(logining);
    var selfornot = loginData.id;
    this.logingID = loginData.id
    
    axios
      .get("https://hotelapi.im.nuk.edu.tw/api/account/" + self.userID)
      .then((response) => {
        console.log('From web', response.data);
        self.networkDataReceived = true;
        self.userAccountDetail = response.data;
        self.oldPassword = self.userAccountDetail.password;
        self.oldEmail = self.userAccountDetail.email;
        self.oldUserName = self.userAccountDetail.userName;
        self.oldEmployeeLimit = self.userAccountDetail.employeeLimit;
        self.oldDepartment = self.userAccountDetail.department;
        self.company = self.userAccountDetail.companyName;
        this.getUserPicture(self.userAccountDetail.picture);
      })
      .catch((error) => {
        console.log(error);
      });
      // const storageRef = firebase.storage().ref('cat1.png');
      // storageRef.getDownloadURL().then(function(url) {
      //   console.log("url:"+url);
      //   self.picture = url;
      // }).catch(function(error) {
      //   console.log(error);
      // });

      if ("indexedDB" in window) {
        console.log("Reading indexedDB...");
        util.readAllData("account").then(function (data) {
          if (!self.networkDataReceived) {
            console.log("From cache", data);
            for (var i in data) {
              if (data[i]._id === self.userID) {
                console.log('Match', data[i]);
                self.userAccountDetail = data[i];
                self.oldPassword = self.userAccountDetail.password;
                self.oldEmail = self.userAccountDetail.email;
                self.oldUserName = self.userAccountDetail.userName;
                self.oldEmployeeLimit = self.userAccountDetail.employeeLimit;
                self.oldDepartment = self.userAccountDetail.department;
                self.company = self.userAccountDetail.companyName;
                self.picture = self.userAccountDetail.picture;
                break;
              }
            }
          }
        });
      }
      var _this = this
      window.onresize = function () {
        _this.window_width = document.documentElement.clientWidth 
      }

      if(self.userID === selfornot && document.documentElement.clientWidth < 768){
        $('#logout_phone').css('display', 'block')
      }else{
        $('#logout_phone').css('display', 'none')
      }

  },
  watch: {
    'window_width': function (val) { 
      if(val > 768){
        this.columns = this.columns_computer;
        if(this.userID === this.logingID){
          $('#logout_phone').css('display', 'none')
        }
        
      }else{
        this.columns = this.columns_phone;
        if(this.userID === this.logingID){
          $('#logout_phone').css('display', 'block')
        }
      }
    }
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
          if(this.reload){
            this.reload = false;
            // console.log("reload");
            window.location.reload();
          }
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
    edit:function(value){
      if(value === 0){
        document.getElementById("department").removeAttribute("readOnly");
        document.getElementById("department").style.cssText = "cursor: auto; position: relative; z-index: 100; width: 185px; height: 20px; padding: 0.5%; border: 0.3px solid gray; border-radius: 3px;";
      }else if(value === 1){
        document.getElementById("userName").removeAttribute("readOnly");
        document.getElementById("userName").style.cssText = "cursor: auto; position: relative; z-index: 100; width: 185px; height: 20px; padding: 0.5%; border: 0.3px solid gray; border-radius: 3px;";
      }else if(value === 2){
        document.getElementById("email").removeAttribute("readOnly");
        document.getElementById("email").style.cssText = "cursor: auto; position: relative; z-index: 100; width: 185px; height: 20px; padding: 0.5%; border: 0.3px solid gray; border-radius: 3px;";
      }else if(value === 3){
        document.getElementById("password").removeAttribute("readOnly");
        document.getElementById("password").style.cssText = "cursor: auto; position: relative; z-index: 100; width: 185px; height: 20px; padding: 0.5%; border: 0.3px solid gray; border-radius: 3px;";
      }else if(value === 4){
        document.getElementById("limit").removeAttribute("disabled", false);
        document.getElementById("limit").style.cssText = "cursor: auto; position: relative; z-index: 100; width: 185px; height: 35px; padding: 0.5%; border: 0.3px solid gray; border-radius: 3px;";
      }
      document.getElementById("saveInfo").style.visibility = "visible";
      document.getElementById("cancleInfo").style.visibility = "visible";
    },
    edit1: function(){
        document.getElementById("department").removeAttribute("readOnly");  
        document.getElementById("department").style.cssText = "cursor: auto; position: relative; z-index: 100; width: 185px; height: 20px; padding: 0.5%; border: 0.3px solid gray; border-radius: 3px;";
        document.getElementById("userName").removeAttribute("readOnly");
        document.getElementById("userName").style.cssText = "cursor: auto; position: relative; z-index: 100; width: 185px; height: 20px; padding: 0.5%; border: 0.3px solid gray; border-radius: 3px;";
        document.getElementById("email").removeAttribute("readOnly");
        document.getElementById("email").style.cssText = "cursor: auto; position: relative; z-index: 100; width: 185px; height: 20px; padding: 0.5%; border: 0.3px solid gray; border-radius: 3px;";
         document.getElementById("password").removeAttribute("readOnly");
        document.getElementById("password").style.cssText = "cursor: auto; position: relative; z-index: 100; width: 185px; height: 20px; padding: 0.5%; border: 0.3px solid gray; border-radius: 3px;";
        document.getElementById("limit").removeAttribute("disabled", false);
        document.getElementById("limit").style.cssText = "cursor: auto; position: relative; z-index: 100; width: 185px; height: 35px; padding: 0.5%; border: 0.3px solid gray; border-radius: 3px;";
        document.getElementById("saveInfo").style.visibility = "visible";
        document.getElementById("cancleInfo").style.visibility = "visible";
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
      document.getElementById("department").style.cssText = "all: unset; width: 170px; position: relative; z-index: 100;";
      document.getElementById("userName").setAttribute("readOnly", true);
      document.getElementById("userName").style.cssText = "all: unset; width: 170px; position: relative; z-index: 100;";
      document.getElementById("email").setAttribute("readOnly", true);
      document.getElementById("email").style.cssText = "all: unset; width: 170px; position: relative; z-index: 100;";
      document.getElementById("limit").setAttribute("disabled", true);
      document.getElementById("limit").style.cssText = "  width: 170px; height: 35px;";
      document.getElementById("password").setAttribute("readOnly", true);
      document.getElementById("password").style.cssText = "all: unset; width: 170px; position: relative; z-index: 100;";
      document.getElementById("saveInfo").style.visibility = "hidden";
      document.getElementById("cancleInfo").style.visibility = "hidden";
    },
    cancleEditMode(){
      document.getElementById("department").setAttribute("readOnly", true);
      document.getElementById("department").style.cssText = "all: unset; width: 170px; position: relative; z-index: 100;";
      document.getElementById("userName").setAttribute("readOnly", true);
      document.getElementById("userName").style.cssText = "all: unset; width: 170px; position: relative; z-index: 100;";
      document.getElementById("email").setAttribute("readOnly", true);
      document.getElementById("email").style.cssText = "all: unset; width: 170px; position: relative; z-index: 100;";
      document.getElementById("limit").setAttribute("disabled", true);
      document.getElementById("limit").style.cssText = "  width: 170px; height: 35px;";
      document.getElementById("password").setAttribute("readOnly", true);
      document.getElementById("password").style.cssText = "all: unset; width: 170px; position: relative; z-index: 100;";
      document.getElementById("saveInfo").style.visibility = "hidden";
      document.getElementById("cancleInfo").style.visibility = "hidden";
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
    },
    previewImage(){
      //修改使用者圖片資料
      // this.userAccountDetail.picture = '004.png';
      // console.log(this.userAccountDetail);
      // this.updateAccount();

      var self = this;
      self.uploadValue = 0;
      self.imageData = event.target.files[0];
      console.log(event.target.files[0]);
      // var reader = new FileReader();
      // reader.readAsDataURL(event.target.files[0]);
      //picture的URL
      var pictureURL = URL.createObjectURL(event.target.files[0]);

      // this.$fire({
      //   title: 'Sweet!',
      //   text: 'Modal with a custom image.',
      //   imageUrl: pictureURL,
      //   imageWidth: 200,
      //   // imageHeight: 200,
      //   imageAlt: 'Custom image',
      // })
      this.$fire({
        title: '你確定要換成這張照片嗎?',
        // text: 'Modal with a custom image.',
        imageUrl: pictureURL,
        imageWidth: 200,
        // imageHeight: 200,
        imageAlt: 'Custom image',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定!!',
        cancelButtonText: "我再想想",
      }).then((result) => {
        console.log(result);
        if (result.value) {
          self.onUpload();
        }
      })
      // console.log(firebase.storage().ref('images/cat1.png'))
      
      // // var starsRef = storageRef.child('/cat1.png');
      // 抓圖片
      // const storageRef = firebase.storage().ref('小新.jpg');
      // storageRef.getDownloadURL().then(function(url) {
      //   console.log("url:"+url);
      //   self.picture = url;
      // }).catch(function(error) {
      //   console.log(error);
      // });
      //刪除
      // firebase.storage().ref('cat2.png').delete().then(function() {
      //   // File deleted successfully
      //   console.log("sucessful");
      // }).catch(function(error) {
      //   console.log(error);
      //   // Uh-oh, an error occurred!
      // });
    },
    onUpload(){
      // var self = this;
      var oldPicture = this.userAccountDetail.picture;
      this.recordUserDetailModify('更換圖片',oldPicture,this.imageData.name);
      this.picture = null;
      // console.log("uploading");
      // console.log(this.imageData);
      const storageRef = firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
      storageRef.on(`state_changed`, snapshot=>{
        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
      }, error => { console.log(error.message) },
      () => { 
        this.uploadValue = 100;
        storageRef.snapshot.ref.getDownloadURL().then((url)=> {
          console.log("url:"+url);
          this.picture = url ; 
          this.userAccountDetail.picture = this.imageData.name;
          this.reload = true;
          var loginData = JSON.parse(localStorage.getItem("token"));
          loginData.pictureUrl = url;
          localStorage.setItem(
          "token",
          JSON.stringify({
            id: loginData.id,
            employeeNumber:loginData.employeeNumber,
            time: loginData.time,
            companyName: loginData.companyName,
            limit:loginData.limit,
            pictureUrl:loginData.pictureUrl,
          })
          );
          this.deleteOldPicture(oldPicture);
        })
      });
      


    },
    getUserPicture(image){
      // 抓圖片
      var self = this;
      const storageRef = firebase.storage().ref(image);
      storageRef.getDownloadURL().then(function(url) {
        console.log("url:"+url);
        self.picture = url;
      }).catch(function(error) {
        console.log(error);
      });
    },
    deleteOldPicture(oldPicture){
      var self = this;
      if(oldPicture !== '004.png' || oldPicture.length!==0){
        firebase.storage().ref().child(oldPicture).delete().then(function() {
          console.log("sucessful");
          self.updateAccount();
        }).catch(function(error) {
          self.updateAccount();
          console.log(error);
        });
      }else{
        self.updateAccount();
      }
      
    },
    logout_phone(){
      localStorage.removeItem("token");
       this.logoutRecord();
      $("#accountManage").show();
      $("#statisticalResults").show();
      $("#statisticalResultsPhone").show();
      $("#accountManagePhone").show();
      document.getElementById("limitWord").innerHTML = " ";
      document.getElementById("menu").style.visibility = "hidden";
      $(".header").css('display', 'none');
      $(".contentTop").css('display', 'none');
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
    // findOther: function(value){
    //   let self = this
    //   if(value === 1){
    //     axios
    //       .get("https://hotelapi.im.nuk.edu.tw/api/account/" + self.userID + '/' + value)
    //       .then((response) => {
    //         console.log(response.data)
    //         self.userAccountDetail = response.data;
    //         self.oldPassword = self.userAccountDetail.password;
    //         self.oldEmail = self.userAccountDetail.email;
    //         self.oldUserName = self.userAccountDetail.userName;
    //         self.oldEmployeeLimit = self.userAccountDetail.employeeLimit;
    //         self.oldDepartment = self.userAccountDetail.department;
    //         self.company = self.userAccountDetail.companyName;
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //     }
    // },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src= '../assets/css/accountDetial.css'></style>
<style scoped>
img.preview{
  width: 200px;
}
</style>
