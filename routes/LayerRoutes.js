import express from 'express'

const app = express()
const layerRoutes = express.Router();


import Layer from '../models/layer'

// Create
layerRoutes.route('/add').post(function (req, res) {
    let layer = new Layer(req.body)
    layer.save()
        .then(item => {
            res.status(200).json({
                'layer': 'Layer added successfully'
            });
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

// Delete
layerRoutes.route('/delete/:id').get(function (req, res) {
    Layer.findByIdAndRemove({_id: req.params.id}, function (err, layer) {
        if (err) res.json(err);
        else res.json('Successfully removed');
    });
});

// Filter
layerRoutes.route('/find').post(function (req, res) {
    Layer.find({
        $or: [
            {'items': {"$elemMatch": {'nodeName': {$in: req.body.shapes}}}},
            {'items': {"$elemMatch": {'style.fill': {$in: req.body.colors}}}},
        ]
    }, (err, layers) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(layers);
        }
    });
});

layerRoutes.route('/').get(function (req, res) {
    Layer.find(function (err, items) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(items);
        }
    });
});

export default layerRoutes;