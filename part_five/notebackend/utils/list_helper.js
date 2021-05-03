const logger = require('../utils/logger');

const dummy = (notes) => {
    logger.info('Notes: ', notes);
    return 1;
};

module.exports = {
    dummy,
};