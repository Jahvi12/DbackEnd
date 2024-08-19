require("dotenv").config();

const server = require('./src/server');
const db = require('./src/lib/db');

const port = process.env.PORT || 8080;

db.connect()
    .then(() => {
        console.log('BD is connected');
        
        server.listen(port, () => {
            console.log(`Server In ${port}`);
        })
    })
    .catch((error) => {
        console.error('connection error:', error);
        process.exit(1);
    });