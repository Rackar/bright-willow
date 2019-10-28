<template>
  <div>
    <van-divider content-position="left">我创建的</van-divider>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="value in myList"
        :key="value._id"
        :text="value.name"
        @click="jumpToSingle(value._id)"
      >
        <van-image
          :src="
            value && value.avatarfilePath
              ? $imgServer + value.avatarfilePath
              : ''
          "
        />
        <div>{{ value.name }}</div>
      </van-grid-item>
    </van-grid>
    <van-divider content-position="left">我的收藏</van-divider>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="value in favoriteList"
        :key="value._id"
        :text="value.name"
        @click="jumpToSingle(value._id)"
      >
        <van-image
          :src="
            value && value.avatarfilePath
              ? $imgServer + value.avatarfilePath
              : ''
          "
        />
        <div>{{ value.name }}</div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
let singleStuc = {
  name: "姓名",
  avatar: "",
  id: "5d9a1eb2539da63860763ad4"
};
export default {
  data() {
    return {
      activeNames: ["1"],
      favoriteList: [],
      historyList: [],
      myList: []
    };
  },
  methods: {
    jumpToSingle(id) {
      this.$router.push(`/single/${id}`);
    },
    fetchInitData() {
      let id = this.$store.state.userid;
      if (id) {
        this.$axios
          .get("/api/person/user/" + id)
          .then(res => {
            console.log(res);
            this.myList = res.data.data;
          })
          .catch(err => {
            this.$toast("未登录");
            this.$router.push("/login");
          });
        this.$axios
          .get("/api/person/getlikings/" + id)
          .then(res => {
            console.log(res);
            this.favoriteList = res.data.data;
          })
          .catch(err => {
            // this.$toast("未登录");
          });
      }
    }
  },
  created() {
    this.fetchInitData();
  }
};
</script>

<style scoped></style>
