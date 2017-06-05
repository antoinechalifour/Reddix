import reducer from './ui'

describe('ui', () => {
  it('Should return the initial state', () => {
    expect(
      reducer(undefined, {})
    )
    .toEqual({
      drawer: 'closed'
    })
  })

  it('Should handle TOGGLE_DRAWER (o -> c)', () => {
    expect(
      reducer(
        // State
        {
          drawer: 'open'
        },
        // Action
        { type: 'TOGGLE_DRAWER' }
      )
    )
    .toEqual({
      drawer: 'closed'
    })
  })

  it('Should handle TOGGLE_DRAWER (c -> o)', () => {
    expect(
      reducer(
        // State
        {
          drawer: 'closed'
        },
        // Action
        { type: 'TOGGLE_DRAWER' }
      )
    )
    .toEqual({
      drawer: 'open'
    })
  })
})
