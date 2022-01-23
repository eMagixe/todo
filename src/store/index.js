import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        notes: [
            { id: 1, name: 'Note 1' },
            { id: 2, name: 'Note 2' },
        ],
        tasks: [
            {
                id: 1,
                id_note: 1,
                text: 'Task 1', 
                status: false
            },
            { 
                id: 2,
                id_note: 2,
                text: 'Task 2',
                status: true
            },
            {
                id: 3,
                id_note: 1,
                text: 'Task 3', 
                status: false
            },
            { 
                id: 4,
                id_note: 2,
                text: 'Task 4',
                status: true
            }
        ]
    },
    actions: {
        deleteTask({ commit }, id) {
            commit('deleteTask', id);
            commit('saveAll');
        },
        createTask({ commit }, taskObj) {
            commit('createTask', taskObj);
        },
        deleteNote({ commit }, id) {
            commit('deleteNote', id);
            commit('saveAll');
        },
        createNote({ commit }, noteObj) {
            commit('createNote', noteObj);
        },
        saveAll({ commit }) {
            commit('saveAll');
        },
        loadData({ commit }) {
            commit('loadData');
        }
    },
    mutations: {
        deleteTask(state, id) {
            const index = state.tasks.findIndex(el => el.id === id);
            state.tasks.splice(index, 1);
        },
        createTask(state, taskObj) {
            taskObj.id = state.tasks[state.tasks.length - 1]?.id + 1 || 1;
            state.tasks.push(taskObj);
        },
        deleteNote(state, id) {
            const index = state.notes.findIndex(el => el.id === id);
            state.notes.splice(index, 1);
            state.tasks.forEach((el, i) => {
                console.log(id);
                if(el.id_note === id) state.tasks.splice(i, 1);
            });
        },
        createNote: (state, noteObj) => {
            noteObj.id = state.notes[state.notes.length - 1]?.id + 1 || 1;
            state.notes.push(noteObj);
        },
        saveAll(state) {
            localStorage.setItem('notes', JSON.stringify(state.notes));
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        loadData(state) {
            state.notes = JSON.parse(localStorage.getItem('notes'));
            state.tasks = JSON.parse(localStorage.getItem('tasks'));
        }
    },
    getters: {
        filterTasksFromNote: (store) => (id_note, limit = 0) => {
            let filtered = store.tasks.filter(el => el.id_note === id_note);
            if(limit > 0) return filtered.slice(0, limit);
            else return filtered;
        },
        getNotes: (store) => {
            return store.notes;
        },
        getNote: (store) => (id) => {
            return store.notes.filter(el => el.id === id);
        }
    }
});

export default store;