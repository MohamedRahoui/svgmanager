<template>
    <div>
        <heading/>
        <router-view/>
    </div>
</template>

<script>
    import Heading from './components/heading.vue'
    export default {
        name: "app",
        components: {
            'heading': Heading
        },
    }
</script>

<style lang="css">
    @import '../node_modules/bulma/css/bulma.css';
</style>