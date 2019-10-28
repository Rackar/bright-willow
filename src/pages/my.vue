<template>
  <div class="my">
    <h3>个人中心</h3>
    <div>
      <van-button icon="star-o" type="primary" @click="personCreate">新增人物</van-button>
    </div>
    <div>
      <van-button icon="star-o" type="primary" @click="personCreate">管理人物</van-button>
    </div>
    <div>
      <van-button icon="star-o" type="primary" @click="personCreate">个人信息</van-button>
    </div>
    <div>
      <van-button icon="star-o" type="primary" @click="personCreate">好友</van-button>
    </div>
  </div>
</template>

<script>
export default {
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