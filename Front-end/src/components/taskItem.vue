<template>
    <div class="card card-body m-3" v-if="!isHidden">
        <div class="modal fade" v-bind:id="'taskDeletionModal_' + this.task._id" tabindex="-1"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Are you sure you want to delete the task
                            {{ this.task.title }}
                            ?</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        This action can't be undone.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">CLOSE</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                            v-on:click="deleteTask()">DELETE</button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <h3 class="m-3 d-block" v-bind:id="'taskTitle_' + this.task._id">{{ this.task.title }}</h3>
            <form v-on:submit.prevent="updateTask" class="me-3 d-none" v-bind:id="'taskEditForm_' + this.task._id">
                <input type="text" name="title" class="form-control m-3"
                    v-bind:id="'taskTitleUpdateInput_' + this.task._id" v-bind:value="this.task.title" required
                    maxlength="100" />
                <button type="submit" class="btn btn-primary m-3">SAVE CHANGES</button>
                <button type="button" v-on:click="toggleTaskEditForm" class="btn btn-secondary m-3">CANCEL</button>
                <input type="date" name="deadline" class="form-control m-3"
                    v-bind:id="'taskDateUpdateInput_' + this.task._id" v-bind:value="this.task.deadline" required />
            </form>
            <h4 class="ms-3 d-block" v-bind:id="'taskDeadline_' + this.task._id">Due by {{ new
                    Date(this.task.deadline).toDateString()
            }}
            </h4>
            <h4 v-if="completedTaskPercentage == 100" class="text-success ms-3">COMPLETED!</h4>
            <h4 v-if="completedTaskPercentage != 100 && new Date(this.task.deadline).getTime() < new Date().getTime()"
                class="text-danger ms-3">PAST DEADLINE!</h4>
            <h4 v-if="completedTaskPercentage != 100 && new Date(this.task.deadline).getTime() > new Date().getTime()"
                class="text-primary ms-3">In progress...</h4>
            <div>
                <i class="fa-solid fa-trash fa-xl text-danger m-3" role="button" data-bs-toggle="modal"
                    v-bind:data-bs-target="'#taskDeletionModal_' + this.task._id"></i>
                <i class="fa-solid fa-pencil fa-xl text-primary m-3" v-on:click="toggleTaskEditForm(this.task._id)"
                    role="button"></i>
            </div>
        </div>
        <div class="progress m-3">
            <div class="progress-bar" :class="{
                'bg-danger': new Date(this.task.deadline).getTime() < new Date().getTime() && completedTaskPercentage != 100,
                'bg-success': completedTaskPercentage == 100
            }" role="progressbar"
                :style="{ width: completedTaskPercentage + '%' }">
            </div>
        </div>
        <button class="btn btn-primary btn-inline m-3" :class="{
            'bg-danger': new Date(this.task.deadline).getTime() < new Date().getTime() && completedTaskPercentage != 100,
            'bg-success': completedTaskPercentage == 100
        }" data-bs-toggle="collapse"
            v-bind:data-bs-target="'#detailsArea_' + task._id">View details</button>
        <div class="collapse text-center" v-bind:id="'detailsArea_' + task._id">
            <div class="card card-body text-start m-3 text-light"
                :class="{ 'bg-success': subtask.finished, 'bg-danger': !subtask.finished }"
                v-for="subtask in this.task.subtasks">
                <div class="modal fade" v-bind:id="'subtaskDeletionModal_' + subtask._id" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title text-dark">Are you sure you want to delete the subtask
                                    {{ subtask.title }} ?</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body text-dark">
                                This action can't be undone.
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">CLOSE</button>
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                                    v-on:click="deleteSubtask(subtask._id)">DELETE</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-inline-block">
                    <form v-on:submit.prevent="updateSubtaskTitle" class="me-3 d-none"
                        v-bind:id="'subtaskEditForm_' + subtask._id">
                        <input type="text" name="title" class="form-control m-3"
                            v-bind:id="'subtaskUpdateInput_' + subtask._id" v-bind:value="subtask.title" required
                            maxlength="100">
                        <input type="hidden" name="subtaskId" v-bind:value="subtask._id" />
                        <button type="submit" class="btn btn-primary d-inline-block m-3">SAVE CHANGES</button>
                        <button type="button" class="btn btn-secondary d-inline-block m-3"
                            v-on:click="toggleSubtaskEditForm(subtask._id, subtask.title)">CANCEL</button>
                    </form>
                    <h4 class=" m-3" v-bind:id="'subtaskTitle_' + subtask._id">{{ subtask.title }}</h4>
                    <button type="button" v-on:click="toggleSubtaskState(subtask._id)"
                        class="btn btn-outline-light m-3">
                        <i
                            :class="{ 'fa-solid fa-xmark fa-2xl': !subtask.finished, 'fa-solid fa-check fa-2xl': subtask.finished }"></i>
                    </button>
                    <button type="button" class="btn btn-outline-light m-3"
                        v-on:click="toggleSubtaskEditForm(subtask._id, subtask.title)">
                        <i class="fa-solid fa-pencil fa-xl"></i>
                    </button>
                    <button type="button" class="btn btn-outline-light m-3 d-inline xxl-d-block"
                        v-bind:data-bs-target="'#subtaskDeletionModal_' + subtask._id" data-bs-toggle="modal">
                        <i class="fa-solid fa-trash fa-xl"></i>
                    </button>
                </div>
            </div>
            <div class="card card-body m-3 d-block" role="button" v-bind:id="'subtaskCreateFormToggler_' + this.task._id"
                v-on:click="toggleSubtaskCreateForm">
                <i class="fa-solid fa-plus fa-2xl m-3"></i>
            </div>
            <div class="card card-body m-3 d-none" v-bind:id='"subtaskCreateForm_" + this.task._id'>
                <form v-on:submit.prevent="createSubtask">
                    <input type="text" v-bind:id="'subtaskCreateInput_' + this.task._id" name="title"
                        class="form-control w-100" placeholder="Subtask title" required maxlength="100" />
                    <button type="submit" class="btn btn-primary m-3">CREATE SUBTASK</button>
                    <button type="button" v-on:click="toggleSubtaskCreateForm"
                        class="btn btn-secondary m-3">CANCEL</button>
                </form>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    props: ['task'],
    created() {
        this.getCompletedTaskPercentage()
    },
    data() {
        return {
            completedTaskPercentage: 0,
            isHidden: false,
        }
    },
    methods: {
        getCompletedTaskPercentage() {
            let completedTasks = 0;
            this.task.subtasks.forEach(subtask => {
                if (subtask.finished) completedTasks++
            });
            this.completedTaskPercentage = Math.round((completedTasks / this.task.subtasks.length) * 100);
        },
        toggleSubtaskEditForm(subtaskId, subtaskTitle) {
            const form = document.getElementById("subtaskEditForm_" + subtaskId);
            const title = document.getElementById("subtaskTitle_" + subtaskId);
            const formInput = document.getElementById('subtaskUpdateInput_' + subtaskId)

            formInput.value = subtaskTitle;

            if (form.classList.contains('d-block')) {
                title.classList.replace('d-none', 'd-inline')
                form.classList.replace('d-block', 'd-none')
            }
            else {
                title.classList.replace('d-inline', 'd-none')
                form.classList.replace('d-none', 'd-block')
            }
        },
        toggleTaskEditForm() {
            const form = document.getElementById("taskEditForm_" + this.task._id);
            const title = document.getElementById("taskTitle_" + this.task._id);
            const formTitleInput = document.getElementById('taskTitleUpdateInput_' + this.task._id)
            const formDateInput = document.getElementById('taskDateUpdateInput_' + this.task._id)
            const deadline = document.getElementById('taskDeadline_' + this.task._id)
            formTitleInput.value = this.task.title;
            formDateInput.valueAsDate = new Date(this.task.deadline);

            if (form.classList.contains('d-inline-block')) {
                title.classList.replace('d-none', 'd-block')
                form.classList.replace('d-inline-block', 'd-none')
                deadline.classList.replace('d-none', 'd-block')
            }
            else {
                title.classList.replace('d-block', 'd-none')
                form.classList.replace('d-none', 'd-inline-block')
                deadline.classList.replace('d-block', 'd-none')
            }
        },
        updateTask(submitEvent) {
            const newTitle = submitEvent.target.elements.title.value;
            const newDeadline = new Date(submitEvent.target.elements.deadline.value).getTime();
            axios.put('http://localhost:3000/tasks/' + this.task._id, {
                "title": newTitle,
                "deadline": newDeadline
            })
            this.$router.go();
        },
        updateSubtaskTitle(submitEvent) {
            const subtaskId = submitEvent.target.elements.subtaskId.value;
            const newTitle = submitEvent.target.elements.title.value;
            axios.put('http://localhost:3000/subtasks/' + subtaskId, {
                "title": newTitle
            })
            this.$router.go();
        },
        toggleSubtaskState(subtaskId) {
            let update;
            this.task.subtasks.forEach(subtask => {
                if (subtask._id == subtaskId) {
                    if (subtask.finished) update = false
                    else if (!subtask.finished) update = true
                }
            });
            axios.put('http://localhost:3000/subtasks/' + subtaskId, {
                "finished": update
            })
            this.$router.go();
        },
        toggleSubtaskCreateForm() {
            const form = document.getElementById('subtaskCreateForm_' + this.task._id)
            const formToggler = document.getElementById('subtaskCreateFormToggler_' + this.task._id)
            const formInput = document.getElementById('subtaskCreateInput_' + this.task._id)

            if (form.classList.contains('d-none')) {
                form.classList.replace('d-none', 'd-block');
                formToggler.classList.replace('d-block', 'd-none')
            }
            else {
                formInput.value = '';
                form.classList.replace('d-block', 'd-none');
                formToggler.classList.replace('d-none', 'd-block')
            }

        },
        createSubtask(submitEvent) {
            const title = submitEvent.target.elements.title.value;
            axios.post('http://localhost:3000/subtasks', {
                title: title,
                taskId: this.task._id
            })
            this.$router.go();
        },
        deleteSubtask(subtaskId) {
            axios.delete('http://localhost:3000/subtasks/' + subtaskId);
            this.$router.go();
        },
        deleteTask() {
            axios.delete('http://localhost:3000/tasks/' + this.task._id);
            this.$router.go();
        }
    }
}
</script>