<template>
  <div>
    <h1>Title : {{ postDetails.title }}</h1>
    <p>Description : {{ postDetails.body }}</p>
    <br>
    <h1>Comments</h1>
    <comments-component />
    
  </div>
</template>

<script>
import route from "@/router";
import CommentsComponent from '@/components/CommentsComponent.vue';
export default {
  components: { CommentsComponent },
  name: "post-details",
  data() {
    return {
      postDetails: {},
    };
  },
  methods: {
    async fetchPostsAPIData(id) {
      const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
      const options = {
        method: "GET",
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        this.postDetails = result;
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.fetchPostsAPIData(this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
</style>