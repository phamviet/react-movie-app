import React from 'react';
import PropTypes from 'prop-types';
import { compose, lifecycle } from 'recompose';

import { GridMovies } from '../components'

export const DiscoverScreen = ({ data, showDialog }) => (
  <GridMovies
    data={data}
    onClick={showDialog}
  />
)

DiscoverScreen.propTypes = {
  data: PropTypes.array.isRequired,
}

DiscoverScreen.defaultProps = {
  data: [],
}

export const DiscoverScreenWithData = compose(
  lifecycle({
    componentDidMount() {
      const { client } = this.props
      client.discover()
        .then(data => {
          this.setState({ data: data.results || [] })
        })
        .catch(console.error)
    }
  })
)(DiscoverScreen)