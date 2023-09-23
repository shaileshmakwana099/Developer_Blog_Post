<template>
  <div>
    <posts-component/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import PostsComponent from '../components/PostsComponent.vue'

export default {
  components: {
    PostsComponent
  }
}
</script>
