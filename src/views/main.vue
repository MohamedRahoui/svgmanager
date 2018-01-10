<template>
    <div>
        <br>
        <div class="container">
            <a class="button is-warning is-pulled-right" @click="addModal = true">Add Layer</a>
            <br><br>

            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">
                        Filters
                    </p>
                    <label class="checkbox card-header-icon">
                        <input type="checkbox" v-model="filter">
                    </label>
                </header>
                <div class="columns">
                    <div class="column is-5">
                        <br>
                        <div class="has-text-centered is-size-5">Colors</div>
                        <br>

                        <div class="buttons has-addons is-centered">
                            <span class="button" :class="{'is-danger': colors.red.selected}"
                                  @click="colors.red.selected = !colors.red.selected">Red</span>
                            <span class="button" :class="{'is-success': colors.green.selected}"
                                  @click="colors.green.selected = !colors.green.selected">Green</span>
                            <span class="button" :class="{'is-warning': colors.yellow.selected}"
                                  @click="colors.yellow.selected = !colors.yellow.selected">Yellow</span>
                            <span class="button" :class="{'is-primary': colors.turquoise.selected}"
                                  @click="colors.turquoise.selected = !colors.turquoise.selected">Turquoise</span>
                            <span class="button" :class="{'is-info': colors.blue.selected}"
                                  @click="colors.blue.selected = !colors.blue.selected">Blue</span>
                            <span class="button" :class="{'is-black': colors.black.selected}"
                                  @click="colors.black.selected = !colors.black.selected">Black</span>
                            <span class="button" :class="{'is-dark': colors.grey.selected}"
                                  @click="colors.grey.selected = !colors.grey.selected">Grey</span>
                        </div>
                    </div>
                    <div class="column is-2">
                        <br>
                        <div class="field">
                            <div class="control">
                                <div class="select" style="width: 100%;">
                                    <select style="width: 100%;" v-model="orAnd">
                                        <option value="or">OR ||</option>
                                        <option value="and">AND &&</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="field">
                            <div class="control">
                                <input type="number" class="input" placeholder="How much shapes ?" v-model="shapes_num" style="text-align: center">
                            </div>
                        </div>
                    </div>
                    <div class="column is-5">
                        <br>
                        <div class="has-text-centered is-size-5">Shapes</div>
                        <br>
                        <div class="buttons has-addons is-centered">
                            <span class="button is-info" :class="{'is-outlined': !shapes.rect}"
                                  @click="shapes.rect = !shapes.rect">Rectangle</span>
                            <span class="button is-info" :class="{'is-outlined': !shapes.circle}"
                                  @click="shapes.circle = !shapes.circle">Circle</span>
                            <span class="button is-info" :class="{'is-outlined': !shapes.ellipse}"
                                  @click="shapes.ellipse = !shapes.ellipse">Ellipse</span>
                            <span class="button is-info" :class="{'is-outlined': !shapes.line}"
                                  @click="shapes.line = !shapes.line">Line</span>
                            <span class="button is-info" :class="{'is-outlined': !shapes.polyline}"
                                  @click="shapes.polyline = !shapes.polyline">Polyline</span>
                            <span class="button is-info" :class="{'is-outlined': !shapes.polygon}"
                                  @click="shapes.polygon = !shapes.polygon">Polygon</span>
                            <span class="button is-info" :class="{'is-outlined': !shapes.path}"
                                  @click="shapes.path = !shapes.path">Path</span>
                        </div>
                    </div>
                </div>
            </div>
            <br>
        </div>
        <br>
        <div class="container">
            <div class="columns is-multiline">
                <card v-for="(layer, index) in Layers" :key="index" :layer="layer" @layer-deleted="delete_layer"></card>
            </div>
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
                                    <input class="input" type="text" placeholder="Text input" v-model="addForm.name">
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
                                    {{svgFile.name}}
                                </span>
                            </label>
                        </div>
                    </div>
                    <br>
                    <div class="field is-grouped is-grouped-right">
                        <div class="control">
                            <button class="button is-warning" @click="addLayer">Submit</button>
                        </div>
                    </div>
                </div>
                <button class="modal-close is-large" aria-label="close" @click="addModal = false"></button>
            </div>
        </div>
    </div>
</template>

