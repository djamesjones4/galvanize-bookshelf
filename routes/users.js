'use strict';

const express = require('express');
const knex = require('../knex')
// eslint-disable-next-line new-cap
const router = express.Router();
const humps = require('humps')
const bcrypt = require('bcrypt')
const saltRound = 10
const boom = require('boom')
// YOUR CODE HERE
router.post('/users', (req, res, next) => {
    let email = req.body.email
    let user = req.body
    let id = req.body.id
    let first = req.body.firstName
    let last = req.body.lastName
    let pass = req.body.password
    let saltHash = bcrypt.hashSync(pass, 8)
    knex('users')
        .returning(['id', 'first_name', 'last_name', 'email'])
        .insert({
            'first_name': first,
            'last_name': last,
            'email': email,
            'hashed_password': saltHash
        })
        .then((data) => {
            res.send(humps.camelizeKeys(data[0]))
        })
    // if (email === ''){
    //   res.sendStatus(400)
    //   // res.done('Email must not be blank')
    // }
    // else if (req.body.password === '')
    //   res.sendStatus(400)
    // res.send('Password must be at least 8 characters long')

})



module.exports = router;
