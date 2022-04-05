const list_helper = require('../utils/list_helper')

test('dummy returns 1', () => {
  const blogs = []
  const result = list_helper.dummy(blogs)
  expect(result).toBe(1)
})