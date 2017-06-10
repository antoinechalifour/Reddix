/* eslint-env jest */
import {
  byId,
  byCategory,
  bySubreddit
} from './posts'

describe('byId', () => {
  it('Should return the initial state', () => {
    expect(
      byId(undefined, {})
    )
    .toEqual({})
  })

  it('Should handle RECEIVE_POSTS', () => {
    expect(
      byId(
        // State
        {
          post1: {
            id: 'post1',
            title: 'Title1'
          }
        },
        // Action
        {
          type: 'RECEIVE_POSTS',
          posts: [{
            id: 'post1',
            title: 'ModifiedTitle'
          }, {
            id: 'post2',
            title: 'Title2'
          }]
        }
      )
    )
    .toEqual({
      post1: {
        id: 'post1',
        title: 'ModifiedTitle'
      },
      post2: {
        id: 'post2',
        title: 'Title2'
      }
    })
  })

  it('Should handle RECEIVE_POST (create)', () => {
    expect(
      byId(
        // State
        {},
        // Action
        {
          type: 'RECEIVE_POST',
          post: {
            id: 'post1',
            title: 'Title1'
          }
        }
      )
    )
    .toEqual({
      post1: {
        id: 'post1',
        title: 'Title1'
      }
    })
  })

  it('Should handle RECEIVE_POST (update)', () => {
    expect(
      byId(
        // State
        {
          post1: {
            id: 'post1',
            title: 'Title1'
          }
        },
        // Action
        {
          type: 'RECEIVE_POST',
          post: {
            id: 'post1',
            title: 'ModifiedTitle'
          }
        }
      )
    )
    .toEqual({
      post1: {
        id: 'post1',
        title: 'ModifiedTitle'
      }
    })
  })

  it('Should handle UPDATE_POST', () => {
    expect(
      byId(
        // State
        {
          post1: {
            id: 'post1',
            title: 'Title1'
          }
        },
        // Action
        {
          type: 'UPDATE_POST',
          id: 'post1',
          updates: {
            title: 'ModifiedTitle',
            description: 'Some description'
          }
        }
      )
    )
    .toEqual({
      post1: {
        id: 'post1',
        title: 'ModifiedTitle',
        description: 'Some description'
      }
    })
  })
})

describe('byCategory', () => {
  it('Should return the initial state', () => {
    expect(
      byCategory(undefined, {})
    )
    .toEqual({})
  })

  it('Should handle RECEIVE_POSTS', () => {
    expect(
      byCategory(
        // State
        {
          new: ['post0'],
          hot: ['post1', 'post4']
        },
        // Action
        {
          type: 'RECEIVE_POSTS',
          from: 'hot',
          posts: [{
            id: 'post1'
          }, {
            id: 'post2'
          }, {
            id: 'post3'
          }]
        }
      )
    )
    .toEqual({
      new: ['post0'],
      hot: ['post1', 'post4', 'post2', 'post3']
    })
  })
})

describe('bySubreddit', () => {
  it('Should return the initial state', () => {
    expect(
      bySubreddit(undefined, {})
    )
    .toEqual({})
  })

  it('Should handle RECEIVE_POSTS', () => {
    expect(
      bySubreddit(
        // State
        {
          webdev: ['post0', 'post1'],
          kotlin: ['post2', 'post3']
        },
        // Action
        {
          type: 'RECEIVE_POSTS',
          posts: [{
            id: 'post4',
            subreddit: 'webdev'
          }, {
            id: 'post5',
            subreddit: 'kotlin'
          }, {
            id: 'post6',
            subreddit: 'programming'
          }]
        }
      )
    )
    .toEqual({
      webdev: ['post0', 'post1', 'post4'],
      kotlin: ['post2', 'post3', 'post5'],
      programming: ['post6']
    })
  })
})
