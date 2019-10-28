<template>
  <div>
    <h2 style="text-align:center">登录</h2>
    <van-cell-group>
      <!-- <van-field v-model="form.user_name" label="用户名" placeholder="请输入用户名" required /> -->
      <van-field v-model="form.mobile" label="手机号" placeholder="请输入手机号" required />
      <van-field v-model="form.password" type="password" label="密码" placeholder="请输入密码" required />
    </van-cell-group>
    <van-button @click="onSubmit">登录</van-button>
    <van-button @click="$router.push('/signup')" style="margin-left:20px;">注册</van-button>
    <van-overlay :show="loading" style="z-index:3;" class-name="myover">
      <van-loading type="spinner" color="#1989fa" vertical style="margin-top:100px;">加载中...</van-loading>
    </van-overlay>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loading: false,
      form: {
        user_name: "",
        real_name: "",
        mobile: "",
        birthday: "",
        sex: "",
        password: "",
        password2: ""
      },
      rules: {
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "change" }]
      }
    };
  },
  methods: {
    onSubmit(formName) {
      this.loading = true;
      this.$axios
        .post("/noauth/login", {
          mobile: this.form.mobile,
          pwd: this.form.password
        })
        .then(res => {
          if (res.data.status == 1) {
            this.loading = false;

            console.log(res.data);

            this.$toast({
              duration: 1500,
              type: "success",
              message: res.data && res.data.msg
            });

            let token = res.data.data.token;

            this.$store.commit("login_saveToken", token);

            let previousUrl = "/home";
            if (this.$route.query && this.$route.query.redirect)
              previousUrl = this.$route.query.redirect;
            this.$router.push(previousUrl);
          } else {
            this.loading = false;
            this.$toast({
              duration: 1500,
              type: "fail",
              message: res.data && res.data.msg
            });
          }
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
          this.$toast({
            duration: 1500,
            type: "error",
            message: err.response.data.msg
          });
        });
    }
  }
};
</script>
<style >
.myover {
  z-index: 3 !important;
  background-color: rgba(128, 128, 128, 0.3);
}
</style>
