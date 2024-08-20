const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const fs = require('fs');
app.use(bodyParser.json());
app.use(cors());

app.get('/download-track', (req,res)=> {
    const { trackUrl } = req.query;
    const fullurl = `https://open.spotify.com/track/${trackUrl.split('?')[0]}`;
    if (!trackUrl || typeof trackUrl !== 'string') {
        return res.status(400).send('Invalid track URL');
    }
    const outputDir = '/Users/nikhil/Documents/Project-Pan-Samples';
    const command = `spotdl "${fullurl}" --output ${outputDir}`;
    exec(command, (error, stdout, stderr) => {
        console.log("user requested")
        console.log(stdout);
        const match = stdout.match(/Downloaded "([^"]+)"/) || stdout.match(/Skipping (.*?) \(file already exists\)/);
        const generatedFileName = match[1]+'.mp3';
        const generatedFileNamePath = generatedFileName;
        const downloadedFilePath = path.join(outputDir, generatedFileNamePath);
        res.setHeader('Content-Disposition', `attachment; filename="${generatedFileName}"`);
        res.setHeader('track-name', generatedFileName);
        setTimeout(() => {
            res.download(downloadedFilePath, (err) => {
                if (err) {
                    console.error('Error downloading file:', err);
                    res.status(500).send('Error downloading file');
                }
            });
        }, 1000);
    });
})

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
