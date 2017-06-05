/**
 * For a given comment, flattens its children and returns it and its
 * children as a flat array
 */
export const flattenComments = thing => {
  const comment = thing.data
  const replies = comment.replies
  const flattened = [comment]

  if (replies && replies.kind === 'Listing') {
    for (let child of replies.data.children) {
      flattened.push(...flattenComments(child))
    }
  }

  return flattened
}
