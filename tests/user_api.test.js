const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const saltRounds = 10
    const passwordHash = await bcrypt.hash('password', saltRounds)
    const user = new User({
      username: 'Marek',
      name: 'Marek',
      passwordHash
    })

    await user.save()
  })

  test('a valid user will created', async () => {
    const usersAtStart = await User.find({})

    const user = {
      username: 'Mark and Paul',
      name: 'Mark and Paul',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(200)
      .expect('Content-type', /application\/json/)

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  })

  test('a invalid user will not created', async() => {
    const usersAtStart = await User.find({})

    const user = {
      username: 'yu',
      name: 'sisu',
      password: 'abcd'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-type', /application\/json/)

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

})

afterAll(() => {
  mongoose.connection.close()
})