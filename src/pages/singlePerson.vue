<template>
  <div class="single">
    <van-nav-bar
      title="人物"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft()"
      :right-text="rightText"
      @click-right="onClickRight()"
    />

    <van-action-sheet
      v-model="actionShow"
      :actions="actions"
      @select="onSelect"
    />
    <div>
      <van-image
        round
        width="10rem"
        height="10rem"
        :src="avatarUrl"
        v-show="avatarUrl"
      />
    </div>
    <div class="bg"></div>
    <h3>{{ userinfo.name }}</h3>
    <div class="year">
      ( {{ userinfo.birthday }} - {{ userinfo.deathday }} )
    </div>
    <div class="info">{{ userinfo.info }}</div>

    <div>
      <van-divider content-position="center">文章</van-divider>
      <span
        v-show="articles.length == 0"
        @click="onSelect({ option: 'article' })"
      >
        尚未添加文章
      </span>
      <van-cell
        v-for="item in articles"
        :key="item._id"
        :title="item.title"
        :to="'/article/' + item._id"
        :value="item.value"
      />
    </div>

    <van-image
      @click="showPic"
      class="xiangce"
      width="45"
      radius="8"
      height="45"
      src="/img/xiangce.png"
    />
    <van-image-preview
      v-model="show"
      :start-position="index"
      :lazy-load="true"
      :images="images"
      @change="onChange"
    >
      <template v-slot:index>
        <div>第{{ index + 1 }}张</div>
        <div>{{ imagesRawData[index].title }}</div>
        <span class="bottom slot">{{ imageInfo }}</span>
      </template>
    </van-image-preview>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      articles: [
        // { title: "在高考的那一年里", id: "2", value: "老大" },
        // { title: "在高考的那一年里2", id: "3", value: "老2" }
      ],
      userinfo: { name: "", birthday: 0, deathday: 0, info: "" },
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ],
      imagesRawData: [],
      imageInfo: "",
      show: false,
      index: 0,
      avatarUrl: "",
      ImageList: [
        {
          url: "0",
          name: "0",
          info: "0"
        }
      ],
      rightText: "操作",
      actionShow: false,
      actions: [
        { name: "添加文章", option: "article" },
        { name: "增加照片", option: "photo" },
        { name: "编辑资料", option: "edit" },
        { name: "收藏", option: "like" },
        { name: "分享", option: "share" }
      ]
    };
  },
  props: {
    id: {
      type: String,
      default: "0"
    }
  },
  computed: {
    userid() {
      return this.$store.state.userid;
    },
    username() {
      return this.$store.state.username;
    },
    token() {
      return this.$store.state.token;
    }
  },
  created() {
    this.fetchSinglePerson(this.id);

    this.getArticlesList(this.id);
    if (!this.token) {
      this.rightText = "";
    } else {
      this.rightText = "操作";
    }
  },
  methods: {
    cb() {
      this.$toast("成功了");
    },
    fetchSinglePerson(id = 0) {
      this.userinfo = {
        name: "",
        birthday: 2018,
        deathday: 2019,
        info: ""
      };
      id = this.id;
      this.$axios
        .get("/noauth/person/" + id)
        .then(res => {
          console.log(res);
          this.$store.commit("setCurrentPerson", res.data.data);
          this.userinfo = res.data.data;
          this.articles = this.userinfo.articles;
          this.avatarUrl = this.$imgServer + res.data.data.avatarfilePath;
          this.imagesRawData = this.userinfo.photos;
          this.getImagesList();
        })
        .catch(err => {
          this.$toast("获取数据错误" + err);
        });
    },
    getImagesList() {
      var ImageList = this.imagesRawData;
      this.ImageList = ImageList;
      this.images = ImageList.map(data => data.url);
      this.onChange(0);
    },
    getArticlesList(id) {},
    showPic() {
      if (this.images.length) {
        this.show = true;
      } else {
        this.$toast.fail("尚无照片，请上传");
      }
    },
    onChange(index) {
      this.index = index;
      if (this.ImageList[index]) this.imageInfo = this.ImageList[index].info;
    },
    onClickLeft() {
      // this.$toast("返回");
      this.$router.push("/list");
    },
    onClickRight() {
      this.actionShow = true;
    },
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.actionShow = false;
      // this.$toast(item.name);
      if (item.option == "article") {
        this.$router.push("/articleCreate/" + this.id);
      } else if (item.option == "photo") {
        this.$router.push("/imageAdd/" + this.id);
      } else if (item.option == "edit") {
        this.$router.push("/personEdit/" + this.id);
      } else if (item.option == "share") {
        this.copyPath();
      } else if (item.option == "like") {
        let data = {
          _id: this.id,
          userid: this.userid,
          username: this.username
        };
        this.$axios
          .post("/api/person/liked", data)
          .then(res => {
            console.log(res);
            this.$toast(res.data.msg);
          })
          .catch(err => {
            this.$toast("获取数据错误" + err);
          });
      }
    },
    copyPath() {
      let copyStr =
        location.href +
        ` #点击打开为${this.userinfo.name}做的纪念。你可以注册一下，也能共同添加文章和照片。`;
      // debugger;
      const oInput = document.createElement("input");
      // oInput.style.display = "none";
      // 把文字放进input中，供复制
      oInput.value = copyStr;
      document.body.appendChild(oInput);
      // 选中创建的input
      oInput.select();
      // 执行复制方法， 该方法返回bool类型的结果，告诉我们是否复制成功
      const copyResult = document.execCommand("copy");
      // 操作中完成后 从Dom中删除创建的input
      document.body.removeChild(oInput);
      if (copyResult) {
        this.$toast("地址已复制到剪贴板，可直接粘贴给好友");
      }
    }
  }
};
</script>

<style>
.bg {
  position: absolute;
  width: 100%;
  height: 580px;
  top: 46px;
  left: 0;
  z-index: -1;
  background-image: url("/img/bg_single.png");
  background-size: 100%;
  background-repeat: no-repeat;
  /* background-position-y: 100%; */
  filter: blur(2px);
}
.single div.info {
  margin: 5px 25px;
  height: 100px;
  color: #3b3b3b;
  text-align: left;
  overflow: scroll;
}
.single .year {
  font-size: 13px;
  color: grey;
  margin-top: -10px;
  margin-bottom: 10px;
}
.swipeImg {
  width: 30px;
  height: 50px;
}
.slot.bottom {
  position: fixed;
  width: 200px;
  top: 0px;
  left: -80px;
  margin-top: 90vh;
}
.xiangce {
  -moz-box-shadow: 4px 4px 2px #6b6b6b;
  -webkit-box-shadow: 4px 4px 2px #6b6b6b;
  box-shadow: 4px 4px 2px #6b6b6b;
  position: fixed;
  bottom: 65px;
  right: 15px;
}
</style>
