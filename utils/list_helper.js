const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((prev, item) => prev + item.likes, 0)
}

const favoriteBlog = (blogs) => {
  const blogsClone = [...blogs]
  const compareFunction = (blog1, blog2) => {
    if(blog1.likes > blog2.likes) return blog2.likes - blog1.likes
    if(blog1.likes < blog2.likes) return blog1.likes - blog2.likes
    return 0
  }
  blogsClone.sort(compareFunction)
  return Object.assign({}, { title: blogsClone[0].title, author: blogsClone[0].author, likes: blogsClone[0].likes })
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0) {
    return {}
  }
  const authorList = []
  const blogsList = []
  blogs.forEach(item => {
    let i = authorList.indexOf(item.author)
    if(i === -1) {
      authorList.push(item.author)
      blogsList.push(1)
    } else {
      blogsList[i] ++
    }
  })
  const maxblogs = Math.max(...blogsList)
  const maxAuthor = authorList[blogsList.indexOf(maxblogs)]
  return {
    author: maxAuthor,
    blogs: maxblogs
  }
}

const mostLikes = (blogs) => {
  if(blogs.length === 0) {
    return {}
  }
  const authorList = []
  const likesList = []

  blogs.forEach(item => {
    let i = authorList.indexOf(item.author)
    if(i === -1) {
      authorList.push(item.author)
      likesList.push(item.likes)
    } else {
      likesList[i] += item.likes
    }
  })
  const maxlikes = Math.max(...likesList)
  const maxAuthor = authorList[likesList.indexOf(maxlikes)]
  return {
    author: maxAuthor,
    likes: maxlikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}