import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { alert, error, message } = this.props;
    console.log(message);
    console.log(error);
    if (error !== prevProps.error) {
      if (error.msg.non_field_errors) {
        alert.error(error.msg.non_field_errors[0]);
      } else if (error.msg.country_code) {
        alert.error(error.msg.country_code);
      } else if (error.msg.phone_number) {
        alert.error(error.msg.phone_number);
      } else if (error.msg.email && error.msg.detail) {
        alert.error(error.msg.detail);
      } else if (error.msg.email) {
        alert.error("Email :" + error.msg.email);
      } else if (error.msg.role_name) {
        alert.error(error.msg.role_name);
      } else if (error.msg.birthdate) {
        alert.error("Birthdate has wrong format. Use MM-DD-YYYY");
      } else if (error.msg.anniversary) {
        alert.error("Anniversary has wrong format. Use MM-DD-YYYY");
      } else if (error.msg.region_id) {
        alert.error("Invalid region.");
      } else if (error.msg.node_id) {
        alert.error("Invalid node.");
      } else if (error.msg.zone_id) {
        alert.error("Invalid zone.");
      } else if (error.msg.region_name) {
        alert.error(error.msg.region_name);
      } else if (error.msg.zone_name) {
        alert.error(error.msg.zone_name);
      } else if (error.msg.node_name) {
        alert.error(error.msg.node_name);
      } else if (error.msg.country_name) {
        alert.error(error.msg.country_name);
      } else if (error.msg.status) {
        alert.error("Provided key is incorrect");
      } else {
        alert.error(error.msg.detail);
      }
    }
    if (message !== prevProps.message) {
      alert.error(message[Object.keys(message)]);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
