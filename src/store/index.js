import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        notes: [],
        tasks: [],
    },
    actions: {
        /**
         * @param  {Object} {commit}
         * @param  {Number} id - Id of the task for delete
         */
        deleteTask({ commit }, id) {
            commit('deleteTask', id);
            commit('saveAll');
        },
        /**
         * @param  {Object} {commit}
         * @param  {Object} taskObj - New task object
         */
        createTask({ commit }, taskObj) {
            commit('createTask', taskObj);
        },
        /**
         * @param  {Object} {commit}
         * @param  {Number} id - Id of the note for delete
         */
        deleteNote({ commit }, id) {
            commit('deleteNote', id);
            commit('saveAll');
        },
        /**
         * @param  {Object} {commit}
         * @param  {Object} noteObj - New note object
         */
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
        /**
         * @param  {Object} state
         * @param  {Number} id - Id of the Task for delete
         */
        deleteTask(state, id) {
            const index = state.tasks.findIndex(el => el.id === id);
            state.tasks.splice(index, 1);
        },
        /**
         * @param  {Object} state
         * @param  {Object} taskObj - New task object
         */
        createTask(state, taskObj) {
            if(Array.isArray(state.tasks)) {
                taskObj.id = state.tasks[state.tasks.length - 1]?.id + 1 || 1;
            } else {
                state.tasks = [];
                taskObj.id = state.tasks[state.tasks.length - 1]?.id + 1 || 1;
            }
            state.tasks.push(taskObj);
        },
        /**
         * @param  {Object} state
         * @param  {Number} id - Id of the Note for delete
         */
        deleteNote(state, id) {
            if(!Array.isArray(state.tasks)) state.tasks = [];
            if(!Array.isArray(state.notes)) state.notes = [];
            const index = state.notes.findIndex(el => el.id === id);
            state.notes.splice(index, 1);
            state.tasks.forEach((el, i) => {
                console.log(id);
                if(el.id_note === id) state.tasks.splice(i, 1);
            });
        },
        /**
         * @param  {Object} state
         * @param  {Object} noteObj - New note object 
         */
        createNote: (state, noteObj) => {
            if(!Array.isArray(state.notes)) store.tasks = [] 
            noteObj.id = state.notes[state.notes.length - 1]?.id + 1 || 1;
            noteObj.id = state.notes[state.notes.length - 1]?.id + 1 || 1;
            state.notes.push(noteObj);

        },
        /**
         * @param  {Object} state
         */
        saveAll(state) {
            localStorage.setItem('notes', JSON.stringify(state.notes));
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        
        /**
         * @param  {Object} state
         */
        loadData(state) {
            state.notes = JSON.parse(localStorage.getItem('notes')) || [];
            state.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        }
    },
    getters: {
        /**
         * @param  {Object} state
         * @param  {Number} id_note - Id Note for filter task list
         * @param  {Number} limit - Limit tasks in list. 0 is unlimited. Default limit is 0
         */
        filterTasksFromNote: (state) => (id_note, limit = 0) => {
            if(!Array.isArray(state.tasks)) state.tasks = [] 
            let filtered = state.tasks.filter(el => el.id_note === id_note);
            if(limit > 0) return filtered.slice(0, limit);
            else return filtered;
        },
        /**
         * @param  {Object} state
         */
        getNotes: (state) => {
            return state.notes;
        },
        /**
         * @param  {Object} state
         * @param  {Number} id - Id note
         */
        getNote: (state) => (id) => {
            if(!Array.isArray(state.notes)) state.notes = [] 
            return state.notes.filter(el => el.id === id);
        }
    }
});

export default store;