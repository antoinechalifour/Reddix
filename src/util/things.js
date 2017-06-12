export const isComment = fullname => fullname.startsWith('t1_')

export const isPost = fullname => fullname.startsWith('t3_')

export const thingIdFromFullname = fullname => fullname.substr(3)

export const thingTypefromFullname = fullname => fullname.substr(0, 2)

export const isSelf = (url = '') => url.includes('://www.reddit.com')
