var req = {  };
        
var context = {
    res: {
        status: 200
    },
    log: function (str) {
        console.log(str); // eslint-disable-line no-console
    },
    done: function () {

    }
};

let utils = {
    req: req,
    context: context
}

module.exports = utils;

