const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());

//Länk till api 
const posts = require('./routes/api/posts');

app.use('/api/posts', posts)

//anslutning till port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server ansluten till port ${port}`));