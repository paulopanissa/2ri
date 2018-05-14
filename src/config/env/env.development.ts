module.exports = {
    server: { 
        port: process.env.SERVER_PORT || 3000
    },
    db: { 
        url: process.env.DB_URL || 'mongodb://localhost/registro-api' 
    },
    security: {
        saltRounds: process.env.SALT_ROUNDS || 10,
        apiToken: process.env.API_SECRET || 'FC431DA38F2E02EE31247EF887CD6AF97A1D04D844DECC148D320DCC01BAE2DD',
        enabledHTTPS: process.env.ENABLE_HTTPS || false,
        certificate: process.env.CERT_FILE || './src/config/security/keys/cert.pem',
        key: process.env.KEY_FILE || './src/config/security/keys/key.pem'
    }
}