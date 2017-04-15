'use strict';

const express = require('express');
const knex = require('../knex')
// eslint-disable-next-line new-cap
const router = express.Router();
const humps = require('humps')
const bcrypt = require('bcrypt')
const saltRound = 8
const boom = require('boom')
// YOUR CODE HERE
router.post('/', (req, res, next) => {
    let email = req.body.email
    let user = req.body
    let id = req.body.id
    let first = req.body.firstName
    let last = req.body.lastName
    let pass = req.body.password

    if (!email){
      return next(boom.create(400, 'Email must not be blank'))
    }
    if (!pass || pass.length < 8) {
      return next(boom.create(400, 'Password must be at least 8 characters long'))
    }
    knex('users')
    .where('email', email)
    .then((data)=> {
      if (data.length !== 0) {
        return next(boom.create(400, 'Email already exists'))
      }
    })
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

})



module.exports = router;
