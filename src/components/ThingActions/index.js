import { connect } from 'react-redux'
import * as actions from 'Actions/things'
import {
  thingIdFromFullname,
  thingTypefromFullname
} from 'Util/things'

const mapTypeToThing = {
  t3: (state, id) => state.posts.byId[id],
  t1: (state, id) => state.comments.byId[id]
}

const thingAction = ({ isActive, action }) => {
  const mapStateToProps = (state, ownProps) => {
    const { id: fullname } = ownProps
    const type = thingTypefromFullname(fullname)
    const id = thingIdFromFullname(fullname)
    const thing = mapTypeToThing[type](state, id)

    return { active: isActive(thing) }
  }

  const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => dispatch(action(ownProps.id))
  })

  return WrappedComponent => connect(
    mapStateToProps,
    mapDispatchToProps
  )(WrappedComponent)
}

export const upvotableHOC = thingAction({
  isActive: thing => thing.likes === 1,
  action: actions.toggleUpvote
})

export const downvotableHOC = thingAction({
  isActive: thing => thing.likes === -1,
  action: actions.toggleDownvote
})

export const savableHOC = thingAction({
  isActive: thing => thing.saved,
  action: actions.toggleSave
})
