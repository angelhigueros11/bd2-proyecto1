const auth = require('../components/auth/network');
const post = require('../components/post/network');

const routes = function (server){
    server.use('/api/auth', auth);
    server.use('/api/post', post);
}

module.exports = routes;