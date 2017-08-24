test('example test', () =>
  expect(1 + 1).toBe(2)
)

test('object example', () => {
  const data = { hello: 'world' }
  data['hi'] = 'world'
  expect(data).toEqual({ hello: 'world', hi: 'world' })
})
