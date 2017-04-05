'use strict';

const express = require('express');

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
    if (!req.cookies.token) {
        return next(boom.create(401, "Unauthorized"))
        // .send('Unauthorized')
    } else {
        knex('favorites')
            .join('books', 'books.id', 'book_id')
            .then((favs) => {
                res.send(humps.camelizeKeys(favs))
                // console.log(favs);
            })
    }
})

router.get('/check?', (req, res, next) => {
    if (req.cookies.token) {
        let reqId = req.query.bookId
        knex('favorites')
            .where('book_id', reqId)
            .then((data) => {
                if (data[0]) {
                    res.status(200).send(true)
                } else {
                    res.status(200).send(false)
                }
            })
    } else {
        return next(boom.create(401, "Unauthorized"))
    }
})

router.post('/', (req, res, next) => {
    if (req.cookies.token) {
      let newBook = req.body.bookId
        knex.raw("select setval('favorites_id_seq', (select max(id) from favorites))")
            .then(
                knex('favorites')
                .returning('*')
                .insert({
                    book_id: newBook,
                    user_id: 1
                })
                .then((data) => {
                    res.send(humps.camelizeKeys(data[0]))
                })
            )
    } else {
        return next(boom.create(401, "Unauthorized"))
    }
})

router.delete('/', (req, res, next) => {
    if (req.cookies.token) {
        let delBook = req.body.bookId
        knex('favorites')
            .where('book_id', delBook)
            .then((data) => {
                delete data[0].id
                let deleted = humps.camelizeKeys(data[0])
                res.send(deleted)
            })
            .then(knex('favorites')
                .where('book_id', delBook)
                .del()
            )

    } else {
        return next(boom.create(401, "Unauthorized"))
    }
})


module.exports = router;
