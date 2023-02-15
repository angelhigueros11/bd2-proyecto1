const config = {
    dbUrl: process.env.DB_URL || 'mongodb+srv://uvg:uvg@cluster0.0z18wy4.mongodb.net/?retryWrites=true&w=majority',
    port: process.env.PORT || 8000,
    host: process.env.HOST || 'http://localhost',
    publicRoute: process.env.PUBLIC_ROUTE || '/app',
    filesRouter: process.env.FILES_ROUTER || 'files',
};

module.exports = config;