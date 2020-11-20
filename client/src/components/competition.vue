<template>
  <div class="wholeArea">
    <div class="contentCenter">
      <div class="page hotel_name">
        <span>Hotel System</span>
      </div>
    </div>
    <div class="dataArea1">
      <div class="phone">
          <template>
            <span v-for="item in companyData" :key="item.id" >
                <template v-if="item.hotelName === companyName">
                    <p class="myHotel">我的飯店</p>
                    <div class="myCompany">
                      <router-link :to="{name: fn(item.hotelName), params: {collections: item.hotelName}}">
                      <div class="details">
                        <img :src="require(`../assets/icon/${item.hotelName}.jpg`)" style="width: 180px; height: 160px; object-fit: cover;"/>
                        <!-- <img src="`../assets/icon/${item.hotelName}.jpg`"/> -->
                        <div class="companyInfo">
                          <p class="name">{{item.hotelChineseName}}<span class='rank'>({{item.rank}})</span></p>
                          <div class="ratings">
                            <div class="empty_star">★★★★★</div>
                            <div class="full_star" :style="`width:${item.avg_rating/2*20}%;`">★★★★★</div>
                          </div>
                          <div class="mouth_info my_mouth_info">
                            <p class="pos">正評：{{item.labels.positive}}</p>
                            <p class="neg">負評：{{item.labels.negative}}</p>
                          </div>
                        </div>
                        <div class="clear"></div>
                      </div>
                      </router-link>
                      <div class="clear"></div>
                    </div>
                      <div class="clear"></div>
                </template>
                <template v-else-if="item.hotelName !== companyName">
                    <div class="eachCompany">
                      <!-- <div class="rank">{{item.rank}}</div> -->
                      <span v-if="item.favorite === true" class="favoriteArea">
                      <input type="checkbox" class="checkbox" :value="item.hotelName" v-model="favoriteList" @change="favoriteFn"/>
                        <span class="btn-box">
                          <span class="btn1"></span>
                        </span>
                      </span>
                      <span v-else-if="item.favorite === false" class="favoriteArea">
                      <!-- :name="[props.row.companyID]" :value="[props.row.companyID]"  -->
                      <input type="checkbox" class="checkbox" :name="item.hotelName" :value="item.hotelName" v-model="favoriteList" @change="favoriteFn($event)"/>
                        <span class="btn-box">
                          <span class="btn"></span>
                        </span>
                      </span>
                      <router-link :to="{name: fn(item.hotelName), params: {collections: item.hotelName}}">
                      <div class="details">
                        <img :src="require(`../assets/icon/${item.hotelName}.jpg`)" style="width: 200px; height: 160px;  object-fit: cover;"/>
                        <div class="companyInfo">

                          <p class="name">{{item.hotelChineseName}}<span class='rank'>({{item.rank}})</span></p>
                          <div class="ratings">
                            <div class="empty_star">★★★★★</div>
                            <div class="full_star" :style="`width:${item.avg_rating/2*20}%;`">★★★★★</div>
                          </div>
                          <div class="mouth_info">
                            <p class="pos">正評：{{item.labels.positive}}</p>
                            <p class="neg">負評：{{item.labels.negative}}</p>
                          </div>
                        </div>
                        <div class="clear"></div>
                      </div>
                      </router-link>
                    </div>
                </template>
            </span>    
          </template>
        </div>

        <!-- <template>
          <span>
            <vue-good-table
              ref="competitionTable"
              class="el-table"
              styleClass="vgt-table striped"
              :row-style-class="rowStyleClassFn"
              :rows="companyData"
              :columns="columns"
              @on-selected-rows-change="selectionChanged"
              :search-options="{ enabled: true }"
              :select-options="{ enabled: true , selectOnCheckboxOnly: true,}"
            >
              <template slot="table-row" slot-scope="props">
                <template v-if="props.column.field === 'favorite'">
                  <template>
                    <span v-if="props.row.favorite === true">
                       :value="[props.row.companyID]"
                      <input
                        type="checkbox"
                        class="checkbox"
                        :value="props.row.hotelName"
                        v-model="favoriteList"
                        @change="favoriteFn"
                      />
                      <span class="btn-box">
                        <span class="btn1"></span>
                      </span>
                    </span>
                    <span v-else-if="props.row.favorite === false">
                       :name="[props.row.companyID]" :value="[props.row.companyID]" 
                      <input
                        type="checkbox"
                        class="checkbox"
                        :name="props.row.hotelName"
                        :value="props.row.hotelName"
                        v-model="favoriteList"
                        @change="favoriteFn($event)"
                      />
                      <span class="btn-box">
                        <span class="btn"></span>
                      </span>
                    </span>
                  </template>
                </template>
                <template v-else-if="props.column.label === '公司名稱'">
                  <span v-if="props.row.hotelName === companyName">
                    <router-link
                      :to="{
                        name: 'commentList',
                        params: { collections: props.row.hotelName },
                      }"
                      >{{props.row.hotelName}}</router-link
                    >
                  </span>
                  <span v-else-if="props.row.hotelName !== companyName">
                    <router-link
                      :to="{
                        name: 'competitionCommentList',
                        params: { collections: props.row.hotelName },
                      }"
                      >{{props.row.hotelName}}</router-link
                    >
                  </span>
                  
                </template>
              </template>
            </vue-good-table>
          </span>
        </template> -->

      <div class="clear"></div>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
