<template>
    <div class="card card-body m-3 text-center" v-if="!isHidden">
      <div class="modal fade" v-bind:id="'taskDeletionModal_' + this.task.id" tabindex="-1"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Are you sure you want to delete the task {{ this.task.title
              }}
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
        <h3 class="m-3 d-block" v-bind:id="'taskTitle_' + this.task.id">{{ this.task.title }}</h3>
        <form v-on:submit.prevent="updateTask" class="me-3 d-none" v-bind:id="'taskEditForm_' + this.task.id">
          <input type="text" name="title" class="form-control m-3" v-bind:id="'taskTitleUpdateInput_' + this.task.id"
            v-bind:value="this.task.title" required maxlength="100" />
          <button type="submit" class="btn btn-primary m-3">SAVE CHANGES</button>
          <button type="button" v-on:click="toggleTaskEditForm" class="btn btn-secondary m-3">CANCEL</button>
          <input type="date" name="deadline" class="form-control m-3" v-bind:id="'taskDateUpdateInput_' + this.task.id"
            v-bind:value="this.task.deadline" required />
        </form>
        <h4 class="ms-3 d-block" v-bind:id="'taskDeadline_' + this.task.id">Due by {{ this.task.deadline.toDateString() }}
        </h4>
        <h4 v-if="completedTaskPercentage == 100" class="text-success ms-3">COMPLETED!</h4>
        <h4 v-if="completedTaskPercentage != 100 && this.task.deadline.getTime() < new Date().getTime()"
          class="text-danger ms-3">PAST DEADLINE!</h4>
        <h4 v-if="completedTaskPercentage != 100 && this.task.deadline.getTime() > new Date().getTime()"
          class="text-primary ms-3">In progress...</h4>
        <div>
          <i class="fa-solid fa-trash fa-xl text-danger m-3" role="button" data-bs-toggle="modal"
            v-bind:data-bs-target="'#taskDeletionModal_' + this.task.id"></i>
          <i class="fa-solid fa-pencil fa-xl text-primary m-3" v-on:click="toggleTaskEditForm(this.task.id)"
            role="button"></i>
        </div>
      </div>
      <div class="progress m-3">
        <div class="progress-bar" :class="{
          'bg-danger': this.task.deadline.getTime() < new Date().getTime() && completedTaskPercentage != 100,
          'bg-success': completedTaskPercentage == 100
        }" role="progressbar" :style="{ width: completedTaskPercentage + '%' }">
        </div>
      </div>
      <button class="btn btn-primary btn-inline m-3" :class="{
        'bg-danger': this.task.deadline.getTime() < new Date().getTime() && completedTaskPercentage != 100,
        'bg-success': completedTaskPercentage == 100
      }" data-bs-toggle="collapse" v-bind:data-bs-target="'#detailsArea_' + task.id">View details</button>
      <div class="collapse text-center" v-bind:id="'detailsArea_' + task.id">
        <div class="card card-body text-start m-3 text-light"
          :class="{ 'bg-success': subtask.finished, 'bg-danger': !subtask.finished }"
          v-for="subtask in this.task.subtasks">
          <div class="modal fade" v-bind:id="'subtaskDeletionModal_' + subtask.id" tabindex="-1">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title text-dark">Are you sure you want to delete the subtask {{ subtask.title }} ?</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-dark">
                  This action can't be undone.
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">CLOSE</button>
                  <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                    v-on:click="deleteSubtask(subtask.id)">DELETE</button>
                </div>
              </div>
            </div>
          </div>
          <div class="d-inline-block">
            <form v-on:submit.prevent="updateSubtaskTitle" class="me-3 d-none"
              v-bind:id="'subtaskEditForm_' + subtask.id">
              <input type="text" name="title" class="form-control m-3" v-bind:id="'subtaskUpdateInput_' + subtask.id"
                v-bind:value="subtask.title" required maxlength="100" />
              <input type="hidden" name="subtaskId" v-bind:value="subtask.id" />
              <button type="submit" class="btn btn-primary d-inline-block m-3">SAVE CHANGES</button>
              <button type="button" class="btn btn-secondary d-inline-block m-3"
                v-on:click="toggleSubtaskEditForm(subtask.id, subtask.title)">CANCEL</button>
            </form>
            <h4 class="m-3" v-bind:id="'subtaskTitle_' + subtask.id">{{ subtask.title }}</h4>
            <button type="button" v-on:click="toggleSubtaskState(subtask.id)" class="btn btn-outline-light m-3">
              <i
                :class="{ 'fa-solid fa-xmark fa-2xl': !subtask.finished, 'fa-solid fa-check fa-2xl': subtask.finished }"></i>
            </button>
            <button type="button" class="btn btn-outline-light m-3"
              v-on:click="toggleSubtaskEditForm(subtask.id, subtask.title)">
              <i class="fa-solid fa-pencil fa-xl"></i>
            </button>
            <button type="button" class="btn btn-outline-light m-3 d-inline xxl-d-block"
              v-bind:data-bs-target="'#subtaskDeletionModal_' + subtask.id" data-bs-toggle="modal">
              <i class="fa-solid fa-trash fa-xl"></i>
            </button>
          </div>
        </div>
        <div class="card card-body m-3 d-block" role="button" v-bind:id="'subtaskCreateFormToggler_' + this.task.id"
          v-on:click="toggleSubtaskCreateForm">
          <i class="fa-solid fa-plus fa-2xl m-3"></i>
        </div>
        <div class="card card-body m-3 d-none" v-bind:id='"subtaskCreateForm_" + this.task.id'>
          <form v-on:submit.prevent="createSubtask">
            <input type="text" v-bind:id="'subtaskCreateInput_' + this.task.id" name="title" class="form-control w-100"
              placeholder="Subtask title" required maxlength="100" />
            <button type="submit" class="btn btn-primary m-3">CREATE SUBTASK</button>
            <button type="button" v-on:click="toggleSubtaskCreateForm" class="btn btn-secondary m-3">CANCEL</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['task'],
    created() {
      this.getCompletedTaskPercentage()
    },
    data() {
      return {
        completedTaskPercentage: 0,
        isHidden: false
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
        const form = document.getElementById("taskEditForm_" + this.task.id);
        const title = document.getElementById("taskTitle_" + this.task.id);
        const formTitleInput = document.getElementById('taskTitleUpdateInput_' + this.task.id)
        const formDateInput = document.getElementById('taskDateUpdateInput_' + this.task.id)
        const deadline = document.getElementById('taskDeadline_' + this.task.id)
        formTitleInput.value = this.task.title;
        formDateInput.valueAsDate = this.task.deadline;
  
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
        const newDeadline = new Date(submitEvent.target.elements.deadline.value);
        this.task.deadline = newDeadline;
        this.task.title = newTitle;
        this.toggleTaskEditForm();
      },
      updateSubtaskTitle(submitEvent) {
        const subtaskId = submitEvent.target.elements.subtaskId.value;
        const newTitle = submitEvent.target.elements.title.value;
  
        this.task.subtasks.forEach(subtask => {
          if (subtask.id == subtaskId) {
            subtask.title = newTitle
          }
        });
        this.toggleSubtaskEditForm(subtaskId);
      },
      toggleSubtaskState(subtaskId) {
        this.task.subtasks.forEach(subtask => {
          if (subtask.id == subtaskId) {
            if (subtask.finished) subtask.finished = false
            else if (!subtask.finished) subtask.finished = true
          }
        });
        this.getCompletedTaskPercentage();
      },
      toggleSubtaskCreateForm() {
        const form = document.getElementById('subtaskCreateForm_' + this.task.id)
        const formToggler = document.getElementById('subtaskCreateFormToggler_' + this.task.id)
        const formInput = document.getElementById('subtaskCreateInput_' + this.task.id)
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
        const subtask = {
          "id": this.task.subtasks.length + 1,
          "title": title,
          "finished": false
        }
        this.task.subtasks.push(subtask);
        this.toggleSubtaskCreateForm();
        this.getCompletedTaskPercentage();
      },
      deleteSubtask(subtaskId) {
        for (let i = 0; i < this.task.subtasks.length; i++) {
          if (this.task.subtasks[i].id == subtaskId) {
            this.task.subtasks.splice(i, 1);
            return;
          }
        }
      },
      deleteTask() {
        this.isHidden = true;
      },
    }
  }
  </script>