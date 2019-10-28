<template>
  <div class="homepage">
    <div>
      <h2>明柳之心</h2>
      <div class="subtitle">死亡不是永别，忘记才是</div>
      <div class="subtitle">为那些最珍贵的人做纪念</div>

      <div class="button-group" v-if="!logined">
        <van-button
          icon="star-o"
          type="primary"
          @click="$router.push('/signup')"
          >注册</van-button
        >
        <van-button
          icon="star-o"
          type="info"
          @click="$router.push('/login')"
          style="margin-left:30px;"
          >登录</van-button
        >
      </div>
      <div class="button-group" v-if="logined">
        <van-button icon="star-o" type="primary" @click="personCreate"
          >新建人物</van-button
        >
        <van-button
          icon="star-o"
          type="warning"
          @click="$store.commit('logout_delToken')"
          style="margin-left:30px;"
          >登出</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    personCreate() {
      this.$router.push("/personCreate");
    }
  },
  computed: {
    logined() {
      return this.$store.state.token;
    }
  }
};
</script>

<style lang="scss" scoped>
.homepage {
  background-image: url("/img/bg2.jpg");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position-y: 100%;
  // filter: blur(2px);

  background-color: aliceblue;
  height: 92vh;
  h2 {
    margin: 0 0 80px 0;
    padding-top: 160px;
  }
  .subtitle {
    margin: 40px 0 0 0;
  }
  .button-group {
    margin: 40px 0 0 0;
  }
}
</style>
