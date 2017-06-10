/* eslint-env jest */
import reducer from './users'

describe('users', () => {
  it('Should return the initial state', () => {
    expect(reducer(undefined, {}))
    .toEqual({})
  })

  it('Should handle RECEIVE_USER', () => {
    expect(
      reducer(
        // State
        {
          smoked_bacon: {
            user: {},
            overview: [],
            submissions: [],
            comments: []
          }
        },
        // Action
        {
          type: 'RECEIVE_USER',
          username: 'tvvann',
          user: { id: 'user1' },
          overview: { foo: 'bar' },
          submissions: ['sub1', 'sub2'],
          comments: ['comment']
        }
      )
    )
    .toEqual({
      smoked_bacon: {
        user: {},
        overview: [],
        submissions: [],
        comments: []
      },
      tvvann: {
        user: { id: 'user1' },
        overview: { foo: 'bar' },
        submissions: ['sub1', 'sub2'],
        comments: ['comment']
      }
    })
  })
})
