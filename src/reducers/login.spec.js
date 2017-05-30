import { api } from './login'

describe('api', () => {
  it('Should return the initial state', () => {
    expect(
      api(undefined, {})
    )
    .toEqual({ isLoading: false })
  })

  it('Should handle LOGIN', () => {
    expect(
      api(
        // State
        { isLoading: false },
        // Action
        {
          type: 'LOGIN'
        }
      )
    )
    .toEqual({ isLoading: true })
  })

  const TYPES = ['LOGIN_SUCCESS', 'LOGIN_FAILED']

  TYPES.forEach(type => it(`Should handle ${type}`, () => {
    expect(
      api(
        // State
        { isLoading: true },
        // Action
        {
          type
        }
      )
    )
    .toEqual({ isLoading: false })
  }))
})