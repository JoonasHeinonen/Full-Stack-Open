const blogRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

blogRouter.get('/', async(req, res) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 });
    
    res.json(blogs.map(blog => blog.toJSON()));
});

blogRouter.post('/', async(req, res, next) => {
    const body = req.body;
    const user = await User.findById(body.user);

    const blog = new Blog({
        title: body.title,
        url: body.url,
        likes: 0,
        user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.json(savedBlog.toJSON());
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

module.exports = blogRouter;