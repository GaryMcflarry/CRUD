const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

const Client = require('../../models/clients')

// Handling get requests
router.get('/display', (req, res, next) => {
    Client.find()
    .exec()
    .then(docs => {
        console.log(docs);

        // docs.forEach(element => {
        //     console.log('el',element);

        // })
        if (docs.length >= 0) {
            res.status(200).json(docs);
        } else {
            res.status(404).json({
                message: 'No entries found'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

// Handling Post requests
router.post('/add',  (req, res, next) => {
    console.log(req.body)
    
    const client = new Client({
        _id : new mongoose.Types.ObjectId(),
        name: req.body.name,
        surname: req.body.surname,
        contact: req.body.contact,
        dateCreated: new Date()
    });
    //Saving it to the database
    client
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Client Created',
            createdProduct: result,
            success: true
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
            });
        });
    });  
// Handling get requests by their IDs
router.get("/display/:clientId", checkAuth, (req, res, next) => {
    const id = req.params.clientId;
    Client.findById(id)
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if (doc) {
            res.status(200).json(doc);
            return;
        } else {
            res.status(404).json({message: 'No valid entry found for provided ID'});
            return;
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})});
});

// Handling patch requests by their IDs
router.patch('/edit/:clientId', checkAuth, (req, res, next) => {
    console.log(req.params)

    const id = req.params.clientId;
    console.log(req.body)

    const updateOps = req.body;
    // for (const ops of req.body) {
    // console.log('ops',ops)

    //     updateOps[ops.propName] = ops.value;
    // }
    console.log(updateOps)
    console.log(id)
    Client.updateOne({_id: id}, { $set: updateOps })
        .exec()
        .then(result => {
            console.log('132',result);
            res.status(200).json({
            message: 'Client Edited',
            editedProduct: result,
            success: true});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    });

// Handling delete requests by their IDs
router.delete('/delete/:clientId', checkAuth, (req, res, next) => {
    const id = req.params.clientId;
    console.log(id)
    // res.status(200).json('hello');
    Client.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

module.exports = router;