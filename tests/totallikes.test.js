const totalLikes = require('../utils/list_helper').totalLikes

describe('total likes', () => {
  const emptyList = []
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  const listWithThreeBlogs = [
    {
      id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '61f012ca68e16a74c1adbffd',
      title: 'How to Plan A Perfect Trip to Puglia, Italy',
      author: 'Marek',
      url: 'https://www.indietraveller.co/puglia-italy-travel-guide/',
      likes: 20,
      __v: 0
    },
    {
      _id: '61f00a8f02373366d8fc5e69',
      title: 'Intriguing castles and idyllic rural life in the beautiful Dordogne',
      author: 'Mark and Paul',
      url: 'https://anywhereweroam.com/what-to-do-in-dordogne-france/',
      likes: 80,
      __v: 0
    }
  ]

  test('of empty list is zero', () => {
    const result = totalLikes(emptyList)
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a blog list is calculated right', () => {
    const result = totalLikes(listWithThreeBlogs)
    expect(result).toBe(105)
  })
})