<template>
    <div class="text-center m-4 p-4">
      <div class="row">
        <div class="col"></div>
        <div class="col-lg">
          <div v-if="this.$route.name == 'login'">
            <h1 class="mb-4">Login</h1>
          </div>
          <div v-if="this.$route.name == 'register'">
            <h1 class="mb-4">Register</h1>
          </div>
          <div :class="errorClass" role="alert">
            {{ errorMsg }}
          </div>
          <form v-if="this.$route.name == 'register'" v-on:submit.prevent="register" class="m-3">
            <div class="form-group mb-3">
              <label for="exampleInputEmail1">
                <h4>Username</h4>
              </label>
              <input type="text" name="username" class="form-control" placeholder="Username" required maxlength="100" />
            </div>
            <div class="form-group">
              <label>
                <h4>Password</h4>
              </label>
              <input type="password" required maxlength="100" name="password" class="form-control"
                placeholder="Password" />
            </div>
            <div>
              <div class="form-group mt-3">
                <label>
                  <h4>Confirm password</h4>
                </label>
                <input type="password" required maxlength="100" name="confirmPassword" class="form-control"
                  placeholder="Confirm password" />
              </div>
              <strong class="text-danger">{{ passwordConfirmError }}</strong>
            </div>
            <div>
              <button class="btn btn-primary mt-3 w-100" type="submit">
                SIGN UP
              </button>
            </div>
          </form>
          <form v-if="this.$route.name == 'login'" v-on:submit.prevent="login" class="m-3">
            <div class="form-group mb-3">
              <label for="exampleInputEmail1">
                <h4>Username</h4>
              </label>
              <input type="text" required maxlength="100" name="username" class="form-control" placeholder="Username" />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">
                <h4>Password</h4>
              </label>
              <input type="password" required maxlength="100" name="password" class="form-control"
                placeholder="Password" />
            </div>
            <div>
              <button class="btn btn-primary mt-3 w-100" type="submit">
                LOG IN
              </button>
            </div>
          </form>
          <div v-if="this.$route.name == 'login'">
            <router-link :to="{ name: 'register' }">
              Don't have an account? Sign up
            </router-link>
          </div>
          <div v-if="this.$route.name == 'register'">
            <router-link :to="{ name: 'login' }">
              Already have an account? Log in
            </router-link>
          </div>
        </div>
        <div class="col"></div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    name: "auth",
    created() {
      this.getCurrentUser();
    },
    data() {
      return {
        errorMsg: "",
        passwordConfirmError: "",
        errorClass: "alert alert-danger d-none",
      };
    },
    methods: {
      getCurrentUser() {
        let token = localStorage.getItem("token");
        axios
          .get(
            "http://localhost:3000/users/currentuser/",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                token: token,
              },
            }
          )
          .then((response) => {
            this.$router.push("/myTasks");
          })
          .catch((error) => { });
      },
      async register(submitEvent) {
        const password = submitEvent.target.elements.password.value;
        const passwordConfirm = submitEvent.target.elements.confirmPassword.value;
        if (passwordConfirm == password) {
          axios
            .post("http://localhost:3000/register", {
              username: submitEvent.target.elements.username.value,
              password: password,
            })
            .then((response) => {
              this.$router.push("/welcome");
            })
            .catch((error) => {
              this.errorMsg = error.response.data;
              this.errorClass = "alert alert-danger";
            });
        } else {
          this.passwordConfirmError = "Passwords must match";
        }
      },
      async login(submitEvent) {
        axios
          .post("http://localhost:3000/login", {
            username: submitEvent.target.elements.username.value,
            password: submitEvent.target.elements.password.value,
          })
          .then((response) => {
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + response.data.token;
            localStorage.setItem("token", response.data.token);
            this.$router.push("/myTasks");
          })
          .catch((error) => {
            this.errorMsg = error.response.data;
            this.errorClass = "alert alert-danger";
          });
      },
    },
    computed: {},
  };
  </script>