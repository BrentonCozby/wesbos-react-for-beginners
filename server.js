const express = require('express')
const path = require('path')
const app = express()
require('dotenv').config()

app.use(express.static('./catch-of-the-day/build'))

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'catch-of-the-day', 'build', 'index.html'));
})

const PORT = process.env.PORT || 3000
app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}...`);
})
