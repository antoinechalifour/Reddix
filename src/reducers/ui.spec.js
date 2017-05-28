import reducer from './ui'

describe('ui', () => {
  it('Should return the initial state', () => {
    expect(
      reducer(undefined, {})
    )
    .toEqual({
      drawer: 'closed',
      modal: null
    })
  })

  it('Should handle TOGGLE_DRAWER (o -> c)', () => {
    expect(
      reducer(
        // State
        {
          modal: null,
          drawer: 'open'
        },
        // Action
        { type: 'TOGGLE_DRAWER' }
      )
    )
    .toEqual({
      modal: null,
      drawer: 'closed'
    })
  })

  it('Should handle TOGGLE_DRAWER (c -> o)', () => {
    expect(
      reducer(
        // State
        {
          modal: null,
          drawer: 'closed'
        },
        // Action
        { type: 'TOGGLE_DRAWER' }
      )
    )
    .toEqual({
      modal: null,
      drawer: 'open'
    })
  })

  it('Should handle DISPLAY_POST_MODAL', () => {
    expect(
      reducer(
        // State
        {
          modal: null,
          drawer: 'closed'
        },
        // Action
        {
          type: 'DISPLAY_POST_MODAL',
          modal: { post: 'post0' }
        }
      )
    )
    .toEqual({
      modal: { post: 'post0' },
      drawer: 'closed'
    })
  })

  it('Should handle HIDE_MODAL', () => {
    expect(
      reducer(
        // State
        {
          modal: { post: 'post0' },
          drawer: 'closed'
        },
        // Action
        { type: 'HIDE_MODAL' }
      )
    )
    .toEqual({
      modal: null,
      drawer: 'closed'
    })
  })
})