<template>
  <div class="home">
    <v-container text-xs-center v-if="posts">
      <v-layout row>
        <v-dialog v-model="loading" persistent fullscreen>
          <v-container fill-height>
            <v-layout row justify-center align-center>
              <v-progress-circular
                indeterminate
                :size="70"
                :width="7"
                color="secondary"
              ></v-progress-circular>
            </v-layout>
          </v-container>
        </v-dialog>
      </v-layout>
      <v-flex xs12 style="z-index: 1">
        <v-carousel
          v-if="!loading && posts.length > 0"
          v-bind="{ cycle: true }"
          interval="3000"
          hide-delimiters
        >
          <v-carousel-item
            v-for="post in posts"
            :key="post._id"
            :src="post.imageUrl"
            @click.native="goToPost(post._id)"
          >
            <h1 id="carousel__title">{{ post.title }}</h1>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Home",
  created() {
    this.handleGetCarousalPosts();
  },
  computed: {
    ...mapGetters(["loading", "posts"]),
  },
  methods: {
    handleGetCarousalPosts() {
      this.$store.dispatch("getPosts");
    },
    goToPost(postId) {
      this.$router.push(`/posts/${postId}`);
    },
  },
};
</script>

<style scoped>
#carousel__title {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 5px 5px 0 0;
  padding: 0.5em;
  margin: 0 auto;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
