<template>
<div class="todo-list__unit--second-lvl">
    <button @click="createTask" class="todo-list__btn_create">Add Task</button>
    <button @click="saveAll" class="todo-list__btn_save">Save All</button>
    <button @click="reset = true" class="todo-list__btn_reset">Reset</button>
    <popup v-if="reset" @response="resetAll" @close="reset = false">
        Do you want to reset all changes?
    </popup>
    <div v-for="task in filterTasksFromNote" :key="task.id" class="todo-list__unit--second-lvl-item">
        <input v-model="task.status" type="checkbox" name="status">
        <input v-model="task.text" type="text" name="task" class="todo-list__input">
        <button @click="currentTask = task.id" class="todo-list__btn">&times;</button>
        <popup v-if="currentTask === task.id" @response="deleteTask" @close="currentTask = false">
            Do you really want to delete list <strong class="purple">"#{{task.id}} - {{task.text}}"</strong>?
        </popup>
    </div>
</div>
</template>

<script>
import Popup from './Popup.vue';

export default {
    components: {
        Popup
    },
    data() {
        return {
            currentTask: false,
            reset: false,
        }
    },
    props: {
        id_note: Number
    },
    methods: {
        /**
         * @param  {Boolean} answer - Response true or false 
         */
        deleteTask(answer) {
            if (answer) this.$store.dispatch('deleteTask', this.currentTask);
        },
        createTask() {
            this.$store.dispatch('createTask', { 
                id_note: this.id_note,
                status: false,
                text: 'New task'
            });
        },
        saveAll() {
            this.$store.dispatch('saveAll');
        },
        /**
         * @param  {Boolean} answer - Response true or false 
         */
        resetAll(answer) {
            if (answer) this.$store.dispatch('loadData');
        }
    },
    computed: {
        filterTasksFromNote: function () {
            return this.$store.getters.filterTasksFromNote(this.id_note);
        }
    }
}
</script>

<style>
    .todo-list__unit--second-lvl {
        margin: 5px 20px;
    }

    .todo-list__unit--second-lvl-item {
        padding: 10px 0;
        display: flex;
        align-items: center;
    }

    .todo-list__input {
        border: 1px solid #797979;
        padding: 0 6px;
        border-radius: 4px;
        flex: 1;
        margin: 0 6px;
        height: 26px;
        line-height: 26px;
    }

    .todo-list__btn {
        outline: 0;
        border: 1px solid rgb(145,48,242);
        color: rgb(145,48,242);
        padding: 12px;
        border-radius: 4px;
        text-align: center;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        background: white;
        cursor: pointer;
    }

    .todo-list__btn_save, .todo-list__btn_reset, .todo-list__btn_create {
        outline: 0;
        border: 1px solid rgb(145,48,242);
        color: rgb(145,48,242);
        padding: 3px;
        border-radius: 4px;
        text-align: center;
        height: 25px;
        margin: 3px;
        display:inline-block;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        background: white;
        cursor: pointer;
    }

    .todo-list__btn:hover,
    .todo-list__btn:focus,
    .todo-list__btn_save:hover,
    .todo-list__btn_reset:hover,
    .todo-list__btn_create:hover {
        border: 1px solid rgb(125,185,232);
        color: rgb(125,185,232);
    }
</style>
