var express = require('express')
var app = express()

var port = 4000

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname})
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})