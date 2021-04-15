const logger = require('../utils/logger');

const dummy = (blogs) => {

    logger.info('Blogs: ', blogs);

    return 1;
};

module.exports = {
    dummy
};