<template>
    <div class="todo-list">
        <div class="todo-list__title">
            <router-link to="/" class="todo-list__title--back">&#8592;</router-link>
            Edit list
        </div>

        <div v-if="note" class="todo-list__unit--edit">
            <input v-model="note.name" type="text" name="title" class="todo-list__input">
            <button @click="currentNote = note.id" class="todo-list__btn">&times;</button>
        </div>
        <popup v-if="currentNote === note.id" @response="deleteNote" @close="currentNote = false">
            Do you really want to delete list <strong class="purple">"#{{note.id}} - {{note.name}}</strong>?
        </popup>
        <edit-task-list :id_note="note.id"></edit-task-list>
    </div>
</template>

<script>
import EditTaskList from '../components/EditTaskList.vue';
import Popup from '../components/Popup.vue';

export default {
    components: {
        EditTaskList, Popup
    },
    data() {
        return {
            note_id: parseInt(this.$route.params.id),
            currentNote: false,
        }
    },
    computed: {
        note() {
            let [ note ] = this.$store.getters.getNote(this.note_id);
            return note || false;
        }
    },
    methods: {
        /**
         * @param  {Boolean} answer - Response true or false 
         */
        deleteNote(answer) {
            if (answer) {
                this.$store.dispatch('deleteNote', this.note_id);
            }
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
        position: relative;
    }

    .todo-list__title--back {
        position: absolute;
        text-decoration: none;
        color: white;
        font-size: 26px;
        font-weight: bold;
        left: 20px;
        top: 20px;
    }

    .todo-list__unit--edit {
        padding: 15px 20px;
        border-bottom: 1px solid #ccc;
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

    .todo-list__btn:hover,
    .todo-list__btn:focus {
        border: 1px solid rgb(125,185,232);
        color: rgb(125,185,232);
    }
</style>
