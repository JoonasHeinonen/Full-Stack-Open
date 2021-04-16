const Blog = require('../models/Blog');

const initialBlogs = [
    {
        _id: '60785db49523cd4a9c7e11de',
        title: 'Test automation for Express.js',
        author: 'Joonas Heinoonen, BBA',
        url: 'localhost:3003/api/blogs',
        likes: 9
    },
    {
        _id: '60786133198d8947a8a9ca88',
        title: 'Run Drupal with Docker',
        author: 'Joonas Heinoonen, BBA',
        url: 'localhost:3003/api/blogs',
        likes: 100
    }
];

const blogsInDb = async() => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
};

module.exports = {
    initialBlogs,
    blogsInDb
};
