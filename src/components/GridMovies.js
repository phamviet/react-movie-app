import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon'

export function GridMoviesComponent({ data, onClick, classes }) {
  return (
    <div className={classes.root}>
      <GridList cellHeight={550} className={classes.gridList} cols={2}>
        {data.map(tile => (
          <GridListTile key={tile.id}>
            <img
              onClick={() => onClick(tile)}
              src={tile.thumbnail}
              alt={tile.name}
              className={classes.img}
            />
            <GridListTileBar
              title={tile.name}
              actionIcon={
                <IconButton onClick={() => onClick(tile)} className={classes.icon}>
                  <Icon>info</Icon>
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

GridMoviesComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 800,
  },
  img: {
    cursor: 'pointer'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

export const GridMovies = withStyles(styles)(GridMoviesComponent);