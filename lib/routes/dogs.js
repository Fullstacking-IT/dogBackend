const { Router } = require('express');
const Dog = require('../models/Dog');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      breed, 
      age
    } = req.body;

    Dog
      .create({ name, breed, age })
      .then(dog => res.send(dog))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Dog
      .find()
      .select({
        __v: false
      })
      .then(dogs => res.send(dogs))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Dog
      .findById(req.params.id)
      .select({
        __v: false
      })
      .then(dog => res.send(dog))
      .catch(next);
  });
