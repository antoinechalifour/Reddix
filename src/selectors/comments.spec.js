/* eslint-env jest */
import * as selectors from './comments.js'

describe('postCommentsSelectorFactory', () => {
  it('Should be a function', () => {
    expect(typeof selectors.postCommentsSelectorFactory).toBe('function')
  })

  it('Should return a function', () => {
    const postId = '6dgnnq'
    const selector = selectors.postCommentsSelectorFactory(postId)
    expect(typeof selector).toBe('function')
  })

  it('Should return the comments whose post id is given as a parameter', () => {
    const postId = '6dhnah'
    const selector = selectors.postCommentsSelectorFactory(postId)
    const state = {
      comments: {
        byPost: {
          '6dhik2': [
            'di2nzbn',
            'di3o2dj'
          ],
          '6dhnah': [
            'di39d6s',
            'di3akri',
            'di3smrn'
          ]
        }
      }
    }

    const result = selector(state)
    expect(result).toEqual([
      'di39d6s',
      'di3akri',
      'di3smrn'
    ])
  })

  it('Should return an empty array if no post is found', () => {
    const postId = '6dhnah'
    const selector = selectors.postCommentsSelectorFactory(postId)
    const state = {
      comments: {
        byPost: {
          '6dhik2': [
            'di2nzbn',
            'di3o2dj'
          ]
        }
      }
    }

    const result = selector(state)
    expect(result).toEqual([])
  })
})

describe('rootCommentSelector', () => {
  it('Should be a function', () => {
    expect(typeof selectors.rootCommentSelector).toBe('function')
  })

  it('Should return comments without parents', () => {
    const state = {
      comments: {
        byId: {
          di39d6s: {},
          di3akri: {},
          di3smrn: {},
          di2nzbn: {},
          di2okjq: {},
          di3b6x7: {}
        },
        replies: {
          di2nzbn: ['di2okjq'],
          di3smrn: ['di2nzbn', 'di3b6x7']
        }
      }
    }

    const result = selectors.rootCommentSelector(state)
    expect(result).toEqual([
      'di39d6s',
      'di3akri',
      'di3smrn'
    ])
  })
})

describe('postRootCommentSelectorFactory', () => {
  it('Should be a function', () => {
    expect(typeof selectors.postRootCommentSelectorFactory).toBe('function')
  })

  it('Should return a function', () => {
    const postId = '6dhnah'
    const selector = selectors.postRootCommentSelectorFactory(postId)
    expect(typeof selector).toBe('function')
  })

  it('Should return the top level comments for the provided post', () => {
    const postId = '6dhnah'
    const state = {
      comments: {
        byPost: {
          '6dhnah': [
            'di3akri',
            'di3smrn',
            'di2nzbn',
            'di2okjq',
            'di3b6x7'
          ],
          '6dgnnq': ['di39d6s']
        },
        byId: {
          di39d6s: {},
          di3akri: {},
          di3smrn: {},
          di2nzbn: {},
          di2okjq: {},
          di3b6x7: {}
        },
        replies: {
          di2nzbn: ['di2okjq'],
          di3smrn: ['di2nzbn', 'di3b6x7']
        }
      }
    }
    const selector = selectors.postRootCommentSelectorFactory(postId)
    const result = selector(state)
    expect(result).toEqual([
      'di3akri',
      'di3smrn'
    ])
  })
})

describe('commentChildrenSelectorFactory', () => {
  it('Should be a function', () => {
    expect(typeof selectors.commentChildrenSelectorFactory).toBe('function')
  })

  it('Should return a function', () => {
    const commentId = 'di3smrn'
    const selector = selectors.commentChildrenSelectorFactory(commentId)
    expect(typeof selector).toBe('function')
  })

  it('Should return ids of the comment replies of the current comment', () => {
    const commentId = 'di3smrn'
    const state = {
      comments: {
        replies: {
          di2nzbn: ['di2okjq'],
          di3smrn: ['di2nzbn', 'di3b6x7']
        }
      }
    }
    const selector = selectors.commentChildrenSelectorFactory(commentId)
    const result = selector(state)
    expect(result).toEqual(['di2nzbn', 'di3b6x7'])
  })

  it('Should return an empty array if no replies are found', () => {
    const commentId = 'not-found'
    const state = {
      comments: {
        replies: {
          di2nzbn: ['di2okjq'],
          di3smrn: ['di2nzbn', 'di3b6x7']
        }
      }
    }
    const selector = selectors.commentChildrenSelectorFactory(commentId)
    const result = selector(state)
    expect(result).toEqual([])
  })
})

describe('commentSelectorFactory', () => {
  it('Should be a function', () => {
    expect(typeof selectors.commentSelectorFactory).toBe('function')
  })

  it('Should return a function', () => {
    const commentId = 'di3smrn'
    const selector = selectors.commentSelectorFactory(commentId)
    expect(typeof selector).toBe('function')
  })

  it('Should return the comment whose ID is a parameter', () => {
    const commentId = 'di3smrn'
    const expected = { foo: 'bar' }
    const state = {
      comments: {
        byId: {
          [commentId]: expected
        }
      }
    }
    const selector = selectors.commentSelectorFactory(commentId)
    const result = selector(state)
    expect(result).toEqual(expected)
  })

  it('Should return undefined if not found', () => {
    const commentId = 'di3smrn'
    const state = {
      comments: {
        byId: {
          di39d6s: { foo: 'bar' }
        }
      }
    }
    const selector = selectors.commentSelectorFactory(commentId)
    const result = selector(state)
    expect(result).toEqual(undefined)
  })
})

describe('mapIdsToComments', () => {
  it('Should be a function', () => {
    expect(typeof selectors.mapIdsToComments).toBe('function')
  })

  it('Should return a function', () => {
    const state = {}
    const selector = selectors.mapIdsToComments(state)
    expect(typeof selector).toBe('function')
  })

  it('Should return a comment for each id', () => {
    const state = {
      comments: {
        byId: {
          'di39d6s': { foo: 'bar1' },
          'di3akri': { foo: 'bar2' },
          'di3smrn': { foo: 'bar3' }
        }
      }
    }
    const selector = selectors.mapIdsToComments(state)
    const result = selector(['di39d6s', 'di3smrn'])
    expect(result).toEqual([
      { foo: 'bar1' },
      { foo: 'bar3' }
    ])
  })

  it('Should return an empty array if no ids are given', () => {
    const state = {
      comments: {
        byId: {
          'di39d6s': { foo: 'bar1' },
          'di3akri': { foo: 'bar2' },
          'di3smrn': { foo: 'bar3' }
        }
      }
    }
    const selector = selectors.mapIdsToComments(state)
    const result = selector()
    expect(result).toEqual([])
  })
})
