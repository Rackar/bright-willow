<template>
  <div>
    <van-nav-bar
      title="新增文章"
      left-text="返回"
      right-text="保存"
      left-arrow
      @click-left="onClickLeft"
      @click-right="saveArticle"
    />
    <van-cell-group>
      <div>标题</div>

      <van-field v-model="title" placeholder="请输入标题" />
      <div>正文</div>
      <van-field
        v-model="text"
        type="textarea"
        placeholder="请输入文章"
        rows="15"
        autosize
      />
      <van-button type="primary" @click="saveArticle">保存</van-button>
    </van-cell-group>
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
  created() {
    if (!this.$store.state.token) {
      this.$router.push("/login");
    }
  },
  data() {
    return {
      title: "",
      text: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    saveArticle() {
      var obj = {
        personid: this.id,
        createrid: this.$store.state.userid,
        title: this.title,
        text: this.text
      };
      this.$axios.post("/api/person/article", obj).then(res => {
        console.log(res);
        this.$toast("保存成功");

        this.$router.back();
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
