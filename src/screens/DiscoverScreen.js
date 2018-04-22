import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { GridMovies } from '../components'

export class DiscoverScreen extends Component {
  state = {
    data: [],
  }

  componentDidMount() {
    const { client } = this.props
    client.discover()
      .then(data => {
        this.setState({ data: data.results })
      })
      .catch(console.error)
  }

  render() {
    const { showDialog } = this.props;

    return (
      <div>
        <GridMovies
          data={this.state.data}
          onClick={showDialog}
        />
      </div>
    )
  }
}

DiscoverScreen.propTypes = {
  client: PropTypes.object.isRequired,
}