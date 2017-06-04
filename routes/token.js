'use strict';

const express = require('express');
const app = express()
// const ev = require('express-validation')
// eslint-disable-next-line new-cap
const router = express.Router()
const bcrypt = require('bcrypt')
const cookieSession = require('cookie-session')
const jwt = require('jsonwebtoken')
const knex = require('../knex')
const boom = require('boom')
const humps = require('humps')


router.get('/', (req, res, next) => {
    if (req.cookies.token) {
      // console.log('token! ', req.cookies.token)
        res.status(200)
        res.send(true)
    } else {
      // console.log('No token! ', req.cookies.token)
      // console.log('user with no jwt= ', req.route)
        res.status(200)
        res.send(false)
    }
})

router.post('/', (req, res, next) => {
    let email = req.body.email
    // console.log('req.body= ', req.body);
    knex('users').select()
        .where("email", email)
        .then((user) => {
          // console.log('user[0]= ', user[0]);

          if (user[0] !== undefined && user.length > 0){
            let match = bcrypt.compareSync(req.body.password, user[0].hashed_password)
            if (match) {
                delete user[0].hashed_password
                let token = jwt.sign(user[0], process.env.JWT_KEY)
                // console.log('token= ', token);
                res.cookie('token', token, {
                    httpOnly: true
                })
                res.status(200)
                res.send(humps.camelizeKeys(user[0]))
            } else {
              return next (boom.badRequest('Bad email or passwor'))
            }
          } else {
              return next (boom.badRequest('Bad email or password'))
          }
        })
})

router.delete('/', (req, res, next)=>{
  res.clearCookie('token')
  res.send(true)
})









module.exports = router;
