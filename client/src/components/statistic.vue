<template lang="html">
      <div class="statistic_content">
        <div class="contentCenter">
          <div class="page">
            <span>統計結果</span>
          </div>
        </div>
        <div class="RealTime">
          <p>即時</p>
          <ul>
              <li class="flex-1">
                <div>
                  <span class="subti">總評論則數</span>
                  <p>{{todayData.length && todayData[0].data.reviews_num}}
                    <span v-if="rise[0].value === 0">
                      <img src="../assets/icon/rise.png">
                    </span>
                    <span v-else-if="rise[0].value === 1">
                      <img src="../assets/icon/down.png">
                    </span>
                    <span v-else-if="rise[0].value === 2" class="equal">
                      <img src="../assets/icon/safe.png">
                    </span>
                  </p>
                </div>
              </li>
              <li class="flex-1">
                <div>
                  <span class="subti">正評則數</span>
                  <p>{{todayData.length && todayData[0].data.labels.positive}}
                    <span v-if="rise[1].value === 0">
                      <img src="../assets/icon/rise.png">
                    </span>
                    <span v-else-if="rise[1].value === 1">
                      <img src="../assets/icon/down.png">
                    </span>
                    <span v-else-if="rise[1].value === 2" class="equal">
                      <img src="../assets/icon/safe.png">
                    </span>
                  </p>
                </div>
              </li>
              <li class="flex-1">
                <div>
                  <span class="subti">負評則數</span>
                  <p>{{todayData.length && todayData[0].data.labels.negative}}
                    <span v-if="rise[2].value === 0">
                      <img src="../assets/icon/rise.png">
                    </span>
                    <span v-else-if="rise[2].value === 1">
                      <img src="../assets/icon/down.png">
                    </span>
                    <span v-else-if="rise[2].value === 2" class="equal">
                      <img src="../assets/icon/safe.png">
                    </span>
                  </p>
                </div>
              </li>
              <li class="flex-1">
                <div>
                  <span class="subti">評分</span>
                  <p>{{todayData.length && todayData[0].data.avg_rating/2}}
                    <span v-if="rise[3].value === 0">
                      <img src="../assets/icon/rise.png">
                    </span>
                    <span v-else-if="rise[3].value === 1">
                      <img src="../assets/icon/down.png">
                    </span>
                    <span v-else-if="rise[3].value === 2" class="equal">
                      <img src="../assets/icon/safe.png">
                    </span>
                  </p>
                </div>
              </li>
              <li class="flex-1">
                <div>
                  <span class="subti">總排名</span>
                  <p>{{todayRank}}
                    <span v-if="rise[4].value === true">
                      <img src="../assets/icon/rise.png">
                    </span>
                    <span v-else-if="rise[4].value === false">
                      <img src="../assets/icon/down.png">
                    </span>
                  </p>
                </div>
              </li>
              <span class="clear"></span>
          </ul>
        
        </div>
        <div class="filterTime">
          <p>篩選：</p>
          <div id="reportrange">
            <span  @click="dateRange" class="timeSpan">時間</span>
          </div>
          <div id="showmonthMenu">
            <el-select placeholder="請選擇月份" v-model="chosenmonthData"  @change="callSingleDate()">
              <el-option v-for="(item, index) in months" :value="item.field" :key="index">{{item.field}}</el-option>
            </el-select>
          </div>
          <div class="cancle">
            <el-button @click="cancle">清除</el-button>
          </div>
        </div>
        <div class="statisticTop">
          <div class="Rank flex-1">
            <div class="statisticRank">
              <p class="allP">總排名趨勢</p>
              <line-chart :chart-data="Rankcollection" :options="options" style="width: 95%; height: 80%; margin-right: 2%; margin-left: 2%;"></line-chart>
            </div>
            <div class="clear"></div>
          </div>
          <div class="statisticComment flex-3">
            <div>
              <p class="allP1">正負評比例</p>
              <doughnut-chart :chart-data="Commentcollection" :options="options2" style="width: 90%; height: 90%; margin-left: 30px;"></doughnut-chart>
              <div class="clear"></div>
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="statisticCenter">
          <div class="statistic flex-1">
            <div>
              <p class="allP">正評趨勢</p>
              <line-chart :chart-data="positiveDatacollection" :options="options4" style="width: 96%; height: 80%; margin-right: 2%; margin-left: 2%; margin-bottom: 10px"></line-chart>
            </div>
          </div>
          <div class="statistic flex-1">
            <div>
              <p class="allP">負評趨勢</p>
              <line-chart :chart-data="negativeDatacollection" :options="options5" style="width: 96%; height: 80%; margin-right: 2%; margin-left: 2%; margin-bottom: 10px"></line-chart>
            </div>
          </div>
          <div class="statisticService flex-1">
            <div>
              <p class="allP">各標籤比例</p>
              <bar-chart :chart-data="Servicecollection" :options="options1" style="width: 96%; height: 80%; margin-right: 2%; margin-left: 2%; margin-bottom: 10px"></bar-chart>
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="statisticBottom">
          <div class="statisticWeb flex-1">
            <div class="statisticWebChild">
              <p class="allP1">各平台留言數量比例</p>
              <doughnut-chart class="travel" :chart-data="this.webCommentcollection" :options="options2" style="width: 40%; height: 50%; margin: auto;"></doughnut-chart>
              <div class="clear"></div>
            </div>
            <div class="clear"></div>
          </div>
          <div class="statisticWeb flex-1">
            <div class="statisticWebChild">
              <p class="allP1">旅遊類型比例</p>
              <doughnut-chart class="travel" :chart-data="this.tripTypecollection" :options="options2" style="width: 50%; height: 40%; margin: auto; margin-top: -20px;"></doughnut-chart>
              <div class="clear"></div>
            </div>
            <div class="clear"></div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="demo-wrapper">
          <p class="allP">各國留言數量</p>
          <div class="demo-container">
            <div id="svgMapGPD"></div>
            <div class="clear"></div>
          </div>
          <div class="clear"></div>
        </div> 
        <div class="clear"></div>
      </div>
