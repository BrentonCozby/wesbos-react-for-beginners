const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.resolve(__dirname, 'catch-of-the-day', 'build')))

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'catch-of-the-day', 'build', 'index.html'));
})

app.listen(3003, function() {
    console.log(`Listening on port 3003...`);
})
