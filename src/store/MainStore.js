import Rx from 'rx-lite';
import NotificationStore from './NotificationStore';

let stateTree = {
  notifications: new Rx.Subject()
};

export default class MainStore {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
    new NotificationStore(this.dispatcher, stateTree.notifications);
  }

  getSubject(subject){
    return (typeof stateTree[subject] === 'undefined') ? { subscribe: function storeRequestedSubject() {
        return 'Store subject not found'
    }} : stateTree[subject];
  }
}
