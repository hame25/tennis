import Express from 'express';
import url from 'url';
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
 
app.get('/players', (req, res) => {
  const myCluster = new Couchbase.Cluster('couchbase://localhost');
  const myBucket = myCluster.openBucket('tennis');

  const query = Couchbase.N1qlQuery.fromString('SELECT DISTINCT Winner as name FROM tennis Order By Winner');

  const results = myBucket.query(query, (err, results) => {
    if(err) return console.log(err);

    res.send(results)
  });
});

app.get('/results/:player', (req, res) => {
  const myCluster = new Couchbase.Cluster('couchbase://localhost');
  const myBucket = myCluster.openBucket('tennis');

  const query = Couchbase.N1qlQuery.fromString('SELECT * FROM tennis where Winner = $1 or Loser = $1');

  const results = myBucket.query(query, [req.params.player], (err, results) => {
    if(err) return console.log(err);

    res.send(results)
  });
});

app.get('/head-to-head/:player1/:player2', (req, res) => {
  const myCluster = new Couchbase.Cluster('couchbase://localhost');
  const myBucket = myCluster.openBucket('tennis');

  const query = Couchbase.N1qlQuery.fromString('SELECT * FROM tennis where (Winner = $1 and Loser = $2) or (Winner = $2 and Loser = $1)');

  const results = myBucket.query(query, [req.params.player1, req.params.player2], (err, results) => {
    if(err) return console.log(err);

    res.send(results)
  });

});
 
app.listen(1980, () => {
  console.log('running tennis appi...')
});
