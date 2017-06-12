import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Markdown from 'react-markdown'
import { thingIdFromFullname, thingTypefromFullname, isSelf } from 'Util/things'
import { Card, CardContent } from 'Components/Card'

const Container = styled(Card)`
  & + & {
    margin-top: 8px;
  }

  a {
    font-weight: bold;
    color: ${props => props.theme.colors.text};
    text-decoration: none;
  }
`

const Header = styled.div`
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.font.size * 0.8}px;
`

const Body = styled.div`
  margin-left: -16px;
  margin-right: -16px;
  margin-bottom: -16px;
  padding: 16px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid ${props => props.theme.colors.light};
  
  border-left: 4px solid ${props => props.isComment ? props.theme.colors.light : 'transparent'};
`

const TimelineItem = props => {
  const type = thingTypefromFullname(props.name)
  const isSelfPost = isSelf(props.url)
  const body = props.selftext || props.body
  const isComment = type === 't1'
  const postId = isComment ? thingIdFromFullname(props.link_id) : props.id
  const subLink = `/r/${props.subreddit}`
  const postLink = `${subLink}/comments/${postId}`

  return (
    <Container>
      <CardContent>
        <Header>
          <div>
            {props.username} submitted a <Link to={postLink}>{isComment
              ? 'comment'
              : isSelfPost
                ? 'post'
                : 'link'
            }</Link> in <Link to={subLink}>{subLink}</Link>
          </div>
        </Header>
        <Body isComment={isComment}>
          {isComment ? (
            <Markdown source={body} />
          ) : (
            <div><Link to={isSelf ? postLink : props.url}>{props.title}</Link></div>
            )
          }
        </Body>
      </CardContent>
    </Container >
  )
}

export default TimelineItem
