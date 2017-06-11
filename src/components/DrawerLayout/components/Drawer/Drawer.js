import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  BOX_SHADOW_1,
  BOX_SHADOW_2
} from 'Util/constants'

const Outer = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;

  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  overflow: hidden;
  box-shadow: ${BOX_SHADOW_2};
`

const Header = styled.div`
  min-height: 150px;

  position: relative;
  position: sticky;
  top: 0;

  display: flex;
  overflow: hidden;

  background: ${props => props.theme.colors.primary};
  box-shadow: ${BOX_SHADOW_1};
`

const Profile = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
  
  flex: 1;
  padding: 16px;

  color: #fff;

  > img,
  > div {
    display: block;
    margin: auto;

    max-width: 100px;
    margin-bottom: 12px;
    border-radius: 50%;
    box-shadow: ${BOX_SHADOW_2};
  }

  > div {
    width: 64px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;

    background: rgba(255, 255, 255, .5);
    text-transform: uppercase;
  }

  a {
    color: #fff;
    text-decoration: none;
  }
`

const Main = styled.div`
  padding: 16px;
  flex: 1;
  overflow: scroll;
`

const Section = styled.div`
  & + & {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid ${props => props.theme.colors.light};
  }
`

const SectionTitle = styled.div`
  text-transform: uppercase;
  margin-bottom: 8px;
  letter-spacing: 0.1rem;
`

const Item = styled.div`
  display: block;
  margin-left: 12px;

  text-decoration: none;
  cursor: pointer;
  color: ${props => props.theme.colors.textLight};
  transition: color .2s ease-in;

  &:hover {
    color: ${props => props.theme.colors.text};
  }
`
const ItemLink = Item.withComponent(Link)

const Drawer = ({ actions, subreddits, me }) => (
  <Outer>
    <Header>
      <Profile>
        {me.subreddit && (
          <img
            alt='My profile'
            src={me.subreddit.icon_img}
          />
        )}
        {!me.subreddit && (
          <div>
            {me.name.substr(0, 1)}
          </div>
        )}
        <Link to='/me'>/u/{me.name}</Link>
      </Profile>
    </Header>
    <Main>
      <Section>
        <SectionTitle>My subs</SectionTitle>

        <ItemLink to='/'>Frontpage</ItemLink>

        {subreddits.map(r => (
          <ItemLink
            key={r.id}
            to={`/r/${r.display_name}`}
          >
            <span
              onClick={() => actions.toggleDrawer()}
            >
              {r.display_name_prefixed}
            </span>
          </ItemLink>
        ))}
      </Section>

      <Section>
        <SectionTitle>Settings</SectionTitle>
        <ItemLink to='/customize'>Customize Reddix</ItemLink>

        <Item onClick={() => actions.logoutRequest()}>Log out</Item>
      </Section>
    </Main>
  </Outer>
)

export default Drawer
