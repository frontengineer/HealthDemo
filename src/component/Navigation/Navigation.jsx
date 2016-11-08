import React from 'react';
import Rx from 'rx-lite';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notificationCount: 0
    };
  }

  componentWillMount(){
    const self = this;
    //sync cound
    this.context.store.getSubject('notifications').subscribe((xs) => {
      if(!xs.length){
        self.context.bus.onNext('HIDE_NOTIFICATIONS');
        self.setState({ notificationCount:0 });
      }
      self.setState({ notificationCount: xs.length });
    });
  }

  showNotification(){
    this.context.bus.onNext('SHOW_NOTIFICATIONS');
  }

  render(){
    return (
      <header>
        <nav className="group">
          <ul className="nav-list left">
            <li className="nav-list-item search">
              <i className="fa fa-search"></i>
            </li>
            <li className="nav-list-item">
              <span>Patients</span>
            </li>
            <li className="nav-list-item">
              <span>Protocols</span>
            </li>
            <li className="nav-list-item">
              <span>Clinicians</span>
            </li>
          </ul>
          <ul className="nav-list right">
            <li className="nav-list-item notifications">
              {this.state.notificationCount > 0 && <a className="notifications" onClick={this.showNotification.bind(this)}><i className="fa fa-bell-o"></i> <span className="badge">{this.state.notificationCount}</span></a>}
              {this.state.notificationCount < 1 && <i className="fa fa-bell-o"></i>}
            </li>
            <li className="nav-list-item">
              <span className="clinician-name">John Doe</span><i className="fa fa-chevron-down"></i>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
Navigation.contextTypes = {
  bus: React.PropTypes.object.isRequired,
  store: React.PropTypes.object.isRequired
};
