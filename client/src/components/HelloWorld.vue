<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>Welcome_test2</h3>

    <div class="demo-wrapper">
      <div class="demo-container">
        <!-- <div id="svgMapGPD"></div> -->
      </div>
    </div>

    <button v-on:click="GDP()">GDP</button>
    <button v-on:click="record()">record</button>
    <button v-on:click="DateTime()">Time</button>
    <div class="upload">
      <input type="file" @click="previewImage" accept="image/*">
    </div>
    <div class="schedule" >
      <p>progress  {{uploadValue.toFixed()+"%"}}
      <progress :value="uploadValue" max="100" ></progress>
      </p>
    </div>
    <div class="view">
      <img class="preview" src="picture">
      <button @click="onUpload">Upload</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dateTime from "../assets/js/dateTime";
import firebase from 'firebase';
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App Welcome_test2",
      hotels: [],
      testData: 59501,
      historyData: [],
      logout: {
        employeeNumber: "info01",
        logoutTime: "2020/10/11",
      },
      imageData:null,
      picture:null,
      uploadValue:0
    };
  },

  mounted() {
    let self = this;
    axios
      .get("https://hotelapi.im.nuk.edu.tw/api/account")
      .then((response) => {
        self.hotels = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://hotelapi.im.nuk.edu.tw/api/history")
      .then((response) => {
        console.log(response);
        self.historyData = response;
        console.log(self.historyData.data[0].condition[0].employeeNumber);
        console.log(self.historyData.data[0].condition); //抓condition的所有資料
        console.log(self.historyData.data[0].condition.length); //抓某個標籤長度
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(this.logout);
  },
  methods: {
    record: function () {
      let record = "logout";
      axios
        .put(
          "https://hotelapi.im.nuk.edu.tw/api/history/" + record,
          this.logout
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    DateTime: function () {
      var date, Time;
      date = dateTime.recordDate();
      console.log(date);
      Time = dateTime.recordTime();
      console.log(Time);
    },
    previewImage(event){
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },
    onUpload(){
      this.picture = null;
      const storageRef = firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
      storageRef.on(`state_changed`,snapshot=>{
        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      },error=>{console.log(error.message)},
      ()=>{this.uploadValue = 100;
        storageRef.snapshot.ref.getDownloadURL().then((url)=> {
          this.picture = url ; 
        })
      }
      )
    }
  },
};
</script>

<style scoped>
img.preview{
  width: 200px;
}
</style>