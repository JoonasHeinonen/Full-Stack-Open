const jwt = require('jsonwebtoken');
const blogRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const config = require('../utils/config');

blogRouter.get('/', async(req, res) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 });
    
    res.json(blogs.map(blog => blog.toJSON()));
});

const getTokenFrom = request => {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7);
    }
    return null;
};

blogRouter.post('/', async(req, res) => {
    const body = req.body;
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!token ||!decodedToken.id) {
        return res.status(401).json({ err: 'token missing or invalid' });
    }
    const user = await User.findById(decodedToken.id);

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
    const decodedToken = jwt.verify(req.token, config.SECRET);
    
    if (!req.token || !decodedToken.id) {
        return res.status(401).json({ err: 'token missing or invalid' });
    }

    const blog = await Blog.findByIdAndRemove(req.params.id)
        .catch(error => next(error));
    const userId = req.decodedToken.id;

    if (blog.user.toString() === userId.toString()) {
        res.status(401).end();
    } else {
        res.status(204).end();
    }
});

module.exports = blogRouter;