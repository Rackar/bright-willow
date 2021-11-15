<template>
  <div id="app">
    <mainPage />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import mainPage from "./components/main.vue";
@Component({
  components: {
    mainPage
  }
})
export default class App extends Vue {
  // @Prop() private msg!: string;
  created() {
    let token: string = window.localStorage.token;
    if (token) this.$store.commit("login_saveToken", token);
  }
}
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav.router-link-exact-active {
  color: #42b983;
}
</style>
