<template>

  <div>
    <div class="contentCenter" id="maindiv">
      <div class="page">
        <span>評論列表</span>
      </div>
      
      <div class="buttonFunArea">
        <div class="filterTime_phone">
          <span class="filterTime">時間：</span>
          <div slot="table-actions" class="slot_div_time time_filter_phone">
            <span>從</span>
            <div
              id="reportrange"
              style="
                background: #fff;
                cursor: pointer;
                padding: 5px 10px;
                border: 1px solid #dcdfe6;
              "
            >
              <span @click="dateRange(0)" class="timeSpan"
                >時間
              </span>
            </div>
          </div>
          <div slot="table-actions" class="slot_div_time time_filter_phone">
            <span>到</span>
            <div
              id="reportrange1"
              style="
                background: #fff;
                cursor: pointer;
                padding: 5px 10px;
                border: 1px solid #dcdfe6;
              "
            >
              <span @click="dateRange(1)" class="timeSpan1"
                >時間
              </span>
            </div>
          </div>
        </div>
        <div class="but">
            <button class="editButton" @click="openFilter()" id="comment_filter_phone">
            <img src="../assets/icon/filter.png"/>
          </button>
          <button class="editButton" @click="editFun()" id="editButton_phone">
            <img src="../assets/icon/edit.png"/>
            <span>編輯</span>
          </button>
          <button class="editButton clearALL" @click="clearALL()" >
            <img src="../assets/icon/clear.png"/>
            <span>清除篩選</span>
          </button>
        </div>
        <button @click="openfilter_sort()" class="filter_sort_phone">分類</button>
      </div>
      <div class="edit">
        <div class="edit_flex">
          <div class="slot_div">
            <el-select
              placeholder="評論狀態設定"
              class="custom_el_select"
              v-model="conditionModify"
            >
              <el-option
                v-for="item in conditions"
                :key="item.value + 'editComment'"
                :value="item.field"
              ></el-option>
            </el-select>
            <div class="clear"></div>
          </div>
          <div class="add_btn">
            <button class="functionButton addBTN" id="tableActionsBtn" @click="editUpdate(conditionModify, replyModify)">確認</button>
            <button class="functionButton deleteBTN" id="tableActionsBtn" @click="editCancle()">取消</button>
          <div class="clear"></div>
        </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
    <div id="MultiFilterArea" class="MultiFilterArea">
      <div class="MultiFilterArea_phone">
        <div slot="table-actions" class="slot_div">
          <template>
            <el-select v-model="typeChoosen"  placeholder="選擇評論類型"  @change="handleCheckedChange(0)" class="custom_el_select">
              <el-option value="全選">全選</el-option>
              <el-option v-for="child in types"  :key="child.value"  :value="child.field"></el-option>
            </el-select>
          </template>
        </div>
        
        <div slot="table-actions" class="slot_div">
            <el-select v-model="conditionChoosen"  placeholder="選擇評論處理狀態" class="custom_el_select" @change="handleCheckedChange(1)">
              <el-option value="全選">全選</el-option>
              <el-option v-for="child in conditions"  :key="child.value"  :value="child.field" ></el-option>
            </el-select>
        </div>
        <div slot="table-actions" class="slot_div">
            <el-select v-model="replyChoosen"  placeholder="選擇評論回覆狀態"  @change="handleCheckedChange(2)" class="custom_el_select">
              <el-option value="全選">全選</el-option>
              <el-option v-for="child in reply"  :key="child.value"  :value="child.field"></el-option>
            </el-select>
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
    </div>
    <div class="dataArea">
        <div class="filter" id="filter_sort_phone">
          <p class="filterP">分類</p>
          <ul>
            <li class="all">
              <button @click="AllfilterFunction('all')" :value="oneTag">
                <div class="labelDiv">
                  <span>全部</span>
                </div>
              </button>
            </li>
            <li v-for="item in labelchoose" :key="item.field" :class="item.field">
              <button @click="AllfilterFunction(item.field)">
                <div class="labelDiv">
                  <span>{{ item.label }}</span>
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
          <vue-good-table 
          :fixed-header="true"
          max-height="600px"
          ref="commentdataTable"
          class="el-table"
          styleClass="vgt-table striped"
          :rows="commentData"
          :columns="columns"
          @on-selected-rows-change="selectionChanged"
          :search-options="{ enabled: true }"
          :select-options="{
            enabled: true,
            selectOnCheckboxOnly: true,
            disableSelectInfo: true,
          }"
          :pagination-options="{
            enabled: true,
            mode: 'pages',
            perPage: '',
            rowsPerPageLabel: '',
            position: 'bottom',
            dropdownAllowAll: false,
            setCurrentPage: 1,
            nextLabel: 'next',
            prevLabel: 'prev',
          }"
          >
            <template slot="table-row" slot-scope="props">
              <template v-if="props.column.label === '狀態'">
                <span v-if="props.row.labels.condition === 0">
                  <el-button class="none" @click="conditionUpdate(props.row._id)"
                    >未處理</el-button
                  >
                </span>
                <span v-else-if="props.row.labels.condition === 1">
                  <el-button class="ing" @click="conditionUpdate(props.row._id)"
                    >處理中</el-button
                  >
                </span>
                <span v-else-if="props.row.labels.condition === 2">
                  <el-button class="done" disabled="disabled">已完成</el-button>
                </span>
              </template>
              <template
                v-else-if="props.column.label === '評論'"
                v-bind:value="props.row._id"
              >
                <router-link
                  :to="{ name: 'commentDetails', params: { _id: props.row._id } }"
                  >{{ props.row.title }}</router-link
                >
              </template>
            </template>
          </vue-good-table>

        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import dateTime from "../assets/js/dateTime";
