<template>
    <div>
        <note-list></note-list>
    </div>  
</template>

<script>
import NoteList from '../components/NoteList.vue';

export default {
    components: {
        NoteList
    },
    mounted() {
        this.$store.dispatch('loadData');
    }
}
</script>

<style>

</style>