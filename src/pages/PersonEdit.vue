<template>
  <div>
    <van-nav-bar
      title="编辑"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <h3>编辑人物资料</h3>
    <van-cell-group>
      <van-field
        v-model="name"
        required
        clearable
        label="姓名"
        placeholder="请输入姓名"
        @click-right-icon="$toast('question')"
      />
      <van-field
        v-model="birthday"
        center
        clearable
        label="出生年月"
        placeholder="输入格式：1950.05"
      >
        <van-button
          slot="button"
          @click="openPickDay('birth')"
          size="small"
          type="primary"
        >
          年月选择
        </van-button>
      </van-field>
      <van-field
        v-model="deathday"
        center
        clearable
        label="去世年月"
        placeholder="健在留空或2000.05"
      >
        <van-button
          slot="button"
          @click="openPickDay('death')"
          size="small"
          type="primary"
        >
          年月选择
        </van-button>
      </van-field>

      <van-field
        v-model="info"
        label="生平"
        type="textarea"
        placeholder="请输入"
        rows="5"
        autosize
      />

      <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          v-model="currentDate"
          type="year-month"
          :min-date="minDate"
          :formatter="formatter"
          @confirm="pickedBirthday"
          @cancel="cancelBirthday"
          cancel-button-text="清除"
        />
      </van-popup>
    </van-cell-group>
    <div>
      <div>上传头像:</div>
      <van-uploader
        v-model="fileList"
        :max-count="1"
        :before-read="beforeRead"
        :after-read="avatar_upload"
        @delete="delImg"
      />
    </div>
    <div>
      <van-button @click="savePerson">保存</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [
        // { url: "https://img.yzcdn.cn/vant/cat.jpeg" },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        // { url: "https://cloud-image", isImage: true }
      ],
      info: "",
      opendPickDay: "",
      birthday: "",
      deathday: "",
      avatarfilePath: "",

      minDate: new Date(1000, 1, 1),
      maxDate: new Date(2025, 10, 1),
      name: "",
      currentDate: new Date(),
      show: false
    };
  },
  props: {
    id: {
      type: String,
      default: "0"
    }
  },
  created() {
    if (!this.$store.state.token) {
      this.$router.push("/login");
    } else {
      this.$axios
        .get("/api/person/" + this.id)
        .then(res => {
          console.log(res);
          this.$store.commit("setCurrentPerson", res.data.data);
          let userinfo = res.data.data;
          this.name = userinfo.name;
          this.birthday = userinfo.birthday;
          this.deathday = userinfo.deathday;
          this.info = userinfo.info;
          this.fileList.push({
            url: this.$imgServer + userinfo.avatarfilePath
          });
          this.avatarfilePath = userinfo.avatarfilePath;
          // this.articles = this.userinfo.articles;
          // this.avatarUrl = this.$imgServer + res.data.data.avatarfilePath;
          // this.imagesRawData = this.userinfo.photos;
          // this.getImagesList();
        })
        .catch(err => {
          this.$toast("获取数据错误" + err);
        });
    }
  },
  methods: {
    // 返回布尔值
    beforeRead(file) {
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        this.$toast("请上传 jpg/png 格式图片");
        return false;
      }

      return true;
    },
    onClickLeft() {
      // this.$toast("返回");
      this.$router.push("/list");
    },
    avatar_upload(file) {
      console.log(file);
      let obj = {
        img: file,
        userid: "id"
      };

      let data = new FormData();
      data.append("avatar", file.file);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.$axios
        .post("/noauth/upload/image", data, config)
        .then(res => {
          console.log(res);
          this.avatarfilePath = res.data.data.filename;
        })
        .catch(err => console.log(err));
    },
    openPickDay(type) {
      this.show = true;
      this.opendPickDay = type;
    },
    cancelBirthday() {
      if (this.opendPickDay == "birth") this.birthday = "";
      else if (this.opendPickDay == "death") this.deathday = "";
      this.show = false;
    },
    pickedBirthday(value) {
      console.log(value);
      var year = value.getFullYear();
      let month = value.getMonth();
      let today = year + "." + month;
      // var today = value;
      // today.setHours(today.getHours() + 8);
      // today = today.toISOString().substring(0, 7);
      console.log(today);
      this.show = false;
      if (this.opendPickDay == "birth") this.birthday = today;
      else if (this.opendPickDay == "death") this.deathday = today;
      this.opendPickDay = "";
    },
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      }
      return value;
    },

    savePerson() {
      let person = {
        _id: this.id,
        name: this.name,
        birthday: this.birthday,
        deathday: this.deathday,
        info: this.info,
        avatarfilePath: this.avatarfilePath,
        createrId: this.$store.state.userid
      };
      this.$axios.put("/api/person", person).then(res => {
        console.log(res);
        if (res.status == 200 && res.data.status == 1) {
          this.$router.back();
        } else {
          this.$toast.fail("保存出现问题，请重试");
        }
      });
      // this.$axios.post("/api/person", person).then(res => {
      //   console.log(res);
      //   if (res.status == 200 && res.data.status == 1) {
      //     this.$router.back();
      //   } else {
      //     this.$toast.fail("保存出现问题，请重试");
      //   }
      // });
    },
    delImg(file, detail) {
      this.avatarfilePath = "";
    }
  }
};
</script>

<style lang="scss" scoped></style>
