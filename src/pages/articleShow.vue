<template>
  <div class="article">
    <navBarTop title="文章" />
    <h3>{{ article.title }}</h3>
    <div class="text">
      <pre class="intext">{{ article.text }}</pre>
    </div>

    <!-- <div>前一篇 下一篇</div> -->
  </div>
</template>

<script>
import navBarTop from "../components/navBarTop";
export default {
  components: {
    navBarTop
  },
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
