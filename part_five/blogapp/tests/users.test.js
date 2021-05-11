const helper = require('./blog_test_helper');
const supertest = require('supertest');

const app = require('../app');
const api = supertest(app);

describe('when there is initially one user at db', () => {
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

        const usernames = usersAtEnd.map(u => u.username);
        expect(usernames).toContain(newUser.username);
    });

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain('`username` to be unique');

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test('creation fails with proper statuscode and message if username is too short', async () => {
        const newUser = {
            username: 'An',
            name: 'Angela Cross',
            password: 'fazerinsininen',
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain('`username` to contain at least 3 characters.');
    
        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test('creation fails with proper statuscode and message if password is too short', async () => {
        const newUser = {
            username: 'AngieC',
            name: 'Angela Cross',
            password: 'f',
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain('`password` to contain at least 3 characters.');

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
});