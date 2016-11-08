import Rx from 'rx-lite';
import DataEventDispatcher from './DataEventDispatcher';

const EventActivity = new Rx.BehaviorSubject([]);
const EventActivityStream = new Rx.Subject([]);

EventActivity
.scan((acc, op) => op(acc))
.subscribe(EventActivityStream);


DataEventDispatcher.subscribe(x => {
  // console.log('adding event as data', x);
  EventActivity.onNext(function eventConcat(eventItem) {
    return [x].concat(eventItem);
  });
});

// EventActivityStream.subscribe((x) => {
//   console.log('event data stream haz', x);
// });

module.exports = EventActivityStream;
