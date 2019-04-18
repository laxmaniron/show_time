import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSnacks } from "../../actions/snacks";
import { Link } from "react-router-dom";
import Paypal from "../pages/Paypal";
import "./snacks.css";

/// AUWnNkRkdwNKiee-zgU8NF7Zs6OTt-c6zcCNeAM89mHWRHr_DrCjqyyu-qTZGYyJzJ2aTA2wsi4Aq6HK

export class Snacks extends Component {
  static propTypes = {
    snacks: PropTypes.array.isRequired
  };

  state = {
    totalmoviecost: 540.0,
    totalcost: 0.0,
    samosa: 0,
    popcorn: 0,
    sandwich: 0
  };

  componentDidMount() {
    this.props.getSnacks();
  }

  addItems = (name, price) => {
    if (name == "samosa") {
      this.setState({ samosa: this.state.samosa + 1 });
    }
    if (name == "popcorn") {
      this.setState({ popcorn: this.state.popcorn + 1 });
    }
    if (name == "sandwich") {
      this.setState({ sandwich: this.state.sandwich + 1 });
    }

    this.setState({ totalcost: this.state.totalcost + parseFloat(price) });
    this.setState({
      totalmoviecost: this.state.totalmoviecost + parseFloat(price)
    });
  };

  subtractItems = (name, price) => {
    if (name == "samosa") {
      if (this.state.samosa > 0) {
        this.setState({ samosa: this.state.samosa - 1 });
        this.setState({ totalcost: this.state.totalcost - parseFloat(price) });
        this.setState({
          totalmoviecost: this.state.totalmoviecost - parseFloat(price)
        });
      }
    }
    if (name == "popcorn") {
      if (this.state.popcorn > 0) {
        this.setState({ popcorn: this.state.popcorn - 1 });
        this.setState({ totalcost: this.state.totalcost - parseFloat(price) });
        this.setState({
          totalmoviecost: this.state.totalmoviecost - parseFloat(price)
        });
      }
    }
    if (name == "sandwich") {
      if (this.state.sandwich > 0) {
        this.setState({ sandwich: this.state.sandwich - 1 });
        this.setState({ totalcost: this.state.totalcost - parseFloat(price) });
        this.setState({
          totalmoviecost: this.state.totalmoviecost - parseFloat(price)
        });
      }
    }
  };

  transactionError = () => {};

  transactionCanceled = () => {};

  transactionSuccess = () => {};

  render() {
    const useridbook = 36;
    return (
      <Fragment>
        <div className="backgroundsnacks">
          <div className="container-fluid">
            <div className="row">
              <div
                className="col-sm-8"
                style={{ paddingLeft: "5%", paddingRight: "5%" }}
              >
                <div className="headerimg">
                  <img
                    src="//in.bmscdn.com/bmsin/fnb/offerbanner/web/web-offerbanner.jpg"
                    style={{
                      width: "93%",
                      height: "auto",
                      maxWidth: "inherit"
                    }}
                  />
                </div>

                <div className="snacksbody">
                  <div className="container" style={{ maxWidth: "inherit" }}>
                    <div className="row ">
                      <div className="col-sm-12 snackshead">
                        <p className="snackshead1">
                          {" "}
                          Grab a <span style={{ color: "red" }}>Bite!</span>
                        </p>
                        <p className="snackshead2">
                          {" "}
                          Prebook Your Meal and{" "}
                          <span style={{ color: "red" }}>save more!</span>
                        </p>
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-sm-12 snackslist">
                        {this.props.snacks.map(snack => (
                          <div
                            className="card "
                            key={snack.id}
                            style={{ width: "30%" }}
                          >
                            <img
                              className="card-img-top"
                              src={snack.image}
                              alt="Card image"
                              style={{ width: "100 %", height: "150px" }}
                            />
                            <div className="card-body">
                              <h6 className="card-title">{snack.snacks}</h6>
                              <p className="card-text">
                                {snack.price}/- per plate{" "}
                              </p>
                              <p className="card-text">
                                <span>
                                  &nbsp;&nbsp;
                                  <div
                                    className="btn btn-primary "
                                    onClick={this.addItems.bind(
                                      this,
                                      snack.snacks,
                                      snack.price
                                    )}
                                  >
                                    Add
                                  </div>
                                </span>
                                <span>
                                  &nbsp;&nbsp; {this.state[snack.snacks]}{" "}
                                </span>
                                <span>
                                  &nbsp;&nbsp;
                                  <div
                                    className="btn btn-danger"
                                    onClick={this.subtractItems.bind(
                                      this,
                                      snack.snacks,
                                      snack.price
                                    )}
                                  >
                                    Subtract
                                  </div>
                                </span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-sm-12 snacksfooter">
                        Note:
                        <ol style={{ fontSize: "small" }}>
                          <li>Images are for representation purposes only</li>
                          <li>Prices inclusive of taxes</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-4">
                <div className="bookingsummary">
                  <div className="bookingsummaryrates">
                    <table width="100%">
                      <tr>
                        <td style={{ padding: "16px", color: "aliceblue" }}>
                          {" "}
                          <span style={{ fontSize1: "16px" }}>
                            PH 67,68
                            <span style={{ fontSize1: "12px" }}>
                              (2 tickets)
                            </span>
                          </span>
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            padding: "16px",
                            color: "aliceblue"
                          }}
                        >
                          {" "}
                          {`${this.state.totalmoviecost -
                            this.state.totalcost}`}
                          /-
                        </td>
                      </tr>
                      <tr>
                        <td style={{ color: "aliceblue" }}> Snacks</td>
                        <td
                          style={{
                            textAlign: "right",
                            padding: "16px",
                            color: "aliceblue"
                          }}
                        >
                          {this.state.totalcost}
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div className="bookingsummarytotalamount">
                    <table width="100%">
                      <tr>
                        <td>
                          {" "}
                          <span
                            style={{
                              fontSize1: "18px",
                              padding: "16px",
                              color: "aliceblue"
                            }}
                          >
                            Total
                          </span>
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            padding: "16px",
                            color: "aliceblue"
                          }}
                        >
                          {" "}
                          {this.state.totalmoviecost}
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div className="bookingsummarysubmit">
                    <Paypal
                      style={{ width: "100%" }}
                      toPay={this.state.totalmoviecost}
                      transactionError={data => this.transactionError(data)}
                      transactionCanceled={data =>
                        this.transactionCanceled(data)
                      }
                      onSuccess={data => this.transactionSuccess(data)}
                      className="btn btn-danger"
                    />
                  </div>
                  <div>
                    <Link
                      to={`/history/${useridbook}`}
                      className="btn btn-dark"
                    >
                      Booking History
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  snacks: state.snacks.snacks
});

export default connect(
  mapStateToProps,
  { getSnacks }
)(Snacks);
