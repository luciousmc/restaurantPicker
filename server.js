require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3001;

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
  const collection = db.collection('restaurants');

  app.use(express.static(__dirname + '/public'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/', (req, res) => {
    res.send('Connected');
  });

  app.get('/:category', (req, res) => {
    const { category } = req.params;
    if (!types.includes(category)) {
      res.status(400).send('Invalid restaurant category');
    }
    res.json(category);
  });

  app.listen(process.env.PORT || PORT, () => {
    console.log('Server is listening on port', process.env.PORT || PORT);
  });

  client.close();
});
