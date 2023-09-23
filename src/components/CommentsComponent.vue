<template>
  <div>
    <div class="card" v-for="(c, index) in commentsData" :key="index">
      <p class="cookieHeading">Name : {{ c.name }}</p>
      <p class="cookieHeading">Email : {{ c.email }}</p>
      <p class="cookieDescription">Description : {{ c.body }}</p>
    </div>
  </div>
</template>

<script>
import route from "@/router";
export default {
  name: "commentsCommponet",
  data() {
    return {
      commentsData: {},
    };
  },
  methods: {
    async fetchCommentsData(id) {
      const url = `https://jsonplaceholder.typicode.com/posts/${id}/comments`;
      const options = {
        method: "GET",
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        this.commentsData = result;
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.fetchCommentsData(this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>

</style>