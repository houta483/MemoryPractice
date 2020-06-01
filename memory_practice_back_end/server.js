const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const memoryController = require('./MemoryController');
const bodyParser = require('body-parser');
const cors = require('cors')
const PORT = 3621;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// post to the database
app.post('/', memoryController.postRecord, (req, res) => {
  res.status(200).send(res.locals.result)
})

// get from database
app.get('/', memoryController.getRecords, (req, res) => {
  res.status(200).send(res.locals.result)
})

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`))