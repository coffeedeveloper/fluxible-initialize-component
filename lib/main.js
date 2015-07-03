import assign from 'object-assign';
import React from 'react';
import { connectToStores, provideContext } from 'fluxible/addons';

export default function (component, config = {}) {
  let opts = assign({}, {
    contextTypes: {},
    stores: [],
    provideContext: false
  }, config);

  if (opts.provideContext) {
    component = provideContext(component);
  }

  component.contextTypes = assign({
    getStore: React.PropTypes.func,
    executeAction: React.PropTypes.func
  }, opts.contextTypes);

  component = connectToStores(component, opts.stores, (stores, props) => {
    let result = {};

    for (let store of opts.stores) {
      let name = store.storeName || store.name;
      result[name] = stores[name].getState();
    }

    return result;
  });

  return component;
}
