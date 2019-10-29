<template>
  <div class="my">
    <!-- <h3>个人中心</h3> -->
    <!-- <div>
      <van-button icon="star-o" type="primary" @click="personCreate">
        新建人物
      </van-button>
    </div>
    <div>
      <van-button icon="star-o" type="primary" @click="personCreate">
        管理人物
      </van-button>
    </div>-->
    <div>
      <van-button icon="user-o" type="primary">
        个人信息
      </van-button>
      <van-button icon="friends-o" type="primary" style="margin-left:30px;">
        搜索
      </van-button>
    </div>
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
  methods: {
    personCreate() {
      this.$router.push("/personCreate");
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
