<template>
  <div>
    <h3>新建人物</h3>
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
        @blur="yearRule(birthday)"
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
        @blur="yearRule(deathday)"
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
  created() {
    if (!this.$store.state.token) {
      this.$router.push("/login");
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
      var year = value.getFullYear();
      let month = value.getMonth() + 1;
      let today = year + "." + (Array(2).join(0) + month).slice(-2);
      // var today = value;
      // today.setHours(today.getHours() + 8);
      // today = today.toISOString().substring(0, 7);
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
      if (this.name == "") {
        this.$toast.fail("姓名不能为空");
        return;
      }
      let person = {
        name: this.name,
        birthday: this.birthday,
        deathday: this.deathday,
        info: this.info,
        avatarfilePath: this.avatarfilePath,
        createrId: this.$store.state.userid
      };
      this.$axios.post("/api/person", person).then(res => {
        console.log(res);
        if (res.status == 200 && res.data.status == 1) {
          this.$router.push("/list");
        } else {
          this.$toast.fail("保存出现问题，请重试");
        }
      });
    },
    yearRule(day) {
      if (day.indexOf(".") == -1 || day.length > 7 || day.length < 4) {
        this.$toast("年月格式不符，点击右侧按钮选择年月");
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
