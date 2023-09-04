import express from 'express';
import bodyParser from 'body-parser';
import getAddition from "./services.js";

const app = express();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit:50000 }));
app.use(bodyParser.json({limit: "50mb"}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(201).json('Ok');
});

app.post('/', (req, res) => {
    let response = getAddition(req.body.nums, req.body.target);
    if(response.status !== 200) res.send(response);
    if(response.status === 200) return res.send(response);
});

export default app;