const logger = require('../utils/logger');

const dummy = (blogs) => {

    logger.info('Blogs: ', blogs);

    return 1;
};

const totalLikes = (blogs) => {
    const blogsLength = blogs.length;
    const allBlogs = blogs.reduce((all, blog) => {
        return all + blog.likes
    }, 0);

    return (blogsLength === 0 
        ? 0
        : allBlogs
    );
};

module.exports = {
    dummy,
    totalLikes
};