<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-body">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <h3 class="hover-blue">Task Manager</h3>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="/">
              <h4 class="hover-blue">Home</h4>
            </a>
          </li>
          <li v-if="userId != null" class="nav-item">
            <a class="nav-link" href="/myTasks">
              <h4 class="hover-blue">My Tasks</h4>
            </a>
          </li>
          <li v-if="userId != null" class="nav-item">
            <a class="nav-link" href="/" v-on:click="logout">
              <h4 class="hover-blue">Log out</h4>
            </a>
          </li>
          <li v-if="userId == null" class="nav-item">
            <a class="nav-link" href="/register">
              <h4 class="hover-blue">Register</h4>
            </a>
          </li>
          <li v-if="userId == null" class="nav-item">
            <a class="nav-link" href="/login">
              <h4 class="hover-blue">Login</h4>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
export default {
  created() {
    this.checkAuth();
  },
  data() {
    return {
      userId: null,
    };
  },
  methods: {
    checkAuth() {
      if (localStorage.token) {
        let token = localStorage.getItem("token");
        axios
          .get("http://localhost:3000/users/currentuser/", {
            headers: {
              Authorization: `Bearer ${token}`,
              token: token,
            },
          })
          .then((response) => {
            this.userId = response.data[0]._id;
          });
      }
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>
