import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';

export function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 10 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};