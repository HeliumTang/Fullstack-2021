// const blog = require('../models/blog')
const _ = require('lodash')

const totalLikes = (blogs) => {
  return _.reduce(blogs, (sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return _.maxBy(blogs, (blog) => blog.likes)
}

const mostBlogs = (blogs) => {
  const groupByAuthor = _.groupBy(blogs, (blog) => blog.author)
  const blogsForAuthor = _.map(groupByAuthor, (group, author) => {
    return {
      author,
      blogs: group.length,
    }
  })
  const results = _.orderBy(blogsForAuthor, ['blogs'], ['desc'])
  const mostBlogs = results[0]
  return mostBlogs
}

const mostLikes = (blogs) => {
  const groupByAuthor = _.groupBy(blogs, (blog) => blog.author)
  const likesForAuthor = _.map(groupByAuthor, (group, author) => {
    return {
      author,
      likes: _.reduce(group, (sum, item) => sum + item.likes, 0),
    }
  })
  const results = _.orderBy(likesForAuthor, ['likes'], ['desc'])
  const mostLikes = results[0]
  return mostLikes
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
