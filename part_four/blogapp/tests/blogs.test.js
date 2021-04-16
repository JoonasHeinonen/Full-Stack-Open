const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./blog_test_helper');

const api = supertest(app);

describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json', async() => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('all blogs from DB are returned', async () => {
        const response = await api.get('/api/blogs');
    
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    });

    test('the identifier is field "id"', async() => {
        const response = await api.get('/api/blogs');

        response.body.forEach(blog => {
            expect(blog.id).toBeDefined();
        });
    });

    test('that a blog can be added via http post', async() => {
        const newBlog = {
            title: 'Test blog added with async/await function',
            author: 'test-creator',
            url: 'localhost:3003/api/blogs',
            likes: 0
        };

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    
        const titles = blogsAtEnd.map(b => b.title);
        expect(titles).toContain(
            'Test blog added with async/await function'
        );
    });
});

afterAll(() => {
    mongoose.connection.close();
});