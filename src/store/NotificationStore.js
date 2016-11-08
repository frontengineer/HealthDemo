import Rx from 'rx-lite';
import axios from 'axios';
export default class NSStore {
  constructor(dispatcher, StoreSubject) {
    this.dispatcher = dispatcher;
    this.NotificationStore = new Rx.BehaviorSubject([]);

    this.NotificationStore
    .scan((acc, op) => op(acc))
    .subscribe(StoreSubject);

    const self = this;

    // run actions against store
    dispatcher.subscribe(function(x){
      self.mutateStore.call(self, x);
    });

  }

  updateStore(){
    // fetching and updating...;
    Rx.Observable
    .fromPromise(axios.get('./notifications.json'))
    .flatMap((x) => {
      return Rx.Observable.zip(
        Rx.Observable.fromArray(x.data),
        Rx.Observable.timer(250, 250),
        (dataItem, i) => { return { intent: 'CREATE_NOTIFICATION', payload: dataItem } }
      );
    })
    .subscribe(x => { this.mutateStore(x) });
  }

  mutateStore(action){
    if(!(typeof action === 'object')){ return; }

    // store reducers
    switch (action.intent) {
      case 'PULL_NOTIFICATIONS':
        this.updateStore();

        break;
      case 'CREATE_NOTIFICATION':
        this.NotificationStore.onNext( (intent) => {
          return [action].concat(intent);
        });

        break;
      case 'DISMISS_NOTIFICATION_ALL':
        // console.log('dismissing all', action);
        this.NotificationStore.onNext( (intent) => {
          return [];
        });

        break;
      case 'DISMISS_NOTIFICATION_GROUP':
        // console.log('dismissing group', action);
        this.NotificationStore.onNext(function(intent){
          return intent.filter(function(x){
            return x.payload.therapy_session_id !== action.payload
          });
        });

        break;
      case 'DISMISS_NOTIFICATION_VIEW':
        this.NotificationStore.onNext(function(intent){
          return intent.filter(function(x){
            return x.payload.id !== action.payload
          });
        });

        break;
      default:
        this.NotificationStore.onNext( (intent) => {
          return intent;
        });
    };
  }

  readStore(){
    // TODO remove
    return this.NotificationStore;
  }
}
