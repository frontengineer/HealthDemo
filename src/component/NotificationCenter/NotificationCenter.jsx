import React from 'react';
import axios from 'axios';

// import NotificationStore from './NotificationStore';
import Notification from './Notification.jsx';

import _ from 'lodash';

export default class NotificationCenter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showNotification: 0
    };

  }
  componentWillMount(){
    const self = this;
    // update display
    this.context.store.getSubject('notifications').subscribe((xs) => {
      let readyData = self.prepData(xs);
      self.setState({ grouping: readyData });
    });
    // fetch
    this.context.bus.onNext({ intent: 'PULL_NOTIFICATIONS' });

  }

  prepData(data){
    //grouping
    let curr = null;
      return data.reduce((acc, next) => {
        curr = next.payload.therapy_session_id;
        acc[curr] = acc[curr] || [];
        acc[curr].push(next);
        return acc;
      }, {});
  }

  componentDidMount(){
    //show and hide
    var self = this;
    this.context.bus.subscribe(x => {
      if(x === 'SHOW_NOTIFICATIONS'){ self.setState({ showNotification: 1 }); }
      if(x === 'HIDE_NOTIFICATIONS'){ self.setState({ showNotification: 0 }); }
    });
  }

  handleDismissAll(){
    this.context.bus.onNext({ intent: 'DISMISS_NOTIFICATION_ALL' });
    return false;

  }

  handleDismissGroup(id){
    this.context.bus.onNext({ intent: 'DISMISS_NOTIFICATION_GROUP', payload: id });
    return false;
  }

  render(){
    let defaultStyle = {
      position: 'absolute',
      top: 86,
      right: 10,
      width: 280,
      minHeight: 100,
      maxHeight: 300,
      border: '1px solid #2d4d6d',
      overflow: 'auto',
      backgroundColor: '#ffffff',
      opacity: this.state.showNotification
    };

    return (
      <div className="notification-center" style={defaultStyle}>
        <div className="center-heading group">
          <button className="right" onClick={this.handleDismissAll.bind(this)}>Dismiss All</button>
        </div>
        {_.keys(this.state.grouping).map((x, i) => (
            <div style={{ borderTop: '1px solid #2d4d6d'}} key={x}>
              {(this.state.grouping[x].length > 1) && <div className="clearDiv"> <a href="javascript:void(0)" className="right" onClick={this.handleDismissGroup.bind(this, x)}>group <span className="fa fa-close"></span></a></div>}
              {this.state.grouping[x].map((y, j) => {
                // console.log('y is', y);
                return (
                  <div key={x + '_sub_' + j}>
                    <Notification eventBus={this.props.eventBus} details={y.payload} />
                  </div>
                );
              })}
            </div>
          ))
        }
      </div>
    );
  }
}

NotificationCenter.contextTypes = {
  bus: React.PropTypes.object.isRequired,
  store: React.PropTypes.object.isRequired
};
