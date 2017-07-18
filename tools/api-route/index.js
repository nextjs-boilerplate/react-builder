const express = require('express')
const nedb = require('nedb');
const expressNedbRest = require('express-nedb-rest');

const restApi = expressNedbRest();

['component','json'].forEach((table)=>{  
  const datastore = new nedb({ filename: `app.db/${table}.db`,  autoload: true });
  restApi.addDatastore(table, datastore);
})


module.exports = restApi