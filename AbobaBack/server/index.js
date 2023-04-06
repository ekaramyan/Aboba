const express = require('express');
const nodemon = require('nodemon');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { quickStart } = require('./TextToSpeech');



const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};


app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // Разрешить запросы с домена http://localhost:5173
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // добавить поддержку метода OPTIONS
    next();
});

app.options('*', cors(corsOptions), (req, res) => {
    res.header("Access-Control-Allow-Origin", corsOptions.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.send();
});

app.get('/cors', cors(corsOptions), (req, res) => {
    res.json({ msg: 'success!' });
})

app.post('/synthesize', async (req, res) => {
    const voiceContent = req.body.text;
    const audioBlob = await quickStart(voiceContent);
    if (audioBlob) {
        res.send(audioBlob)
    } else {
        res.sendStatus(500);
    }
});

app.use('/audio', express.static(path.join(__dirname, 'audio')));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use((req, res, next) => {
    console.log(`[${new Date()}] ${req.method} ${req.url}`);
    next();
});

// app.use('/audioFiles', express.static(path.join(__dirname, 'audioFiles')));

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
