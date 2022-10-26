<script setup>
import taskItem from "../components/taskItem.vue";
</script>

<template>
  <div class="text-center">
    <h1 class="m-3 text-center">
      Hope your day is going well, {{ username }}!
    </h1>
    <a class="mb-5" href="/createTask">
      <h3>Add a new task</h3>
    </a>
    <div class="m-5" v-for="task in tasks">
      <taskItem v-bind:task="task" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    this.getUserData();
  },
  data() {
    return {
      tasks: [],
      username: "",
    };
  },
  methods: {
    getUserData() {
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
            this.username = response.data[0].username;
            this.tasks = response.data[0].tasks;
            console.log(response.data[0].tasks);
          })
          .catch((err) => {
            this.$router.push("/login");
          });
      } else {
        this.$router.push("/login");
      }
    },
  },
};
</script>
