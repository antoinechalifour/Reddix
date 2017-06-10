/* eslint-env jest */
import reducer from './subscriptions'

describe('subscriptions', () => {
  it('Should return the initial state', () => {
    expect(
      reducer(undefined, {})
    )
    .toEqual([])
  })

  it('Should handle RECEIVE_SUBSCRIPTIONS', () => {
    expect(
      reducer(
        // State
        ['sub1'],
        // Action
        {
          type: 'RECEIVE_SUBSCRIPTIONS',
          subreddits: [
            { id: 'sub2' },
            { id: 'sub3' }
          ]
        }
      )
    )
    .toEqual(['sub2', 'sub3'])
  })

  it('Should handle ADD_SUBSCRIPTION', () => {
    expect(
      reducer(
        // State
        ['sub1'],
        // Action
        {
          type: 'ADD_SUBSCRIPTION',
          id: 'sub2'
        }
      )
    )
    .toEqual(['sub1', 'sub2'])
  })

  it('Should handle REMOVE_SUBSCRIPTION', () => {
    expect(
      reducer(
        // State
        ['sub1', 'sub2', 'sub2'],
        // Action
        {
          type: 'REMOVE_SUBSCRIPTION',
          id: 'sub2'
        }
      )
    )
    .toEqual(['sub1'])
  })
})
