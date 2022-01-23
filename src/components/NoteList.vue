<template>
    <div class="todo-list">
        <div class="todo-list__title">
            My To Do list
        </div>
        <div class="todo-list__panel">
            <button @click="createNote" class="todo-list__btn_add">Add New</button>
        </div>
        <div v-for="note in getNotes" :key="note.id" class="todo-list__unit">
            <div class="todo-list__unit--first-lvl">
                <div>{{ note.name }}</div>
                <div class="todo-list__unit__actions">
                    <router-link :to="'/edit/'+note.id" class="todo-list__btn">✎</router-link>
                    <button @click="currentNote = note.id" class="todo-list__btn">&times;</button>
                </div>
            </div>

            <task-list :limit="3" :id_note="note.id"></task-list>
            <popup v-if="currentNote === note.id" @response="deleteNote" @close="currentNote = false">
                Do you really want to delete list <strong class="purple">"#{{note.id}} - {{note.name}}"</strong>?
            </popup>
        </div>
    </div>
</template>

<script>
import TaskList from './TaskList.vue';
import Popup from './Popup.vue';

export default {
    components: {
        TaskList, Popup
    },
    data() {
        return {
            currentNote: false,
        }
    },
    computed: {
        getNotes () {
            return this.$store.getters.getNotes;
        }
    },
    methods: {
        deleteNote(answer) {
            if (answer) {
                this.$store.dispatch('deleteNote', this.currentNote);
            }
        },
        async createNote() {
            this.$store.dispatch('createNote', { name: 'New Note' })
        }
    },
}
</script>

<style>
    .todo-list {
        margin: 0 auto;
        max-width: 320px;
        border: 1px solid #ccc;
        background: white;
        border-radius: 4px;
    }

    .todo-list__title {
        background: linear-gradient(45deg, rgb(145,48,242) 0%,rgb(125,185,232) 100%);
        padding: 20px;
        text-align: center;
        color: white;
        font-size: 21px;
        font-weight: bold;
        border-radius: 4px 4px 0 0;
    }

    .todo-list__unit {
        padding: 15px 20px;
        border-bottom: 1px solid #ccc;
    }

    .todo-list__unit:last-of-type {
        border-bottom: 0;
    }

    .todo-list__unit--first-lvl {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 18px;
        font-weight: bold;
    }

    .todo-list__unit__actions {
        display: flex;
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

    .todo-list__btn_add {
        outline: 0;
        border: 1px solid rgb(145,48,242);
        color: rgb(145,48,242);
        padding: 12px;
        border-radius: 4px;
        text-align: center;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        background: white;
        cursor: pointer;
    }

    .todo-list__btn:hover,
    .todo-list__btn:focus,
    .todo-list__btn_add:hover {
        border: 1px solid rgb(125,185,232);
        color: rgb(125,185,232);
    }
    

    .todo-list__btn_add {
        margin: 10px;
    }

    .todo-list__btn + .todo-list__btn {
        margin-left: 6px;
    }

</style>
