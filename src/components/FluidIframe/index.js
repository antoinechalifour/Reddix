import React, { Component } from 'react'
import { XmlEntities as Entities } from 'html-entities'

const entities = new Entities()

class FluidIframe extends Component {
  constructor (props) {
    super(props)

    this.state = { width: 0 }
    this.ratio = props.height / props.width

    this.onResize = this.onResize.bind(this)
    this.onRootRef = this.onRootRef.bind(this)
  }

  componentDidMount () {
    window.addEventListener('resize', this.onResize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onResize)
  }

  onResize () {
    const { width } = this.root.getBoundingClientRect()
    this.setState({ width })
  }

  onRootRef (e) {
    if (e) {
      this.root = e
      const { width } = e.getBoundingClientRect()
      this.setState({ width })
    }
  }

  render () {
    const isReady = this.props.width !== 0
    let content

    if (isReady) {
      let unescaped = entities.decode(this.props.content)
      const width = this.state.width
      const height = width * this.ratio

      unescaped = unescaped
        .split(`width="${this.props.width}"`)
        .join(`width="${width}"`)
        .split(`height="${this.props.height}"`)
        .join(`height="${height}"`)

      content = unescaped
    }
    return (
      <div
        ref={this.onRootRef}
      >
        {this.state.width !== 0 && (
          <div
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </div>
    )
  }
}

export default FluidIframe
