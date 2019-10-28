<template>
  <div class="article">
    <van-nav-bar
      title="文章"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <h3>{{ article.title }}</h3>
    <div class="text">
      <pre class="intext">{{ article.text }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    id: {
      type: String,
      default: "4"
    }
  },
  data() {
    return {
      article: { title: "标题", text: "内容" }
    };
  },
  created() {
    this.fetchArticle(this.id);
  },
  methods: {
    fetchArticle(id = "0") {
      let person = this.$store.state.currentPerson;
      let article = person.articles.find(el => el._id == id);
      if (article) {
        this.article = article;
      }
    },
    onClickLeft() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.text {
  padding: 0px 40px 0 40px;

  overflow: auto;
  white-space: pre-wrap;
}
.intext {
  white-space: pre-wrap;
  text-align: left;
  padding: 0 14px;
  line-height: 24px;
  background-image: repeating-linear-gradient(
    180deg,
    white 0,
    rgb(252, 255, 247) 23px,
    black 23px,
    black 24px
  );
}
</style>