import $ from "jquery";
import util from "../assets/js/utility";

export default {
  name: "commentList",
  components: {
    "vue-good-table": require("vue-good-table").VueGoodTable,
  },
  data() {
    return {
      // table data area
      companyName: '',
      employeeNumber: '',
      networkDataReceived: false,
      commentData: [],
      selectedArr: [],
      checkedtags: [],
      newComment: [],
      checkedtagsALL: false,
      oneTag: "",
      columns: [{
          label: "正/負評",
          field: this.fieldFn,
          sortable: false
        },
        {
          label: "狀態",
          field: this.fieldFn2,
          sortable: false
        },
        {
          label: "回覆",
          field: this.fieldFn1,
          tdClass: "display",
          thClass: "display",
          sortable: false
        },

        {
          label: "評論",
          field: this.fieldFn3,
          sortable: false
        },
        {
          label: "評分",
          field: this.fieldFn4,
          type: "number",
        },
        {
          label: "時間",
          field: "times.comment",
        },
        {
          label: "網站來源",
          field: "website",
          tdClass: "display",
          thClass: "display",
          sortable: false
        }
      ],
      columns_computer: [
        {
          label: "正/負評",
          field: this.fieldFn,
          sortable: false
        },
        {
          label: "狀態",
          field: this.fieldFn2,
          sortable: false
        },
        {
          label: "回覆",
          field: this.fieldFn1,
          tdClass: "display",
          thClass: "display",
          sortable: false
        },

        {
          label: "評論",
          field: this.fieldFn3,
          sortable: false
        },
        {
          label: "評分",
          field: this.fieldFn4,
          type: "number",
        },
        {
          label: "時間",
          field: "times.comment",
        },
        {
          label: "網站來源",
          field: "website",
          tdClass: "display",
          thClass: "display",
          sortable: false
        },
      ],
      columns_phone: [
        {
          label: "正/負評",
          field: this.fieldFn,
          sortable: false
        },
        {
          label: "狀態",
          field: this.fieldFn2,
          sortable: false
        },
        {
          label: "評論",
          field: this.fieldFn3,
          sortable: false
        },
        {
          label: "時間",
          field: "times.comment",
        }
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
      conditions: [
        {
          value: 0,
          field: "未處理",
        },
        {
          value: 1,
          field: "處理中",
        },
        {
          value: 2,
          field: "已完成",
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
      reply: [
        {
          value: 1,
          field: "是",
        },
        {
          value: 0,
          field: "否",
        },
      ],
      conditionChoosen: "",
      conditionModify: "",
      conditionModifytoHistory: {
        employeeNumber: '',
        commentID: '',
        title: '',
        modify: '',
        time: '',
        old: '',
        new: ''
      },
      replyModifytoHistory: {
        employeeNumber: '',
        commentID: '',
        title: '',
        modify: '',
        time: '',
        old: '',
        new: ''
      },
      typeChoosen: "",
      replyChoosen: "",
      replyModify: "",
      start: "",
      end: "",
      count: 0,
      x: '',
      y: '',
      z: '',
      filterObj: {
        pos_neg: '',
        condition: '',
        reply: '',
      },
      window_width: document.documentElement.clientWidth,
      fromDate: false,
      toDate: false
    };
  },
  mounted() {
    let self = this;
    var moment = require("moment");
    var start = moment().subtract(24, "month");
    var end = moment();
    self.start = start;
    self.end = end;
    if (!self.companyName) {
      var logining = localStorage.getItem("token");
      var loginData = JSON.parse(logining);
      self.companyName = loginData.companyName;
      self.employeeNumber = loginData.employeeNumber
    }
    axios
      .get("https://hotelapi.im.nuk.edu.tw/api/comment/" + self.companyName)
      .then((response) => {
        console.log('From web', response.data);
        self.networkDataReceived = true;
        self.commentData = response.data;
        self.selectedArr = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

	if ("indexedDB" in window) {
      console.log("Reading indexedDB...");
      util.readAllData("comment").then(function (data) {
        if (!self.networkDataReceived) {
          console.log("From cache", data);
          self.commentData = data;
          self.selectedArr = data;
        }
      });
    }


    var _this = this
    window.onresize = function () {
      _this.window_width = document.documentElement.clientWidth 
    }
    if(document.documentElement.clientWidth > 768){
        this.columns = this.columns_computer
    }else{
        this.columns = this.columns_phone
    }
    
  },
  watch: {
    'window_width': function (val) { 
      if(val > 768){
        this.columns = this.columns_computer
      }else{
        this.columns = this.columns_phone
      }
    }
  },
  methods: {
    AllfilterFunction: function(tag){
      let self = this
      var score = document.getElementById("myRange").value
      let arr = self.selectedArr
      if(!tag){
        self.oneTag = ''
      }else{
        self.oneTag = tag
      }
      if(self.oneTag.length !== 0){
        arr = this.tagFilter(arr, self.oneTag)
      }else if(self.checkedtags.length !== 0){
        arr = this.checkedFun(arr, self.checkedtags)
      }
      if(self.x.length !== 0 || self.y.length !== 0 || self.z.length !==0){
        arr = this.handleFilterData(arr, self.filterObj)
      }
      if(score !== '0'){
        arr = this. scoreFilter(arr)
      }
      arr = this.timeFilter(arr, self.start, self.end)
      self.commentData = arr
      return self.commentData
    },
    clearALL(){
      let self = this;
      self.typeChoosen = '';
      self.conditionChoosen = '';
      self.replyChoosen = '';
      self.x = '';
      self.y = '';
      self.z = '';
      self.oneTag = '';
      document.getElementById("myRange").value = 0
      document.getElementById('value').innerHTML = 0;
      var moment = require("moment");
      self.start = moment().subtract(24, "month");
      self.end = moment();
      $(".all").removeClass("focus");
      $(".custom").removeClass("focus");
      self.labelchoose.forEach((item) => {
        $("." + item.field).removeClass("focus");
      });
      self.$refs["commentdataTable"].selectedRows.forEach((item) => {
          item['vgtSelected'] = false
      });
      self.checkedtags = [];
      self.commentData = self.selectedArr;
      $("#reportrange span").html("時間");
      $("#reportrange1 span").html("時間");
      self.fromDate = false
      self.toDate = false
      self.conditionModify = '';
      self.replyModify = '';
      return self.commentData;
    },
    
    openFilter(){
      event.stopPropagation();
      $(".MultiFilterArea").slideToggle("normal");
      $(document).click(function (event) {
        var area = $(".MultiFilterArea"); // 設定目標區域
        var area1 = $(".daterangepicker"); // 設定目標區域
        if (!area.is(event.target) && area.has(event.target).length === 0 && !area1.is(event.target) && area1.has(event.target).length === 0) {
          $(".MultiFilterArea").hide(); // 淡出消失
        }
      });
    },
    handleCheckedChange(value) {
      let self = this;
      if (value === 0) {
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
      } else if (value === 1) {
        self.y = self.conditionChoosen;
        if(self.y !== '全選'){
          self.conditions.filter((item) => {
            if(item.field === self.y){
              self.y = [item.value]
            }
          })
        }else{
          self.y = ''
        }
      } else if (value === 2) {
        self.z = self.replyChoosen;
        if(self.z !== '全選'){
          self.reply.filter((item) => {
            if(item.field === self.z){
              self.z = [item.value]
            }
          })
        }else{
          self.z = ''
        }
      }
      self.filterObj = {
        pos_neg: self.x,
        condition: self.y,
        reply: self.z,
      };
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
    fieldFn1(rowObj) {
      if (rowObj.response_body === "" || rowObj.response_body === null) {
        return "否";
      } else {
        return "是";
      }
    },
    fieldFn2(rowObj) {
      if (rowObj.labels.condition === 0) {
        return "未處理";
      } else if (rowObj.labels.condition === 1) {
        return "處理中";
      } else {
        return "已完成";
      }
    },
    fieldFn3(rowObj) {
        rowObj.title = rowObj.text.substr(0, 10) + "...";
    },
    fieldFn4(rowObj){
      if(rowObj.website === 'Agoda'|| rowObj.website === 'Hotels'|| rowObj.website === 'Booking'){
        return rowObj.rating/2
      }else{
        return rowObj.rating
      }
    },
    // 分數篩選
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
    timeFilter: function (arr, startData, endData) {
      arr = arr.filter((item) => {
        return (
          Date.parse(item.times.comment) >=
            Date.parse(startData._d) &&
          Date.parse(item.times.comment) <= Date.parse(endData._d)
        );
      });
      return arr;
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
    cb: function (value, start, end) {
      var self = this;
      if(value === 0){
        self.fromDate = true
        $("#reportrange .timeSpan").html(
          start.format("YYYY-MM-DD")
        );
        $("#reportrange timeSpan").css({ "font-size": "12px", width: "120px" });
        self.start = start;
      }else if(value === 1){
        self.toDate = true
        $("#reportrange1 .timeSpan1").html(
          end.format("YYYY-MM-DD")
        );
        $("#reportrange1 timeSpan1").css({ "font-size": "12px", width: "120px" });
        self.end = end;
      }
      if(self.fromDate === true){
        if(self.toDate === true){
          self.AllfilterFunction()
        }else{
          console.log(self.toDate)
        }
      }
    },
    dateRange: function (value) {
      var self = this;  
      var moment = require("moment");
      var today = moment().subtract(1, "days");
      if(value === 0){
        $('#reportrange').daterangepicker(
        {
          singleDatePicker: true,
          showDropdowns: true,
          minYear: 1998,
          maxDate: today,
        },
        function(start, end) {
          if(value === 0){
            self.cb(value, start, end)
          }else{
            self.cb(value, start, end)
          }
        })
      }else{
        $('#reportrange1').daterangepicker(
        {
          singleDatePicker: true,
          showDropdowns: true,
          minYear: 1998,
          maxDate: today
        },
          function(start, end) {
            if(value === 0){
              self.cb(value, start, end)
            }else{
              self.cb(value, start, end)
            }
            }
        )
      }
      
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
    conditionUpdate: function (id) {
      let self = this;
      self.commentData.filter((item) => {
        if (item._id === id) {
          self.conditionModifytoHistory.commentID = id
          self.conditionModifytoHistory.title = item.text.substr(0, 10) + "...";
          self.conditionModifytoHistory.old = item.labels.condition
          if (item.labels.condition === 0) {
            this.$fire({
              title: "是否將此評論狀態修改為'處理中'?",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "是",
              cancelButtonText: "否",
            }).then((result) => {
              if(result.value){
                item.labels.condition = 1;
                self.conditionModifytoHistory.new = item.labels.condition
                self.newComment = item;
                self.updateComment(id);
                self.updateHistory(0)
              }
            })
          } else {
            this.$fire({
              title: "是否將此評論狀態修改為'已完成'?",
              text: "修改後不可復原",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "是",
              cancelButtonText: "否",
            }).then((result) => {
              if(result.value){
                item.labels.condition = 2
                self.conditionModifytoHistory.new = item.labels.condition
                self.newComment = item;
                self.updateComment(id);
                self.updateHistory(1)
              }
            })
          }
        }
      });
      return self.commentData;
    },
    editFun: function () {
      event.stopPropagation();
      $(".edit").slideToggle("normal");
      $(document).click(function (event) {
        var area = $(".edit"); // 設定目標區域
        if (!area.is(event.target) && area.has(event.target).length === 0) {
          $(".edit").hide(); // 淡出消失
        }
      });
    },
    editUpdate: function (value, value1) {
      let self = this;
      var x = ''
      if (value === "未處理") {
        x = 0;
      } else if (value === "處理中") {
        x = 1;
      } else {
        x = 2;
      }
      self.conditionModifytoHistory.new = x
      if (x.length !== 0) {
        this.$fire({
              title: "是否將此評論狀態修改為'" + value + "'?",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "是",
              cancelButtonText: "否",
            }).then((result) => {
              if(result.value){
                self.$refs["commentdataTable"].selectedRows.forEach((item) => {
                  if(item.labels.condition === 2){
                    console.log(item.labels.condition)
                  }else{

                    self.conditionModifytoHistory.old = item.labels.condition
                    self.conditionModifytoHistory.commentID = item._id
                    self.conditionModifytoHistory.title = item.text.substr(0, 10) + "..."
                    item.labels.condition = x;
                    self.newComment = item;
                    self.updateComment(item._id);
                    self.updateHistory(0)
                  }
                });
              }
        })
        self.conditionModify = ''
      }
      self.replyModifytoHistory.new = value1
      if (value1.length !== 0) {
        self.$refs["commentdataTable"].selectedRows.forEach((item) => {
            self.replyModifytoHistory.old = item.labels.reply
            self.replyModifytoHistory.commentID = item._id
            self.replyModifytoHistory.title = item.text.substr(0, 10) + "..."
            item.labels.reply = value1;
            self.newComment = item;
            self.updateComment(item._id);
            self.updateHistory(1)
        });
        if(self.replyModifytoHistory.old === 0){
          self.replyModifytoHistory.old = '否'
        }else{
          self.replyModifytoHistory.old = '是'
        }
      }
    },
    updateComment: function (id) {
      let self = this;
      let updateData = self.newComment;
      let updateId = id;
    
      if ("serviceWorker" in navigator && "SyncManager" in window) {
        navigator.serviceWorker.ready.then(function (sw) {
          var post = {
            id: updateId,
            data: updateData,
            companyName: self.companyName,
          };
          // Write the data into the indexedDB
          util
            .writeData("sync-comment-update", post)
            .then(function () {
              return sw.sync.register("sync-comment-update"); 
            })
            .catch(function (err) {
              console.log(err);
            });
        });
      } else { 
        axios
          .put(
            "https://hotelapi.im.nuk.edu.tw/api/comment/" +
              self.companyName +
              "/" +
              updateId,
            updateData
          )
          .catch((err) => {
            console.log(err);
          });
      }

      self.editCancle();
    },
    updateHistory: function(value){
      let self = this
      self.conditionModifytoHistory.time = dateTime.recordDate() + " " + dateTime.recordTime();
      self.conditionModifytoHistory.employeeNumber = self.employeeNumber
      self.conditionModifytoHistory.modify = '修改'
      self.replyModifytoHistory.time = dateTime.recordDate() + " " + dateTime.recordTime();
      self.replyModifytoHistory.employeeNumber = self.employeeNumber
      self.replyModifytoHistory.modify = '修改'
      if(value === 0){
        let record = 'condition'
        axios.put("https://hotelapi.im.nuk.edu.tw/api/history/" + self.companyName + '/' + record, self.conditionModifytoHistory).then((response) => {
          console.log(response)
        }).catch((error) => {
          console.log(error)
        })
      } else if(value === 1){
        let record = 'reply'
        axios.put("https://hotelapi.im.nuk.edu.tw/api/history/" + self.companyName + '/' + record, self.replyModifytoHistory).then((response) => {
          console.log(response)
        }).catch((error) => {
          console.log(error)
        })
      }
      
    },
    editCancle: function () {
      let self = this;
      self.conditionModify = '';
      self.replyModify = '';
      $(".edit").hide(100); // 淡出消失
    },
    tagFilter: function (arr, tag) {
      let self = this;
      var arrq = [];
      if (tag === "all") {
        self.checkedtags = [];
        $(".all").addClass("focus");
        self.labelchoose.forEach((item) => {
          $("." + item.field).removeClass("focus");
        });
        $(".custom").removeClass("focus");
        self.commentData = arr;
        return self.commentData;
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
        arrq = arr.filter((item) => {
          return item.labels[tag] === 1;
        });
        self.commentData = arrq;
        self.checkedtags = [];
        $("input[name='label_checked_col[]']").prop("checked", false);
        $("input[name='label_all']").prop("checked", false);
        return self.commentData;
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
    selectionChanged(params) {
      let self = this;
      this.rowSelection = params.selectedRows;
      if(self.window_width < 768){
          if(this.rowSelection.length !== 0 ){
          console.log( self.window_width)
          $('#editButton_phone').show()
          $('#comment_filter_phone').hide()
        }else{
          $('#editButton_phone').hide()
          $('#comment_filter_phone').show()
        }
      }
    },
    openfilter_sort(){
      event.stopPropagation();
      $("#filter_sort_phone").slideToggle("normal");
      $(document).click(function (event) {
        var area = $("#filter_sort_phone"); // 設定目標區域
        if (!area.is(event.target) && area.has(event.target).length === 0) {
          $("#filter_sort_phone").hide(); // 淡出消失
        }
      });
    },
    
  }
};
</script>
<style scoped src= '../assets/css/commentList.css'></style>
<style>
table.vgt-table td{
    vertical-align: middle;
}

</style>
