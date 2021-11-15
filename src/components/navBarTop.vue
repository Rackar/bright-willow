<template>
  <div>
    <van-nav-bar
      :title="title"
      left-text="返回"
      :right-text="textRight"
      left-arrow
      @click-left="onClickLeft(callbackLeft)"
      @click-right="onClickRight(callbackRight)"
    />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "标题"
    },
    callbackLeft: {
      type: Function,
      default: function() {}
    },
    callbackRight: {
      type: Function,
      default: function() {}
    }
  },
  data() {
    return {
      textRight: "操作"
    };
  },
  methods: {
    // onClickLeft() {
    //   // this.$toast("返回");
    //   this.$router.back();
    // },
    onClickLeft(cb) {
      cb();
      let f = cb;
      if (f.toString() == "function _default() {}") {
        this.$router.back();
      }
    },
    onClickRight(cb) {
      cb();
      let f = cb;
      console.log(f.toString());
      // if (f.toString() == "function _default() {}") {
      // }
    }
  }
};
</script>
