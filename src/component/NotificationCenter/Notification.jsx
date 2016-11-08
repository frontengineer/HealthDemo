import React from 'react';
import moment from 'moment';

export default class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultStyle: {
        display: 'block'
      }
    }
  }

  handleDetailView(viewData){
    this.context.bus.onNext({ intent: 'SHOW_NOTIFICATION_DETAIL', payload: viewData });
    return false;
  }
  
  handleDismissView(id){
    this.context.bus.onNext({ intent: 'DISMISS_NOTIFICATION_VIEW', payload: id });
    return false;
  }

  render(){
    let formattedDate = moment(new Date(this.props.details.timestamp).getTime()).format('MMM D, YYYY H:MMa');

    return (
      <div style={this.state.defaultStyle}>
        <div className={this.props.details["type"] === 'event_pain' ? 'group event-pain' : 'group'} >
          <div className="noti-date">{formattedDate}</div>
          <div className="">{this.props.details.patient_name}</div>
          <div className="noti-message">{this.props.details.message}</div>
          <div className="noti-detail">
            <a href="javascript:void(0)" className="fa fa-chevron-circle-down" onClick={this.handleDetailView.bind(this, this.props.details)}></a>
              &nbsp;&nbsp;&nbsp;
            <a href="javascript:void(0)" className="fa fa-close" onClick={this.handleDismissView.bind(this, this.props.details.id)}></a>
            </div>
        </div>

      </div>
    );
  }
}

Notification.contextTypes = {
  bus: React.PropTypes.object.isRequired
};
