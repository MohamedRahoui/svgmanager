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

// Filter AND
layerRoutes.route('/find').post(function (req, res) {
    let filter
    if (req.body.shapes_num > 0) {
        if (req.body.shapes.length > 0 && req.body.colors.length > 0) {
            filter = [
                {'items': {"$elemMatch": {'nodeName': {$all: req.body.shapes}}}},
                {'items': {$size: req.body.shapes_num}},
                {'items': {"$elemMatch": {'style.fill': {$all: req.body.colors}}}},
            ]
        } else if (req.body.shapes.length > 0 && req.body.colors.length === 0) {
            filter = [
                {'items': {"$elemMatch": {'nodeName': {$all: req.body.shapes}}}},
                {'items': {$size: req.body.shapes_num}},
            ]
        } else {
            filter = [
                {'items': {"$elemMatch": {'style.fill': {$all: req.body.colors}}}},
                {'items': {$size: req.body.shapes_num}},
            ]
        }
    } else {
        if (req.body.shapes.length > 0 && req.body.colors.length > 0) {
            filter = [
                {'items': {"$elemMatch": {'nodeName': {$all: req.body.shapes}}}},
                {'items': {"$elemMatch": {'style.fill': {$all: req.body.colors}}}},
            ]
        } else if (req.body.shapes.length > 0 && req.body.colors.length === 0) {
            filter = [
                {'items': {"$elemMatch": {'nodeName': {$all: req.body.shapes}}}},
            ]
        } else {
            filter = [
                {'items': {"$elemMatch": {'style.fill': {$all: req.body.colors}}}},
            ]
        }
    }

    Layer.find({
        $and: filter
    }, (err, layers) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(layers);
        }
    });
});

// Filter OR
layerRoutes.route('/find-or').post(function (req, res) {
        let filter
        if (req.body.shapes_num > 0) {
            filter = [
                {'items': {"$elemMatch": {'nodeName': {$in: req.body.shapes}}}},
                {'items': {$size: req.body.shapes_num}},
                {'items': {"$elemMatch": {'style.fill': {$in: req.body.colors}}}},
            ]
        } else {
            filter = [
                {'items': {"$elemMatch": {'nodeName': {$in: req.body.shapes}}}},
                {'items': {"$elemMatch": {'style.fill': {$in: req.body.colors}}}},
            ]
        }
        Layer.find({
            $or: filter
        }, (err, layers) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(layers);
            }
        });
    }
);

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