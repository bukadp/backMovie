const express = require('express')
const app = express()
const port = 3000


const url = 'mongodb://localhost:27017/main';
const mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });


const MovieSchema = new mongoose.Schema({ // определяем схему
  title: String,
  category: String,
  year: Number,
  duration: Number,
  director: String,
});

const CategorySchema = new mongoose.Schema({
  title: String,
});

const DirectorSchema = new mongoose.Schema({
  fullName: String,
});

const Movie = mongoose.model('Movie', MovieSchema); // создаем модель по схеме
const Category = mongoose.model('Category', CategorySchema);
const Director = mongoose.model('Director', DirectorSchema);

app.use(express.json());

app.post('/movies', async (req, res) => {
  try {
    const movie = await Movie.create({
      title: 'Matrix',
      category: 'Fantacy',
      year: 1999,
      duration: 98,
      director: 'Bros Wachovsky'
    });
    return res.status(201).send('movie created');
  } catch (err) {
    return res.status(500).send(err);
  }
});


app.post('/category', async (req, res) => {
  try {
    const category = await Category.create({
      title: 'Fantacy'
    });
    return res.status(201).send('category created');
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err);
  }
});


app.post('/director', async (req, res) => {
  try {
    const director = await Director.create({
      fullName: 'Steven Spielberg'
    });
    return res.status(201).send('director created');
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err);
  }
});


app.listen(port, () => {
  console.log(`Server ${port}`)
})