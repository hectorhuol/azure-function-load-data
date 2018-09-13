const LoadPersonsMongoDB = require('../LoadPersonsMongoDB/index')
const expect = require('chai').expect
const sinon = require('sinon');
const utils = require('./utils');
const repository = require('../LoadPersonsMongoDB/repository/person-repository');

describe('LoadPersonsMongoDB function', () => {
    var repositoryStub = {};
    var sandbox = {};
    var response = {};
    var expected = {};

    beforeEach(function() {

        sandbox = sinon.createSandbox();
        
        response = {
            insertedCount: 10
        };

        expected = {
            data: "Total persons inserted: 10",
            message: "All persons Insterted"
        }

        repositoryStub = sandbox.stub(repository, 'insertMany').callsFake( (ctx,ps,cb) => {
            ctx.log("Calling Fake Repository With: " + JSON.stringify(ps)); // eslint-disable-line no-console
            cb(response);
          });
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('should return Ok and total of inserted data', (done) => {
        sandbox.spy(utils.context, "done");

        utils.req = {
            body:[
                {
                    id:1
                }
            ]
        }

        LoadPersonsMongoDB(utils.context, utils.req);        

        expect(utils.context.res.status).to.equal(200);
        expect(utils.context.res.body).to.equal(JSON.stringify(expected), "Result is wrong!!");
        expect(utils.context.done.called).to.be.true;
        sinon.assert.calledOnce(repositoryStub);
        
        done();
    });

    it('should return Ok when request is empty', (done) => {
        sandbox.spy(utils.context, "done");

        let expected = {
            data: null,
            message: "No persons Inserted"
        }

        utils.req = {
            body:[]
        }

        LoadPersonsMongoDB(utils.context, utils.req);        

        expect(utils.context.res.status).to.equal(200);
        expect(utils.context.res.body).to.equal(JSON.stringify(expected), "Result is wrong!!");
        expect(utils.context.done.called).to.be.true;
        sinon.assert.notCalled(repositoryStub);
        
        done();
    });
})