<template>
  <div>
    <div class="contentCenter">
      <div class="page">
        <span>評論詳細內容</span>
      </div>
    </div>
    <div class="dataArea">
      <div class="dataBG">
      <template v-if="commentData.website === 'Adoga' || commentData.website === 'Hotels' || commentData.website === 'Booking'">
        <p class="CommentTtle">{{ commentData.title }}</p>
        <div class="MainComment">
          <span class="subtitle">評分</span
          ><span class="spaceRight">{{ commentData.rating/2 }}</span>
          <span class="subtitle">評論日期</span
          ><span class="spaceRight">{{ commentData.length && commentData.times.comment}}</span>
          <span class="subtitle">住客國家</span
          ><span class="spaceRight">{{ commentData.locale }}</span>
          <span class="subtitle">入住時間</span
          ><span class="spaceRight">{{ commentData.length && commentData.times.checkin }}</span>
          <span class="subtitle">房型</span
          ><span class="spaceRight">{{ commentData.room_type }}</span>
          <span class="subtitle">來源網站</span
          ><span>{{ commentData.website }}</span>
          <div class="Maincontent">
            <span class="commentContent">{{ commentData.text }}</span>
          </div>
        </div>
        </template>
      <template v-else>
        <p class="CommentTtle">{{ commentData.title }}</p>
        <div class="MainComment">
          <span class="subtitle">評分</span
          ><span class="spaceRight">{{ commentData.rating }}</span>
          <span class="subtitle">評論日期</span
          ><span class="spaceRight">{{ commentData.length && commentData.times.comment}}</span>
          <span class="subtitle">住客國家</span
          ><span class="spaceRight">{{ commentData.locale }}</span>
          <span class="subtitle">入住時間</span
          ><span class="spaceRight">{{ commentData.length && commentData.times.checkin }}</span>
          <span class="subtitle">房型</span
          ><span class="spaceRight">{{ commentData.room_type }}</span>
          <span class="subtitle">來源網站</span
          ><span>{{ commentData.website }}</span>
          <div class="Maincontent">
            <span class="commentContent">{{ commentData.text }}</span>
          </div>
        </div>
        </template>
      </div>

      <div class="ReplyAddress">
        <p class="commentInfo">評論資訊</p>
        <div class="MultiFilterArea1">
          <div class="manageConditionDiv" v-if="commentData.labels">
            <p class="filterP1">評論狀態</p>
            <template>
              <span v-if="commentData.labels.condition === 0">
                <el-button
                  class="none"
                  @click="conditionUpdate(commentData.labels.condition)"
                  >未處理</el-button
                >
              </span>
              <span v-if="commentData.labels.condition === 1">
                <el-button
                  class="ing"
                  @click="conditionUpdate(commentData.labels.condition)"
                  >處理中</el-button
                >
              </span>
              <span v-if="commentData.labels.condition === 2">
                <el-button class="done" disabled="disabled">已完成</el-button>
              </span>
            </template>
            <div class="clear"></div>
          </div>

          <div class="manageTags">
            <div>
               <p class="filterP1">標籤</p>
              <div class="addTagsBTN">
                <input type="button" value="+" @click="addTag" style="font-size: 18px;">
              </div>
            </div>
            <template>
              <div class="tags" v-for="item in label_tags" :key="item.field+ 'tag'">
                <el-button
                  ><button class="deleBtn" @click="deleTag(item.field)">x</button>
                  {{ item.label }}</el-button
                >
              </div>
            </template>
            <div class="clear"></div>
          </div>
          <div class="addTagsArea">
            <el-select v-model="TagsAdd"  placeholder="請選擇標籤"  @change="submitAdd">
              <el-option v-for="item in label_no_tags"  :key="item.field+ 'add_tags'"  :value="item.field"  :placeholder="item.label"  >{{ item.label }}</el-option>
            </el-select>
          </div>
          <div class="manageReplyDiv" v-if="commentData.labels">
            <p class="filterP1">回覆狀態</p>
            <template>
              <span v-if="commentData.labels.reply === 1">
                <span class="reply">是</span>
                <div class="replyArea">
                  <p class="filterP1">回覆內容</p>
                  <template
                    v-eif="
                      commentData.response_body === '' ||
                      commentData.labels.reply === 0
                    "
                  >
                    <p>{{ commentData.response_body }}</p>
                  </template>
                </div>
              </span>
              <span v-else-if="commentData.labels.reply === 0">
                <span class="reply">否</span>
              </span>
            </template>
            <div class="clear"></div>
          </div>

          <div class="clear"></div>
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
import util from "../assets/js/utility";

