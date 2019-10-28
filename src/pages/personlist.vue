<template>
  <div>
    <personlist listApiUrl="/noauth/person/popular" listName="推荐" />
    <personlist listApiUrl="/noauth/person/newest" listName="最新" />
  </div>
</template>

<script>
import personlist from "../components/personList";
export default {
  components: {
    personlist
  }
};
</script>

<style scoped></style>
