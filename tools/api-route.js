
const nedb = require('nedb')
const expressNedbRest = require('express-nedb-rest')

const datastore = new nedb({ filename: "app.db",  autoload: true });

var restApi = expressNedbRest();
restApi.addDatastore('project', datastore);
restApi.addDatastore('layer', datastore);
restApi.addDatastore('component', datastore);
restApi.addDatastore('resource', datastore);

module.exports = restApi