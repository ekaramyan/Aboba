const express = require('express');
const nodemon = require('nodemon');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const ffmpeg = require('fluent-ffmpeg');
const multer = require('multer');
const upload = multer();


const corsOptions = {
    origin: 'http://localhost:5173', // домен сервиса, с которого будут приниматься запросы
    optionsSuccessStatus: 200 // для старых браузеров
}


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

app.post('/saveBlob', upload.single('file'), (req, res) => {
    const blob = req.body;
    console.log(blob)
    // Генерируем уникальный id для файла
    const fileId = uuidv4();
    // const file = fs.createWriteStream(fileId);
    // blob.pipe(file);
    const filePath = path.join(__dirname, 'blobs', `${fileId}.blob`);

    // Сохраняем blob на сервере
    // const buffer = Buffer.from(req.body, 'base64');
    fs.writeFile(filePath, buffer, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Unable to save blob');
        } else {
            // Формируем ссылку на сохраненный blob
            const fileUrl = `http://localhost:3001/blobs/${fileId}.blob`;
            res.send({ fileUrl });
        }
    });
});

// app.post('/uploadBlob', (req, res) => {
//     // const blob = req.files.blob;
//     const filename = 'hello.txt';
//     // const file = fs.createWriteStream(filename);
//     // blob.pipe(file);

//     res.status(200).send(blob);
// });

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use((req, res, next) => {
    console.log(`[${new Date()}] ${req.method} ${req.url}`);
    next();
});

app.use('/audioFiles', express.static(path.join(__dirname, 'audioFiles')));

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
