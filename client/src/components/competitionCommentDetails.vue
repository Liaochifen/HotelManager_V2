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
        <div class="MultiFilterArea1">
          <div class="manageTags compet">
            <p class="filterP1 compet_filterP1">標籤</p>
            <template>
              <div class="tags" v-for="item in label_tags" :key="item.field">
                <el-button>{{ item.label }}</el-button>
              </div>
            </template>
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "competitionCommentDetails",
  data() {
    return {
      companyName: this.$route.params.collections,
      commentDetailsID: this.$route.params._id,
      commentData: [],
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
    };
  },
  mounted() {
    let self = this;
    axios
      .get(
        "https://hotelapi.im.nuk.edu.tw/api/commentDetails/" +
          self.companyName +
          "/" +
          self.commentDetailsID
      )
      .then((response) => {
        self.commentData = response.data;
        console.log(self.commentData);
        if (self.commentData.title === "") {
          self.commentData.title = self.commentData.text.substr(0, 10) + "...";
        }
        self.label_tags = self.labelchoose.filter((item) => {
          if (self.commentData.labels[item.field] === 1) {
            return item.label;
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {},
};
</script>
<style scoped src= '../assets/css/commentDetails.css'></style>
