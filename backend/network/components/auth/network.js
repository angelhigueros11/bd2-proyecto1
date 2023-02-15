const express = require('express')
const router = express.Router()
const response = require('../../network/responses')
const controller = require('./controller')


// Crear nuevo usuario
router.post('/', function (req, res) {
    controller.addUser(req.body)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(e => {
            response.error(req, res, e, 500, e);
        })
})

// login
router.post('/login', function (req, res) {
    controller.getUsers(req.body)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(e => {
            response.error(req, res, e, 500, e);
        })
})


router.get('/', function (req, res) {
    controller.getUsers()
    .then((userList) => {
        response.success(req, res, userList, 200);
    })
    .catch(e => {
        response.error(req, res, e, 500, e);
    })
})
module.exports = router
