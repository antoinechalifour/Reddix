import React, { Component } from 'react'
import styled from 'styled-components'
import { Tabs, Tab, TabList, TabPanels } from 'Components/Tabs'

const TabContent = styled.div`
  padding: 16px;
`

class SubmitLink extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      link: ''
    }
  }

  render () {
    return (
      <TabContent>SubmitLink</TabContent>
    )
  }
}

class SubmitText extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      text: ''
    }
  }

  render () {
    return (
      <TabContent>SubmitText</TabContent>
    )
  }
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 15;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, .8);
`

const Main = styled.div`
  width: 95%;
  max-width: 900px;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
`

const SubmitPost = props => (
  <Overlay>
    <Main>
      <Tabs>
        <TabList>
          <Tab>Text</Tab>
          <Tab>Link</Tab>
        </TabList>

        <TabPanels>
          <SubmitText />
          <SubmitLink />
        </TabPanels>
      </Tabs>
    </Main>
  </Overlay>
)

export default SubmitPost
