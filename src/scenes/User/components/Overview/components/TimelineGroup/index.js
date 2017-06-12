import React from 'react'
import styled from 'styled-components'
import TimelineItem from '../TimelineItem'
import { BOX_SHADOW_2 } from 'Util/constants'

const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const Posts = styled.div`
  flex: 1;
  padding: 24px 16px;
`

const Timeline = styled.div`
  position: relative;
  padding: 24px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Date = styled.div`
  padding: 8px;
  background: rgba(255, 255, 255, .9);
  box-shadow: ${BOX_SHADOW_2};
  position: relative;
  z-index: 1;
  border-radius: 4px;
`

const Line = styled.div`
  position: absolute;
  width: 4px;
  background: ${props => props.theme.colors.primaryDark};
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
`

const TimelineGroup = ({ username, date, posts }) => {
  return (
    <Container>
      <Timeline>
        <Date>{date}</Date>
        <Line />
      </Timeline>
      <Posts>
        {posts.map(post => (
          <TimelineItem
            key={post.created_utc}
            {...post}
            username={username}
          />
        ))}
      </Posts>
    </Container>
  )
}

export default TimelineGroup
