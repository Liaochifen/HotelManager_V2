<template>
  <div>
    <div class="contentCenter">
      <div class="page">
        <span>評論列表</span>
      </div>
      <div class="buttonFunArea">
        <button class="editButton" @click="openFilter()" id="comment_filter_phone">
          <img src="../assets/icon/filter.png"/>
        </button>
        <button @click="clearALL()" class="clearall">全部清除</button>
      </div>
    </div>
        <div class="MultiFilterArea">
        <div slot="table-actions" class="slot_div">
          <template>
            <el-select v-model="typeChoosen"  placeholder="選擇評論類型"  @change="handleCheckedChange()" class="custom_el_select">
              <el-option value="全選">全選</el-option>
              <el-option v-for="child in types"  :key="child.value"  :value="child.field"></el-option>
            </el-select>
          </template>
        </div>
        <!-- <div slot="table-actions" class="slot_div">
            <el-select v-model="conditionChoosen"  placeholder="選擇評論處理狀態" class="custom_el_select" @change="handleCheckedChange(1)">
              <el-option value="全選">全選</el-option>
              <el-option v-for="child in conditions"  :key="child.value"  :value="child.field" ></el-option>
            </el-select>
        </div> -->
        <!-- <div slot="table-actions" class="slot_div">
            <el-select v-model="replyChoosen"  placeholder="選擇評論回覆狀態"  @change="handleCheckedChange(2)" class="custom_el_select">
              <el-option value="全選">全選</el-option>
              <el-option v-for="child in reply"  :key="child.value"  :value="child.field"></el-option>
            </el-select>
        </div> -->
        <div slot="table-actions" class="slot_div">
          <div
            id="reportrange"
            style="
              background: #fff;
              cursor: pointer;
              padding: 5px 10px;
              border: 1px solid #dcdfe6;
            "
          >
            <span @click="dateRange" class="timeSpan"
              >時間
            </span>
          </div>
        </div>
        <div slot="table-actions" class="slot_div score_div">
          <p class="filterTitle">評論分數</p>
          <div class="slidecontainer">
            <input type="range" min="0" max="5" step="0.1" value="0" class="slider" id="myRange" @input="scoreHtml" @propertychange="scoreHtml" @change="AllfilterFunction()">
            <span id="value">0</span>
          </div>
        </div>
        
        
        <div class="clear"></div>
    </div>
    <div class="dataArea">
      <div class="filter">
        <p class="filterP">分類</p>
        <ul>
          <li class="all">
            <button @click="tagFilter('all')" :value="oneTag">
              <div class="labelDiv">
                <span>全部</span><span class="num" >(1000)</span>
              </div>
            </button>
          </li>
          <li v-for="item in labelchoose" :key="item.field" :class="item.field">
            <button @click="tagFilter(item.field)">
              <div class="labelDiv">
                <span>{{ item.label }}</span><span class="num">(1000)</span>
              </div>
            </button>
          </li>
          <li class="custom">
            <button @click="tagCustom()">
              <div class="labelDiv customTag">
                <span>自訂</span>
              </div>
            </button>
          </li>
        </ul>
        <div class="clear"></div>
        <div class="labelchooseArea">
          <div class="labelchoose" v-for="item in labelchoose" :key="item.field + 'mulTag'">
            <input
              type="checkbox"
              name="label_checked_col[]"
              :id="[item.field]"
              :value="item.field"
              v-model="checkedtags"
              @change="AllfilterFunction()"
            />
            <label :for="[item.field]" :key="item.field + 'ss'">{{ item.label }}</label>
            <div class="clear"></div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="clear"></div>
      </div>
      <div class="dataRightArea">
          <!-- @on-selected-rows-change="selectionChanged" -->
        <vue-good-table
          max-height="600px"
          :fixed-header="true"
          ref="commentdataTable"
          class="el-table"
          styleClass="vgt-table striped"
          :rows="competitionCommentList"
          :columns="columns"
          :search-options="{ enabled: true }"
          :pagination-options="{
            enabled: true,
            mode: 'pages',
            perPage: 10,
            position: 'bottom',
            dropdownAllowAll: false,
            setCurrentPage: 1,
            nextLabel: 'next',
            prevLabel: 'prev',
          }"
        >
          <template slot="table-row" slot-scope="props">
            <template
              v-if="props.column.label === '評論'"
              v-bind:value="props.row._id"
            >
              <router-link
                :to="{
                  name: 'competitionCommentDetails',
                  params: { collections: companyName, _id: props.row._id },
                }"
                >{{ props.row.title }}</router-link
              >
            </template>
            <!-- <template v-else-if="props.column.field === 'resource'">
                <a :href="props.row.resource[0].url" target="_blanket">{{props.row.resource[1].resourceName}}</a>
              </template> -->
          </template>
        </vue-good-table>
        <div class="clear"></div>
      </div>
      <div class="clear"></div>
    </div>
    <!-- <div class="filter">
      <ul>
        <li class="all">
          <button @click="tagFilter('all')">
            <div class="labelDiv">
              <img src="https://fakeimg.pl/20x20/" alt="" />
              <span>全部</span>
            </div>
          </button>
        </li>
        <li v-for="item in labelchoose" :key="item.field" :class="item.field">
          <button @click="tagFilter(item.field)">
            <div class="labelDiv">
              <img src="https://fakeimg.pl/20x20/" alt="" />
              <span>{{ item.label }}</span>
            </div>
          </button>
        </li>
        <li>
          <button @click="tagCustom()">
            <div class="labelDiv">
              <img src="https://fakeimg.pl/20x20/" alt="" />
              <span>自訂</span>
            </div>
          </button>
        </li>
      </ul>
      <div class="clear"></div>
      <div class="labelchooseArea">
        <div class="labelchoose">
          <input
            type="checkbox"
            name="label_all"
            v-model="checkedtagsALL"
            @change="checkedALLFilter(checkedtagsALL)"
            id="checkALL"
          />
          <label for="checkALL">全選</label>
          <div class="clear"></div>
        </div>
        <div class="labelchoose" v-for="item in labelchoose" :key="item.field">
          <input
            type="checkbox"
            name="label_checked_col[]"
            :id="[item.field]"
            :value="item.field"
            v-model="checkedtags"
            @change="checkedALLFilter(checkedtags)"
          />
          <label :for="[item.field]">{{ item.label }}</label>
          <div class="clear"></div>
        </div>
        <div class="clear"></div>
      </div>
      <div class="clear"></div>
    </div> -->

  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";

