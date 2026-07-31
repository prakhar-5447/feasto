const morgan = require("morgan");
const logger = require("../utils/logger");

const stream = {

    write: (message: any) => {

        logger.info(message.trim());

    }

};

module.exports = morgan("combined", { stream });