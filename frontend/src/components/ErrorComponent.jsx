import React, { Component } from 'react'
export default class ErrorBoundary extends Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError (error) {
    return {
      hasError: true
    }
  }

  render () {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Houston, we have a problem</h2>
          <p>
            We know it's scary but the page you're trying to reach is not
            working for the moment.
          </p>
        </div>
      )
    }
    return this.props.children
  }
}
