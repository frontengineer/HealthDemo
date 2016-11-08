import React, { Component } from 'react';
import axios from 'axios';
import Rx from 'rx-lite';

import Navigation from './component/Navigation/Navigation.jsx';
import NotificationCenter from './component/NotificationCenter/NotificationCenter.jsx';
import DetailView from './view/DetailView.jsx';

require('../less/main.less');

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      showNotification: false
    };
  }

  render() {
    return (
      <div className="container">
        <Navigation />
        <div className="content-container">
          <h1>My Page</h1>
          <DetailView />
          <NotificationCenter />
        </div>
      </div>
    );
  }

  getChildContext(){
    return {
      bus: this.props.bus,
      store: this.props.store
    }
  }
}

App.childContextTypes = {
  bus   : React.PropTypes.object,
  store : React.PropTypes.object
};
