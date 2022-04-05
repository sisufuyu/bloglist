const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  //const decodedToekn = jwt.verify(request.token, process.env.SECRET)
  const user = request.user

  if(!user) {
    response.status(401).json({ error: 'Unauthorized user to post blog' })
  }

  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    likes: body.likes,
    user: user._id
  })

  let savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  savedBlog = await savedBlog.populate('user', { username: 1, name: 1 }).execPopulate()

  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const user = request.user

  const blog = await Blog.findById(request.params.id)
  if(blog.user.toString() !== user._id.toString()) {
    response.status(401).json({ error: 'Unauthorized user to delte blog' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()

})

blogRouter.put('/:id', async (request, response) => {
  //const user = request.user
  const body = request.body

  // if(!user){
  //   response.status(401).json({ error: 'Unauthorized user to change blog' })
  // }

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })
    .populate('user', { username: 1, name: 1 })

  response.json(updatedBlog)
})

blogRouter.post('/:id/comments', async (request, response) => {
  const comments = request.body.comments

  if(!comments){
    response.status(204).end()
  }

  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, { $push: { 'comments': comments } }, { new: true })
    .populate('user', { username: 1, name: 1 })

  response.json(updatedBlog)
})

module.exports = blogRouter