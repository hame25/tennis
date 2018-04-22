import Express from 'express';
import MongoDB from 'mongodb';
import Bluebird from 'bluebird';
import connectionConfig from '../config/db-connection.json';

const MongoClient = Bluebird.promisifyAll(MongoDB.MongoClient);

const app = Express();

const dbUrl = `mongodb://${connectionConfig.username}:${connectionConfig.password}@ds229909.mlab.com:29909/alex-tennis-db`;

const connectToResults = async () => await MongoClient.connectAsync(dbUrl);

app.use('/findall', async (req, res) => {

  try {
    const dbConnection = await connectToResults();
    const db = dbConnection.db(connectionConfig.databaseName);

    const results = await db.collection('results').find().toArray();

    res.send(results);
  } catch (e) {
    res.status(500);
    res.send({ error: e.message });
  }
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
 
app.get('/players', async (req, res) => {

  try {
    const dbConnection = await connectToResults();
    const db = dbConnection.db(connectionConfig.databaseName);

    const players = await db.collection('results').distinct('Winner');

    res.send(players);
  } catch (e) {
    res.status(500);
    res.send({ error: e.message});
  }
});

app.get('/results/:player', async (req, res) => {
  const name = req.params.player;

  if(!name) {
    res.status(500);
    res.send({ error: 'No player name set' });
  }

  try {
    const dbConnection = await connectToResults();
    const db = dbConnection.db(connectionConfig.databaseName);

    const players = await db.collection('results').find({ $or: [{ Winner: name }, { Loser: name }] }).toArray();

    res.send(players);
  } catch (e) {
    res.status(500);
    res.send({ error: e.message});
  }
});

app.get('/head-to-head/:player1/:player2', async (req, res) => {
  const { player1, player2 } = req.params;

  if(!player1 || !player2) {
    res.status(500);
    res.send({ error: 'Player1 or player2 not set' });
  }

  try {
    const dbConnection = await connectToResults();
    const db = dbConnection.db(connectionConfig.databaseName);

    const results = await db.collection('results').find(
      { $or: [{ Winner: player1, Loser: player2 }, { Winner: player2, Loser: player1 }] }
    ).toArray();

    res.send(results);
  } catch (e) {
    res.status(500);
    res.send({ error: e.message});
  }

});
 
app.listen(1980, () => {
  console.log('running tennis appi...')
});
