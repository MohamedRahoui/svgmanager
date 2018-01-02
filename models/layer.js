import mongoose from 'mongoose'

const Schema = mongoose.Schema;


let Layer = new Schema({
    name: String,
    items: {
        type: Array,
        fill: String,
        stoke: String
    }
}, {
    collection: 'layers'
});

export default mongoose.model('Layers', Layer)