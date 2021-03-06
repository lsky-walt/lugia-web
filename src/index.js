import './widgets/css/global.css';
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/string';
import React from 'react';
import { createBrowserHistory } from 'history';
import { createApp, render } from '@lugia/lugiax-router';
import registerServiceWorker from './registerServiceWorker';
import { CheckboxGroupDemo } from './widgets/checkbox/demo';
import Main from './App';

const history = createBrowserHistory();
const App = createApp(
  {
    '/': {
      component: Main,
    },
  },
  history
);

render(() => {
  return <App />;
}, 'root');

registerServiceWorker();
