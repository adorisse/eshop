const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { required } = require('joi');
//


exports.bidule = (req, res) => {

    
    let hachePWD = bcrypt.hashSync(req.body.password, 10);

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hachePWD
    });

    user.save()
        .then((data) => {
            let userToken = jwt.sign(
                {
                    id: data._id

                },
                'supersecret',
                {
                    expiresIn: 86400,
                }
            )
            res.send({
                //user: data,
                //created: true
                token: userToken,
                auth: true
            })
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                error: 500,
                message: err.message || "some error occured while creating user"
            })
        })

}

exports.findOne = (req, res) => {
    User.findById(req.params.id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => res.send(err));
}

//
exports.login = (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    auth: false,
                    token: null,
                    message: `No user find with email $(req.body.email)`
                });
            }

            let pwdIsValid = bcrypt.compareSync(req.body.password, user.password);

            if (!pwdIsValid) {
                return res.status(401).send({
                    auth: false,
                    token: null,
                    message: "password is not valid"
                })
            }

            let userToken = jwt.sign({
                id: user._id
            },
                "supersecret", { expiresIn: 86400 })

            res.send({

                auth: true,
                token: userToken,
            });

        })

        .catch((err) => {
            res.send(err);
        });

};