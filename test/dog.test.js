require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');

describe('dog routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a dog', () => {
    return request(app)
      .post('/api/v1/dogs')
      .send({ 
        name: 'Pennie', 
        breed: 'Doodle',
        age: '7lbs'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Pennie', 
          breed: 'Doodle',
          age: '7lbs',
          __v: expect.any(Number)
        });
      });
  });
});
