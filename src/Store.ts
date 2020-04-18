import { EventEmitter } from 'ontime-eventemitter';
import { IStore } from './interfaces';

class Store<P> extends EventEmitter implements IStore {

  private _props: P;

  constructor(props: P) {
    super();

    this._props = props;
  }

  set(name: keyof P, value: P[keyof P]): void {
    if (this._props[name] !== value) {
      this._props[name] = value;

      this.emit(name as string, value);
      this.emit('__change', name, value);
    }
  }

  get(name: keyof P): P[keyof P] {
    return this._props[name];
  }

}

export {
  Store
};
