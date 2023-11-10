const https = require('https'); 
const app = require('./app'); 
const fs = require('fs'); 
// Defining the port number for the server
const PORT = 3000; 

// Creating an HTTPS server using the 'https.createServer' method
const server = https.createServer(
    {
        // Specify the private key file for SSL/TLS
        key: fs.readFileSync('keys/privatekey.pem'), 
        // Specify the certificate file for SSL/TLS
        cert: fs.readFileSync('keys/certificate.pem') 
    },
    app 
);

// Listen for incoming requests on the specified port
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
