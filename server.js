require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const types = [
  'japanese',
  'thai',
  'fast',
  'mexican',
  'burger',
  'soup',
  'new',
  'sit-down',
  'fancy',
];

const { MongoClient, ServerApiVersion } = require('mongodb');

MongoClient.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
}).then((client) => {
  console.log('Connected to DB');
  const db = client.db('restaurantPicker');
  const restaurants = db.collection('restaurants');

  app.set('view engine', 'ejs');

  app.use(express.static(__dirname + '/public'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/', (req, res) => {
    const result = restaurants.find();
    res.render('index.ejs', { data: result });
  });

  app.get('/restaurant', (req, res) => {
    res.send('You picked a random restaurant');
  });

  app.get('/restaurant/:category', (req, res) => {
    const { category } = req.params;
    if (!types.includes(category)) {
      res.status(400).send('Invalid restaurant category');
    }
    res.json(category);
  });

  app.post('/restaurant', (req, res) => {
    const result = restaurants.insertOne(req.body);
    console.log(`${req.body.name} added to the database`);
    res.redirect('/');
  });

  app.listen(PORT, () => {
    console.log('Server is listening on port', PORT);
  });

  client.close();
});
