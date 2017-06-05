import React, { Component } from 'react'
import styled from 'styled-components'
import { Tabs, Tab, TabList, TabPanels } from 'Components/Tabs'
import {
  Input,
  Textarea,
  Button,
  InputGroup
} from 'Components/Form'

const TabContent = styled.div`
  padding: 16px;
`

const ButtonGroup = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;

  button + button {
    margin-left: 16px;
  }
`

class SubmitLink extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      url: ''
    }
  }

  render () {
    const { r } = this.props.match.params

    return (
      <TabContent>
        <InputGroup>
          <Input
            type='text'
            placeholder='Add an interesting title...'
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
          />
        </InputGroup>

        <InputGroup>
          <Input
            placeholder='Paste your link here'
            type='url'
            value={this.state.text}
            onChange={e => this.setState({ url: e.target.value })}
          />
        </InputGroup>

        <ButtonGroup>
          <Button onClick={() => this.props.actions.goBack()}>
            Discard
          </Button>
          <Button
            primary
            onClick={() => this.props.actions.submitPost('link', r, this.state)}
          >
            Send Post
          </Button>
        </ButtonGroup>
      </TabContent>
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
    const { r } = this.props.match.params

    return (
      <TabContent>
        <InputGroup>
          <Input
            type='text'
            placeholder='Add an interesting title...'
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
          />
        </InputGroup>

        <InputGroup>
          <Textarea
            placeholder='Add some text...'
            type='text'
            value={this.state.text}
            onChange={e => this.setState({ text: e.target.value })}
          />
        </InputGroup>

        <ButtonGroup>
          <Button onClick={() => this.props.actions.goBack()}>
            Discard
          </Button>
          <Button
            primary
            onClick={() => this.props.actions.submitPost('self', r, this.state)}
          >
            Send Post
          </Button>
        </ButtonGroup>
      </TabContent>
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
  <Overlay onClick={() => props.actions.goBack()}>
    <Main onClick={e => e.stopPropagation()}>
      <Tabs>
        <TabList>
          <Tab>Text</Tab>
          <Tab>Link</Tab>
        </TabList>

        <TabPanels>
          <SubmitText {...props} />
          <SubmitLink {...props} />
        </TabPanels>
      </Tabs>
    </Main>
  </Overlay>
)

export default SubmitPost
