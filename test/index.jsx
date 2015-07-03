import Fluxible from 'fluxible';
import React from 'react';
import { connectToStores, createStore, provideContext, BaseStore } from 'fluxible/addons';
import InitializeComponent from '../lib/main';

const action = (actionContext, payload) => {
  actionContext.dispatch('FOO_ACTION', payload);
};

// Store
const FooStore = createStore({
    storeName: 'FooStore',
    handlers: {
        'FOO_ACTION': 'fooHandler'
    },
    initialize: function () {
      this.foo = null;
    },
    fooHandler: function (payload) {
      this.foo = payload;
    },
    getState: function () {
      return {
        foo: this.foo
      };
    }
});

class BooStore extends BaseStore {
  getState () {
    return {};
  }
}

console.log(BooStore.name);
BooStore.storeName = 'BooStore';

// Component
class App extends React.Component {
  render() {
    console.log(this.props);
    return (<span>{this.props.foo}</span>);
  }
}

/*
App = provideContext(connectToStores(App, [FooStore], (stores, props) => {
  return stores.FooStore.getState();
}));
*/

App = InitializeComponent(App, {
  provideContext: true,
  stores: [FooStore, BooStore]
});

// App
const app = new Fluxible({
  component: App,
  stores: [FooStore, BooStore]
});

// Bootstrap
const context = app.createContext();
context.executeAction(action, 'bar', (err) => {
  console.log(React.renderToString(context.createElement()));
});