<script>
    import Card from '../components/card.vue'

    export default {
        components: {
            'card': Card
        },
        watch: {
            shapes_num: function (val) {
                this.fetchLayers()
            },
            orAnd: function (val) {
                this.fetchLayers()
            },
            filter: function (val) {
                this.fetchLayers()
            },
            colors: {
                handler(val) {
                    this.fetchLayers()
                },
                deep: true
            },
            shapes: {
                handler(val) {
                    this.fetchLayers()
                },
                deep: true
            }
        },
        data() {
            return {
                shapes_num: 0,
                orAnd: 'or',
                filter: false,
                addModal: false,
                svgFile: '',
                addForm: {
                    name: '',
                    items: []
                },
                Layers: [],
                colors: {
                    red: {
                        rgba: 'rgb(219, 32, 0)',
                        selected: false
                    },
                    green: {
                        rgba: 'rgb(0,158,23)',
                        selected: false
                    },
                    yellow: {
                        rgba: 'rgb(255,238,10)',
                        selected: false
                    },
                    turquoise: {
                        rgba: 'rgb(50,255,190)',
                        selected: false
                    },
                    blue: {
                        rgba: 'rgb(0,0,255)',
                        selected: false
                    },
                    black: {
                        rgba: 'rgb(0,0,0)',
                        selected: false
                    },
                    grey: {
                        rgba: 'rgb(153,153,153)',
                        selected: false
                    }
                },
                shapes: {
                    rect: false,
                    circle: false,
                    ellipse: false,
                    line: false,
                    polyline: false,
                    polygon: false,
                    path: false
                }

            }
        },
        computed: {
            filter_colors() {
                let array = []
                $.each(this.colors, function (k, v) {
                    if (v.selected) {
                        array.push(v.rgba)
                    }
                });
                return array
            },
            filter_shapes() {
                let array = []
                $.each(this.shapes, function (k, v) {
                    if (v) {
                        array.push(k)
                    }
                });
                return array
            }
        },
        mounted() {
            this.fetchLayers()
        },
        methods: {
            // Get layers filtered or not
            fetchLayers() {
                if (this.filter) {
                    let url
                    if (this.orAnd === 'or') {
                        url = this.$server('layers/find-or')
                    } else {
                        url = this.$server('layers/find')
                    }
                    this.axios.post(url,
                        {
                            shapes: this.filter_shapes,
                            colors: this.filter_colors,
                            shapes_num: this.shapes_num
                        }).then((response) => {
                        this.Layers = response.data;
                    });
                } else {
                    this.axios.get(this.$server('layers')).then((response) => {
                        this.Layers = response.data;
                    });
                }
            },
            // Add a new layer
            addLayer() {
                this.axios.post(this.$server('layers/add'), this.addForm).then((response) => {
                    this.addModal = false
                    this.addForm = {
                        name: '',
                        items: []
                    }
                    this.svgFile = ''
                    this.fetchLayers()
                })
            },
            // SVG FILE HANDLING
            onAddFileChange(e) {
                // Get file from input on file change
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;
                this.svgFile = e.target.files[0];
                // Create a fake url to access the file content with an http request
                let url = URL.createObjectURL(e.target.files[0]);
                this.axios.get(url).then(res => {
                    // get the xml from the svg
                    let xml = $.parseXML(res.data);
                    // get the tag g
                    let g = $(xml).find('g');
                    // get children from the tag g exp 'ellipse, rect"
                    let items = g.children();
                    // loop through the children and get the attributes
                    $.each(items, (index, item) => {
                        let item_data = {
                            style: {}
                        };
                        item_data.nodeName = item.nodeName;
                        item_data.style.fill = item.style.fill;
                        item_data.style.stroke = item.style.stroke;
                        item_data.style.stroke_width = item.style['stroke-width'];
                        item.x ? item_data.x = item.x.baseVal.value : item_data.x = '';
                        item.y ? item_data.y = item.y.baseVal.value : item_data.y = '';
                        item.width ? item_data.width = item.width.baseVal.value : item_data.width = '';
                        item.height ? item_data.height = item.height.baseVal.value : item_data.height = '';
                        item.cx ? item_data.cx = item.cx.baseVal.value : item_data.cx = '';
                        item.cy ? item_data.cy = item.cy.baseVal.value : item_data.cy = '';
                        item.r ? item_data.r = item.r.baseVal.value : item_data.r = '';
                        item.rx ? item_data.rx = item.rx.baseVal.value : item_data.rx = '';
                        item.ry ? item_data.ry = item.ry.baseVal.value : item_data.ry = '';
                        item.x1 ? item_data.x1 = item.x1.baseVal.value : item_data.x1 = '';
                        item.x2 ? item_data.x2 = item.x2.baseVal.value : item_data.x2 = '';
                        item.y1 ? item_data.y1 = item.y1.baseVal.value : item_data.y1 = '';
                        item.y2 ? item_data.y2 = item.y2.baseVal.value : item_data.y2 = '';
                        item.attributes.d && item.attributes.d.value ? item_data.d = item.attributes.d.value : item_data.d = '';
                        item.points ? item_data.points = item.points.baseVal.value : item_data.points = '';
                        // put every thing in addForm that'll be used in addLayer() to create a layer
                        this.addForm.items.push(item_data)
                    })
                })
            },
            // Delete a layer
            delete_layer(layer) {
                this.axios.get(this.$server('layers/delete/' + layer._id)).then(() => {
                    this.fetchLayers()
                })
            }

        }
    }
</script>