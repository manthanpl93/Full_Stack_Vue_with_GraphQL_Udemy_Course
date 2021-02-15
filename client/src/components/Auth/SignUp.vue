<template>
  <v-container text-xs-center mt-5 pt-5>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Get Started Here</h1>
      </v-flex>
    </v-layout>

    <!-- Error Alert -->
    <v-layout v-if="error" row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <form-alert :message="error.message"></form-alert>
      </v-flex>
    </v-layout>

    <!-- Signup Form -->
    <v-layout row wrap mt-5>
      <v-flex xs12 sm6 offset-sm3>
        <v-card color="accent" dark>
          <v-container>
            <v-form
              v-model="isFormValid"
              lazy-validation
              ref="form"
              @submit.prevent="handleSignupUser"
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
                    :rules="emailRules"
                    prepend-icon="email"
                    label="Email"
                    v-model="email"
                    type="email"
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
                <v-flex xs12>
                  <v-text-field
                    :rules="passwordRules"
                    prepend-icon="gavel"
                    label="Confirm Password"
                    v-model="passwordConfirmation"
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
                    color="info"
                    type="submit"
                  >
                    <span slot="loader" class="custom-loader">
                      <v-icon light>cached</v-icon>
                    </span>
                    Signup
                  </v-btn>
                  <h3>
                    Already have an account ?
                    <router-link to="/signin">Signin</router-link>
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
  name: "SignUp",
  data() {
    return {
      isFormValid: true,
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      usernameRules: [
        (username) => !!username || "Username is required",
        (username) =>
          username.length < 10 || "Username cannot be more than 10 character",
      ],
      emailRules: [
        (email) => !!email || "Email is required",
        (email) => /.@./.test(email) || "Email must be valid",
      ],
      passwordRules: [
        (password) => !!password || "Password is required",
        (password) =>
          password.length >= 4 || "Password must be at least 4 characters",
        (confirmation) =>
          confirmation === this.password || "Password must watch",
      ],
    };
  },
  computed: {
    ...mapGetters(["loading", "error", "user"]),
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
    handleSignupUser() {
      // Signup user action
      if (this.$refs.form.validate()) {
        this.$store.dispatch("signupUser", {
          username: this.username,
          password: this.password,
          email: this.email,
        });
      }
    },
  },
};
</script>