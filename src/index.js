import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory'

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { compose, lifecycle, withProps, withStateHandlers } from 'recompose';
import blue from 'material-ui/colors/blue';

import App from './App';
import Auth from './Auth';
import Client from './Client';
import { API_ENDPOINT, API_CLIENT_ID, API_CLIENT_SECRET } from './config'
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

const history = createHistory({
  forceRefresh: true
})
const client = new Client(API_ENDPOINT, API_CLIENT_ID, API_CLIENT_SECRET)
const auth = new Auth();
auth.addListener('authenticated', function () {
  history.replace('/')
})

const initializing = /access_token|id_token|error/.test(window.location.hash);
if ((!initializing && !auth.isAuthenticated())) {
  auth.login()
} else {
  const EnhancedApp = compose(
    withProps(() => {
      return {
        initializing,
        busy: false,
        profile: {},
        client,
        auth,
      }
    }),
    withStateHandlers(
      {
        viewing: null,
        dialog: false,
      },
      {
        showDialog: () => item => ({
          viewing: item,
          dialog: true
        }),
        hideDialog: () => () => ({
          dialog: false
        }),
      }
    ),
    lifecycle({
      componentDidMount() {
        client.addListener('request', () => {
          this.setState(() => ({ busy: true }))
        })

        client.addListener('response', () => {
          this.setState(() => ({ busy: false }))
        })

        if (!this.props.initializing) {
          auth.getUserInfo()
            .then(profile => {
              this.setState({ profile })
            })
            .catch(function (err) {
              console.error(err)
              auth.logout()
              auth.login()
            })
        }
      },
      componentWillUnmount() {
        client.removeAllListeners()
      }
    }),
  )(App)

  const Root = () => (
    <MuiThemeProvider theme={theme}>
      <EnhancedApp/>
    </MuiThemeProvider>
  )

  ReactDOM.render(<Root/>, document.getElementById('root'));
}

registerServiceWorker();
