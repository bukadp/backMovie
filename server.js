const express = require('express');
const app = express();
const port = 3000;
const CreateMovie = require('../movieapp/routes/movieRoutes');
const CreateCategory = require('../movieapp/routes/categoryRoutes');
const connectDb = require('../movieapp/db')

// Подключение к базе данных
// const url = 'mongodb://localhost:27017/main';
// const mongoose = require('mongoose');
// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
connectDb()

// Парсить тело запроса
app.use(express.json());

app.use(CreateMovie);
app.use(CreateCategory);


app.listen(port, () => {
  console.log(`Server run at ${port}`)
});