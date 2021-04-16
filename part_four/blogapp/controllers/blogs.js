const blogRouter = require('express').Router();
const Blog = require('../models/Blog');

blogRouter.get('/', async(req, res) => {
    Blog
        .find({})
        .then(blogs => {
            res.json(blogs);
        });
});

blogRouter.post('/', async(req, res) => {
    const blog = new Blog(req.body);

    blog
        .save()
        .then(result => {
            res.status(201).json(result);
        });
});

blogRouter.delete('/:id', async(req, res, next) => {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
})

module.exports = blogRouter;