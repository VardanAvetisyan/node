const app = require('../index');
const supertest = require('supertest');
const expect = require('chai').expect;

const mongoObjectId = require('./helpers').mongoObjectId;
const sampleMessages = require('./helpers').msgs;
const Message = require('../models/message');

describe('Messages', () => {
    let request;

    before((done) => {  /* We empty the database before all tests and then inserts two sample records */
        request = supertest(app);
        Message.remove({}, (err) => {
           if(err) throw new Error(err);
           Message.create(sampleMessages,(err) => {
              if(err) throw new Error(err);
              done();
           });
        })
   });

    after((done) => { /* After all test we empty the database */
        Message.remove({}, (err) => {
            if(err) throw new Error(err);
                done();
        })
    });

    describe('/GET /message', () => {   /* GET all messages */
        it('should GET all the messages', (done) => {
           request
               .get('/api/v1/message')
               .expect(200)
               .end((err, res) => {
                if(err) throw new Error(err);
                   expect(res.body).to.have.lengthOf(2);
                    done();
               });
        });
    });

    describe('/GET /message/:id', () => { /* GET body of message by id */
        it('should GET body of message', (done) => {
            let msg = new Message({
                header: '-get test',
                body:'-get test'
            });
            msg.save((err, msg) => {
                if(err) throw new Error(err);
                request
                    .get(`/api/v1/message/${msg.id}`)
                    .expect(200)
                    .end((err, res) => {
                        if(err) throw new Error(err);
                        expect(res.body).to.include({body: msg.body,header:msg.header});
                        done();
                    });
            });
        });

        it('should return 404 if message not found', (done) => {
                request
                    .get(`/api/v1/message/${mongoObjectId()}`)
                    .expect(404)
                    .end((err, res) => {
                        if(err) throw new Error(err);
                        expect(res.text).to.include('Not Found');
                        done();
                    });
        });
    });

    describe('/POST /message', () => { /* POST a new message */
        it('should post a message', (done) => {
            request
                .post('/api/v1/message')
                .send({
                    header:"-post test",
                    body:"-post test"
                })
                .expect(201)
                .end((err, res) => {
                    if(err) throw new Error(err);
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.include({header:'-post test', body:'-post test'});
                    done();
                });
        });
        it('should return 400 when required field is not presented', (done) => {
            request
                .post('/api/v1/message')
                .send({
                    header:"-post test"
                })
                .expect(400)
                .end((err) => {
                    if(err) throw new Error(err);
                    done();
                });
        });
    });

    describe('/PUT /message/:id', () => { /* Update the existing message */
        it('it should update a message', (done) => {
            let msg = new Message({
                header: '-put test',
                body:'-put test'
            });
            msg.save((err, msg) => {
                if(err) throw new Error(err);
                request
                   .put(`/api/v1/message/${msg.id}`)
                   .send({
                       header:'edited',
                       body:'edited'
                   })
                   .expect(200)
                   .end((err, res) => {
                    if(err) throw new Error(err);
                    expect(res.body).to.include({header:'edited', body:'edited'});
                    done();
                   });
            });
        });
    });

    describe('/DELETE /message/:id', () => { /* DELETE message by id */
        it('it should delete a message', (done) => {
            let msg = new Message({
                header: '-del test',
                body:'-del test'
            });
            msg.save((err, msg) => {
                if(err) throw new Error(err);
                request
                    .delete(`/api/v1/message/${msg.id}`)
                    .expect(200)
                    .end((err, res) => {
                        if(err) throw new Error(err);
                        expect(res.text).to.include("deleted");
                        done();
                    });
            });
        });
    });

});