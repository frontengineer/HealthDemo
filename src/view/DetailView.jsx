import React from 'react';
import moment from 'moment';

export default class DetailView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      patient: {
        patient_name: 'Hi. Submitted by David Parnell https://github.com/frontengineer/HealthDemo.git',
        timestamp: new Date().getTime(),
        message: 'Node.js && npm or screen-share. Refresh to reset. More time more detail...but was fun...Thanks!'
      }
    };

  }
  componentWillMount(){
    const self = this;
    this.context.bus
    .subscribe(x => {
      // render valid detail
      if(typeof x === 'object' && x.intent === "SHOW_NOTIFICATION_DETAIL"){
        self.setState({ patient: x.payload });
      }
      //sync ommitted notification
      if(typeof x === 'object' && x.intent === "DISMISS_NOTIFICATION_VIEW"){
        self.handleDetailView();
      }
    });

  }

  handleDetailView(){
    this.setState({ patient: {} });
  }

  render(){

    if(typeof this.state.patient.patient_name === 'undefined') { return null; }
    let formattedDate = moment(new Date(this.state.patient.timestamp).getTime()).format('MMM D, YYYY H:MMa');

    return (
      <div>
        <h3 className="detail-heading">
          Details <a href="#nogo" className="hide-detail" onClick={this.handleDetailView.bind(this)}>hide details</a>
        </h3>

        <div className="group">
          <div className="left detail-title">Patient Name:</div>
          <div className="left detail-content">{this.state.patient.patient_name}</div>
        </div>

        <div className="group">
          <div className="left detail-title">Last Visit:</div>
          <div className="left detail-content">{formattedDate}</div>
        </div>

        <div className="group">
          <div className="left detail-title">Message:</div>
          <div className="left detail-content">{this.state.patient.message}</div>
        </div>
        {this.state.patient.exercise_name && <div className="group">
          <div className="left detail-title">Exercise Name:</div>
          <div className="left detail-content">{this.state.patient.exercise_name}</div>
        </div>}

      </div>
    );
  }
}

DetailView.contextTypes = {
  bus: React.PropTypes.object.isRequired,
  store: React.PropTypes.object.isRequired
};
