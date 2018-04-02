var mi = require('mongoimport');
var data = require('../data/2017.json');

function callback(err, ret) {
  if(err) {
    if(err.message.match('ECONNREFUSED')) console.log('✘  make sure you have started mongodb server');
    if(err.message.match('Authentication')) console.log('✘  make sure the username/password pair is matched');
    console.log('=  done!\n');
    throw err.message;
  }

  console.log('✔  %d records inserted', ret.insertedCount);
  console.log('=  done!\n');
}

var config = {
  fields: data,                     // {array} data to import 
  db: '',                     // {string} name of db 
  collection: '',        // {string|function} name of collection, or use a function to 
                                  //  return a name, accept one param - [fields] the fields to import 
   
  // they're options 
  host: '',        // {string} [optional] by default is 27017 
  username: '',             // {string} [optional] 
  password: '',                 // {string} [optional] 
  callback: callback       // {function} [optional] 
};


mi(config);
