const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('../utils/test_helper')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})

  console.log('cleared')
  for(let blog of helper.initialBlogs) {
    const user = await User.findById(blog.userId)
    const blogObject = new Blog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: user._id
    })
    console.log('saved')
    await blogObject.save()
  }

  console.log('done')
})

test('returns the correct amount of blog posts in the JSON format', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/)

  expect(response.body.length).toBe(helper.initialBlogs.length)

}, 100000)

test('the unique identifier property of the blog posts is named id', async () => {
  const blogs = await helper.blogsInDb()

  expect(blogs[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Greece Road Trip: An Epic Travel Guide to Peloponesse',
    author:'Marek',
    url: 'https://www.indietraveller.co/peloponesse-greece-travel-guide/',
    likes: 50,
    userId: '62011f0db6a5b29a5caafe69'
  }

  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1hcmVrIiwiaWQiOiI2MjAxMWYwZGI2YTViMjlhNWNhYWZlNjkiLCJpYXQiOjE2NDQyNDMwMTZ9.8W7eevmBv50Kibthg3Z4lhPCiG5ipBHy6iJOfeZXsLk')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain('Greece Road Trip: An Epic Travel Guide to Peloponesse')
})

test('a blog with no token authorization can not be added', async () => {
  const newBlog = {
    title: 'Greece Road Trip: An Epic Travel Guide to Peloponesse',
    author:'Marek',
    url: 'https://www.indietraveller.co/peloponesse-greece-travel-guide/',
    likes: 50,
    userId: '62011f0db6a5b29a5caafe69'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)
})

test('a blog added without likes is default 0', async () => {
  const newBlog = {
    title: 'Greece Road Trip: An Epic Travel Guide to Peloponesse',
    author:'Marek',
    url: 'https://www.indietraveller.co/peloponesse-greece-travel-guide/',
    userId: '62011f0db6a5b29a5caafe69'
  }

  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1hcmVrIiwiaWQiOiI2MjAxMWYwZGI2YTViMjlhNWNhYWZlNjkiLCJpYXQiOjE2NDQyNDMwMTZ9.8W7eevmBv50Kibthg3Z4lhPCiG5ipBHy6iJOfeZXsLk')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const likes = blogsAtEnd[helper.initialBlogs.length].likes
  expect(likes).toBe(0)
})

test('a blog without title and url will not be adeed', async () => {
  const newBlog = {
    author:'Marek',
    likes: 50,
    userId: '62011f0db6a5b29a5caafe69'
  }

  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1hcmVrIiwiaWQiOiI2MjAxMWYwZGI2YTViMjlhNWNhYWZlNjkiLCJpYXQiOjE2NDQyNDMwMTZ9.8W7eevmBv50Kibthg3Z4lhPCiG5ipBHy6iJOfeZXsLk')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})