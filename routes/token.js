'use strict';

const express = require('express');
const app = express()
// eslint-disable-next-line new-cap
const router = express.Router();
const bcrypt = require('bcrypt')
const cookieSession = require('cookie-session')
const jwt = require('jsonwebtoken')
const knex = require('../knex')
const boom = require('boom')
const humps = require('humps')
// YOUR CODE HERE
router.get('/', (req, res, next) => {
    if (req.cookies.token) {
        res.status(200)
        res.send(true)
    } else {
        res.status(200)
        res.send(false)
    }
})

router.post('/', (req, res, next) => {
    let email = req.body.email
    console.log(req.body);
    knex('users').select()
        .where("email", email)
        .first()
        .then((user) => {
            let match = bcrypt.compareSync(req.body.password, user.hashed_password)
            if (match) {
                delete user.hashed_password
                var token = jwt.sign('user', process.env.JWT_KEY)
                res.cookie('token', token, {
                    httpOnly: true
                })
                res.status(200)
                res.send(humps.camelizeKeys(user))
            } else {}

        })
})

router.delete('/', (req, res, next)=>{
  res.clearCookie('token')
  res.send(true)
})









module.exports = router;
