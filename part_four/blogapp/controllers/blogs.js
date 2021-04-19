const blogRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

blogRouter.get('/', async(req, res) => {
    Blog
        .find({})
        .then(blogs => {
            res.json(blogs);
        });
});

blogRouter.put('/:id', async(req, res, next) => {
    const body = req.body;
    const blog = { likes: body.likes };

    await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
        .then(updatedBlog => {
            res.json(updatedBlog);
        })
        .catch(error => next(error));
});


blogRouter.delete('/:id', async(req, res, next) => {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
});

blogRouter.post('/', async(req, res, next) => {
    const body = req.body;
    const user = await User.findById(body.userId);

    console.log('User ID: ', user);

    const blog = new Blog({
        title: body.title,
        author: user._id,
        url: body.url,
        likes: 0
    });

    const savedBlog = await blog.save();
    console.log('Saved blog: ', savedBlog._id);

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.json(savedBlog.toJSON());
});

module.exports = blogRouter;