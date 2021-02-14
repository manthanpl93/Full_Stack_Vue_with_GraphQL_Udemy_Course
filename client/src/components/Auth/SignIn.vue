<template>
  <v-container text-xs-center mt-5 pt-5>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Welcome Back!</h1>
      </v-flex>
    </v-layout>

    <v-layout row wrap mt-5>
      <v-flex xs12 sm6 offset-sm3>
        <v-card color="primary" dark>
          <v-container>
            <v-form @submit.prevent="handleSignInUser">
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="face"
                    label="Username"
                    v-model="username"
                    type="text"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="extension"
                    label="Password"
                    v-model="password"
                    type="password"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex justify-center align-center>
                  <v-btn color="secondary" type="submit">SignIn</v-btn>
                  <h3>
                    Don't have an account ?
                    <router-link to="/signup">Signup</router-link>
                  </h3>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SignIn",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  watch: {
    user(value) {
      // is user value changes, redirect to home page
      if (value) {
        this.$router.push("/");
      }
    },
  },
  methods: {
    handleSignInUser() {
      this.$store.dispatch("signinUser", {
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>