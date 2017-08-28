import Express from 'express';
import Couchbase from 'couchbase';
import url from 'url';
import results from './data/2017.json';

const app = Express()
 
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

app.get('/upload', (req, res) => {
  const myCluster = new Couchbase.Cluster('couchbase://localhost');
  const myBucket = myCluster.openBucket('tennis');

  let i = 1;

  const queryTemplate = Couchbase.N1qlQuery.fromString('INSERT INTO tennis (KEY, VALUE) VALUES ($1, $2)');

  results.map((item) => {

    item.type = "result";
    item.id = i.toString();
    myBucket.query(queryTemplate, [i.toString(), item], 
    (err, rows) => {
      if (err) console.log(err)
      console.log("Got rows: %j", rows);  
      
      console.log("Returning...");
    });
    i++;
  });
  res.send('Processing...');
});
 
app.listen(1980, () => {
  console.log('running tennis app...')
})
