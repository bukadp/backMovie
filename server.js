const express = require('express')
const app = express()
const port = 3000

const url = 'mongodb://localhost:27017/main';
const {MongoClient} = require('mongodb');
const client = new MongoClient(url);

client.connect().then(() => {
  console.log('DB connect');
}).catch((err) => {
  console.log('DB error', err);
});

app.use(express.json());

app.post('/movies', async (req, res) => {
  try {
  await client.db("main").collection("movies").insertOne(req.body);
  return res.status(201).send('movie created');
  } catch (err) {
    return res.status(500).send(err);
  }
});

  app.post('/category', async (req, res) => {
    try {
    await client.db("main").collection("category").insertOne(req.body);
    return res.status(201).send('category created');
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err);
  }
  });



app.listen(port, () => {
    console.log(`Server aaaa ${port}`)
  })