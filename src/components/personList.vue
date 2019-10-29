<template>
  <div>
    <van-divider content-position="left">{{ listName }}</van-divider>
    <van-grid :gutter="10">
      <span style="font-size:14px;" v-show="!(myList && myList.length)">
        暂无
      </span>
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
  </div>
</template>

<script>
let singleStuc = {
  name: "姓名",
  avatar: "",
  id: "5d9a1eb2539da63860763ad4"
};
export default {
  props: {
    listName: {
      type: String,
      default: ""
    },
    listApiUrl: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      myList: []
    };
  },
  methods: {
    jumpToSingle(id) {
      this.$router.push(`/single/${id}`);
    },
    fetchInitData() {
      let userid = this.$store.state.userid;
      if (userid) {
        // let data = {
        //   params: {
        //     id: userid
        //   }
        // };
        this.$axios
          // .get("/api/person/user/" + id, data)
          .post(this.listApiUrl)
          .then(res => {
            console.log(res);
            this.myList = res.data.data;
          })
          .catch(err => {
            // this.$toast("请登录");
            // this.$router.push("/login");
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
