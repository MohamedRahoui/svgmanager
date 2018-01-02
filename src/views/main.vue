<template>
    <div>
        <div class="container">
            <br>
            <a class="button is-warning is-pulled-right" @click="addModal = true">Add Layer</a>
        </div>

        <div class="modal" :class="{ 'is-active': addModal}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="box">
                    <p class="has-text-warning is-size-3 has-text-weight-semibold has-text-centered">Add a Layer</p>
                    <hr>
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Name</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <input class="input" type="text" placeholder="Text input">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <div class="file is-centered is-warning is-fullwidth">
                            <label class="file-label">
                                <input class="file-input" type="file" @change="onAddFileChange($event)">
                                <span class="file-cta">
                                    <span class="file-icon">
                                        <i class="fa fa-upload"></i>
                                    </span>
                                    <span class="file-label">
                                        Choose an SVG file
                                    </span>
                                </span>
                                <span class="file-name">
                                    {{addForm.svgFIle.name}}
                                </span>
                            </label>
                        </div>
                    </div>
                    <br>
                    <div class="field is-grouped is-grouped-right">
                        <div class="control">
                            <button class="button is-warning">Submit</button>
                        </div>
                    </div>
                </div>
                <button class="modal-close is-large" aria-label="close" @click="addModal = false"></button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                addModal: false,
                addForm: {
                    name: '',
                    svgFIle: ''
                },
                layer: {
                    name: 'Layer\'s name',
                    items: [
                        {
                            fill: 'Fill stuff',
                            stoke: 'Stoke'
                        }
                    ]

                }
            }
        },
        mounted() {
            // this.addLayer()
            this.fetchLayers()
        },
        methods: {
            fetchLayers() {
                this.axios.get(this.$server('layers')).then((response) => {
                    this.items = response.data;
                });
            },
            addLayer() {
                this.axios.post(this.$server('layers/add'), this.layer).then((response) => {
                    console.log(response)
                })
            },
            onAddFileChange(e) {
                let files = e.target.files || e.dataTransfer.files
                if (!files.length) return
                this.addForm.svgFIle = files[0]
            }

        }
    }
</script>