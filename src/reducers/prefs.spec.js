/* eslint-env jest */
import { prefs, api } from './prefs'

describe('prefs', () => {
  it('Should return the initial state', () => {
    expect(
      prefs(undefined, {})
    )
    .toEqual(null)
  })

  it('Should handle RECEIVE_PREFS', () => {
    expect(
      prefs(
        // State
        null,
        // Action
        {
          type: 'RECEIVE_PREFS',
          prefs: { foo: 'bar' }
        }
      )
    )
    .toEqual({ foo: 'bar' })
  })
})

describe('api', () => {
  it('Should return the initial state', () => {
    expect(
      api(undefined, {})
    )
    .toEqual({ isLoading: false })
  })

  it('Should handle REQUEST_PREFS', () => {
    expect(
      api(
        // State
        { isLoading: false },
        // Action
        { type: 'REQUEST_PREFS' }
      )
    )
    .toEqual({ isLoading: true })
  })

  it('Should handle RECEIVE_PREFS', () => {
    expect(
      api(
        // State
        { isLoading: true },
        // Action
        { type: 'RECEIVE_PREFS' }
      )
    )
    .toEqual({ isLoading: false })
  })
})
