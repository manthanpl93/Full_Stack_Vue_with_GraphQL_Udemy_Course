<template>
  <div class="home">
    <v-container text-xs-center v-if="getPosts">
      <v-flex xs12>
        <v-carousel v-bind="{ cycle: true }" interval="3000">
          <v-carousel-item
            v-for="post in getPosts"
            :key="post._id"
            :src="post.imageUrl"
          >
            <h1 id="carousel__title">{{ post.title }}</h1>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
import { gql } from "apollo-boost";
export default {
  name: "Home",
  data() {
    return {
      posts: [],
    };
  },
  apollo: {
    getPosts: {
      query: gql`
        query {
          getPosts {
            _id
            title
            imageUrl
            categories
            description
            createdDate
            likes
            createdBy {
              _id
              username
              email
              password
              joinDate
            }
          }
        }
      `,
      result({ data, loading }) {
        if (!loading) {
          this.posts = data.getPosts();
        }
      },
      error(err) {
        console.error(err);
      },
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
