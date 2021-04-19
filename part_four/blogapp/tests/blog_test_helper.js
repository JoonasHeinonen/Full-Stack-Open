const Blog = require('../models/Blog');
const User = require('../models/user');

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

const nonExistingLikes = async() => {
    const blog = new Blog(
        { 
            title: 'if/else for zero likes',
            author: 'test-creator_two',
            url: 'localhost:3003/api/blogs',
        }
    );

    await blog.save();
    await blog.remove();

    return blog.likes = 0;
};

const blogWithNoFields = async() => {
    const blog = new Blog({});
    return blog.toJSON();
};

const usersInDb = async() => {
    const users = await User.find({});
    return users.map(user => user.toJSON());
};

module.exports = {
    initialBlogs,
    blogsInDb,
    nonExistingLikes,
    blogWithNoFields,
    usersInDb
};
