import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import GridList, { GridListTile } from 'material-ui/GridList';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  withMobileDialog,
} from 'material-ui/Dialog';

export function MovieDialogComponent({ item, disabled, fullScreen, classes, onAddLibrary, onInLibraryCheck, onRemoveLibrary, onClose, ...props }) {

  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={onClose}
      aria-labelledby="movie-dialog"
      maxWidth="md"
      {...props}
    >
      <DialogContent>
        {item && (
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <GridList cellHeight={'auto'} cols={1}>
                <GridListTile>
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                  />
                </GridListTile>
              </GridList>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom color="inherit" variant="display1">{item ? item.name : ''}</Typography>
              <DialogContentText>{item.overview}</DialogContentText>
              <DialogActions>
                <Button disabled={disabled} onClick={() => onAddLibrary(item)} color="primary">
                  Add Library
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        )}
        {fullScreen && (
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Close
            </Button>
          </DialogActions>
        )}
      </DialogContent>
    </Dialog>
  );
}

MovieDialogComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool.isRequired,
};

const styles = () => ({

});

export const MovieDialog = compose(
  // https://github.com/acdlite/recompose/blob/master/docs/API.md#lifecycle
  withMobileDialog({ breakpoint: 'md' }),
  withStyles(styles)
)(MovieDialogComponent);