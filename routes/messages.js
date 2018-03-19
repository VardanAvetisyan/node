const router = require('express').Router();
const Message = require('../models/message');

router.get('/', (req, res) => {
    Message.find()
        .sort({createdAt:'descending'})
        .exec((err, messages) => {
            if(err) return res.send(err);
            res.status(200).json(messages);
        });
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    Message.findById({_id: id}, (err, message) => {
       if(err) return res.status(500).send(err);
       if(!message) return res.status(404).send("Not Found");
        res.status(200).json({body: message.body,header:message.header});
    });
});

router.post('/', (req, res) => {
    const {body, header} = req.body;
    let message = new Message({
        header,
        body
    });
    message.save((err, message) => {
        if(err) return res.status(400).send(err.errors);
        res.status(201).json(message);
    });

});

router.put('/:id', (req, res) => {
    const {id} = req.params;
    Message.findByIdAndUpdate(id, req.body,  {new: true}, (err, message) => {
        if(err) return res.send(err);
        res.status(200).json(message);
    });
});


router.delete('/:id', (req, res) => {
    const {id} = req.params;
    Message.findByIdAndRemove(id, (err) => {
        if(err) return res.send(err);
        res.status(200).send(`Message with ${id} successfully deleted`);
    });
});

module.exports = router;