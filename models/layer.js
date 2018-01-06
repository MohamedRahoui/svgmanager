import mongoose from 'mongoose'

const Schema = mongoose.Schema;


let Layer = new Schema({
    name: String,
    items: {
        type: Array,
        nodeName: String,
        style: {
            fill: String,
            stroke: String,
            stroke_width: Number
        },
        x: Number,
        y: Number,
        width: Number,
        height: Number,
        cx: Number,
        cy: Number,
        r: Number,
        rx: Number,
        ry: Number,
        x1: Number,
        x2: Number,
        y1: Number,
        y2: Number,
        d: String,
        points: String
    }
}, {
    collection: 'layers'
});

export default mongoose.model('Layers', Layer)