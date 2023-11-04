const express = require('express')
const app = express()

const port = 4000

const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
app.use(bodyParser.json())

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
