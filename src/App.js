import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Icon from 'material-ui/Icon'
import { LinearProgress } from 'material-ui/Progress';

import { TabContainer, DiscoverScreen, LibraryScreen } from './screens'
import Client from './Client'
import { MovieDialog } from './components'

const screens = [DiscoverScreen, LibraryScreen]

function renderTabs(index, props = {}) {
  return React.createElement(screens[index], props)
}

function executeLibraryAction({ client, profile }, name, item) {
  return client[name]({ user_id: profile.name, movie_id: item.id + '' })
}

class App extends Component {
  state = {
    tabValue: 0,
  };

  handleTabChange = (event, tabValue) => {
    this.setState({ tabValue });
  };

  handleAddLibrary = item => {
    return executeLibraryAction(this.props, 'addLibrary', item)
  }

  handleRemoveLibrary = item => {
    return executeLibraryAction(this.props, 'removeLibrary', item)
  }

  handleInLibraryCheck = item => {
    return executeLibraryAction(this.props, 'existInLibrary', item)
  }

  renderProgress() {
    return (
      <div className={this.props.classes.progress}>
        <LinearProgress/>
      </div>
    )
  }

  render() {
    const { classes, busy, initializing, dialog, viewing, hideDialog, ...screenProps } = this.props;
    const { tabValue } = this.state;
    if (initializing) {
      return this.renderProgress()
    }

    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Tabs centered value={tabValue} onChange={this.handleTabChange}>
            <Tab disabled={busy} icon={<Icon>home</Icon>} label="Discover"/>
            <Tab disabled={busy} icon={<Icon>favorite</Icon>} label="Library"/>
          </Tabs>
        </AppBar>
        <MovieDialog
          open={dialog}
          item={viewing}
          disabled={busy}
          onClose={hideDialog}
          onAddLibrary={this.handleAddLibrary}
          onRemoveLibrary={this.handleRemoveLibrary}
          onInLibraryCheck={this.handleInLibraryCheck}
        />
        <TabContainer>{renderTabs(tabValue, { ...screenProps, busy })}</TabContainer>
        {busy && this.renderProgress()}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  client: PropTypes.instanceOf(Client).isRequired,
  profile: PropTypes.object.isRequired,
  initializing: PropTypes.bool.isRequired,
  busy: PropTypes.bool.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: 75,
    backgroundColor: theme.palette.background.paper,
  },
  progress: {
    position: 'fixed',
    width: '100%',
    bottom: 0,
    right: 0,
    left: 'auto',
  }
});

export default compose(
  withStyles(styles))
(App);
