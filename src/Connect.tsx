import React, { Component } from 'react';
import { Store } from './Store';

type TFn = (...args: any[]) => any;

function Connect<P>(store: Store<P>, propsName: string[]): (Target: any) => any {
  return (Target: any) => {
    return class ConnectToStore extends Component {

      private _connections: Record<string, TFn> = {};

      readonly state: Record<string, any>;

      constructor(props: any) {
        super(props);

        const state: Record<string, any> = {};

        propsName.forEach((propName: string): void => {
          state[propName] = store.get(propName as any);

          const fn: TFn = (value: any) => this.setState({ [propName]: value });

          this._connections[propName] = fn;

          store.on(propName, fn);
        });

        this.state = state;
      }

      componentWillUnmount() {
        propsName.forEach((propName: string) => {
          if (this._connections[propName]) {
            store.off(propName, this._connections[propName]);
          }
        });

        this._connections = {};
      }

      render() {
        return (
          <Target { ...this.props } { ...this.state } />
        );
      }

    }
  };
}

export {
  Connect
};
