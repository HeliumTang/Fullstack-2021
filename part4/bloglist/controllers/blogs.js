const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const user = await User.findById(request.user.id)

  const blog = new Blog({
    ...request.body,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).end('')
  }

  await blog.remove()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    ...request.body,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  response.json(updatedBlog)
})

module.exports = blogsRouter
