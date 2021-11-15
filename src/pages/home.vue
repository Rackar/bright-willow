<template>
  <div class="homepage">
    <div>
      <h2>明 柳</h2>
      <!-- <div class="subtitle">死亡不是永别，忘记才是。</div> -->
      <div class="subtitle">记念那些最珍贵的人</div>

      <div class="button-group" v-if="!logined">
        <van-button
          icon="friends-o"
          type="primary"
          @click="$router.push('/signup')"
        >
          注册
        </van-button>
        <van-button
          icon="manager-o"
          type="info"
          @click="$router.push('/login')"
          style="margin-left:30px;"
        >
          登录
        </van-button>
      </div>
      <div class="button-group" v-if="logined">
        <van-button icon="star-o" type="primary" @click="personCreate">
          新建人物
        </van-button>
        <van-button
          icon="close"
          type="warning"
          @click="$store.commit('logout_delToken')"
          style="margin-left:30px;"
        >
          注销
        </van-button>
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

<style>
.homepage {
  background-image: url("../assets/bg_home.jpg");
  background-size: 100%;
  background-repeat: no-repeat;

  background-color: aliceblue;
  height: 92vh;
}
.homepage h2 {
  margin: 0 0 60px 0;
  padding-top: 140px;
  font-family: cursive;
  font-size: xx-large;
}
.homepage .subtitle {
  margin: 30px 0 0 0;
  font-family: cursive;
  font-size: x-large;
}
.homepage .button-group {
  margin: 40px 0 0 0;
}
</style>
