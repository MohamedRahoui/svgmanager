import express from 'express'

const app = express()
const layerRoutes = express.Router();


import Layer from '../models/layer'


layerRoutes.route('/add').post(function (req, res) {
    let layer = new Layer(req.body);
    layer.save()
        .then(item => {
            res.status(200).json({'layer': 'Layer added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

layerRoutes.route('/').get(function (req, res) {
    Layer.find(function (err, items){
        if(err){
            console.log(err);
        }
        else {
            res.json(items);
        }
    });
});

export default layerRoutes;