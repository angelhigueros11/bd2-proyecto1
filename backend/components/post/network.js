const express = require('express')
const router = express.Router()
const response = require('../../network/responses')
const controller = require('./controller')


// Crear nuevo post
router.post('/', function (req, res) {
    controller.addPost(req.body)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(e => {
            response.error(req, res, e, 500, e);
        })
})

// Obtener post con filtro
router.post('/post', function (req, res) {
    controller.getPosts(req.body)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(e => {
            response.error(req, res, e, 500, e);
        })
})


router.get('/', function (req, res) {
    controller.getPosts()
    .then((userList) => {
        response.success(req, res, userList, 200);
    })
    .catch(e => {
        response.error(req, res, e, 500, e);
    })
})
module.exports = router
