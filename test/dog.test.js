require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const Dog = require('../lib/models/Dog');

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
        age: '7 lbs'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Pennie', 
          breed: 'Doodle',
          age: '7 lbs',
          __v: expect.any(Number)
        });
      });
  });

  it('can get all dogs', async() => {
    const dog = await Dog.create([{
      name: 'Pennie', 
      breed: 'Doodle',
      age: '7 lbs'
    },
    {
      name: 'Poochie', 
      breed: 'Bloodhound',
      age: '120 lbs'
    }]);

    return request(app)
      .get('/api/v1/dogs')
      .then(res => {
        const dogsJSON = JSON.parse(JSON.stringify(dog));
        dogsJSON.forEach(dog => {
          expect(res.body).toContainEqual({ name: dog.name, breed: dog.breed, age: dog.age, _id: dog._id });
        });
      });
  });

});
