import React, { Component } from 'react'

export class Tab extends Component {
  render () {
    return this.props.children
  }
}

class Tabs extends  Component {
  constructor (props) {
    super(props)
    this.state = { tabIndex: 0 }
  }

  render () {
    const kids = React.Children.toArray(this.props.children)
    return (
      <div className='tabs'>
        <div className="tabs__header">
          {kids.map((x, index) => (
            <div
              key={x.props.title}
              onClick={() => this.setState({ tabIndex: index })}
            >
              {x.props.title}
            </div>
          ))}
        </div>

        {kids[this.state.tabIndex]}
      </div>
    )
  }
}

export default Tabs