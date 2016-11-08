import React from 'react';
import ReactDOM from 'react-dom';
import Rx from 'rx-lite';
import App from './App.jsx';
import MainStore from './store/MainStore';

const AppBus = new Rx.BehaviorSubject();
ReactDOM.render(<App bus={AppBus} store={new MainStore(AppBus)} />, document.getElementById('root'));
