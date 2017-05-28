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
})