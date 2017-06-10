/* eslint-env jest */
import reducer from './me'

describe('me', () => {
  it('Should return the initial state', () => {
    expect(reducer(undefined, {}))
    .toEqual(null)
  })

  const states = [null, { foo: 'bar' }]

  states.forEach(state => it(`Should handle RECEIVE_ME`, () => {
    expect(
      reducer(
        state, {
          type: 'RECEIVE_ME',
          me: {
            id: 'some-user-id',
            icon_img: 'some-icon-url'
          }
        }
      )
    )
    .toEqual({
      id: 'some-user-id',
      icon_img: 'some-icon-url'
    })
  }))
})
