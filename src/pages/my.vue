<template>
  <div class="my">
    <div>
      <van-tag mark plain type="success" size="large">{{ username }}</van-tag>
      <van-button icon="user-o" type="primary" style="margin-left:30px;">
        信息修改
      </van-button>
      <van-cell-group>
        <van-field
          v-model="searchName"
          center
          clearable
          label="搜索"
          placeholder="请输入人名"
        >
          <van-button slot="button" size="small" type="primary" @click="search">
            搜索
          </van-button>
        </van-field>
      </van-cell-group>
    </div>
    <personlist
      v-if="ifSearch"
      :listApiUrl="'/noauth/person/search/'"
      :postBody="{ name: searchName }"
      listName="搜索结果"
    />
    <personlist listApiUrl="/api/person/user" listName="我创建的" />
    <personlist listApiUrl="/api/person/getlikings" listName="我的收藏" />
  </div>
</template>

<script>
import personlist from "../components/personList";
export default {
  components: {
    personlist
  },
  computed: {
    username() {
      return this.$store.state.username;
    }
  },
  data() {
    return {
      searchName: "",
      ifSearch: false
    };
  },
  methods: {
    personCreate() {
      this.$router.push("/personCreate");
    },
    search() {
      if (this.searchName === "") {
        this.$toast("关键词为空");
      } else {
        this.ifSearch = true;
        // this.$axios
        //   .get("/noauth/person/search/" + this.searchName)
        //   .then(res => {
        //     console.log(res);
        //     if (res.status == 200 && res.data.status == 1) {
        //       this.$toast.fail("搜索成");
        //     } else {
        //       this.$toast.fail("搜索失败");
        //     }
        //   });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.my {
  div {
    margin: 20px;
  }
}
</style>
