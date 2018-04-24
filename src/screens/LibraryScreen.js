import React from 'react';
import PropTypes from 'prop-types';
import { compose, lifecycle } from 'recompose';

import { GridMovies } from '../components'

export const LibraryScreen = ({ data, showDialog }) => (
  <GridMovies
    data={data}
    onClick={showDialog}
  />
)

LibraryScreen.propTypes = {
  data: PropTypes.array.isRequired,
}

LibraryScreen.defaultProps = {
  data: [],
}

export const LibraryScreenWithData = compose(
  lifecycle({
    componentDidMount() {
      const { client, profile } = this.props
      if (!profile) {
        return
      }

      client.libraries(profile.name)
        .then(data => {
          this.setState({ data: data || [] })
        })
        .catch(console.error)
    }
  })
)(LibraryScreen)