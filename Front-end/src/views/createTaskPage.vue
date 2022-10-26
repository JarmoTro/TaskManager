<template>
    <div class="text-center m-4">
        <h1>Add a task</h1>
        <div class="row">
            <div class="col"></div>
            <div class="col-lg">
                <form v-on:submit.prevent="createTask" class="m-5">
                    <div class="input-group mb-3">
                        <span class="input-group-text">Title</span>
                        <input type="text" class="form-control" placeholder="Title" name="title" required
                            maxlength="100" />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text">Deadline</span>
                        <input type="date" class="form-control" placeholder="Deadline" name="deadline" required />
                    </div>
                    <button class="btn btn-lg btn-primary" type="submit">ADD</button>
                </form>
            </div>
            <div class="col"></div>
        </div>
    </div>
</template>
  
<script>
import axios from "axios";
export default {
    created() {
        this.checkAuth()
    },
    data() {
        return {
            title: '',
            deadline: '',
            userId: ''
        }
    },
    methods: {
        checkAuth() {
            if (localStorage.token) {
                let token = localStorage.getItem("token");
                axios
                    .get('http://localhost:3000/users/currentuser/', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            token: token
                        }
                    }).then((response) => {
                        console.log(response);
                        this.userId = response.data[0]._id
                    })
                    .catch((error) => {
                        console.log(error);
                        this.$router.push('/login');
                    })
            }
            else {
                this.$router.push('/login');
            }
        },
        createTask(submitEvent) {
                const newDeadline = new Date(submitEvent.target.elements.deadline.value).getTime() / 1000
                axios.post('http://localhost:3000/tasks', {
                    "title": submitEvent.target.elements.title.value,
                    "deadline": newDeadline,
                    "userId": this.userId
                }).then((response) => {
                    this.$router.push('/myTasks');
                })
        }
    }
};
</script>