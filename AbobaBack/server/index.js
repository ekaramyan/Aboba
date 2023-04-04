const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const ffmpeg = require('fluent-ffmpeg');


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

app.post('/generateAudio', cors(corsOptions), async (req, res) => {
    try {
        // Get the input blob data from the request
        const blob = req.body;
        console.log(blob)

        // Convert the input blob to an MP3 file
        const inputFile = path.join(__dirname, 'input.webm');
        fs.writeFileSync(inputFile, blob);
        const outputFile = path.join(__dirname, 'output.mp3');
        await new Promise((resolve, reject) => {
            ffmpeg(inputFile)
                .inputFormat('webm')
                .outputOptions('-vn')
                .output(outputFile)
                .on('end', resolve)
                .on('error', reject)
                .run();
        });

        // Generate a unique ID for the output file
        const fileId = uuidv4();

        // Move the output file to the public files directory
        const publicDir = path.join(__dirname, 'public');
        fs.mkdirSync(publicDir, { recursive: true });
        const outputFilePath = path.join(publicDir, `${fileId}.mp3`);
        fs.renameSync(outputFile, outputFilePath);

        // Generate the URL for the output file
        const fileUrl = `http://localhost:3001/${fileId}.mp3`;

        // Return the file URL to the client
        // res.json({ fileUrl });
        res.header('Access-Control-Allow-Origin', '*');
        // Отправляем ссылку на фронтенд
        res.send({ fileUrl });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

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
