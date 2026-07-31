const helmet = require("helmet");
const cors = require("cors");

export const securityMiddleware = [

    helmet({
        contentSecurityPolicy: false
    }),
    
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"]
    })

];