import axios from "axios";
import dateTime from "../assets/js/dateTime";
// import $ from "jquery";
import util from "../assets/js/utility";

export default {
  name: "competition",
  components: {
    // "vue-good-table": require("vue-good-table").VueGoodTable,
  },
  data() {
    return {
      networkDataReceivedAccount: false,
      networkDataReceivedCompany: false,
      columns: [
        {
          label: "收藏",
          field: "favorite"
        },
        {
          label: "公司名稱",
          field: "hotelName"
          // field: this.fieldFn,
          // html: true
        },
        {
          label: "分數",
          field: "avg_rating"
        }
        // {
        //   label: '排名',
        //   field: 'ranking'
        // }
      ],
      companyList: [
        {
          field: "GrandHotelTaipei",
          label: "台北圓山大飯店"
        },
        {
          field: "GrandHyattTaipei",
          label: "台北君悅酒店"
        },
        {
          field: "RegentTaipei",
          label: "台北晶華酒店"
        },
        {
          field: "W_Taipei",
          label: "台北W飯店"
        },
        {
          field: "RoyalNikkoTaipei",
          label: "台北老爺大酒店"
        },
        {
          field: "PalaisDeChineHotel",
          label: "君品酒店"
        },
        {
          field: "EasternPlazaHotelTaipei",
          label: "香格里拉台北遠東國際大飯店"
        },
        {
          field: "SheratonGrandTaipei",
          label: "台北喜來登大飯店"
        },
        {
          field: "OkuraPrestigeTaipei",
          label: "大倉久和大飯店"
        },
        {
          field: "GaiaHotelTaipei",
          label: "大地酒店"
        }
      ],
      companyName: '',
      employeeNumber: '',
      loginData: [],
      account: [],
      companyData: [],
      selectedArr: [],
      areas: "",
      areaChoosen: "",
      favoriteList: [],
      favoriteData: [],
      favoriteOpen: false,
      count: 0,
      favoriteModifytoHistory: {
        employeeNumber: '',
        modify: '',
        company: '',
        time: ''
      }
    };
  },
  mounted() {
    let self = this;
    var logining = localStorage.getItem("token");
    self.loginData = JSON.parse(logining);
    if (!self.companyName) {
      self.companyName = self.loginData.companyName
      self.employeeNumber = self.loginData.id
    }
    axios
      .get("https://hotelapi.im.nuk.edu.tw/api/account/" + self.loginData.id)
      .then((response) => {
        console.log('From web', response.data);
        self.networkDataReceivedAccount = true;
        self.account = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    if ("indexedDB" in window) {
      console.log("Reading indexedDB...");
      util.readAllData("account").then(function (data) {
        if (!self.networkDataReceivedAccount) {
          console.log("From cache", data);
          for (var i in data) {
            if (data[i]._id === self.loginData.id) {
              self.account = data[i];
              break;
            }
          }
        }
      });
    }

    axios
      .get("https://hotelapi.im.nuk.edu.tw/api/competition/" + self.companyName)
      .then((response) => {
        console.log('From web', response.data.data);
        self.networkDataReceivedCompany = true;
        self.companyData = response.data.data;
        self.companyData.forEach((item) => {
          self.companyList.filter((child) => {
            if(child.field === item.hotelName){
              item.hotelChineseName = child.label
            }
          })
        })
        // console.log(self.companyData)
        // self.$refs["commentdataTable"].forEach((item) => {
        //   if(item.hotelName === self.companyName){
        //     $('')
        //   }
        // })
        // self.selectedArr = self.companyData.data.filter((item) => {
        //   return item.hotelName !== self.companyName;
        // });
        // self.companyData = self.selectedArr;
        self.rating();
        self.favorite();
        self.favoriteList = self.account.favorite;
        // self.trrr();

        // self.fieldFn();
      });

    if ("indexedDB" in window) {
      console.log("Reading indexedDB...");
      util.readAllData("competition").then(function (data) {
        if (!self.networkDataReceivedCompany) {
          console.log("From cache", data);
          self.companyData = data;
          if (self.companyData !== undefined) {
            self.companyData.forEach((item) => {
              self.companyList.filter((child) => {
                if(child.field === item.hotelName){
                  item.hotelChineseName = child.label
                }
              })
            })
            self.rating();
            self.favorite();
            self.favoriteList = self.account.favorite;
          }
        }
      });
    }
  },
  methods: {
 
    fn: function(value){
      let self = this;
      if(self.companyName === value){
        return 'commentList'
      }else{
        return 'competitionCommentList'
      }
    },
    // fieldFn(){
    //   let self = this
    //   var x = ''
    //   // self.companyList.filter((item) => {
    //   //   if(item.field === rowObj.hotelName){
    //   //     x = item.label
    //   //   }
    //   // })
    //   // return x
    //   // return '<router-link :to="{name: ' + "'competitionCommentList'" + ', params: {collections:' + rowObj.hotelName + '}}">' + x + '</router-link>'
    // },
    rowStyleClassFn: function(row){
      let self = this;
      return row.hotelName === self.companyName ? 'selfCompany' : '';
    },
    // trrr: function(){
    //   var q = document.getElementsByClassName('selfCompany');
    //   q.item[0].style.backgroundColor = 'green'; 
    // },
    favorite: function () {
      let self = this;
      self.companyData.forEach((item) => {
        item["favorite"] = false;
      });
      self.companyData.forEach((item) => {
        self.account.favorite.filter((child) => {
          if (item.hotelName === child) {
            item["favorite"] = true;
          }
        });
      });
      self.companyData.sort(function (item) {
        return item.favorite ? -1 : 1;
      });
      self.companyData.sort(function(x,y){
        return x.hotelName === self.companyName ? -1 : y.hotelName === self.companyName ? 1:0
      })

      // var ele = document.getElementsByClassName('full_star')
      // var widthX = 
      // ele.css('width', )
    },
    favoriteFn: function ($event) {
      let self = this;
      self.companyData.forEach((item) => {
        if (item.hotelName === $event.target.value) {
          item["favorite"] = $event.target.checked;
          if($event.target.checked === true){
            self.favoriteModifytoHistory.modify = '加入'
          }else{
            self.favoriteModifytoHistory.modify = '取消'
          }
          self.favoriteModifytoHistory.company = item.hotelName
          self.account.favorite = self.favoriteList;
          axios
            .put(
              "https://hotelapi.im.nuk.edu.tw/api/account/" + self.loginData.id,
              self.account
            )
            .catch((err) => {
              console.log(err);
            });
          self.updateHistory()
        }
      });
      self.companyData.sort(function (item) {
        return item.favorite ? -1 : 1;
      });
      self.companyData.sort(function(x,y){
        return x.hotelName === self.companyName ? -1 : y.hotelName === self.companyName ? 1:0
      })
      // self.updateHistory()
    },
    rating: function () {
      let self = this;
      self.companyData.sort(function (a, b) {
        return b.avg_rating - a.avg_rating;
      });
      self.companyData.forEach((item, index) => {
        if(index+1 >3){
          item['rank'] = index +1 +'th'
        }else if(index+1 === 1){
          item['rank'] = index +1 +'st'
        }else if(index+1 === 2){
          item['rank'] = index +1 +'nd'
        }else if(index+1 === 3){
          item['rank'] = index +1 +'rd'
        }
      })
      self.companyData.sort(function(x,y){
        return x.hotelName === self.companyName ? -1 : y.hotelName === self.companyName ? 1:0
      })
    },
    updateHistory: function(){
      let self = this
      let record = 'favorite'
      self.favoriteModifytoHistory.employeeNumber = self.employeeNumber
      self.favoriteModifytoHistory.time = dateTime.recordDate() + " " + dateTime.recordTime();
      axios.put("https://hotelapi.im.nuk.edu.tw/api/history/" + self.companyName + '/' + record, self.favoriteModifytoHistory).then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    },
    selectionChanged() {},
  },
};
</script>
<style scoped src= '../assets/css/competition.css'></style>
<style scoped>
  .selfCompany{
    background-color:green;
  }

</style>
