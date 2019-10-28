<template>
  <div>
    <h2 style="text-align:center">登录</h2>
    <van-cell-group>
      <!-- <van-field v-model="form.user_name" label="用户名" placeholder="请输入用户名" required /> -->
      <van-field
        v-model="form.tel"
        label="手机号"
        placeholder="请输入手机号"
        required
      />
      <van-field
        v-model="form.password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <van-field
        v-model="form.password2"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <van-field
        v-model="form.user_name"
        label="昵称"
        placeholder="请输入昵称"
        required
      />
    </van-cell-group>
    <van-button @click="onSubmit">注册</van-button>
    <van-button @click="$router.push('/login')" style="margin-left:20px;">
      登录
    </van-button>
    <!-- <h2 style="text-align:center">注册账号</h2> -->
  </div>
</template>

<script>
export default {
  name: "sighup",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.password2 !== "") {
          this.$refs.form.validateField("password2");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      loading: false,
      form: {
        user_name: "",
        real_name: "",
        tel: "",
        birthday: "",
        sex: "",
        password: "",
        password2: ""
      },
      rules: {
        user_name: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        password2: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        tel: [{ required: true, message: "请输入电话号码", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit(formName) {
      console.log("submit!");

      this.loading = true;
      var form = {
        username: this.form.user_name,
        mobile: this.form.tel,
        pwd: this.form.password
      };
      this.$axios
        .post("/noauth/signup", form)
        .then(res => {
          console.log(res);
          // debugger;
          if (res.status == 200) {
            //   this.totalstars -= stars;
            this.$toast({
              duration: 1500,
              type: "success",
              message: res.data.msg
            });
            this.$router.push("/login");
          } else {
            this.$toast.fail("手机号已注册");
          }
        })
        .catch(err => {
          console.log(err);
          this.$toast({
            duration: 1500,
            type: "fail",
            message: "手机号已注册"
          });
        });
    }
  }
};
</script>
