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

    test('the identifier is field "id"', async () => {
        const response = await api.get('/api/blogs');

        response.body.forEach(blog => {
            expect(blog.id).toBeDefined();
        });
    });
});

afterAll(() => {
    mongoose.connection.close();
});