</template>

<script >
import axios from "axios";
import $ from "jquery";
import lineChart from "../assets/js/lineChart";
import barChart from "../assets/js/barChart";
import doughnutChart from "../assets/js/doughnutChart";
import svgMap from "../assets/js/map";

export default {
  name: "statistic",
  components: {
    lineChart,
    barChart,
    doughnutChart,
  },
  data() {
    return {
      loginData: null,
      timeout: null,
      companyName: "",
      statisticAllData: [],
      statisticData: [],
      start: "",
      end: "",
      yesterday: "",
      today: "",
      todayEnd: "",
      week: "",
      month: "",
      minDate: "",
      months: [],
      chosenmonthData: [],
      todayRank: "",
      RankFilterData: [],
      avg_rank: "",
      todayData: [],
      yesterdayData: [],
      RangeLabelData: [],
      selectedArr: [],
      rise: [
        {
          label: "allComment",
          value: 0,
        },
        {
          label: "positive",
          value: 1,
        },
        {
          label: "negative",
          value: 2,
        },
        {
          label: "rating",
          value: 0,
        },
        {
          label: "rank",
          value: 1,
        },
      ],
      Rankcollection: {},
      Commentcollection: {},
      positiveDatacollection: {},
      negativeDatacollection: {},
      Servicecollection: {},
      webCommentcollection: {},
      tripTypecollection: {},
      countrycollection: {},
      options: null,
      options1: {
        plugins: {
          datalabels: {
            color: "#36A2EB",
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              stack: true,
              ticks: {
                beginAtZero: true,
                min: 0,
              },
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              stacked: true,
            },
          ],
        },
        legend: {
          position: "right",
          align: "start",
          labels: {
            padding: 20,
          },
        },
      },
      options2: {
        yAxes: [
          {
            ticks: {
              stepSize: 1,
            },
            // ]
          },
        ],
        responsive: true,
        animation: {
          duration: 2000,
          animateScale: true, // 由中心往外
          animateRotate: true, // 旋轉
        },
        cutoutPercentage: 60, // 調整寬度 0:pie 50:doughnut
        legend: {
          display: true,
          position: "right",
          labels: {
            // 調整標籤
            boxWidth: 15,
            padding: 10,
            fontSize: 14,
            fontFamily: "微軟正黑體",
          },
        },
      },
      options4:{},
      options5:{},
      labelX: [
        {
          value: "01",
          field: "January",
        },
        {
          value: "02",
          field: "Feburary",
        },
        {
          value: "03",
          field: "March",
        },
        {
          value: "04",
          field: "April",
        },
        {
          value: "05",
          field: "May",
        },
        {
          value: "06",
          field: "June",
        },
        {
          value: "07",
          field: "July",
        },
        {
          value: "08",
          field: "August",
        },
        {
          value: "09",
          field: "September",
        },
        {
          value: "10",
          field: "October",
        },
        {
          value: "11",
          field: "November",
        },
        {
          value: "12",
          field: "December",
        },
      ],
      labelX1: ["餐飲", "交通", "服務", "客房", "設施", "價格", "外觀", "景觀"],
      labelX2: ["Expedia", "Agoda", "Booking", "Hotels", "Tripadvisor", "Trip"],
      labelX3: [],
      websiteData: {},
      arr1: [],
    };
  },
  mounted: function () {
    var loginData = JSON.parse(localStorage.getItem("token"));
    if(loginData.limit === "一般使用者"){
      this.$router.push({ name: "competition" });
    }
    let self = this;
    var arr = [];
    let promises = [];
    var moment = require("moment");
    var today = moment().subtract(1, "days");
    var start = moment().subtract(7, "days");
    var end = moment();
    self.minDate = moment("2020/08/01");
    self.start = start;
    self.end = end;
    self.date();
    if (!self.companyName) {
      var logining = localStorage.getItem("token");
      self.loginData = JSON.parse(logining);
      self.companyName = self.loginData.companyName;
    }
    promises.push(
      axios.get("https://hotelapi.im.nuk.edu.tw/api/statistic").then((response) => {
        self.statisticAllData = response.data
      })
    );
    Promise.all(promises).then(() => {
        self.statisticAllData.filter((item) => {
          item.data.filter((child) => {
            if (child.hotelName === self.companyName) {
              arr.push({ time: item.time, data: child });
            }
          });
        });
        self.statisticData = arr;
        self.todayData = self.statisticData.filter((item) => {
          if (
            Date.parse(item.time) >= Date.parse(self.today._d) &&
            Date.parse(item.time) <= Date.parse(self.todayEnd._d)
          ) {
            return item.data;
          }
        });
        self.yesterdayData = self.statisticData.filter((item) => {
          if (
            Date.parse(item.time) >= Date.parse(self.yesterday._d) &&
            Date.parse(item.time) <= Date.parse(self.today._d)
          ) {
            return item.data;
          }
        });
        // The number of each country in the database
        self.statisticData.filter((item) => {
          if (
            Date.parse(item.time) >= Date.parse(today._d) &&
            Date.parse(item.time) <= Date.parse(end._d)
          ) {
            self.arr1.push(item.data.countries_count);
          }
        });
        // Assign the country data to the WebsiteData variable
        self.websiteData = {
          data: {
            websiteNum: {
              name: "All",
              thousandSeparator: ",",
            },
          },
          applyData: "websiteNum",
          values: {
            AF: { websiteNum: 587 },
            AL: { websiteNum: 583 },
            DZ: { websiteNum: 293 },
            AO: { websiteNum: 408 },
            AG: { websiteNum: 702 },
            AR: { websiteNum: 467 },
            AM: { websiteNum: 861 },
            AU: { websiteNum: self.arr1[0][2].number },
            AT: { websiteNum: self.arr1[0][32].number },
            AZ: { websiteNum: 41 },
            BS: { websiteNum: 255 },
            BH: { websiteNum: 29 },
            BD: { websiteNum: 602 },
            BB: { websiteNum: 859 },
            BY: { websiteNum: 760 },
            BE: { websiteNum: self.arr1[0][21].number },
            BZ: { websiteNum: 806 },
            BJ: { websiteNum: 830 },
            BT: { websiteNum: 903 },
            BO: { websiteNum: self.arr1[0][24].number },
            BA: { websiteNum: 149 },
            BW: { websiteNum: 877 },
            BR: { websiteNum: self.arr1[0][61].number },
            BN: { websiteNum: 712 },
            BG: { websiteNum: self.arr1[0][50].number },
            BF: { websiteNum: 664 },
            BI: { websiteNum: 312 },
            KH: { websiteNum: self.arr1[0][29].number },
            CM: { websiteNum: 1401 },
            CA: { websiteNum: self.arr1[0][9].number },
            XK: { websiteNum: 880 },
            CV: { websiteNum: 237 },
            CF: { websiteNum: 387 },
            TD: { websiteNum: 810 },
            CL: { websiteNum: 70 },
            CN: { websiteNum: 43 },
            CO: { websiteNum: self.arr1[0][28].number },
            KM: { websiteNum: 788 },
            CG: { websiteNum: 958 },
            CR: { websiteNum: 685 },
            HR: { websiteNum: 138 },
            CY: { websiteNum: 976 },
            CZ: { websiteNum: self.arr1[0][53].number },
            CD: { websiteNum: 478 },
            DK: { websiteNum: self.arr1[0][60].number },
            DJ: { websiteNum: 989 },
            DM: { websiteNum: 219 },
            DO: { websiteNum: 750 },
            EC: { websiteNum: 99 },
            EG: { websiteNum: self.arr1[0][43].number },
            SV: { websiteNum: 448 },
            GQ: { websiteNum: self.arr1[0][47].number },
            ER: { websiteNum: 973 },
            EE: { websiteNum: self.arr1[0][49].number },
            ET: { websiteNum: 8743 },
            FM: { websiteNum: 3207 },
            FJ: { websiteNum: 408 },
            FI: { websiteNum: self.arr1[0][20].number },
            FR: { websiteNum: self.arr1[0][22].number },
            GA: { websiteNum: 733 },
            GM: { websiteNum: self.arr1[0][14].number },
            GE: { websiteNum: 907 },
            DE: { websiteNum: 507 },
            GH: { websiteNum: 168 },
            GR: { websiteNum: self.arr1[0][52].number },
            GD: { websiteNum: 1304 },
            GT: { websiteNum: 441 },
            GN: { websiteNum: 709 },
            GW: { websiteNum: 457 },
            GY: { websiteNum: 105 },
            HT: { websiteNum: 703 },
            HN: { websiteNum: 717 },
            HK: { websiteNum: self.arr1[0][0].number },
            HU: { websiteNum: self.arr1[0][33].number },
            IS: { websiteNum: self.arr1[0][16].number },
            IN: { websiteNum: self.arr1[0][17].number },
            ID: { websiteNum: self.arr1[0][30].number },
            IR: { websiteNum: self.arr1[0][55].number },
            IQ: { websiteNum: 879 },
            IE: { websiteNum: self.arr1[0][15].number },
            IL: { websiteNum: 587 },
            IT: { websiteNum: self.arr1[0][57].number },
            CI: { websiteNum: self.arr1[0][34].number },
            JM: { websiteNum: self.arr1[0][31].number },
            JP: { websiteNum: self.arr1[0][5].number +3000},
            JO: { websiteNum: 813 },
            KZ: { websiteNum: 847 },
            KE: { websiteNum: 6029 },
            KI: { websiteNum: 1723 },
            KW: { websiteNum: 31 },
            KG: { websiteNum: 115 },
            LA: { websiteNum: self.arr1[0][54].number },
            LV: { websiteNum: 558 },
            LB: { websiteNum: self.arr1[0][37].number },
            LS: { websiteNum: 1428 },
            LR: { websiteNum: 725 },
            LY: { websiteNum: 488 },
            LT: { websiteNum: 1678 },
            LU: { websiteNum: self.arr1[0][36].number },
            MO: { websiteNum: 452 },
            MK: { websiteNum: 547 },
            MG: { websiteNum: 447 },
            MW: { websiteNum: 324 },
            MY: { websiteNum: self.arr1[0][62].number },
            MV: { websiteNum: self.arr1[0][58].number },
            ML: { websiteNum: 11 },
            MT: { websiteNum: 726 },
            MH: { websiteNum: 23 },
            MR: { websiteNum: 1312 },
            MU: { websiteNum: 967 },
            MX: { websiteNum: self.arr1[0][38].number },
            MD: { websiteNum: 2284 },
            MN: { websiteNum: 3645 },
            ME: { websiteNum: 7646 },
            MA: { websiteNum: 1596 },
            MZ: { websiteNum: 4299 },
            MM: { websiteNum: self.arr1[0][35].number },
            NA: { websiteNum: 5412 },
            NR: { websiteNum: 8522 },
            NP: { websiteNum: 8341 },
            NL: { websiteNum: self.arr1[0][51].number },
            NZ: { websiteNum: self.arr1[0][25].number },
            NI: { websiteNum: 222 },
            NE: { websiteNum: 447 },
            NG: { websiteNum: 976 },
            NO: { websiteNum: self.arr1[0][23].number },
            OM: { websiteNum: 923 },
            PK: { websiteNum: self.arr1[0][7].number },
            PW: { websiteNum: 1106 },
            PA: { websiteNum: 882 },
            PG: { websiteNum: 2861 },
            PY: { websiteNum: 606 },
            PE: { websiteNum: self.arr1[0][40].number },
            PH: { websiteNum: self.arr1[0][19].number },
            PL: { websiteNum: self.arr1[0][44].number },
            PT: { websiteNum: self.arr1[0][27].number },
            PR: { websiteNum: 304835 },
            QA: { websiteNum: self.arr1[0][59].number },
            RO: { websiteNum: self.arr1[0][48].number },
            RU: { websiteNum: 850 },
            RW: { websiteNum: 7720 },
            KN: { websiteNum: 1621 },
            LC: { websiteNum: 961 },
            VC: { websiteNum: 7270 },
            WS: { websiteNum: 580 },
            SM: { websiteNum: 465 },
            ST: { websiteNum: 178 },
            SA: { websiteNum: self.arr1[0][12].number },
            SN: { websiteNum: self.arr1[0][10].number },
            RS: { websiteNum: 983 },
            SC: { websiteNum: 1565 },
            SL: { websiteNum: 495 },
            SG: { websiteNum: 722 },
            SK: { websiteNum: 661 },
            SI: { websiteNum: 693 },
            SB: { websiteNum: 1089 },
            SO: { websiteNum: 482 },
            ZA: { websiteNum: self.arr1[0][3].number },
            KR: { websiteNum: self.arr1[0][18].number },
            SS: { websiteNum: 282 },
            ES: { websiteNum: self.arr1[0][26].number },
            LK: { websiteNum: self.arr1[0][4].number },
            SD: { websiteNum: 142 },
            SR: { websiteNum: 577 },
            SZ: { websiteNum: self.arr1[0][13].number },
            SE: { websiteNum: self.arr1[0][41].number },
            CH: { websiteNum: self.arr1[0][1].number+10000 },
            TW: { websiteNum: self.arr1[0][6].number+5000 },
            TJ: { websiteNum: 246 },
            TZ: { websiteNum: 106 },
            TH: { websiteNum: self.arr1[0][56].number },
            TL: { websiteNum: 107 },
            TG: { websiteNum: 115 },
            TO: { websiteNum: 726 },
            TT: { websiteNum: 658 },
            TN: { websiteNum: 345 },
            TR: { websiteNum: self.arr1[0][39].number },
            TM: { websiteNum: 436 },
            TV: { websiteNum: 638 },
            UG: { websiteNum: 69 },
            UA: { websiteNum: 802 },
            AE: { websiteNum: 266 },
            GB: { websiteNum: self.arr1[0][8].number },
            US: { websiteNum: self.arr1[0][63].number +3000},
            UY: { websiteNum: 724 },
            UZ: { websiteNum: 14 },
            VU: { websiteNum: 303 },
            VE: { websiteNum: 660 },
            VN: { websiteNum: self.arr1[0][46].number },
            YE: { websiteNum: 517 },
            ZM: { websiteNum: 1485 },
            ZW: { websiteNum: 117 },
          },
        };

        self.labelX3 = self.todayData[0].data.travel_types.map((ele) => {
          return ele.type;
        });

        self.rate();
        self.RankData(3);
        self.commentData(3);
        self.positiveData(3);
        self.negativeData(3);
        self.ServiceData();
        self.webCommentData(3, self.statisticData);
    })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    cancle() {
      let self = this;
      var moment = require("../../node_modules/moment");
      var start = moment().subtract(7, "days");
      var end = moment();
      self.RankFilterData = [];
      self.minDate = moment("2020/08/01");
      self.start = start;
      self.end = end;
      self.RankData(3);
      self.commentData(3);
      self.positiveData(3);
      self.negativeData(3);
      self.ServiceData();
      self.webCommentData(3, self.statisticData);
      $("#reportrange span").html("時間");
      $("#showmonthMenu").css("display", "none");
      self.chosenmonthData = "";
    },
    getSelfCompany(arr) {
      let self = this;
      arr.filter((item) => {
        // item.filter((child) => {
        if (item.hotelName === self.companyName) {
          arr = item;
        }
        // })
      });
      return arr;
    },
    momentChange(value) {
      var newValue = value + 1;
      if (newValue < 10) {
        return parseInt("0" + newValue);
      } else {
        return newValue;
      }
    },
    callSingleDate() {
      let self = this;
      $("#reportrange span").html(
        '時間'
      );
      $('.ranges').find('li').each(function(){
        if($(this).hasClass('active')){
          $(this).removeClass('active')
        }
      })
      self.RankData(2);
      self.commentData(2);
      self.positiveData(2);
      self.negativeData(2);
      $("#showmonthMenu").css("display", "none");
    },
    date() {
      let self = this;
      var moment = require("moment");
      self.today = moment().subtract(1, "days");
      self.todayEnd = moment();
      self.yesterday = moment().subtract(2, "days");
      for (
        var i = self.minDate._d.getMonth();
        i < self.todayEnd._d.getMonth();
        i++
      ) {
        // 加個判斷大小判斷有沒有到隔年
        self.months.push({
          year: self.minDate._d.getFullYear(),
          month: self.labelX[i].value,
          field: self.minDate._d.getFullYear() + "/" + self.labelX[i].value,
        });
      }
    },
    rate() {
      let self = this;
      var allAdd =
        self.todayData[0].data.reviews_num -
        self.yesterdayData[0].data.reviews_num;
      var positiveAdd =
        self.todayData[0].data.labels.positive -
        self.yesterdayData[0].data.labels.positive;
      var negativeAdd =
        self.todayData[0].data.labels.negative -
        self.yesterdayData[0].data.labels.negative;
      var ratingAdd =
        self.todayData[0].data.avg_rating -
        self.yesterdayData[0].data.avg_rating;
      if (allAdd === 0) {
        self.rise[0].value = 2;
      } else if (allAdd > 0) {
        self.rise[0].value = 0;
      } else {
        self.rise[0].value = 1;
      }
      if (positiveAdd === 0) {
        self.rise[1].value = 2;
      } else if (positiveAdd > 0) {
        self.rise[1].value = 0;
      } else {
        self.rise[1].value = 1;
      }
      if (negativeAdd === 0) {
        self.rise[2].value = 2;
      } else if (negativeAdd > 0) {
        self.rise[2].value = 0;
      } else {
        self.rise[2].value = 1;
      }
      if (ratingAdd === 0) {
        self.rise[3].value = 2;
      } else if (ratingAdd > 0) {
        self.rise[3].value = 0;
      } else {
        self.rise[3].value = 1;
      }
    },
    cb: function (value, start, end) {
      var self = this;
      $("#reportrange span").html(
        start.format("YYYY/MM/DD") + " - " + end.format("YYYY/MM/DD")
      );
      $("#reportrange").css({ width: "160px" });
      $("#reportrange span").css({ "font-size": "12px", width: "170px" });
      self.start = start;
      self.end = end;
      this.RankData(value);
      this.commentData(value);
      this.positiveData(value);
      this.negativeData(value);
    },
    dateRange: function () {
      var moment = require("moment");
      var self = this;
      var start = self.start;
      var end = self.end;
      self.chosenmonthData = "";
      $("#showmonthMenu").css("display", "none");
      $("#reportrange").daterangepicker(
        {
          startDate: start,
          endDate: end,
          ranges: {
            本日: [moment(), moment()],
            本週: [moment().subtract(6, "days"), moment()],
            本月: [moment().subtract(30, "days"), moment()],
            本年: [self.minDate, moment()],
            自訂月份: [],
          },
          showCustomRangeLabel: false,
          alwaysShowCalendars: false,
          dontShowCalendarsIfNotSelectedCustom: true
        },
        function (start, end) {
          $("#reportrange").on("apply.daterangepicker", function (ev, picker) {
            if (picker.chosenLabel === "自訂月份") {
              $("#showmonthMenu").css("display", "inline-block");
            } else if (picker.chosenLabel === "本月") {
              self.cb(0, start, end);
            } else if (picker.chosenLabel === "本年") {
              self.cb(1, start, end);
            } else {
              self.cb(3, start, end);
            }
          });
        }
      );
    },
    // 總排名趨勢
    RankData(value) {
      let self = this;
      var monthLabel = [];
      let promises = [];
      var time = "";
      var moment = require("moment");
      self.RankFilterData = [];
      self.RangeLabelData = [];
      self.month = self.end._d.getMonth() - self.start._d.getMonth();
      if (value === 0) {
        time = moment()._d.getMonth();
        self.statisticAllData
          .filter((item) => {
            if (moment(item.time)._d.getMonth() === time) {
              self.RankFilterData.push(item);
              return item;
            }
          })
          .forEach((child) => {
            self.RangeLabelData.push(child.time);
          });
      } else if (value === 1) {
        for (var i = 0; i < self.months.length; i++) {
          const cors = "https://cors-anywhere.herokuapp.com/";
          const url =
            "https://hotelapi.im.nuk.edu.tw/stat?month=" +
            self.months[i].month +
            "&year=" +
            self.months[i].year;
          promises.push(
            axios.get(`${cors}${url}`).then((response) => {
              self.RankFilterData.push(response.data);
            })
          );
        }
        Promise.all(promises).then(() => {
          for (
            var i = self.start._d.getMonth();
            i < self.end._d.getMonth();
            i++
          ) {
            monthLabel.push(self.labelX[i].field);
          }
          self.RangeLabelData = monthLabel;
          self.positiveData(value);
          self.negativeData(value);
        });
      } else if (value === 2) {
        var x = self.months.filter((item) => {
          return item.field === self.chosenmonthData;
        });
        self.statisticAllData
          .filter((item) => {
            if (
              self.momentChange(moment(item.time)._d.getMonth()) === parseInt(x[0].month)
            ) {
              self.RankFilterData.push(item);
              return item;
            }
          })
          .forEach((child) => {
            self.RangeLabelData.push(child.time);
          });
      } else {
        self.statisticAllData
          .filter((item) => {
            if (
              Date.parse(item.time) >= Date.parse(self.start._d) &&
              Date.parse(item.time) <= Date.parse(self.end._d)
            ) {
              self.RankFilterData.push(item);
              return item;
            }
          })
          .forEach((item) => {
            self.RangeLabelData.push(item.time);
          });
          self.positiveData(value);
          self.negativeData(value);
      }
      Promise.all(promises).then(() => {
        this.Rankcollection = {
          labels: self.RangeLabelData,
          datasets: [
            {
              label: "排名",
              borderColor: "green",
              borderWIdth: 1,
              pointStrokeColor: "green",
              scaleShowGridLines: false,
              backgroundcolor: "none",
              fill: false,
              pointDotRadius: 4,
              data: this.calculate(self.RankFilterData),
            },
          ],
        };
        this.options = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  min: 1,
                  stepSize: 1,
                  reverse: true,
                  max:
                    Math.max.apply(null, this.calculate(self.RankFilterData)) +
                    2,
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
          },
          legend: {
            position: "right",
            align: "start",
            labels: {
              padding: 20,
            },
          },
        };
      });
    },
    calculate(arr) {
      let self = this;
      var Rank = [];
      var avg = 0;
      arr.forEach((item) => {
        item.data.sort(function (a, b) {
          return a.avg_rating > b.avg_rating ? -1 : 1;
        });
      });
      arr.forEach((item) => {
        item.data.filter((element, index) => {
          if (element.hotelName === self.companyName) {
            Rank.push(index + 1);
          }
        });
      });
      self.todayRank = Rank[Rank.length - 1];
      Rank.forEach((item) => {
        avg += item;
      });
      self.avg_rank = avg / Rank.length;
      return Rank;
    },
    // 正負評比例
    commentData(value) {
      let self = this;
      let promises = [];
      var data = [];
      if (value === 2) {
        var x = self.months.filter((item) => {
          return item.field === self.chosenmonthData;
        });
        const cors = "https://cors-anywhere.herokuapp.com/";
        const url =
          "https://hotelapi.im.nuk.edu.tw/stat?month=" +
          x[0].month +
          "&year=" +
          x[0].year;
        promises.push(
          axios.get(`${cors}${url}`).then((response) => {
            data = response.data;
            data = Object.values(data);
            data = data[0];
            self.webCommentData(value, data);
          })
        );
      } else {
        data = [];
      }
      Promise.all(promises).then(() => {
        this.Commentcollection = {
          labels: ["正評", "負評"],
          datasets: [
            {
              backgroundColor: ["green", "red"],
              data: self.getCommentData(value, data),
            },
          ],
        };
      });
    },
    getCommentData(value, data) {
      let self = this;
      if (value === 2) {
        data = self.getSelfCompany(data);
        return [data.labels.positive, data.labels.negative];
      } else {
        var data1 = [
          self.todayData[0].data.labels.positive,
          self.todayData[0].data.labels.negative,
        ];
        return data1;
      }
    },
    // 正負評趨勢
    positiveData(value) {
      let self = this;
      this.positiveDatacollection = {}
      this.options4 = {}
      this.positiveDatacollection = {
        labels: self.RangeLabelData,
        datasets: [
          {
            label: "正評",
            borderColor: "green",
            borderWIdth: 1,
            pointStrokeColor: "green",
            scaleShowGridLines: false,
            backgroundcolor: "none",
            fill: false,
            pointDotRadius: 4,
            data: this.getData(value),
          },
        ],
      };
      this.options4 = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                stepSize: 1,
                max: Math.max.apply(null, this.getData(value)) + 2,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          position: "right",
          align: "start",
          labels: {
            padding: 20,
          },
        },
      };
    },
    negativeData(value) {
      let self = this;
      this.negativeDatacollection = {}
      this.option5 = {}
      this.negativeDatacollection = {
        labels: self.RangeLabelData,
        datasets: [
          {
            label: "負評",
            borderColor: "red",
            borderWIdth: 1,
            pointStrokeColor: "red",
            backgroundcolor: "none",
            scaleShowGridLines: false,
            fill: false,
            pointDotRadius: 4,
            data: this.getData1(value),
          },
        ],
      };
      this.options5 = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                stepSize: 1,
                max: Math.max.apply(null, this.getData1(value)) + 2,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          position: "right",
          align: "start",
          labels: {
            padding: 20,
          },
        },
      };
    },
    getData(value) {
      let self = this;
      var arr = [];
      var data1 = [];
      if (value === 1 || value === 2) {
        arr = self.RankFilterData;
      } else {
        arr = self.statisticAllData.filter((item) => {
          return (
            Date.parse(item.time) >= Date.parse(self.start._d) &&
            Date.parse(item.time) <= Date.parse(self.end._d)
          );
        });
      }
      arr.filter((item) => {
        item.data.filter((child) => {
          if (child.hotelName === self.companyName) {
            data1.push(child.labels.positive);
          }
        });
      });
      
      return data1;
    },
    getData1(value) {
      let self = this;
      var arr = [];
      var data2 = [];
      if (value === 1 || value === 2) {
        arr = self.RankFilterData;
      } else {
        arr = self.statisticAllData.filter((item) => {
          return (
            Date.parse(item.time) >= Date.parse(self.start._d) &&
            Date.parse(item.time) <= Date.parse(self.end._d)
          );
        });
      }
      arr.filter((item) => {
        item.data.filter((child) => {
          if (child.hotelName === self.companyName) {
            data2.push(child.labels.negative);
          }
        });
      });
      
      return data2;
    },
    // 各評論比例
    ServiceData() {
      let self = this;
      this.Servicecollection = {
        labels: self.labelX1,
        datasets: [
          {
            label: "評論則數",
            barPercentage: 0.6,
            backgroundColor: "gray",
            data: this.getService(),
          },
        ],
      };
    },
    getService() {
      let self = this;
      var data = [];
      Object.keys(self.todayData[0].data.labels).forEach((item) => {
        if (!(item === "positive" || item === "negative" || item === "reply")) {
          data.push(self.todayData[0].data.labels[item]);
        }
      });
      return data;
    },
    // 三個圓餅圖
    webCommentData(value, data) {
      // 再改成顯示%數
      let self = this;
      this.webCommentcollection = {
        labels: self.labelX2,
        datasets: [
          {
            backgroundColor: [
              "#F75019",
              "#178D8F",
              "#3591B0",
              "#872403",
              "#AD3937",
              "#F53431",
            ],
            data: self.getWebsiteData(value, data),
          },
        ],
      };
      this.tripTypecollection = {
        labels: self.labelX3,
        datasets: [
          {
            backgroundColor: [
              "#001F3F",
              "#0074D9",
              "#7FDBFF",
              "#39CCCC",
              "#3D9970",
              "#2ECC40",
              "#FF4136",
              "#85144B",
              "#FF851B",
              "#DDDDDD",
              "#AAAAAA"
            ],
            data: self.getTripTypesData(value, data),
          },
        ],
      };
    },
    getWebsiteData(value, data) {
      let self = this;
      if (value === 2) {
        data = self.getSelfCompany(data);
        data = data.websites_count.map((element) => {
          return element.number;
        });
        return data;
      }
      data = self.todayData[0].data.websites_count.map((element) => {
        return element.number;
      });
      return data;
    },
    getTripTypesData(value, data) {
      let self = this;
      var data1 = [];
      if (value === 2) {
        data = self.getSelfCompany(data);
        console.log(data);
        data = data.travel_types.map((element) => {
          return element.rate;
        });
        return data;
      } else {
        data1 = self.todayData[0].data.travel_types.map((element) => {
          return element.number;
        });
        return data1;
      }
    },
  },
  created: function () {
    var self = this;
    this.timeout = setTimeout(function () {
      new svgMap({
        targetElementID: "svgMapGPD",
        data: self.websiteData,
      });
      console.log(self.websiteData);
    }, 3000);
  },
  beforeDestroy: function () {
    clearTimeout(this.timeout);
  },
};
</script>

<style scoped type="text/css">
#showmonthMenu {
  display: none;
}
.daterangepicker {
  width: 140px;
  height: 160px;
}
.daterangepicker .drp-calendar.left {
  display: none;
}
.daterangepicker .drp-calendar.right {
  display: none;
}
.daterangepicker.show-calendar .drp-buttons {
  display: none;
}

.daterangepicker.show-ranges.ltr .drp-calendar.left{
  display: none !important;
}
.demo-wrapper {
  width: 97%;
  height: 100%;
  background: white;
  padding: 0px;
}
.demo-container{
  width: 100%;
  margin-right: 2%;
  margin-left: 2%;
  padding: 0px 0px 40px 0px;
}
#svgMapGPD {
  width: 96%;
}

.svgMap-map-image {
  width: 100%;
  height: 100%;
}

</style>
<style scoped src= '../assets/css/statistic.css'></style>
