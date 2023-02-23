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



// Remove post
router.delete('/', function (req, res) {
    controller.remove(req.body)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(e => {
            response.error(req, res, e, 500, e);
        })
})

// Dar me gusta a un post
router.put('/', function (req, res) {
    controller.addLike(req.body)
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

// Agregar nuevo tag
router.post('/tag', function (req, res) {
    controller.newTag(req.body)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(e => {
            response.error(req, res, e, 500, e);
        })
})

router.post('/info', function (req, res) {
    controller.info(req.body)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(e => {
            response.error(req, res, e, 500, e);
        })
})


router.post('/mostPostsUser', function (req, res) {
    controller.getMostPostsUser(req.body)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(e => {
            response.error(req, res, e, 500, e);
        })
})

router.post('/limit', function (req, res) {
    controller.getPostsLimit(req.body.limit)
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

