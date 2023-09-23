<template>
  <div>
    <h1>All Posts</h1>
    <br />

    <button type="button" @click="showPosts(firstPage)">First Page</button>
    <button type="button" @click="showPosts(prevPage)">Prev</button>
    <div
      class="pagination"
      v-for="(bt, index) in postsData.length / perPage"
      :key="index"
    >
      <button type="button" @click="showPosts(index)">{{ index + 1 }}</button>
    </div>
    <button type="button" @click="showPosts(nextPage)">Next</button>
    <button type="button" @click="showPosts(lastPage)">Last Page</button>
    <br />
    <!-- Card Start -->
    <div class="container">
      <div class="card" v-for="(p, index) in paginationPosts" :key="index">
        <div class="card__header">
          <img
            src="https://source.unsplash.com/600x400/?computer"
            alt="card__image"
            class="card__image"
            width="600"
          />
        </div>
        <div class="card__body">
          <span class="tag tag-blue">Technology</span>
          <h4>{{ p.title }}</h4>
          <!-- <p>Description Here</p>  -->

          <router-link :to="{ name: 'post-details', params: { id: p.id } }">
            <button class="learn-more">
              <span class="circle" aria-hidden="true">
                <span class="icon arrow"></span>
              </span>
              <span class="button-text">Learn More</span>
            </button>
          </router-link>
        </div>
        <!-- <div class="card__footer">
          <div class="user">
            <img
              src="https://i.pravatar.cc/40?img=1"
              alt="user__image"
              class="user__image"
            />
            <div class="user__info">
              <h5>Jane Doe</h5>
              <small>2h ago</small>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <!-- Card End -->

    <!-- Pagination -->
    <!-- <pagination  v-model="page" :records="postsData.length" :per-page="10" @pagination ="myCallback" ></pagination> -->
  </div>
</template>

<script>
// import Pagination from 'vue-pagination-2';

export default {
  name: "postsComponent",
  props: ["posts", "postId"],
  data() {
    return {
      postsData: [],
      perPage: 10,
      page: 0,
    };
  },
  //   components: {
  //     Pagination,
  //   },
  methods: {
    async fetchPostsAPIData() {
      const url = "https://jsonplaceholder.typicode.com/posts";
      const options = {
        method: "GET",
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        this.postsData = result;
        this.showPosts(this.page);
      } catch (error) {
        console.error(error);
      }
    },
    // myCallback(page){
    //     return page
    // },
    showPosts(page) {
      // console.log(allPosts.slice(0,10))
      // this.paginationPosts = this.postsData.slice(page,this.perPage);
      this.page = page;
    },
  },
  computed: {
    paginationPosts() {
      let firstPageIndex = this.page * this.perPage;
      let lastPageIndex = firstPageIndex + this.perPage;
      return this.postsData.slice(firstPageIndex, lastPageIndex);

      // return this.postsData.slice( (this.perPage * this.page), this.perPage)
      // return this.postsData.slice(this.page, this.perpage) //Error : Minus 1 elemnet from array
    },

    nextPage() {
      return this.page + 1;
    },
    firstPage() {
      return 0;
    },
    lastPage() {
      return Math.ceil(this.postsData.length / this.perPage) - 1;
    },
    prevPage() {
      return this.page - 1;
    },
  },
  mounted() {
    this.fetchPostsAPIData();
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap");
// @import url("https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css");

.pagination {
  display: inline;
}

button {
  padding: 10px;
  margin: 2px;
}

.active {
  background-color: blueviolet;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  font-family: "Quicksand", sans-serif;
  display: grid;
  place-items: center;
  height: 100vh;
  background: #7f7fd5;
  background: linear-gradient(to right, #91eae4, #86a8e7, #7f7fd5);
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1200px;
  margin-block: 2rem;
  gap: 2rem;
  display: inline-flex;
}

img {
  max-width: 100%;
  display: block;
  object-fit: cover;
}

.card {
  display: flex;
  flex-direction: column;
  width: clamp(20rem, calc(20rem + 2vw), 22rem);
  overflow: hidden;
  box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 1em;
  background: #ece9e6;
  background: linear-gradient(to right, #ffffff, #ece9e6);
}

.card__body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tag {
  align-self: flex-start;
  padding: 0.25em 0.75em;
  border-radius: 1em;
  font-size: 0.75rem;
}

.tag + .tag {
  margin-left: 0.5em;
}

.tag-blue {
  background: #56ccf2;
  background: linear-gradient(to bottom, #2f80ed, #56ccf2);
  color: #fafafa;
}

.tag-brown {
  background: #d1913c;
  background: linear-gradient(to bottom, #ffd194, #d1913c);
  color: #fafafa;
}

.tag-red {
  background: #cb2d3e;
  background: linear-gradient(to bottom, #ef473a, #cb2d3e);
  color: #fafafa;
}

.card__body h4 {
  font-size: 1.5rem;
  text-transform: capitalize;
}

.card__footer {
  display: flex;
  padding: 1rem;
  margin-top: auto;
}

.user {
  display: flex;
  gap: 0.5rem;
}

.user__image {
  border-radius: 50%;
}

.user__info > small {
  color: #666;
}

// Read More Button Start
button {
 position: relative;
 display: inline-block;
 cursor: pointer;
 outline: none;
 border: 0;
 vertical-align: middle;
 text-decoration: none;
 background: transparent;
 padding: 0;
 font-size: inherit;
 font-family: inherit;
}

button.learn-more {
 width: 12rem;
 height: auto;
}

button.learn-more .circle {
 transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
 position: relative;
 display: block;
 margin: 0;
 width: 3rem;
 height: 3rem;
 background: #282936;
 border-radius: 1.625rem;
}

button.learn-more .circle .icon {
 transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
 position: absolute;
 top: 0;
 bottom: 0;
 margin: auto;
 background: #fff;
}

button.learn-more .circle .icon.arrow {
 transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
 left: 0.625rem;
 width: 1.125rem;
 height: 0.125rem;
 background: none;
}

button.learn-more .circle .icon.arrow::before {
 position: absolute;
 content: "";
 top: -0.29rem;
 right: 0.0625rem;
 width: 0.625rem;
 height: 0.625rem;
 border-top: 0.125rem solid #fff;
 border-right: 0.125rem solid #fff;
 transform: rotate(45deg);
}

button.learn-more .button-text {
 transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 padding: 0.75rem 0;
 margin: 0 0 0 1.85rem;
 color: #282936;
 font-weight: 700;
 line-height: 1.6;
 text-align: center;
 text-transform: uppercase;
}

button:hover .circle {
 width: 100%;
}

button:hover .circle .icon.arrow {
 background: #fff;
 transform: translate(1rem, 0);
}

button:hover .button-text {
 color: #fff;
}
// Read More Button End
</style>