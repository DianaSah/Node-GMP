const express = require("express");
const app = express();
const Joi = require("joi");
const { validateSchema } = require('./utils');

const PORT = Number(process.env.PORT) || 3000;

const userScema = Joi
  .object().keys({
    id: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
  })

const users = [
  {
    id: '1',
    login: '10.15',
    password: 'Diana',
    age: 24,
    isDeleted: false
  },
  {
    id: '2',
    login: '10.12',
    password: 'Marta',
    age: 13,
    isDeleted: false
  },
]

app.use(express.json());

const getAutoSuggestUsers = (limit, loginSubstring) =>  users
  .sort((a, b) => a.login - b.login)
  .filter(({ login }) => login.includes(loginSubstring))
  .slice(0, parseInt(limit));

// Get user by id

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(user => user.id === id);

  res.json(user);
})

// Get auto-suggest users list

app.get('/users', (req, res) => {
  const { limit, loginSubstring } = req.query;

  return (limit && loginSubstring)
    ? res.json(getAutoSuggestUsers(limit, loginSubstring))
    : res.json(users)
})

// Create user

app.post('/users', validateSchema(userScema), (req, res) => {
 const user = req.body;
 const newUsers = [...users, user];
 users.push(user);

 res.json(newUsers);
})

// Update user

app.put('/users/:id', validateSchema(userScema), (req, res) => {
  const { id } = req.params;
  const userInfo = req.body;
  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...userInfo }
  }
  
  res.json(users);
})

// Delete user

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(user => user.id === parseInt(id, 10));
  const deletedUser = { ...user, isDeleted: true };

  res.json(deletedUser);
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
})

app.listen(PORT);