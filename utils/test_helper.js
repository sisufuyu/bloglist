const Blog = require('../models/blog')

const initialBlogs = [
  {
    title:'Intriguing castles and idyllic rural life in the beautiful Dordogne',
    author:'Mark and Paul',
    url: 'https://anywhereweroam.com/what-to-do-in-dordogne-france/',
    likes: 10,
    userId: '62011f0db6a5b29a5caafe6a'
  },{
    title:'How to Plan A Perfect Trip to Puglia, Italy',
    author:'Marek',
    url: 'https://www.indietraveller.co/puglia-italy-travel-guide/',
    likes: 20,
    userId: '62011f0db6a5b29a5caafe69'
  },
  {
    title:'Uncover myth, wealth and power in the Best Ancient Ruins in Turkey',
    author:'Mark and Paul',
    url: 'https://anywhereweroam.com/historical-places-turkey/',
    likes: 30,
    userId: '62011f0db6a5b29a5caafe6a'
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}