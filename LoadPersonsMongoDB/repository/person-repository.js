var mongoDB = require("../../Shared/mongodb");
var env = require("../../Shared/environment");

var config = {
    auth: {
        auth: {
            user: env.getEnvironmentVariable("MongoUser"),
            password: env.getEnvironmentVariable("MongoPassword")
        }
    },
    db: env.getEnvironmentVariable("MongoDB"),
    url: env.getEnvironmentVariable("MongoUrl")

};

function handleError(context, err, message) {
    context.log(err);
    context.res = {
        status: 500,
        body: message
    };
    context.done();
}

function queryAll(context, callback) {
    let database = null;
    mongoDB.open(config).then((db) => {
        database = db;
        return db.collection('persons').find().toArray();
    }).then((result) => {
        callback(result);
        mongoDB.close(database);
    }).catch((err) => {
        handleError(context, err, "Unable to connect to database");
    })
}

function insertMany(context, persons, callback) {
    let database = null;
    mongoDB.open(config).then((db) => {
        database = db;
        return db.collection('persons').insertMany(persons);
    }).then((result) => {
        callback(result);
        mongoDB.close(database);
    }).catch((err) => {
        handleError(context, err, "Unable to connect to database");
    })
}

module.exports = { 
    queryAll: queryAll,
    insertMany: insertMany
};