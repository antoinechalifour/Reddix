import reducer from './r'

describe('r', () => {
  it('Should return the initial state', () => {
    expect(
      reducer(undefined, {})
    )
    .toEqual(null)
  })

  it('Should handle LOGIN_SUCCESS', () => {
    expect(
      reducer(
        // State,
        null,
        // Action
        {
          type: 'LOGIN_SUCCESS',
          client: { foo: 'bar' }
        }
      )
    )
    .toEqual({ foo: 'bar' })
  })

  it('Should handle LOGOUT', () => {
    expect(
      reducer(
        // State
        { accessToken: 'some-token' },
        // Action
        { type: 'LOGOUT' }
      )
    )
    .toEqual(null)
  })
})