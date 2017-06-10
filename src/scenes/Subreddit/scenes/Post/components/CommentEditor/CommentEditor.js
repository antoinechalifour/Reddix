import React, { Component } from 'react'
import styled from 'styled-components'
import { Textarea, Button } from 'Components/Form'
import { BOX_SHADOW_1 } from 'Util/constants'

const Outer = styled.div`
  padding: 16px;
  background: #fff;
  border-radius: 4px;
  box-shadow: ${BOX_SHADOW_1};
`

const ButtonContainer = styled.div`
  text-align: right;
  padding-top: 16px;

  button {
    box-shadow: none;
  }
`

class CommentEditor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: ''
    }

    this.onValueChange = this.onValueChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onValueChange (e) {
    this.setState({ value: e.target.value })
  }

  onSubmit () {
    this.props.actions.sendComment(this.state.value, this.props.id)
  }

  render () {
    return (
      <Outer>
        <Textarea
          placeholder='Post a reply'
          value={this.state.value}
          onChange={this.onValueChange}
        />
        <ButtonContainer>
          <Button onClick={this.onSubmit}>Reply</Button>
        </ButtonContainer>
      </Outer>
    )
  }
}

export default CommentEditor
