var mongoClient = require('mongodb').MongoClient;

function open(config){    
    return new Promise((resolve, reject)=>{
        // Use connect method to connect to the Server
        mongoClient.connect(config.url, config.auth , (err, client) => {
            if (err) {
                reject(err);
            } else {
                var db = client.db(config.db);
                resolve(db);
            }
        });
    });
}

function close(db){
    //Close connection
    if(db){
        db.close();
    }
}

let db = {
    open : open,
    close: close
}

module.exports = db;