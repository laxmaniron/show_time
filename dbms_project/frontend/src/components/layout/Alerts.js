import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };
  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      if (error.msg) {
        //const JSONerror = JSON.stringify(error.msg);
        alert.error(`Error:${error.msg}`);
      }
    }
    if (message !== prevProps.message) {
      if (message.movieLoad) {
        alert.success(message.movieLoad);
      }
    }
  }

  //   componentDidMount() {
  //     this.props.alert.show("it works");
  //   }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
