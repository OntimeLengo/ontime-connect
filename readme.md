<h1>Ontime Connect</h1>

What is an Ontime Connect? There are the Decorator and Store, who are able to help you not to use complex functionality as Redux or MobX. Sometimes there is a need for small and simple functionality that covers the same functionality from Redux or MobX. 

The store is used to help you manage application state container.

Decorator @Connect is used to react to changes in Store.

Below you are able to find example how to use.

<h2>How to install</h2>

```bash
npm install ontime-connect
```

<h2>How to use</h2>

```typescript
// File store.ts
import { Store } from 'ontime-connect';

interface IUserStore extends {
  name: string;
  email: string;
}

const store = new Store<IUserStore>({
  name: '', 
  email: ''
});

export {
  store,
  IUserStore
};
```

```typescript
// File UserComponent.ts
import React, { Component } from 'react';
import { Connect } from 'ontime-connect';
import { store, IUserStore } from './store.ts';

interface ITestProps {
  name?: string;
  email?: string;
}

interface ITestDefProps extends ITestProps {
  name: string;
  email: string;
}

@Connect<IUserStore>(store, ['name', 'email'])
class UserComponent extends Component<ITestProps & ITestDefProps> {

  public static defaultProps: ITestDefProps = {
    name: '',
    email: ''
  };

  render(): JSX.Element {
    const { name, email } = this.props;

    if (name && !email) {
      return (<span>{ name }</span>);
    } else if (name && email) {
      return (<span>{ name } ({ email })</span>);
    } else {
      return (<span>Unknown user</span>);
    }
  }

}
```

<h2>Store methods</h2>

<h2>set</h2>

`set(name: keyof P, value: P[keyof P]): void` Set a new value to store

where "P" is generic interface of properties

<h2>get</h2>

`get(name: keyof P): P[keyof P]` get value by name from store

<h2>@Connect</h2>

`Connect<P>(store: Store<P>, propsName: string[])` create connection from component to store

P - generic interface of properties

store - instance of class Store

propsName - list of properties names to react on changes