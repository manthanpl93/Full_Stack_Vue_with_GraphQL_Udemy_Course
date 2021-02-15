<template>
  <v-container text-xs-center mt-5 pt-5>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Welcome Back!</h1>
      </v-flex>
    </v-layout>

    <!-- Error Alert -->
    <v-layout v-if="error" row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <form-alert :message="error.message"></form-alert>
      </v-flex>
    </v-layout>

    <v-layout row wrap mt-5>
      <v-flex xs12 sm6 offset-sm3>
        <v-card color="primary" dark>
          <v-container>
            <v-form
              v-model="isFormValid"
              lazy-validation
              ref="form"
              @submit.prevent="handleSignInUser"
            >
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    :rules="usernameRules"
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
                    :rules="passwordRules"
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
                  <v-btn
                    :loading="loading"
                    :disabled="!isFormValid || loading"
                    color="secondary"
                    type="submit"
                  >
                    <span slot="loader" class="custom-loader">
                      <v-icon light>cached</v-icon>
                    </span>
                    SignIn
                  </v-btn>
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
      isFormValid: true,
      username: "",
      password: "",
      usernameRules: [
        (username) => !!username || "Username is required",
        (username) =>
          username.length < 15 || "Username mustb be less than 15 characters",
      ],
      passwordRules: [(password) => !!password || "Password is required"],
    };
  },
  computed: {
    ...mapGetters(["loading", "user", "error"]),
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
      if (this.$refs.form.validate()) {
        this.$store.dispatch("signinUser", {
          username: this.username,
          password: this.password,
        });
      }
    },
  },
};
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>