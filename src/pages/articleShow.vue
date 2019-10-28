<template>
  <div class="article">
    <navBarTop title="文章" />
    <h3>{{article.title}}</h3>
    <div class="text">
      <pre style="white-space: pre-wrap; text-align:left;padding:16px;">{{article.text}}</pre>
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

<style  scoped>
.article {
  background-image: url("/img/paper.jpg");
  background-size: 100%;
  background-repeat: repeat-y;
}
.text {
  padding: 12px 40px 0 40px;
  line-height: 23px;
  width: 80%;
  overflow: auto;
  white-space: pre-wrap;
}
</style>