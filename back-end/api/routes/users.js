const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../../models/users')
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');


// Handling Post requests
router.post('/signup', (req, res, next) => {
    console.log('user post',req.body)
    //checking if a user doesn't already exist
    User.find({user: req.body.user})
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'User exists'
            });
        } else {
             //encrypting the password of the user
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else { const user = new User({
            _id : new mongoose.Types.ObjectId(),
            user: req.body.user,
            password: hash,
            admin: req.body.admin,
            dateCreated: new Date()
            });
             //Saving it to the database
            user
            .save()
            .then(result => {
                console.log(result);4
                res.status(201).json({
                    message: 'User Created',
                    success:true
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error:err
                });
            });
        }
    });
    }
    });
    });
    //Making the login possible
    router.post('/login', (req, res, next) => {
        //Trying to find a user
        User.find({ user: req.body.user})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Authorization Failed",
                    success:false
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Authorization failed',
                        success:false
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        user: user[0].user,
                        userId: user[0]._id,
                        admin: user[0].admin
                    }
                    , process.env.JWT_KEY, 
                    {
                        expiresIn: "10m"
                    }
                    );
                    return res.status(200).json({
                        message: 'Authorization Successful',
                        data: {
                        token: token,
                        user: user[0].user,
                        userId: user[0]._id,
                        admin: user[0].admin},
                        success:true,
                        
                    });
                }
                res.status(401).json({
                    message: 'Authorization Failed',
                    success:false
                });
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        })
    }); 

   // Handling delete requests by their IDs
router.delete('/delete/:userId', checkAuth, (req, res, next) => {
    const id = req.params.userId
    console.log(id)

    User.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

    // Handling get requests
router.get('/display', checkAuth, (req, res, next) => {
    User.find()
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
   
   
// Handling get requests by their IDs
router.get("/display/:userId", checkAuth, (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
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
router.patch('/edit/:userId', checkAuth, (req, res, next) => {
    console.log(req.params)

    const id = req.params.userId;
    console.log(req.body)

    const updateOps = req.body;
    // for (const ops of req.body) {
    // console.log('ops',ops)

    //     updateOps[ops.propName] = ops.value;
    // }
    console.log(updateOps)
    console.log(id)
    User.updateOne({_id: id}, { $set: updateOps })
        .exec()
        .then(result => {
            console.log('132',result);
            res.status(200).json({
            message: 'User Edited',
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


module.exports = router;