const express = require('express')
const app = express()
const port = 3000

// Подключение к базе данных
const url = 'mongodb://localhost:27017/main';
const mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// определяем схему
const MovieSchema = new mongoose.Schema({ 
  title: String,
  category: String,
  year: Number,
  duration: Number,
  director: String,
});

const CategorySchema = new mongoose.Schema({
  title: String,
});

// создаем модель по схеме
const Movie = mongoose.model('Movie', MovieSchema); 
const Category = mongoose.model('Category', CategorySchema);

// Парсить тело запроса
app.use(express.json());

// Роут на добавление
app.post('/movies', async (req, res) => {
  try {
    const movie = await Movie.create({
      title: req.body.title,
      category: req.body.category,
      year: req.body.year,
      duration: req.body.duration,
      director: req.body.director
    });
    return res.status(201).send('movie created');
  } catch (err) {
    return res.status(500).send(err);
  }
});


app.post('/category', async (req, res) => {
  try {
    const category = await Category.create({
      title: req.body.title,
    });
    return res.status(201).send('category created');
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err);
  }
});




app.listen(port, () => {
  console.log(`Server run at ${port}`)
})