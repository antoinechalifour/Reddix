export const TOGGLE_DRAWER = 'TOGGLE_DRAWER'
export const HIDE_MODAL = 'HIDE_MODAL'
export const OPEN_SIDE_LINK = 'OPEN_SIDE_LINK'
export const HIDE_SIDE_LINK = 'HIDE_SIDE_LINK'

export const toggleDrawer = () => ({
  type: TOGGLE_DRAWER
})

export const hideModal = () => ({
  type: HIDE_MODAL
})

export const openSideLink = src => ({
  type: OPEN_SIDE_LINK,
  src
})

export const hideSideLink = () => ({
  type: HIDE_SIDE_LINK
})