const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const moonApi = require('./routes/moonapi');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', moonApi);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
