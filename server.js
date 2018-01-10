import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import config from './config/db'
import layerRoutes from './routes/LayerRoutes'

// Connect to database
mongoose.Promise = global.Promise;
mongoose.connect(config.DB).then(
    () => {
        console.log('Database is connected')
    },
    err => {
        console.log('Can not connect to the database' + err)
    }
);


const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());
app.use('/layers', layerRoutes);
const port = process.env.PORT || 4000;

// Launch server
const server = app.listen(port, function () {
    console.log('Listening on port ' + port);
});