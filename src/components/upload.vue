<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="apiPath"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      name="avatar"
      type="file"
      :headers="headers"
      :data="uploadData"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

    {{ this.done }}
  </div>
</template>

<script>
export default {
  props: {
    uploadType: {
      type: Object,
      default() {
        return {
          type: "",
          data: ""
        };
      }
    }
  },
  computed: {
    headers() {
      return { Authorization: this.$store.state.token };
    },
    apiPath() {
      if (this.uploadType.type == "avatar") return "/api/user/image";
      else if (this.uploadType.type == "articleImage")
        return "/api/article/image";
      else return "";
    }
  },
  data() {
    return {
      uploadData: {},
      newsrc: "",
      done: "",
      imageUrl: "",
      fileList: [],
      results: [
        {
          path: "上传文件路径"
        }
      ]
    };
  },
  methods: {
    // getImage() {
    //   function transformArrayBufferToBase64(buffer) {
    //     var binary = "";
    //     var bytes = new Uint8Array(buffer);
    //     for (var len = bytes.byteLength, i = 0; i < len; i++) {
    //       binary += String.fromCharCode(bytes[i]);
    //     }
    //     return window.btoa(binary);
    //   }
    //   this.$axios.get("/getoneimage/" + this.$store.state.userid).then(res => {
    //     console.log(res);
    //     this.newsrc =
    //       "data:image/jpeg;base64," +
    //       transformArrayBufferToBase64(res.data.img.data.data);
    //   });
    // },
    //
    // handleExceed(files, fileList) {
    //   this.$message.warning(
    //     `当前限制选择 3 个文件，本次选择了 ${
    //       files.length
    //     } 个文件，共选择了 ${files.length + fileList.length} 个文件`
    //   );
    // },
    // beforeRemove(file, fileList) {
    //   return this.$confirm(`确定移除 ${file.name}？`);
    // },
    // handleSuccess(event, file, fileList) {
    //   console.log(event, file, fileList);
    //   this.results.push(event.data);
    // },
    handleAvatarSuccess(res, file) {
      // debugger;
      this.imageUrl = URL.createObjectURL(file.raw);
      // this.results.push(res.data);
      console.log(res.data);
      if (res.data && res.data.path) {
        this.done = res.data.path;
        this.$message({
          showClose: true,
          duration: 1000,
          type: "success",
          message: "上传成功"
        });
        if (res.previewImageId) {
          this.$emit("uploadedImageId", res.previewImageId);
        }
      } else {
        this.$message({
          showClose: true,
          duration: 1000,
          type: "error",
          message: "上传失败"
        });
      }
    },
    beforeAvatarUpload(file) {
      if (this.uploadType.type == "avatar") {
        this.uploadData = {};
      } else if (this.uploadType.type == "articleImage") {
        this.uploadData = { previewImageId: "" };
      } else {
        this.uploadData = {};
      }
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message({
          showClose: true,
          duration: 1000,
          type: "error",
          message: "上传头像图片只能是 JPG/PNG 格式!"
        });
      }
      if (!isLt2M) {
        this.$message({
          showClose: true,
          duration: 1000,
          type: "error",
          message: "上传头像图片大小不能超过 2MB!"
        });
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
