/* eslint-env jest */
import {
  byId,
  byPost,
  replies,
  pagination
} from './comments'

describe('byId', () => {
  it('Should return the initial state', () => {
    expect(
      byId(undefined, {})
    )
    .toEqual({})
  })

  it('Shoud handle RECEIVE_COMMENTS', () => {
    expect(
      byId(
        // Initial state
        {
          comment1: {
            id: 'comment1',
            foo: 'bar'
          },
          comment3: {
            id: 'comment3',
            foo: 'baz'
          }
        },
        // Action
        {
          type: 'RECEIVE_COMMENTS',
          comments: [{
            id: 'comment1',
            foo: 'baz'
          }, {
            id: 'comment2',
            foo: 'buzz'
          }]
        }
      )
    )
    .toEqual({
      comment1: {
        id: 'comment1',
        foo: 'baz'
      },
      comment2: {
        id: 'comment2',
        foo: 'buzz'
      },
      comment3: {
        id: 'comment3',
        foo: 'baz'
      }
    })
  })

  it('Should handle UPDATE_COMMENT', () => {
    expect(
      byId(
        // State
        {
          comment1: {
            id: 'comment1',
            foo: 'bar'
          },
          comment2: {
            id: 'comment2',
            foo: 'buzz'
          }
        },
        // Action
        {
          type: 'UPDATE_COMMENT',
          id: 'comment2',
          updates: { foo: 'baz' }
        }
      )
    )
    .toEqual({
      comment1: {
        id: 'comment1',
        foo: 'bar'
      },
      comment2: {
        id: 'comment2',
        foo: 'baz'
      }
    })
  })
})

describe('byPost', () => {
  it('Should return the initial state', () => {
    expect(
      byPost(undefined, {})
    ).toEqual({})
  })

  it('Should handle RECEIVE_COMMENTS', () => {
    expect(
      byPost(
        // State
        {
          post2: ['comment0']
        },
        // Action
        {
          type: 'RECEIVE_COMMENTS',
          comments: [{
            link_id: 't3_post1',
            id: 'comment1'
          }, {
            link_id: 't3_post1',
            id: 'comment2'
          }, {
            link_id: 't3_post2',
            id: 'comment3'
          }]
        }
      )
    )
    .toEqual({
      post1: ['comment1', 'comment2'],
      post2: ['comment0', 'comment3']
    })
  })
})

describe('replies', () => {
  it('Should return the initial state', () => {
    expect(
      replies(undefined, {})
    ).toEqual({})
  })

  it('Should handle RECEIVE_COMMENTS', () => {
    expect(
      replies(
        // State
        {
          'comment1': ['comment2']
        },
        // Action
        {
          type: 'RECEIVE_COMMENTS',
          comments: [{
            link_id: 't1_post1',
            parent_id: 't1_post1',
            id: 'comment3'
          }, {
            link_id: 't1_post1',
            parent_id: 't3_comment2',
            id: 'comment4'
          }, {
            link_id: 't1_post1',
            parent_id: 't3_comment3',
            id: 'comment5'
          }, {
            link_id: 't1_post1',
            parent_id: 't3_comment3',
            id: 'comment6'
          }, {
            link_id: 't1_post1',
            parent_id: 't3_comment1',
            id: 'comment7'
          }]
        }
      )
    )
    .toEqual({
      comment1: ['comment2', 'comment7'],
      comment2: ['comment4'],
      comment3: ['comment5', 'comment6']
    })
  })
})

describe('pagination', () => {
  it('Should return the initial state', () => {
    expect(
      pagination(undefined, {})
    )
    .toEqual({})
  })

  it('Should handle RECEIVE_COMMENTS', () => {
    expect(
      pagination(
        // State,
        {
          comment1: ['comment2']
        },
        // Action
        {
          type: 'RECEIVE_COMMENTS',
          pagination: [{
            parent_id: 't1_comment2',
            children: ['comment9', 'comment8']
          }, {
            parent_id: 't1_comment3',
            children: ['comment7', 'comment6']
          }]
        }
      )
    )
    .toEqual({
      comment1: ['comment2'],
      comment2: ['comment9', 'comment8'],
      comment3: ['comment7', 'comment6']
    })
  })
})
