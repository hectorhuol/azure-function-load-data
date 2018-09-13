var repository = require('./repository/person-repository');

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request to Bulk Insert Persons in MongoDB');

    var response = {
        data:null,
        message:null
    }

    if(req.body && req.body.length) {
        var persons = [];
        persons =  req.body;
        repository.insertMany(context, persons, function(data){
            context.log('All persons inserted');
            response.message = "All persons Insterted";
            response.data = "Total persons inserted: " + data.insertedCount;
            context.res = { status: 200, body: JSON.stringify(response)};
            context.done();       
        }); 
    } else {
        response.message = "No persons Inserted";
        context.res = { status: 200, body: JSON.stringify(response) };
        context.done();
    }    
};