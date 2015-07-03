# fluxible-initialize-component

`fluxible-initialize-component` is simple pack to initialize fluxible react component. Auto to set `contextTypes` and `connectToStores` , and `provideContext`.

### How to use ?

```javascript
import React from 'react';
import InitializeComponent from 'fluxible-initialize-component';
import FooStore from '../stores/Foostore';

class Foo extends React.Component {
  render () {
    return (<span>wow</span>);
  }
}

Foo = InitializeComponent(foo, {
  stores: [FooStore]
});

export default Foo;
```

It is same code

```javascript
import React from 'react';
import { connectToStores, provideContext } from 'fluxible/addons';
import FooStore from '../stores/Foostore';

class Foo extends React.Component {
  render () {
    return (<span>wow</span>);
  }
}

Foo.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func
};

Foo = connectToStores(Foo, [FooStore], (stores, props) => {
  return {
    FooStore: stores.FooStore.getState()
  };
});

export default Foo;
```

If you want set component `provideContext`

```javascript
Foo = InitializeComponent(foo, { provideContext: true });
```