export default {
  name: "commentDetails",
  data() {
    return {
      networkDataReceived: false,
      companyName: "",
      employeeNumber: '',
      commentDetailsID: this.$route.params._id,
      commentData: [],
      newComment: [],
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
      label_tags: [],
      label_no_tags: [],
      TagsAdd: "",
      conditionModifytoHistory: {
        employeeNumber: '',
        commentID: '',
        title: '',
        modify: '',
        time: '',
        old: '',
        new: ''
      },
      tagsModifytoHistory: {
        employeeNumber: '',
        commentID: '',
        title: '',
        modify: '',
        time: '',
        new: ''
      },
    };
  },
  mounted() {
    let self = this;
    if (!self.companyName) {
      var logining = localStorage.getItem("token");
      var loginData = JSON.parse(logining);
      self.companyName = loginData.companyName;
      self.employeeNumber = loginData.employeeNumber
    }
    
    axios
      .get(
        "https://hotelapi.im.nuk.edu.tw/api/commentDetails/" +
          self.companyName +
          "/" +
          self.commentDetailsID
      )
      .then((response) => {
        self.commentData = response.data;
        self.newComment = response.data;
        console.log(self.commentData)
        if (self.commentData.title === "") {
          self.commentData.title = self.commentData.text.substr(0, 10) + "...";
        }
        self.label_tags = self.labelchoose.filter((item) => {
          if (self.commentData.labels[item.field] === 1) {
            return item;
          } else {
            var inLabelTage = false;
            for (var i in self.label_no_tags) {
              if (self.label_no_tags[i].field === item.field) {
                inLabelTage = true;
                break;
              }
            }
            if (!inLabelTage) {
              self.label_no_tags.push(item);
            } 
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });

    if ("indexedDB" in window) {
      console.log("Reading indexedDB...");
      util.readAllData("comment").then(function (data) {
        if (!self.networkDataReceived) {
          console.log("From cache", data);
          for (var i in data) {
            if (data[i]._id === self.commentDetailsID) {
              self.commentData = data[i];
              self.newComment = data[i];
              break;
            }
          }
          if (self.commentData.title === "") {
            self.commentData.title =
              self.commentData.text.substr(0, 10) + "...";
          }
          self.label_tags = self.labelchoose.filter((item) => {
            if (self.commentData.labels[item.field] === 1) {
              return item;
            } else {
              self.label_no_tags.push(item);
            }
          });
        }
      });
    }
    
  },
  
  methods: {
    addTag: function () {
      event.stopPropagation();
      $(".addTagsArea").slideToggle("normal");
      $(document).click(function (event) {
        var area = $(".addTagsArea"); // 設定目標區域
        var area1 = $(".addTagsBTN"); // 設定目標區域
        if ((!area.is(event.target) && area.has(event.target).length === 0) && (!area1.is(event.target) && area1.has(event.target).length === 0)) {
          $(".addTagsArea").hide(500); // 淡出消失
        }
      });
    },
    deleTag: function(TagsDel) {
      let self = this;
      self.labelchoose.filter((item) => {
        if(TagsDel === item.field){
          self.tagsModifytoHistory.new = item.label
        }
      })
      self.commentData.labels[TagsDel] = 0;
      self.newComment = self.commentData;
      self.updateComment()
      self.label_no_tags = [];
      self.label_tags = self.labelchoose.filter((item) => {
        if(self.commentData.labels[item.field] === 1){
          return item;
        }else{
          self.label_no_tags.push(item)
        }
      })
      self.updateHistory(1,2)
    },
    submitAdd: function () {
      let self = this;
      self.labelchoose.filter((item) => {
        if(self.TagsAdd === item.field){
          self.tagsModifytoHistory.new = item.label
        }
      })
      self.commentData.labels[self.TagsAdd] = 1;
      self.newComment = self.commentData;
      self.updateComment();
      self.label_no_tags = [];
      self.label_tags = self.labelchoose.filter((item) => {
        if (self.commentData.labels[item.field] === 1) {
          return item;
        } else {
          self.label_no_tags.push(item);
        }
      });
      $(".addTagsArea").css("display", "none");
      self.updateHistory(1, 1)
    },
    conditionUpdate: function (data) {
      let self = this;
      if (data === 0) {
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
                self.conditionModifytoHistory.old = data
                self.commentData.labels.condition = 1;
                self.conditionModifytoHistory.new = self.commentData.labels.condition
                self.newComment = self.commentData;
                self.updateComment();
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
            self.commentData.labels.condition = 2;
            self.conditionModifytoHistory.new = self.commentData.labels.condition
            self.newComment = self.commentData;
            self.updateComment();
            self.updateHistory(0)
          }
        })
      }
    },

    submitCancled: function () {
      $(".addLabelInput").css("display", "none");
      $(".addButton").css("display", "none");
    },

    updateComment: function () {
      let self = this;
      let updateData = self.newComment;

      if ("serviceWorker" in navigator && "SyncManager" in window) {
        navigator.serviceWorker.ready.then(function (sw) {
          var post = {
            id: self.commentDetailsID,
            data: updateData,
            companyName: self.companyName,
          };

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
              self.commentDetailsID,
            updateData
          ).then((response) => {
            console.log(response.data)
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    updateHistory: function(value, value1){
      let self = this
      self.conditionModifytoHistory.time = dateTime.recordDate() + " " + dateTime.recordTime();
      self.conditionModifytoHistory.employeeNumber = self.employeeNumber
      self.conditionModifytoHistory.commentID = self.commentDetailsID
      self.conditionModifytoHistory.title = self.commentData.text.substr(0, 10) + "...";
      self.tagsModifytoHistory.time = dateTime.recordDate() + " " + dateTime.recordTime();
      self.tagsModifytoHistory.employeeNumber = self.employeeNumber
      self.tagsModifytoHistory.commentID = self.commentDetailsID
      self.tagsModifytoHistory.title = self.commentData.text.substr(0, 10) + "...";
      console.log(self.tagsModifytoHistory)
      if(value === 0){
        let record = 'condition'
        self.conditionModifytoHistory.modify = '修改'
        axios.put("https://hotelapi.im.nuk.edu.tw/api/history/" + self.companyName + '/' + record, self.conditionModifytoHistory).then((response) => {
          console.log(response)
        }).catch((error) => {
          console.log(error)
        })
      }else{
        let record = 'tags'
        if(value1 === 1){
          self.tagsModifytoHistory.modify = '新增'
        }else{
          self.tagsModifytoHistory.modify = '刪除'
        }
        axios.put("https://hotelapi.im.nuk.edu.tw/api/history/" + self.companyName + '/' + record, self.tagsModifytoHistory).then((response) => {
          console.log(response)
        }).catch((error) => {
          console.log(error)
        })
      }

    },
    handleSizeChange: function (size) {
      this.pagesize = size;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
    tagCustom: function () {
      event.stopPropagation();
      $(".labelchoose2").toggle("slow");
      $(document).click(function (event) {
        var area = $(".labelchoose2"); // 設定目標區域
        if (!area.is(event.target) && area.has(event.target).length === 0) {
          $(".labelchoose2").hide(1000); // 淡出消失
        }
      });
    },
    
  },
};
</script>
<style scoped src= '../assets/css/commentDetails.css'></style>
