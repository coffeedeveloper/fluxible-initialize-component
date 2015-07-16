import assign from 'object-assign';
import React from 'react';
import { connectToStores, provideContext } from 'fluxible/addons';
import connectToEvents from 'fluxible-connecttoevents';

export default function (component, config = {}) {
  let opts = assign({}, {
    contextTypes: {},
    stores: [],
    provideContext: false,
    events: null
  }, config);

  component.contextTypes = assign({
    getStore: React.PropTypes.func,
    executeAction: React.PropTypes.func
  }, opts.contextTypes);

  if (opts.events) {
    component = connectToEvents(component, opts.stores, opts.events);
  }

  component = connectToStores(component, opts.stores, (stores, props) => {
    let result = {};

    for (let store of opts.stores) {
      let name = store.storeName || store.name;
      result[name] = stores[name].getState();
    }

    return result;
  });

  if (opts.provideContext) {
    component = provideContext(component);
  }

  return component;
}
