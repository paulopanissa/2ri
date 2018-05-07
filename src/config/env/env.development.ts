module.exports = {
    server: { 
        port: process.env.SERVER_PORT || 5000
    },
    db: { 
        url: process.env.DB_URL || 'mongodb://localhost/registro-api' 
    },
    security: {
        saltRounds: 10
    }
}