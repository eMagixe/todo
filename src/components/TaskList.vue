<template>
<ul class="todo-list__unit--second-lvl">
    <li v-for="task in filterTasksFromNote" :key="task.id">
        <span>{{ task.text }}</span>
    </li>
</ul>
</template>

<script>

export default {
    props: {
        id_note: Number,
        limit: Number
    },
    computed: {
        filterTasksFromNote() {
            return this.$store.getters.filterTasksFromNote(this.id_note, this.limit);
        }
    }
}
</script>

<style>
    .todo-list__unit--second-lvl {
        margin: 5px 20px;
    }

    .todo-list__unit--second-lvl li {
        margin: 5px 0;
        color: rgb(145,48,242);
    }

    .todo-list__unit--second-lvl li span {
        color: #797979;
    }
</style>