export default {
  name: "competitionCommentList",
  components: {
    "vue-good-table": require("vue-good-table").VueGoodTable,
  },
  data() {
    return {
      companyName: this.$route.params.collections,
      competitionCommentList: [],
      selectedArr: [],
      checkedtags: [],
      newComment: [],
      checkedtagsALL: false,
      oneTag: "",
      columns: [
        {
          label: "正/負評",
          field: this.fieldFn,
        },
        {
          label: "時間",
          field: "times.comment",
        },
        {
          label: "評論",
          field: this.fieldFn3,
        },
        {
          label: "評分",
          field: "rating",
          type: "number",
        },
        {
          label: "網站來源",
          field: "website",
        },
      ],
      titleField: "",
      labelchoose: [
        {
          label: "餐飲",
          field: "food_drink",
        },
        {
          label: "客房",
          field: "room",
        },
        {
          label: "設施",
          field: "amenities",
        },
        {
          label: "服務",
          field: "service",
        },
        {
          label: "交通",
          field: "transportation",
        },
        {
          label: "價格",
          field: "price",
        },
        {
          label: "景觀",
          field: "view",
        },
        {
          label: "外觀",
          field: "appearance",
        },
      ],
      types: [
        {
          value: 0,
          field: "正評",
        },
        {
          value: 1,
          field: "負評",
        },
      ],
      typeChoosen: "",
      start: "",
      end: "",
      count: 0,
      x: '',
      filterObj: {
        pos_neg: ''
      }
    };
  },
  mounted() {
    let self = this;
    var moment = require("moment");
    var start = moment().subtract(24, "month");
    var end = moment();
    axios
      .get("https://hotelapi.im.nuk.edu.tw/api/comment/" + self.companyName)
      .then((response) => {
        self.competitionCommentList = response.data;
        self.selectedArr = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    // axios.get('/api/competitionCommentList/' + self.companyID).then(response => {
    //   self.competitionCommentList = response.data
    //   self.selectedArr = response.data
    //   self.resourceFn(self.competitionCommentList)
    //   console.log(self.competitionCommentList)
    // }).catch((error) => {
    //   console.log(error)
    // })
    // axios.get('/api/labelchoose').then(response => {
    //   self.labelchoose = response.data
    // }).catch((error) => {
    //   console.log(error)
    // })
    self.start = start;
    self.end = end;
  },
  methods: {
        AllfilterFunction: function(){
      let self = this
      var score = document.getElementById("myRange").value
      let arr = []
      if(self.oneTag !== '' && self.oneTag !== 'all'){
        arr = self.oneTagData
      }else if(self.checkedtags.length !== 0){
        arr = self.checkedFun(self.selectedArr, self.checkedtags)
      }else{
        arr = self.selectedArr
      }
      if(self.x.length !== 0){
        arr = this.handleFilterData(arr, self.filterObj)
      }
      console.log(arr)
      if(score !== '0'){
        arr = this. scoreFilter(arr)
      }
      arr = this.timeFilter(arr, self.start, self.end)
      self.competitionCommentList = arr
      return self.competitionCommentList
    },
    clearALL() {
      let self = this;
      self.typeChoosen = '';
      self.x = '';
      self.oneTag = '';
      self.oneTagData = '';
      document.getElementById("myRange").value = 0
      document.getElementById('value').innerHTML = 0;
      $(".all").removeClass("focus");
      self.labelchoose.forEach((item) => {
        $("." + item.field).removeClass("focus");
      });
      self.checkedtags = [];
      self.competitionCommentList = self.selectedArr;
      $("#reportrange span").html("時間");
      return self.competitionCommentList;
    },
    openFilter(){
      // let self = this;
      event.stopPropagation();
      $(".MultiFilterArea").slideToggle("normal");
      $(document).click(function (event) {
        var area = $(".MultiFilterArea"); // 設定目標區域
        var area1 = $(".daterangepicker"); // 設定目標區域
        if (!area.is(event.target) && area.has(event.target).length === 0 && !area1.is(event.target) && area1.has(event.target).length === 0) {
          // $('#divTop').slideUp('slow');  //滑動消失
          $(".MultiFilterArea").hide(500); // 淡出消失
        }
      });
    },
    handleCheckedChange() {
      let self = this;
      self.x = self.typeChoosen;
      if(self.x !== '全選'){
        self.types.filter((item) => {
          if(item.field === self.x){
            self.x = [item.value]
          }
        })
      }else{
        self.x = ''
      }
      self.filterObj = {
        pos_neg: self.x
      };
      console.log(self.filterObj)
      self.AllfilterFunction();
    },
    handleFilterData(arr, filterObj1) {
      const filterKeys = Object.keys(filterObj1);
      return arr.filter((item) => {
        return filterKeys.every((key) => {
          if (!filterObj1[key].length) {
            return true;
          }
          return !!~filterObj1[key].indexOf(item.labels[key]);
        });
      });
    },
    fieldFn(rowObj) {
      // 整個陣列
      if (rowObj.labels.pos_neg === 0) {
        return "正評";
      } else {
        return "負評";
      }
    },
    fieldFn3(rowObj) {
      if (rowObj.title === "") {
        rowObj.title = rowObj.text.substr(0, 10) + "...";
      }
    },
    scoreHtml: function(){
      var output = document.getElementById("myRange").value;
      document.getElementById('value').innerHTML = output;   
    },
    scoreFilter: function(arr){
      let self = this;
      var value = document.getElementById("myRange").value;
      arr = arr.filter((item) => {
        return item.rating <= value
      })
      self.commentData = arr;
      return self.commentData;
    },
    checkedFun: function (arr, chtags) {
      var arr1 = [];
      arr.forEach((item) => {
          for(var j in chtags){
            if(item.labels[chtags[j]] === 1){
              arr1.push(item)
              break
            }
          }
      })      
      return arr1;
    },
    timeFilter: function (arr, startData, endData) {
      // let self = this;
      arr = arr.filter((item) => {
        return (
          Date.parse(Object.values(item.times)[1]) >=
            Date.parse(startData._d) &&
          Date.parse(Object.values(item.times)[1]) <= Date.parse(endData._d)
        );
      });
      return arr;
    },
    cb: function (start, end) {
      var self = this;
      $("#reportrange span").html(
        start.format("YYYY/MM/DD") + " - " + end.format("YYYY/MM/DD")
      );
      self.start = start;
      self.end = end;
      self.AllfilterFunction()
    },
    dateRange: function () {
      var moment = require("moment");
      var self = this;
      var start = self.start;
      var end = self.end;
      $("#reportrange").daterangepicker(
        {
          startDate: start,
          endDate: end,
          ranges: {
            Today: [moment(), moment()],
            Yesterday: [moment().subtract(1, "days"), moment()],
            "Last Week": [moment().subtract(6, "days"), moment()],
            "Last Month": [moment().subtract(30, "days"), moment()],
            "Last Six Months": [moment().subtract(6, "month"), moment()],
          },
          showCustomRangeLabel: false
        },
        self.cb
      );
      var p = 0;
      var t = 0;
      var ori = 0;
      $(document).scroll(function () {
        p = $(this).scrollTop();
        if (t < p) {
          // 下滾
          ori = $("#reportrange").offset().top;
          $(".daterangepicker").css("top", ori + 35);
        } else {
          // 上滾
          $("#reportrange").daterangepicker("hide");
        }
        t = $(this).scrollTop();
      });
    },
    tagFilter: function (tag) {
      let self = this;
      var arrq = [];
      self.oneTag = tag;
      if (tag === "all") {
        self.checkedtags = [];
        $(".all").addClass("focus");
        self.labelchoose.forEach((item) => {
          $("." + item.field).removeClass("focus");
        });
        $(".custom").removeClass("focus");
        self.competitionCommentList = self.selectedArr;
        return self.competitionCommentList;
      } else {
        $(".all").removeClass("focus");
        self.labelchoose.forEach((item) => {
          if (item.field === tag) {
            $("." + tag).addClass("focus");
          } else {
            $("." + item.field).removeClass("focus");
          }
        });
        $(".custom").removeClass("focus");
        arrq = self.selectedArr.filter((item) => {
          return item.labels[tag] === 1;
        });
        self.competitionCommentList = arrq;
        self.checkedtags = [];
        $("input[name='label_checked_col[]']").prop("checked", false);
        $("input[name='label_all']").prop("checked", false);
        self.checkedtagsALL = false;
        return self.competitionCommentList;
      }
    },
    tagCustom: function () {
      let self = this;
      self.oneTag = "";
      event.stopPropagation();
      $(".all").removeClass("focus");
      $(".custom").addClass("focus");
      self.labelchoose.forEach((item) => {
        $("." + item.field).removeClass("focus");
      });
      $(".labelchoose").slideToggle("slow");
      $(document).click(function (event) {
        var area = $(".labelchooseArea"); // 設定目標區域
        if (!area.is(event.target) && area.has(event.target).length === 0) {
          $(".labelchoose").hide(1000); // 淡出消失
        }
      });
    },
  },
};
</script>
<style scoped src= '../assets/css/commentList.css'></style>
<style scoped src= '../assets/css/competition.css'></style>
