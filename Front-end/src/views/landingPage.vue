<script setup>
import DemoTaskItem from "../components/demoTaskItem.vue"
</script>

<template>
    <h1 class="m-3 text-center">Discover a new way to manage your tasks....</h1>
    <div class="row m-3">
        <div class="col text-center">
            <h2 class="m-5">Ever find yourself struggling to remember mundane tasks?</h2>

            <h2 class="m-5">Do you want a simple way to keep track of your tasks from anywhere?</h2>

            <h2 class="m-5">Task Manager is here to help!</h2>

            <h2 class="m-5">Task Manager uses a simplistic, modern UI to help you keep track of your tasks.</h2>

            <h2 class="m-5"><a href="/login">Log in</a> or <a href="/register">register</a> to get started today!</h2>
        </div>
        <div class="col">
            <DemoTaskItem v-bind:task="exampleDefaultTask" />
            <DemoTaskItem v-bind:task="exampleOverdueTask" />
            <DemoTaskItem v-bind:task="exampleCompletedTask" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            exampleDefaultTask: {
                "id": 1,
                "title": "Renew passport",
                "deadline": new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
                "finished": false,
                "subtasks": [
                    { "id": 1, "title": "Get picture taken", "finished": true },
                    { "id": 2, "title": "Give fingerprint and signature", "finished": false }
                ]
            },
            exampleOverdueTask: {
                "id": 2,
                "title": "Get groceries",
                "deadline": new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
                "finished": false,
                "subtasks": [
                    { "id": 1000, "title": "Get cabbages", "finished": false },
                    { "id": 1001, "title": "Get carrots", "finished": true },
                    { "id": 1002, "title": "Get potatoes", "finished": true },
                ]
            },
            exampleCompletedTask: {
                "id": 3,
                "title": "Pick up kids from school",
                "deadline": new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
                "finished": true,
                "subtasks": [
                    { "id": 2000, "title": "Pick up daughter", "finished": true },
                    { "id": 2001, "title": "Pick up son", "finished": true },
                ]
            }
        }
    }
}
</script>