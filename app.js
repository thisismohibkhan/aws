const express = require('express');
var bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
}); 

app.get('/', (req, res) => {        
    res.send('Welcome to Nodejs');                
});

app.post('/createS3', async (req, res) => {
    let resp;
    try {
        const createS3 = require('./lambdas/createService');
        resp = await createS3.handler( req.body);
    } catch (error) {
        console.log('Hello');
        console.log(error);
    }
    res.sendStatus(resp.statusCode).send(resp.body);                 
});