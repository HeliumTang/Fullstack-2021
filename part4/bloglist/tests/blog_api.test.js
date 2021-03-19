const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./blog_test_helper')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('makes an HTTP GET request to the /api/blogs url', () => {
  test('Exercise 4.8: expect returns the correct amount of blog posts and in the JSON format.', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('Exercise 4.9: expect the unique identifier property of the blog posts is named id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]
    const result = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result.body.id).toBeDefined()
  })
})

describe('making an HTTP POST request to the /api/blogs url', () => {
  test('Exercise 4.10: expect successfully creates a new blog post', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

    const titles = response.body.map((r) => r.title)
    expect(titles).toContain('Type wars')
  })

  test('Exercise 4.11: expect default value 0 when the likes property is missing from the request', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    }

    const result = await api.post('/api/blogs').send(newBlog)
    expect(result.body.likes).toBe(0)
  })

  test('Exercise 4.12: expect the status code 400 when the title and url properties are missing', async () => {
    const newBlog = {
      author: 'Robert C. Martin',
      likes: 2,
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

test('Exercise 4.13: deleting a single blog post resource', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length - 1)
})

test('Exercise 4.14: updating the information of an individual blog post.', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const newBlog = {
    ...blogToUpdate,
    likes: 100,
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get(`/api/blogs/${blogToUpdate.id}`)
  expect(response.body).toEqual(newBlog)
})

afterAll(() => {
  mongoose.connection.close()
})
