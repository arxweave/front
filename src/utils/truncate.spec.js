import { truncate } from './index'

describe('truncate()', () => {
  it('can replace the center of a string', () => {
    const src = 'stringlongertheneightchars'
    const result = truncate({ str: src, start: 4, end: 4 })
    const expected = 'stri...hars'
    expect(result).toEqual(expected)
  })
})
