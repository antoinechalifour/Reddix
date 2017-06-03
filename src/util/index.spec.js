import { arrayIntersection } from './index'

describe('arrayIntersection', () => {
  const tests = [{
    message: 'Should return an empty array when args are not defined',
    args: [undefined, undefined],
    expected: []
  }, {
    message: 'Should return commons items',
    args: [['t1_azer', 't1_poiu', 't1_tyui'], ['t1_poiu', 't1_nbvc', 't1_azer']],
    expected: ['t1_azer', 't1_poiu']
  }, {
    message: 'Should only work on primitive types',
    args: [
      [
        { foo: 'bar' },  { foo: 'baz' },
        { fizz: 'buzz' }, { foo: 'bar' }
      ]
    ],
    expected: []
  }]

  tests.forEach(test => it(test.message, () => {
    expect(arrayIntersection(...test.args)).toEqual(test.expected)
  }))
})