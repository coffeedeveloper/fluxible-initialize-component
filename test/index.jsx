import Fluxible from 'fluxible';
import React from 'react';
import { createStore, BaseStore } from 'fluxible/addons';
import { connectToStores, provideContext, createElementWithContext } from 'fluxible-addons-react';
import InitializeComponent from '../lib/main';

const action = (actionContext, payload) => {
  actionContext.dispatch('FOO_ACTION', payload);
};

const BooAction = (actionContext, payload) => {
  actionContext.dispatch('BOO_ACTION', payload);
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
  booHandle () {
    this.emit('rerender', 'come on!!!');
  }
  getState () {
    return {x: 1, y: 2};
  }
}

BooStore.storeName = 'BooStore';
BooStore.handlers = {
  'BOO_ACTION': 'booHandle'
};


class Test extends React.Component {
  handleRerender(info) {
    console.log('in test handle');
    console.log(info);
  }
  render() {
    console.dir(this.props.BooStore);
    return (
      <div>test</div>
    );
  }
}

Test = InitializeComponent(Test, {
  stores: [BooStore],
  events: {
    'BooStore': {
      'rerender': 'handleRerender'
    }
  }
});

// Component
class App extends React.Component {
  onClick() {
    this.context.executeAction(BooAction);
  }
  render() {
    return (
      <div>
        This is App
        <button type="button" onClick={this.onClick.bind(this)}>Click Me</button>
        <Test />
      </div>
    );
  }
}

// App.contextTypes = {
//   executeAction: React.PropTypes.func
// };
//
// App = provideContext(connectToStores(App, [FooStore], (stores, props) => {
//   return stores.FooStore.getState();
// }));

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

React.render(createElementWithContext(context), document.getElementById('app'));
