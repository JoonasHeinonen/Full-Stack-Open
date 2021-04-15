const blogRouter = require('express').Router();
const Blog = require('../models/Blog');

blogRouter.get('/', (req, res) => {
    Blog
        .find({})
        .then(blogs => {
            res.json(blogs);
        });
});

blogRouter.post('/', (req, res) => {
    const blog = new Blog(req.body);

    blog
        .save()
        .then(result => {
            res.status(201).json(result);
        });
});

module.exports = blogRouter;