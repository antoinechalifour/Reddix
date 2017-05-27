import * as selectors from './posts'

describe('categorySelectorFactory', () => {
  it('Should be a function', () => {
    expect(typeof selectors.categorySelectorFactory).toBe('function')
  })

  it('Should return a function', () => {
    const category = 'hot'
    const selector = selectors.categorySelectorFactory(category)
    expect(typeof selector).toBe('function')
  })

  it('Should return an array of ids of posts of the given category', () => {
    const category = 'new'
    const state = {
      posts: {
        byCategory: {
          hot: ['6dhnah', '6dlvey', '6dlp56'],
          new: ['6dn8s6', '6dn5gk']
        }
      }
    }
    const selector = selectors.categorySelectorFactory(category)
    const result = selector(state)
    expect(result).toEqual(['6dn8s6', '6dn5gk'])
  })

  it('Should return an empty array if no post are found', () => {
    const category = 'new'
    const state = {
      posts: {
        byCategory: {
          hot: ['6dhnah', '6dlvey', '6dlp56']
        }
      }
    }
    const selector = selectors.categorySelectorFactory(category)
    const result = selector(state)
    expect(result).toEqual([])
  })
})

describe('subredditSelectorFactory', () => {
  it('Should be a function', () => {
    expect(typeof selectors.subredditSelectorFactory).toBe('function')
  })

  it('Should return a function', () => {
    const subreddit = 'webdev'
    const selector = selectors.subredditSelectorFactory(subreddit)
    expect(typeof selector).toBe('function')
  })

  it('Should return an array of ids of posts from the given subreddit', () => {
    const subreddit = 'kotlin'
    const state = {
      posts: {
        bySubreddit: {
          webdev: ['6dn53f', '6dn2k1'],
          kotlin: ['6dmiws', '6di1ey', '6dhtwg', '6dh48c']
        }
      }
    }
    const selector = selectors.subredditSelectorFactory(subreddit)
    const result = selector(state)
    expect(result).toEqual(['6dmiws', '6di1ey', '6dhtwg', '6dh48c'])
  })

  it('Should return an empty array if no posts are found', () => {
    const subreddit = 'kotlin'
    const state = {
      posts: {
        bySubreddit: {
          webdev: ['6dn53f', '6dn2k1']
        }
      }
    }
    const selector = selectors.subredditSelectorFactory(subreddit)
    const result = selector(state)
    expect(result).toEqual([])
  })
})

describe('categorySubredditSelectorFactory', () => {
  it('Should be a function', () => {
    expect(typeof selectors.categorySubredditSelectorFactory).toBe('function')
  })

  it('Should return a function', () => {
    const category = 'hot'
    const subreddit = 'kotlin'
    const selector = selectors.categorySubredditSelectorFactory(category, subreddit)
    expect(typeof selector).toEqual('function')
  })

  it('Should return the intersection of subreddit and category posts', () => {
    const category = 'hot'
    const subreddit = 'kotlin'
    const state = {
      posts: {
        byCategory: {
          new: ['6dmiws', '6di1ey', '6dhtwg', '6dh48c', '6dcrxi', '6dn53f', '6dn2k1', '6dmyth', '6dmx10', '6dmsmz'],
          hot: ['6dc8hy', '6db9xn', '6dapzj', '6dmpgq', '6dmop1']
        },
        bySubreddit: {
          webdev: ['6dn53f', '6dn2k1', '6dmyth', '6dmx10', '6dmsmz', '6dmpgq', '6dmop1'],
          kotlin: ['6dmiws', '6di1ey', '6dhtwg', '6dh48c', '6dcrxi', '6dc8hy', '6db9xn', '6dapzj']
        }
      }
    }
    const selector = selectors.categorySubredditSelectorFactory(category, subreddit)
    const result = selector(state)
    expect(result).toEqual([
      '6dc8hy',
      '6db9xn',
      '6dapzj'
    ])
  })

  it('Should return an empty array if no intersection', () => {
    const category = 'hot'
    const subreddit = 'kotlin'
    const state = {
      posts: {
        byCategory: {
          new: ['6dmiws', '6di1ey', '6dhtwg', '6dh48c', '6dcrxi', '6dn53f', '6dn2k1', '6dmyth', '6dmx10', '6dmsmz'],
          hot: ['6dmpgq', '6dmop1']
        },
        bySubreddit: {
          webdev: ['6dn53f', '6dn2k1', '6dmyth', '6dmx10', '6dmsmz', '6dmpgq', '6dmop1'],
          kotlin: ['6dmiws', '6di1ey', '6dhtwg', '6dh48c', '6dcrxi', ]
        }
      }
    }
    const selector = selectors.categorySubredditSelectorFactory(category, subreddit)
    const result = selector(state)
    expect(result).toEqual([])
  })
})