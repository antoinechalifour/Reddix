/* eslint-env jest */
import { byId } from './subreddits'

describe('byId', () => {
  it('Should return the initial state', () => {
    expect(
      byId(undefined, {})
    )
    .toEqual({})
  })

  it('Should handle RECEIVE_SUBREDDIT (insert)', () => {
    expect(
      byId(
        // State
        {
          sub1: {
            id: 'sub1',
            display_name: 'webdev'
          },
          sub2: {
            id: 'sub2',
            display_name: 'kotlin'
          }
        },
        // Action
        {
          type: 'RECEIVE_SUBREDDIT',
          subreddit: {
            id: 'sub3',
            display_name: 'reduxjs'
          }
        }
      )
    )
    .toEqual({
      sub1: {
        id: 'sub1',
        display_name: 'webdev'
      },
      sub2: {
        id: 'sub2',
        display_name: 'kotlin'
      },
      sub3: {
        id: 'sub3',
        display_name: 'reduxjs'
      }
    })
  })

  it('Should handle RECEIVE_SUBREDDIT (update)', () => {
    expect(
      byId(
        // State
        {
          sub1: {
            id: 'sub1',
            display_name: 'webdev'
          },
          sub2: {
            id: 'sub2',
            display_name: 'kotlin'
          }
        },
        // Action
        {
          type: 'RECEIVE_SUBREDDIT',
          subreddit: {
            id: 'sub2',
            display_name: 'reduxjs'
          }
        }
      )
    )
    .toEqual({
      sub1: {
        id: 'sub1',
        display_name: 'webdev'
      },
      sub2: {
        id: 'sub2',
        display_name: 'reduxjs'
      }
    })
  })

  const same = ['RECEIVE_SUBSCRIPTIONS', 'RECEIVE_SUBREDDITS']

  same.forEach(type => it(`Should handle ${type}`, () => {
    expect(
      byId(
        // State
        {
          sub1: {
            id: 'sub1',
            display_name: 'kotlin'
          }
        },
        // Action
        {
          type,
          subreddits: [{
            id: 'sub2',
            display_name: 'reactjs'
          }, {
            id: 'sub1',
            display_name: 'webdev'
          }]
        }
      )
    )
    .toEqual({
      sub1: {
        id: 'sub1',
        display_name: 'webdev'
      },
      sub2: {
        id: 'sub2',
        display_name: 'reactjs'
      }
    })
  }))
})
