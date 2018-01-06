<template>
    <div class="column is-4">
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                    {{layer.name}}
                </p>
                <a class="card-header-icon" @click="deleteLayer">
                    <span class="icon has-text-danger">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </span>
                </a>

            </header>
            <div class="card-content">
                <div class="content">
                    <div style="text-align: center;">
                        <svg height="200px" width="200px"
                             viewBox="0 0 210 297"
                             xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <shape v-if="layer.items.length > 0" v-for="(item, index) in layer.items"
                                       :item="item"
                                       :key="index"></shape>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "card",
        props: {
            layer: {type: Object, required: false}
        },
        data() {
            return {}
        },
        methods: {
            deleteLayer() {
                this.$emit('layer-deleted', this.layer)
                this.menu_active = false
            }
        }

    }
</script>