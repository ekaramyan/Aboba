const express = require('express');
const nodemon = require('nodemon');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg')
const ffmpeg = require('ffmpeg');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const buffer = require('buffer')
const bufferjs = require('bufferjs')
const FileReader = require('FileReader')
const { exec } = require('child_process');



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
// function toMP3(toConvert, audioPath) {
//     return new Promise((resolve, reject) => {
//         const command = ffmpeg()
//             .input(toConvert)
//             .audioCodec('libmp3lame')
//             .format('mp3')
//             .on('end', resolve)
//             .on('error', reject)
//             .save(audioPath)
//     });
// };
// app.post('/saveBlob', upload.single('file'), async (req, res) => {
//     const blob = req.body;
//     const reader = new FileReader();
//     let buffer = null;
//     reader.readAsArrayBuffer(blob).onload = () => {
//         buffer = reader.result;
//         if (typeof buffer !== 'undefined') {
//             const arrayBuffer = buffer.slice(0, buffer.byteLength);
//             toMP3(arrayBuffer, audioPath);
//         }
//     };

//     const fileId = uuidv4();
//     const audioPath = path.join(__dirname, 'audio', `${fileId}.mp3`);
//     const fileUrl = `http://localhost:3001/audio/${fileId}.mp3`
//     console.log(buffer)
//     try {
//         const arrayBuffer = await blob.arrayBuffer();
//         await toMP3(buffer, audioPath);
//         res.send({ fileUrl });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Unable to convert audio');
//     }
// });
function decodeBase64(base64str) {
    const buffer = Buffer.from(base64str, 'base64');
    return buffer;
}

// Функция для сохранения бинарных данных в виде mp3 файла
function saveMP3(binaryData, filePath) {
    return new Promise((resolve, reject) => {
        const tmpFilePath = `${filePath}-tmp`;
        fs.writeFile(tmpFilePath, binaryData, 'binary', (err) => {
            if (err) {
                reject(err);
            } else {
                exec(`ffmpeg -i ${tmpFilePath} ${filePath}`, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        reject(error);
                    } else {
                        fs.unlink(tmpFilePath, (unlinkErr) => {
                            if (unlinkErr) {
                                console.error(`unlink error: ${unlinkErr}`);
                            }
                        });
                        resolve();
                    }
                });
            }
        });
    });
}


// Обработчик запроса для сохранения аудио в виде mp3 файла и получения ссылки на файл
app.post('/saveBlob', upload.single('file'), async (req, res) => {
    const blob = JSON.stringify(req.body);
    const base64str = blob.substring(27, blob.length - 13)
    console.log(base64str)
    const fileId = uuidv4();
    const filePath = path.join(__dirname, 'audio', `${fileId}.mp3`);
    const fileUrl = `http://localhost:3001/audio/${fileId}.mp3`;

    try {
        const binaryData = decodeBase64(base64str);
        await saveMP3(binaryData, filePath);
        res.send({ fileUrl });
    } catch (err) {
        console.error(err);
        res.status(500).send('Unable to convert audio');
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
