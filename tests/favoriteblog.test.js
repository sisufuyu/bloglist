const favoriteBlog =  require('../utils/list_helper').favoriteBlog

describe('favorite blog', () => {
  const listWithTwoBlogs = [
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
    }
  ]
  test('of two blogs', () => {
    const result = favoriteBlog(listWithTwoBlogs)
    expect(result).toEqual({
      title: 'How to Plan A Perfect Trip to Puglia, Italy',
      author: 'Marek',
      likes: 20
    })
  })
})