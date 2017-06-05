import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Tabs, { Tab } from './Tabs'

class SubmitLink extends Component {
  constructor (props) {
    super(props)

    this.state = {
      link: '',
      img: '',
      title: ''
    }
  }

  render () {
    return (
      <div>
        <div className='form-label'>Title</div>
        <input
          type='text'
          onChange={e => this.setState({ title: e.target.value })}
          value={this.state.title}
        />

        <div className='form-label'>Picture</div>

        <div className='form-label'>Link</div>
        <input
          type='text'
          onChange={e => this.setState({ link: e.target.value })}
          value={this.state.link}
        />

        <Link to={`/r/${this.props.r}`}>Cancel</Link>
        <button
          onClick={() => {
            this.props.actions.submitPost('link', this.props.r, this.state)
          }}
        >
          Submit
        </button>
      </div>
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
      <div>
        <div className='form-label'>Title</div>
        <input
          type='text'
          onChange={e => this.setState({ title: e.target.value })}
          value={this.state.title}
        />

        <div className='form-label'>Text</div>
        <textarea
          onChange={e => this.setState({ text: e.target.value })}
          value={this.state.text}
        />

        <Link to={`/r/${this.props.r}`}>Cancel</Link>
        <button
          onClick={() => this.props.actions.submitPost('self', this.props.r, this.state)}
        >
          Submit
        </button>
      </div>
    )
  }
}

const SubmitPost = props => (
  <div className='submit-link-form'>
    <div>
      <Tabs>
        <Tab title='Link'>
          <SubmitLink
            {...props}
          />
        </Tab>

        <Tab title='Text'>
          <SubmitText
            {...props}
          />
        </Tab>
      </Tabs>
    </div>
  </div>
)

export default SubmitPost
