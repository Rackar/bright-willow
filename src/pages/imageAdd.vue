<template>
  <div>
    <van-nav-bar title="上传图片" left-text="返回" left-arrow @click-left="$router.back()" />
    <div style="height:350px;width:80%;margin:10px auto">
      <h2 style="margin-bottom:100px;">上传相片:</h2>
      <van-uploader
        v-model="fileList"
        :max-count="6"
        :before-read="beforeRead"
        :after-read="avatar_upload"
        @delete="delImg"
      />
    </div>
    <div style>
      <van-button @click="saveImgs">保存</van-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      fileList: [
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        // { url: "https://cloud-image", isImage: true }
      ],
      uploadedImgs: []
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
    delImg(file, detail) {
      console.log(file, detail);
      this.uploadedImgs = this.uploadedImgs.filter(
        obj => obj.name != file.file.name
      );
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
          let imageFilePath = res.data.data.filename;
          this.uploadedImgs.push({
            name: file.file.name,
            url: this.$imgServer + imageFilePath
          });
        })
        .catch(err => console.log(err));
    },
    saveImgs() {
      let data = {
        photos: this.uploadedImgs,
        personid: this.id
      };
      this.$axios
        .post("/api/person/photos", data)
        .then(res => {
          console.log(res);
          this.$toast("保存成功");

          this.$router.back();
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
</style>