export function fetchSubreddit (opt = {}) {
  const { r } = opt
  const subreddit = r
    ? `r/${r}`
    : ''
  
  return fetch(`http://www.reddit.com/${subreddit}.json`)
    .then(response => response.json())
    .then(({ data }) => data.children.map(x => x.data))
}

const parseReplies = comment => {
  if (!comment.data.replies) {
    return []
  }

  return comment.data.replies.data.children.map(x => ({
    ...x.data,
    replies: parseReplies(x)
  }))
}

export function fetchPost (r, id, opt = {}) {
  return fetch(`http://www.reddit.com/r/${r}/comments/${id}.json`)
    .then(response => response.json())
    .then(data => {
      const post = data[0].data.children[0].data
      const comments = data[1].data.children.map(x => {
        const replies = parseReplies(x)
        return {
          ...x.data,
          replies
        }
      })

      return { post, comments }
    })
}

export function searchSubreddit (q) {
  return fetch(`http://www.reddit.com/subreddits/search.json?q=${q}`)
    .then(response => response.json())
    .then(response => response.data.children)
    .then(data => data.map(x => x.data.display_name))
}