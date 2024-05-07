const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/download-track', (req,res)=> {
    const { trackUrl } = req.query;
    if (!trackUrl || typeof trackUrl !== 'string' || !/^https?:\/\//.test(trackUrl)) {
        return res.status(400).send('Invalid track URL');
    }
    const command = `spotifydl "${trackUrl}" --output /Users/nikhil/Programming/Project-Pan/project-pan/downloads --output-only`;
    exec(command, (error, stdout, stderr) => {
        
        const match = stderr.match(/Item:\s*(.*)/i)
        const generatedFileName = match ? match[1] : 'default_filename.txt';
        const downloadedFilePath = `/Users/nikhil/Programming/Project-Pan/project-pan/downloads/${generatedFileName}.mp3`;

        if (error) {
            console.error(`Error executing command: ${error}`);
            return res.status(500).send('Error executing command');
        }
        res.setHeader('Content-Disposition', `attachment; filename="${generatedFileName}.mp3"`);
        res.sendFile(downloadedFilePath);
        res.status(200).send({ filename: generatedFileName });
    });
})

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
